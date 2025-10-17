const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
    register: async(req, res) => {
        try {
           const {name, email, password} = req.body;
           const hashedPassword = await bcrypt.hash(password, 10); 
           const existingUser = await User.findOne({email});
           if(existingUser){
               return res.status(400).json({message: "Email already in use"});
            }
           const newUser = await new User({name, email, password: hashedPassword});
           await newUser.save();
           res.status(201).json({
               message: "User registered successfully",
               user: { id: newUser._id, name: newUser.name, email: newUser.email }
           });

        } catch (e) {
            res.status(500).json({message: "Registration failed", error: e.message});
        
        
        }
    },

    login: async(req, res) => {
        try {
            const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(401).json({message: "Invalid email or password"});
            }  
            const comparePassword = await bcrypt.compare(password, user.password);
       
            if(!comparePassword){
                return res.status(401).json({message: "Invalid email or password"});
            }

            const token = jwt.sign({ _id: user._id, name: user.name }, jwtsecret, { expiresIn: '1h' });
            res.status(200).json({message: "Login succesfully!!",
                token: token,
                user: { _id: user._id, name: user.name, email: user.email}
            })
        }
        catch(err){
            res.status(500).json({message: "Login failed", error: err.message});
        }
    }
}