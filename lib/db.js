const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:console.log,
  
    timezone: '+08:00',
    define:{
        //create_time  update_time delete_time
        timestamps:true,
        // paranoid:true,
        createdAt:'created',
        updatedAt:'updated',
        underscored:true,
        freezeTableName:true
    }
})

sequelize.sync({
    force:false
})

module.exports = {
    sequelize
}
