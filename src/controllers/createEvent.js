const { Sequelize } = require ('sequelize');
const { Event, Category, BankAccount, Address } =  require ('../models')// importar las relaciones de los modelos  de la bd.(corroborar que esten bien nombrados)



const createEvent = async (req, res) => {

    const { 
        name,
        description,
        start_date,
        end_date,
        isPublic,
        isVirtual,
        virtualURL,
        //accountBank,//
        category,
        address,
        isPremium,
        isPaid,
        age_Range,
        guests_capacity,
        placeName, 
        created_at, 
        advertisingTime_start,  
        adversiting_end,
        cover_pic
    } = req.body; // consultar accontbank, category and address... 

    try {
        const { address_line, city, state, country, zip_code } = address;
        const addressDb = await Address.findOrCreate({
            where: { address_line, city, state, country, zip_code },
        });
        const address_id = addressDb.id;
        const categoryDb = await Category.findOne({where : {name: category}});
        const category_id = categoryDb.id;

        if (!name ||
            !description || 
            !start_date || 
            !end_date ||
            !isPublic || 
            !isVirtual || 
            !virtualURL || 
            !category ||
            !address || 
            !isPremium ||
            !isPaid || 
            !age_Range || 
            !guests_capacity || 
            !placeName || 
            !created_at || 
            !advertisingTime_start ||
            !adversiting_end ||
            !cover_pic )
            {
                return res.status(400).json({
                    error: {
                        message: 'name, description, start_date, end_date, isPublic, isVirtual, virtualURL, category, address, isPremium, isPaid, age_Range, guests_capacity, placeName, created_at, advertisingTime_start, adversiting_end, cover_pic cannot be empty',
                        values: { ...req.body }
                    } 
            })
        }
        const event = await Event.create({
            name,
            description,
            start_date,
            end_date,
            isPublic,
            isVirtual,
            virtualURL,
            //accountBank,//
            categoryId : category_id,
            addressId : address_id,
            isPremium,
            isPaid,
            age_Range,
            guests_capacity,
            placeName, 
            created_at, 
            advertisingTime_start,  
            adversiting_end,
            cover_pic
        }).catch(e => {
            return res.status(500).json({
                error: {
                    message: "Error while creating resource",
                    values: { ...req.body }
                }
            })
        })
        
        address.forEach(async a => {
            const address = await Address.findOne({ where: { address_line: a.address_line, city: a.city, state: a.state, country: a.country, zip_code: a.zip_code } })
            if (address) await address.addEvent(event)
        });
        category.forEach(async c => {
            const category = await Category.findOne({ where: { name:c.name } })
            if (category) await season.addEvent(event)
        });
        const newEvent = await Event.findByPk(event.event_id, {
            include: [
                { model: Category, through: { attributes: [] } },
                { model: Address, through: { attributes: [] } }
            ]
        })
        return res.status(201).json(newEvent)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"}
        })
    }
}

module.exports = {
    createEvent
}
