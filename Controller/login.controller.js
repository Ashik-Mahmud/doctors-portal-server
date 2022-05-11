var jwt = require('jsonwebtoken');
const login = async(req, res) => {
    const data = req.body;    
    var token = jwt.sign(data, process.env.ACCESS_TOKEN, {
        expiresIn: '1d'
    });
    res.send({token})
}

module.exports = {login}