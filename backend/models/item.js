const { UniqueConstraintError } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define("item", {

        item_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        item_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost_price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        sale_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        
        },
        quantite: {
            type: DataTypes.INTEGER,
            defaultValue: 0.00,

        },
        image: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories', // Assurez-vous que le nom de la table est correct
                key: 'id',
            },
            onDelete: 'CASCADE', // Ajoutez cette ligne pour ON DELETE CASCADE
            onUpdate: 'CASCADE', // Ajoutez cette ligne pour ON UPDATE CASCADE
        },
       
    }
   
    );

  


    return Item;
};
