module.exports = (sequelize, DataTypes) => {

    const invoice = sequelize.define("invoice", {
        id: {   
            type: DataTypes.BIGINT,   
            autoIncrement: true,   
             allowNull:false,  
            primaryKey: true   
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue_date: {
            type: DataTypes.DATE,
            
        },
        deadline: {
            type: DataTypes.DATE,
        
        },
        total_ht: {
            type: DataTypes.DECIMAL(10,2),

        },
        tva: {
            type: DataTypes.DECIMAL(10,2),

        },
        total_ttc: {
            type: DataTypes.DECIMAL(10,2),
           
        },
        status: {
            type: DataTypes.INTEGER,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clients', // Assurez-vous que le nom de la table est correct
                key: 'id',
            },
            onDelete: 'CASCADE', // Ajoutez cette ligne pour ON DELETE CASCADE
            onUpdate: 'CASCADE', // Ajoutez cette ligne pour ON UPDATE CASCADE
        },
        
    
    })

    return invoice

}