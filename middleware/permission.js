const permession = (req,res,next) => {
    !(req.user.block) ? res.send("You are blocked for a while ") : next()
}
module.exports = permession