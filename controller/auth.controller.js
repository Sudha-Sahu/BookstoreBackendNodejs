const User = require('../model/user.model');
const jwt = require('jwt-simple');

// to enable using .env variable
require('dotenv').config();

// user login API
exports.login = async(req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email});
        if (!user){
            return res.send({status: 404, message: "There is no account for this email, try create new account"});
        }
        const validPass = await user.validPassword(password);
        if (!validPass){
            return res.send({status:401, message:"Wrong Password"});
        }
        const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
        return res.send({status:200, user, token, message:"Login Successfully" });
    }catch(err){
        next(err);
    }
}

exports.register = async (req, res, next) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email }).select(
        "+password"
      );
      if (existingUser) {
        return res.send({status:401, message:"Email already in use try different email ID"});
      }
      let user = new User();
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = await user.encryptPassword(req.body.password);
  
      user.save();
      const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
        return res.send({status:201, user, token, message:"Register successfully"});
    } catch (err) {
    next(err);
  }
};

// user forget password
exports.forgetPassword = async(req, res, next) => {
  try{
      const email = req.body.email;
      const new_password = req.body.new_password;
      const confirm_password = req.body.confirm_password;
      const user = await User.findOne({email});
      console.log(user.username, user._id , user.email);
      if (!user){
          return res.send({status: 404, message: "User does not exist"});
      }
      if (new_password != confirm_password){
        return res.send({status: 404, message: "Password does not match"}); 
      }
      
      user.password = await user.encryptPassword(new_password);

      user.save();
      return res.send({status:200, message:"Password Reset Successfully" });
  }catch(err){
      next(err);
  }
}