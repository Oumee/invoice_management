const { UniqueConstraintError } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    var Invoiceitem = sequelize.define("invoiceitem", {
        id: {   
            type: DataTypes.BIGINT,   
            autoIncrement: true,   
             allowNull:false,  
            primaryKey: true   
          },
          quantite: {   
            type: DataTypes.INTEGER,   
            
          },
          price: {   
            type: DataTypes.DECIMAL(10,2),   
            
          },

    }
   
    );

  


    return Invoiceitem;
};
