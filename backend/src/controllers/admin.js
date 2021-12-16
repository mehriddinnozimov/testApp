const User = require("../model/user")

exports.home = (req, res) => {
    return res.render("admin/index", {layout:"admin"})
}

exports.loginGet = (req, res) => {
    return res.render("admin/login", {layout:"admin"})
}

exports.loginPost = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user) throw "User not found!"
        const token = await user.generateToken()
        return res.json({ success:true, token })
    } catch (err) {
        return res.json({ success:false, err })
    }
}