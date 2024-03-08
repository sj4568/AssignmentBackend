const dotenv = require("dotenv");
const { HashPassword, ComapirePassword } = require("../../Helpers/Helpers");
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../Models/Models");
const jwt = require('jsonwebtoken')
dotenv.config();
exports.Resister = async (req, res) => {
  
  const { email,username } = req.body;
  try {
    const data = {
      ...req.body,
      password: await HashPassword(req.body.password),
    };
    const exist = await UserModel.findOne({ email,username });
    if (exist) {
      res.send({
        status:"faild",
        massage: "Acount already exist",
      });
    } else {
      UserModel.create(data).then((user) => {
        const data = {
          username: user?.username,
          _id: user._id,
          name: user?.name,
          img: user?.img ? user?.img : null,
          email:user?.email
        }
         const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn:"30d"})
        res.status(200).send({
          status:"success",
          massage: "User resisterd Successfully",
         user:data,
          token
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({
        status:"failed",
        massage: "Something went wrong",
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
        const match = await ComapirePassword(password, user.password);
        const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn:"30d"})
      if (match) {
        res.send({
          status:"success",
          massage: "Login Successfull",
          user: {
            _id:user?._id,
            email: user.email,
            name: user.name,
            username: user.name,
            img:user.img?user.img:null
            },
          token
        });
      } else {
        res.send({
          status: "failed",
          massage: "Something Went wrong",
          
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id);
    const { name, email, username, password,newPassword } = req.body
    const user = await UserModel.findById(id)
    if (email && username && name) {
    
     
     const newUser = await UserModel.findByIdAndUpdate(id,req.body)
        
        
      
       res.send({
         status: "success",
         massage:"Profile Update Successfully",
         user: {
           username: newUser?.username,
           name: newUser?.name,
           email:newUser.email,
           img: newUser?.img ? user.img : null,
         },
       });
    
    }
    else {
      if (password) {
        const match =await ComapirePassword(password, user?.password)
        console.log(match);
        if (match)
        {
          const hashpass = HashPassword(newPassword)
          UserModel.findByIdAndUpdate(id, {
            ...user,
            password:hashpass
          })
            .then(user => {
              res.send({
                status: "success",
                massage:"Password Change Successfully"
            })
          })
        }
        else
        {
          res.send({
            status: "failed",
            massage: "Password is wrong",
          });
          }
      }
    }
  } catch (err) {
    console.log(err);
  }
  
}