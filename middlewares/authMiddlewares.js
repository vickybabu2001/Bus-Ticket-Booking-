const JWT= require ("jsonwebtoken");
 const requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Auth Failed",
                success: false,
            });
            
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.body.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Auth Failed",
            success: false,
        });
        
    }
}
module.exports=requireSignin;