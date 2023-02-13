const { Category, User, Address, RoleAdmin, Event } = require("../db");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
        {
          model: RoleAdmin,
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeBan = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    await user.update({
      isBanned: !user.isBanned,
    });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  const { id } = req.params;
  const { name, modality, image } = req.body;
  try {
    const category = await Category.findByPk(id);
    await category.update({
      name,
      modality,
      image,
    });
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeRole = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      include: [{ model: RoleAdmin }],
    });
    user.roleAdmin.name =
      user.roleAdmin.name === "ADMIN"
        ? (user.roleAdmin.name = "USER")
        : (user.roleAdmin.name = "ADMIN");
    await user.roleAdmin.update({ name: user.roleAdmin.name });
    res.send(user.roleAdmin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeStatusEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = Event.findByPk(id);
    await event.update({
      isActive: !event.isActive,
    });
    res.json(event.isActive);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const queryParams = req.query;

    const searchParams = {
      name: null,
      description: null,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
      isPremium: null,
      isPaid: null,
      age_range: null,
      guests_capacity: null,
      placeName: null,
      advertisingTime_start: null,
      adversiting_end: null,
      cover_pic: null,
      disability_access: null,
      parking: null,
      smoking_zone: null,
      pet_friendly: null,
      isToday: null,
      isNextWeekend: null,
      isPublic: null,
      isActive: null,
      "$organizer.id$": queryParams.organizer ? queryParams.organizer : null,
      "$category.name$": queryParams.category ? queryParams.category : null,
      "$category.modality$": queryParams.modality ? queryParams.modality : null,
      "$address.address_line$": queryParams.address_line
        ? queryParams.address_line
        : null,
      "$address.city$": queryParams.city ? queryParams.city : null,
      "$address.state$": queryParams.state ? queryParams.state : null,
      "$address.country$": queryParams.country ? queryParams.country : null,
      "$address.zip_code$": queryParams.zip_code ? queryParams.zip_code : null,
    };

    for (let prop in searchParams) {
      if (queryParams.hasOwnProperty(prop)) {
        searchParams[prop] = queryParams[prop];
      }
      if (searchParams[prop] === null) {
        delete searchParams[prop];
      }
    }

    let { limit, page } = req.query;
    limit = Number(limit);
    page = Number(page);
    const offset = (page - 1) * limit;

    const events = await Event.findAll({
      where: searchParams,
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
      limit: limit && !Number.isNaN(Number(limit)) ? Number(limit) : null,
      offset: offset && !Number.isNaN(Number(offset)) ? Number(offset) : null,
    });

    res.json(events);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getUsers,
  changeBan,
  getCategories,
  changeRole,
  changeStatusEvent,
  getEvents,
};
