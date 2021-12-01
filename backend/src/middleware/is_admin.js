module.exports = function (req, res, next) {
    req.isAdmin ? next() : res.json({success:false, err: "You are not Admin!"})
}