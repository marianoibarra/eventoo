const { Sequelize } = require ('sequelize');
const { Event, Category, BankAccount, Address } =  require ('../models')// importar las relaciones de los modelos  de la bd.(corroborar que esten bien nombrados)


const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: Category, through: { attributes: [] } },
                { model: BankAccount, through: { attributes: [] } },
                { model: Address, through: { attributes: [] } }
            ],
            order: [
                [ 'name', 'ASC' ]
            ]
    })
    return res.json(events)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"}
            })
    }
};


module.exports = {
    getEvents,
}

// // - **`GET /event?state=state`**
    
// *Obtener todos los eventos de una provincia en especifico*
    
// - **`GET /event?category=category`**
    
//     *Obtener todos los eventos de una categoría en especifico*