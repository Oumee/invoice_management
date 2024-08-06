const { UniqueConstraintError } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING(200), // Utilisez STRING au lieu de VARCHAR
      allowNull: false,
      unique: true // unique en minuscule
    },
    description: {
    
      type: DataTypes.TEXT,
      allowNull: true // Ajout de allowNull pour une consistance
    
    },
    image: 
    {
      type: DataTypes.STRING(400), // Utilisez STRING au lieu de VARCHAR
    }
    
  }
 
  );

 

  return Category;
};
