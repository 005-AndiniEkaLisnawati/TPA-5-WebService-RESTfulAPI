const User = require('../models/user.model');

module.exports = {
    register: (req, res) => {
        try {
           const {name, email, password} = req.body;
           const newUser = new User({name, email, password});
           newUser.save();
           res.status(201).json({
               message: "User registered successfully",
               user: newUser
           });

        } catch (e) {
            res.status(500).json({message: "Registration failed", error: e.message});
        
        
        }
    },

    login: async(req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email, password});
            if(!user){
                return res.status(401).json({message: "Invalid email or password"});
            }  
            res.status(200).json({message: "Login succesfully!!"})
        }
        catch(err){
            res.status(500).json({message: "Login failed", error: err.message});
        }
    }
}