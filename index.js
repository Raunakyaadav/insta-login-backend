const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());
const cors = require('cors');
server.use(cors({ origin: "*" }));
const path = require('path');
// server.use(express.static(path.join(__dirname, '../frontend')));


const userSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        }
    }
)

const userModel = mongoose.model("user",userSchema);

server.post("/user/login",async (req,res)=>{
try {
    
    console.log(req.body) ;
    return;
 
    const user = await userModel.create(
        {
            username : req.body.username,
            password : req.body.password
        }
    )
   await user.save();
   res.send({
    msg : "user create success"
   })

} catch (error) {
    console.log(error)
}
})



mongoose.connect("mongodb+srv://infoitsraunak_db_user:1NkLOuEBPyi3GfOS@cluster0.9to7a5p.mongodb.net/",).then(
    () => {
        console.log("database connected")
        server.listen("5000", () => {
            console.log("server start")
        })
    }
).catch(
    () => {
        console.log("database not connect")
    }
)

