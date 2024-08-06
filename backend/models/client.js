module.exports = (sequelize, DataTypes) => {

    const client = sequelize.define("client", {
        name: {
            type: DataTypes.STRING
        },
        company_name: {
            type: DataTypes.STRING,
            
        },
        adress: {
            type: DataTypes.STRING(400),
        
        },
        zip: {
            type: DataTypes.STRING,
            
        },
        city: {
            type: DataTypes.STRING,

        },
        cin: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
        patent: {
            type: DataTypes.STRING,
            
        },
        payment_terms: {
            type: DataTypes.STRING,
            
        },
        image: {
            type: DataTypes.STRING,
            
        },
    
    })

    return client

}