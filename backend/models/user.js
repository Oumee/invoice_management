module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    })

    return user

}