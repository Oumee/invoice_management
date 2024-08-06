const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');
const invoiceitem = require('./invoiceitem.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, { 
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
 
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

                }
                        }
)


sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
  
db.client = require('./client.js')(sequelize, DataTypes)
db.user = require('./user.js')(sequelize, DataTypes)
db.Category = require('./category.js')(sequelize, DataTypes)
db.Item = require('./item.js')(sequelize, DataTypes)
db.Invoice = require('./invoice.js')(sequelize, DataTypes)
db.Invoiceitem = require('./invoiceitem.js')(sequelize, DataTypes)

 


db.sequelize.sync({ force: true })
.then(() => 
{
    console.log('yes re-sync done!')
})

sequelize.sync({ alter: true })
.then(() => {
    console.log('Tables synchronized');
})
.catch((error) => {
    console.error('Error synchronizing tables:', error);
});


// 1 to many relationship category and item

db.Category.hasMany(db.Item, {
    foreignKey: 'category_id',
    as: 'item'
});

db.Item.belongsTo(db.Category, {
    foreignKey: 'category_id',
    as: 'category'
});



// 2 to many relationship invoices and client

db.client.hasMany(db.Invoice, {
    foreignKey: 'client_id',
    as: 'invoice'
});

db.Invoice.belongsTo(db.client, {
    foreignKey: 'client_id',
    as: 'client'
});

// 2 many to many relationship item and invoices 

db.Item.belongsToMany(db.Invoice, {through: db.Invoiceitem});
db.Invoice.belongsToMany(db.Item, {through: db.Invoiceitem});


module.exports = db