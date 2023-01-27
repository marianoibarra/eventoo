require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");


const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
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
  User_Event,
  User_Transaction,
  Transaction, 
  User, 
  Address, 
  Bank_Account, 
  Category, 
  Ticket,
  Review,
  Modality,
  EmailCode
} = sequelize.models;

// Relaciones

User.belongsToMany(Transaction, { through: User_Transaction });
Transaction.belongsToMany(User, { through: User_Transaction });

User.belongsToMany(Event, { through: User_Event });
Event.belongsToMany(User, { through: User_Event });         

User.belongsToMany(Event, { through: 'Favorites' });
Event.belongsToMany(User, { through: 'Favorites' });

User.hasOne(EmailCode)
EmailCode.belongsTo(User)

Address.hasMany(User)
User.belongsTo(Address)

Category.hasMany(Event)
Event.belongsTo(Category)

Modality.hasMany(Event)
Event.belongsTo(Modality)

Modality.hasMany(Category)
Category.belongsTo(Modality)

User.hasMany(Bank_Account)
Bank_Account.belongsTo(User)

Address.hasMany(Event, )
Event.belongsTo(Address)

Bank_Account.hasMany(Event)
Event.belongsTo(Bank_Account)

Event.hasMany(Ticket)
Ticket.belongsTo(Event)

Event.hasMany(Transaction)
Transaction.belongsTo(Event)

Event.hasMany(Review)
Review.belongsTo(Event)

Transaction.hasMany(Ticket)
Ticket.belongsTo(Transaction)


// Encripta la contraseña antes de crear y de actualizar el usuario
User.beforeCreate(async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async function (user) {
  if(user.password) {
    console.log(user)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Funcion que se va a usar en el logeo, para verificar que sea la contraseña
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// Event.beforeCreate(async function (event) {
//   const titleCapitalized =
//     event.name.charAt(0).toUpperCase() 
//     event.name.slice(1).toLowerCase();
//   event.name = titleCapitalized;


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};