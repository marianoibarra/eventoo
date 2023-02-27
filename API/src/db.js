require("dotenv").config();
const { Sequelize, SequelizeScopeError } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require('moment');


const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { 
  Event, 
  Transaction, 
  User, 
  Address, 
  BankAccount, 
  Category, 
  Ticket,
  Review,
  EmailCode,
  RoleAdmin,
  Payment

} = sequelize.models;

// Relaciones

User.belongsToMany(Event, { through: 'Favorites', as: 'favorites' });
Event.belongsToMany(User, { through: 'Favorites', as: 'favorites' });


User.belongsToMany(Event, { through: Review, as: 'reviews' });
Event.belongsToMany(User, { through: Review, as: 'reviews' });
User.hasMany(Review);
Review.belongsTo(User, { foreignKey: 'userId' });
Event.hasMany(Review);
Review.belongsTo(Event, { foreignKey: 'eventId' });


User.belongsToMany(Event, { 
  through: {model: Transaction, unique: false }, 
  foreignKey: 'buyerId',
  otherKey: 'eventId',
  as: 'transactions',
  unique: false
});
Event.belongsToMany(User, {
  through: {model: Transaction, unique: false }, 
  foreignKey: 'eventId',
  otherKey: 'buyerId', 
  as: 'transactions', 
});
User.hasMany(Transaction, {foreignKey: 'buyerId'});
Transaction.belongsTo(User, {as: 'buyer', foreignKey: 'buyerId'});
Event.hasMany(Transaction);
Transaction.belongsTo(Event, {as: 'event'}); 


Transaction.hasMany(Ticket, {as: "tickets"})
Ticket.belongsTo(Transaction)

User.hasMany(Event, {foreignKey: 'organizerId', as: 'organizer'})
Event.belongsTo(User, {foreignKey: 'organizerId', as: 'organizer'})

User.hasOne(EmailCode)
EmailCode.belongsTo(User)

RoleAdmin.hasMany(User)
User.belongsTo(RoleAdmin)

Address.hasMany(User)
User.belongsTo(Address, {as: 'address'})

Category.hasMany(Event)
Event.belongsTo(Category, {as: 'category'})

User.hasMany(BankAccount,{as: 'bankAccount', onDelete: 'cascade'})
BankAccount.belongsTo(User)

BankAccount.hasMany(Event)
Event.belongsTo(BankAccount, {as: 'bankAccount'})

Address.hasMany(Event)
Event.belongsTo(Address, {as: 'address'})

Event.hasMany(Review)
Review.belongsTo(Event)

Payment.hasOne(Event);
Event.belongsTo(Payment);

User.hasMany(Payment, {as: 'payments'});
Payment.belongsTo(User, {as: 'user'});


//PASSWORD USER

// Encripta la contraseña antes de crear y de actualizar el usuario.
User.beforeCreate(async function (user) { //event
  if(user.password) { // el event.privatepassword osea el atributo ligado al objeto. 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.beforeUpdate(async function (user) {
  if(user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Funcion que se va a usar en el logeo, para verificar que sea la contraseña.
User.prototype.validPassword = async function (password) {
  console.log(this)
  return await bcrypt.compare(password, this.password);
};

//PASSWORD EVENT PRIVATE


Event.beforeCreate(async function (event) { 
  if(event.privateEvent_password) { 
    const salt = await bcrypt.genSalt(10);
    event.privateEvent_password = await bcrypt.hash(event.privateEvent_password, salt);
  }
});


Event.beforeUpdate(async function (event) {
  if(event.privateEvent_password) {
    const salt = await bcrypt.genSalt(10);
    event.privateEvent_password = await bcrypt.hash(event.privateEvent_password, salt);
  }
});

Event.prototype.validPassword = async function (privateEvent_password) {
  return await bcrypt.compare(privateEvent_password, this.privateEvent_password);
};


///


Event.beforeFind((options) => {
  options.where.isToday = (options.where.isToday === true || options.where.isToday === 'true');
  options.where.isNextWeekend = (options.where.isNextWeekend === true || options.where.isNextWeekend === 'true');
  
  if(options.where.name) {
    options.where.name = {
      [Sequelize.Op.iLike]: `%${options.where.name}%`
    }
  } 

  if(options.where['$address.state$']) {
    options.where[Sequelize.Op.or] = [
      {'$address.state$': options.where['$address.state$']},
      {"$category.modality$": 'Virtual'}
    ]
    delete options.where['$address.state$']
  }

  if (options.where.isNextWeekend) {
    options.where.start_date = {
      [Sequelize.Op.or]: [
        {[Sequelize.Op.eq]: moment().day(6).format("YYYY-MM-DD")},
        {[Sequelize.Op.eq]: moment().day(7).format("YYYY-MM-DD")}
      ]
    };[Op.iLike]
  }

  if (options.where.isToday) {
    options.where.start_date = {
      [Sequelize.Op.eq]: moment().format("YYYY-MM-DD")
    };
  }

  let exclude = [];
  Object.keys(Event.rawAttributes).forEach((attribute) => {
    if (Event.rawAttributes[attribute].references) {
      exclude.push(attribute);
    }
  });

  options.attributes = {
    exclude: [...exclude, 'isToday', 'isNextWeekend']
  }

  delete options.where.isToday;
  delete options.where.isNextWeekend;
})



// Event.beforeCreate(async function (event) {
//   const titleCapitalized =
//     event.name.charAt(0).toUpperCase() 
//     event.name.slice(1).toLowerCase();
//   event.name = titleCapitalized;


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
