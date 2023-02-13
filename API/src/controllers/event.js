const { Event, Address, Category, User, BankAccount } = require("../db");
const { Op } = require("sequelize");

//MODIFIQUE con el privateeventpassword
const createEvent = async (req, res) => {
  const userId = req.userId;
  const {
    name,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    isPublic,
    privateEvent_password,
    virtualURL,
    category,
    isPremium,
    isPaid,
    age_range,
    guests_capacity,
    placeName,
    advertisingTime_start,
    adversiting_end,
    cover_pic,
    address_line,
    city,
    state,
    country,
    zip_code,
    disability_access,
    parking,
    smoking_zone,
    pet_friendly,
    bankAccount,
  } = req.body;
  let privateEvent_passwordValue = null;

  if(!isPublic) {
    if(!privateEvent_password) {
      return res.status(400).json({
        errors: [
          {
            message: "private event must have a password"
          
          }
        ]
        
      });
    } else {
      privateEvent_passwordValue = privateEvent_password;
    }
  };

  try {
    // if (!name ||
    //     !description ||
    //     !start_date ||
    //     !end_date ||
    //     !start_time ||
    //     !end_time ||
    //     !isPublic ||
    //     !privateEvent_password||
    //     !virtualURL ||
    //     !isPremium ||
    //     !isPaid ||
    //     !age_Range ||
    //     !guests_capacity ||
    //     !placeName ||
    //     !created_at ||
    //     !advertisingTime_start ||
    //     !adversiting_end ||
    //     !cover_pic ||
    //     !address_line ||
    //     !state ||
    //     !city ||
    //     !country ||
    //     !zip_code
    //     !disability_access ||
    //     !parking ||
    //     !smoking_zone ||
    //     !pet_friendly
    //     )
    //     {
    //         return res.status(400).json({
    //             error: {
    //                 message: 'name, description, start_date, end_date, isPublic, modality, virtualURL, modalityName, category, address, isPremium, isPaid, age_Range, guests_capacity, placeName, created_at, advertisingTime_start, adversiting_end, cover_pic cannot be empty',
    //                 values: { ...req.body }
    //             }
    //     })
    // }
    const event = await Event.create(
      {
        name,
        description,
        start_date,
        end_date,
        start_time,
        end_time,
        isPublic,
        privateEvent_password: privateEvent_passwordValue,
        virtualURL,
        isPremium,
        isPaid,
        age_range,
        guests_capacity,
        placeName,
        advertisingTime_start,
        adversiting_end,
        cover_pic,
        disability_access,
        parking,
        smoking_zone,
        pet_friendly,
        address: {
          address_line,
          city,
          state,
          country,
          zip_code,
        },
      },
      { include: ["address"] }
    ); 

    if (bankAccount) {
      const bankAccountFromDB = await BankAccount.findByPk(bankAccount);
      await event.setBankAccount(bankAccountFromDB);
    }

    if (category) {
      const categoryFromDB = await Category.findOne({
        where: { name: category },
      });
      await event.setCategory(categoryFromDB);
    }

    const organizer = await User.findByPk(userId);

    await event.setOrganizer(organizer);

    await event.reload({
      include: [
        "bankAccount",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
        {
          model: User,
          as: "organizer",
          attributes: ["id", "name", "last_name", "profile_pic"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name", "modality"],
        },
      ],
    });

    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const checkPrivatePassword = async (req, res) => {

};


// CONSULTAR PORQUE AQUI DEBERIA TRAER TODOS LOS EVENTOS DE ESE USUARIO INDISTINTAMENTE SI ES PUBLICO O PRIVADO
const getEventByUser = async ({ userId }, res) => { 
  try {
    const events = await Event.findAll({
      where: {
        organizerId: userId,
      },
      include: [
        "bankAccount",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
        {
          model: User,
          as: "organizer",
          attributes: ["id", "name", "last_name", "profile_pic"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name", "modality"],
        },
      ],
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const modifyEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    isPublic,
    virtualURL,
    isPremium,
    isPaid,
    category,
    age_range,
    guests_capacity,
    placeName,
    cover_pic,
    address_line,
    city,
    state,
    country,
    zip_code,
    disability_access,
    parking,
    smoking_zone,
    pet_friendly,
    bankAccount,
  } = req.body;
  const userId = req.userId;
  try {
    const event = await Event.findOne({
      where: { id },
      include: "organizer",
    });

    if (event.organizer.id === userId) {
      if (bankAccount) {
        const bankAccountFromDB = await BankAccount.findByPk(bankAccount);
        await event.setBankAccount(bankAccountFromDB);
      }

      if (category) {
        const categoryFromDB = await Category.findOne({
          where: { name: category },
        });
        await event.setCategory(categoryFromDB);
      }

      if (address_line && city && state && country && zip_code) {
        const newAddress = await Address.create({
          address_line,
          city,
          state,
          country,
          zip_code,
        });
        await event.setAddress(newAddress);
      }

      await event.update({
        name,
        description,
        start_date,
        end_date,
        start_time,
        end_time,
        isPublic,
        category,
        virtualURL,
        isPremium,
        isPaid,
        age_range,
        guests_capacity,
        placeName,
        cover_pic,
        disability_access,
        parking,
        smoking_zone,
        pet_friendly,
      });

      await event.reload({
        include: [
          "bankAccount",
          {
            model: Address,
            as: "address",
            attributes: { exclude: ["id"] },
          },
          {
            model: User,
            as: "organizer",
            attributes: ["id", "name", "last_name", "profile_pic"],
          },
          {
            model: Category,
            as: "category",
            attributes: ["name", "modality"],
          },
        ],
      });

      res.send({ msg: "Data updated successfully", data: event });
    } else {
      res.status(500).send("Sorry! You can not modify this event");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const event = await Event.findOne({
      where: { id },
      include: "organizer",
    });
    if (event.organizer.id === userId) {
      await event.destroy(); //convertir en borradorLogico
      const idDeleted = await Event.findByPk(id);
      idDeleted
        ? res.send("Sorry! The event could not be deleted. Please, try again.")
        : res.send("Event removed successfully");
    } else {
      res.status(500).send("Sorry! You can not delete this event")
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  checkPrivatePassword,
  getEventByUser,
  modifyEvent,
  deleteEvent,
};
