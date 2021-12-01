const jwt = require("jsonwebtoken")
const User = require("../model/user")

module.exports = async function(req, res, next){
    try {
        let token = req.header("Authorization").replace("Bearer ", "");
        let decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        let user = await User.findOne({_id: decoded._id, "tokens.token": token});
        if(!user) throw "User not found!"
        req.user = user;
        req.token = token;
        req.isAdmin = user.isAdmin;
        req.logout = async (isDeleted = false) => {
            if(!isDeleted) {
                req.user.tokens = req.user.tokens.filter((tok) => req.token != tok.token);
                await req.user.save()
            }
            delete req.user
            delete req.token
            delete req.isAdmin
            delete req.logout

        }
        next()
    } catch (err) {
        res.json({ success: false, err })
    }
}