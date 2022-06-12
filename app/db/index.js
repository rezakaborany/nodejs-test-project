const { Client } = require('pg');
const {configDB}=require("./config");
const client = new Client(configDB);
client.connect().then((err)=>{
  if(err) 
  {
    console.log(err.message)
  } else
  {
  console.log('connected to DB')
  }
});
module.exports =
{
  client
}