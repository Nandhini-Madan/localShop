const bcryptjs = require("bcryptjs");
const router=require("express").Router();
const db=require("../models/all_model")
const {isValid,makeJwt,handleError}=require('../utils/div');

router.get("/",(req,res)=>{
    res.status(200).json({message:"welcome message"})

})
router.post("/register",(req,res)=>{
    const credentials=req.body;
    console.log("Register",req.body)
    if(isValid(credentials)){
        console.log(credentials)
        const rounds=8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;   
        db.add(credentials)
          .then(user => {
            console.log("return data",user)
            res.status(201).json({ data: user, message: "Welcome customer",user });
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Credentials must be unique", error });
          });
      } else {
        res.status(400).json({
          message: "please provide username and password",
        });
      }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("req.body",req.body,email)
    if (isValid(req.body)) {
     console.log("valid")
      db.getByEmail(email )    
        .then((user) => {
          console.log("Inside login",user)
          if (user && bcryptjs.compareSync(password, user.password)) {
            const token = makeJwt(user);
            res.status(200).json({ message: 'logged in', token, role: user.roleName });
          }
          else{
            res.status(401).json({message:"Error email"})
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error loggin in', error: err.message });
        });
    } else {
      res.status(404).json({ error: 'please provide email and password' });
    }
  });

router.get("/logout", async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          next(err)
        } else {
          res.status(204).end()
        }
      })
    } catch (err) {
      next(err)
    }
  })
   
  module.exports=router;