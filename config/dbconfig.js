require('dotenv').config();
const knex=require("knex")
const knexfile=require("../knexfile");

//set the environment, default to development
const env = process.env.NODE_ENV || 'development'; 
const configOptions = knexfile[env];
module.exports = knex(configOptions);