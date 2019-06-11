const { 
    Sequelize,
    Model ,
    INTEGER,
    STRING ,
    TEXT
} = require('sequelize');
const {sequelize} = require('../lib/db')
class Resource extends Model {

}

Resource.init({
    id: {
        type: INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    resource_name:STRING(45),
    type:INTEGER(11),
    cate_id:INTEGER(11),
    duration:INTEGER(11),
    state:INTEGER(11),
    code:STRING(45),
    url:STRING,
    url1:STRING,
    arr_url:TEXT,
    cover_img:STRING(100),
    description:TEXT,
    attentions:TEXT,
    content:TEXT,
    

},{
    sequelize,
    timestamps:false,
    tableName:'omo_resource'
})

module.exports = {
    Resource
}