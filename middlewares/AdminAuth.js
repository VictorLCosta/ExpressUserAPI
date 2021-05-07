const jwt = require("jsonwebtoken");
const secret= "_cWxl`]T@cvn43!$xvIDuDU[J.G,L~"

module.exports = function(req, res, next) {
    const authToken = req.headers["authorization"];

    if(authToken != undefined){
        const bearer = authToken.split();
        var token = bearer[1];

        try {
            var decoded = jwt.verify(token, secret);
            
            if(decoded.role == 1){
                next();
            } else {
                res.status(401).send("Você não está autenticado");
                return;
            }

        } catch (error) {
            res.status(401).send("Você não está autenticado");
            return;
        }
    }
}