const bcrypt = require("bcrypt")
const{ validationData }= require("./baseController");
const { client } = require("../../db");
const jwt = require("jsonwebtoken");

    exports.register = async function(req, res) {
        try{
            if (!(await validationData(req,res))) return;
            const { name , age , mobile , password } = req.body
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const result = await client.query('INSERT INTO users (name ,age ,mobile ,password ) VALUES ($1, $2, $3, $4) RETURNING *', [name , age , mobile , hash]);
            return res.json({
              mobile : result.rows[0].mobile,
              id : result.rows[0].id
            })
          }
          catch(err){
            res.json(err.message)
          }
    }

    exports.login = async function(req, res) {
      try{
          if (!(await validationData(req,res))) return;
          const { mobile , password } = req.body;
          const user = await client.query('SELECT id,password FROM users WHERE mobile=$1', [mobile]);
            if(!user.rowCount){
              return res.json("User not found")
            }
            const compare = await bcrypt.compareSync(password , user.rows[0].password);
            if(!compare)
            {
              return res.json("User not found");
            }
          const accessToken = jwt.sign
          (
            { id: user.rows[0].id }, 
            config.jwt.secret_key,
            {
           expiresIn: "60d",
            }
           );
          return res.json({
            accessToken
          })
        }
        catch(err){
          res.json(err.message)
        }
  }

  exports.user = async function(req, res) {
    try{
      const { userId } = req.params;
      if(req.user.id.toString() !== userId){
        return res.json("Invalid");
      }
      const user = await client.query('SELECT id,name,age,mobile FROM users WHERE id=$1', [userId]);
      return res.json(user.rows[0])
      }
      catch(err){
        res.json(err.message)
      }
}
 
exports.update = async function(req, res) {
  try {
    if (!(await validationData(req,res))) return;
    const { name , age , mobile , password } = req.body
    const { id } = req.user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await client.query('UPDATE users SET name=($1), age=($2), mobile=($3), password=($4) WHERE id=($5)', [name,age,mobile,hash,id]);
      if(!user.rowCount){
        return res.json("User not found")
      }
      return res.json({
        name,
        age,
        mobile
      })
    }
    catch(err){
      res.json(err.message)
    }
}

exports.remove = async function(req, res) {
  try {
    const { userId } = req.params
    const user = await client.query(`DELETE FROM users users WHERE id=$1`,[userId]);
      if(!user.rowCount){
        return res.json("User not found")
      }
      return res.json("User removed from database")
    }
    catch(err){
      res.json(err.message)
    }
}