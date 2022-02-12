const Sequelize = require("sequelize");
const connection = new Sequelize("trainn", "root", "", {
  dialect: "mysql"
});
const Reference = connection.define("reference", {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
},
  title: Sequelize.STRING,
  date: { type: Sequelize.DATE, 
  defaultValue: Sequelize.NOW },
  author:Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
});
connection.sync() 
module.exports = connection.model("reference", Reference);
