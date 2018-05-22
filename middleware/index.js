const {blog} = require('../models/blog');
module.exports = {
    isLoggedIn : function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash("error","You need to login first");
        res.redirect('/login');
    },
    checkBlogOwner: function(req,res,next){
        if(req.isAuthenticated()){
            blog.findById(req.params.id).then((m)=>{
                if(m.creator_id.equals(req.user._id)){
                    console.log("true");
                    next();
                }
                else{
                    req.flash("error","Not permitted");
                    res.redirect("/dashboard")
                }
            },(e)=>{
                console.log(e);
                req.flash("error","Not permitted");
                res.redirect("/dashboard");
            }).catch((e)=>{
                console.log(e);
                req.flash("error","Not permitted");
                res.redirect("/dashboard");
            })
        }
        }
}