const knex = require("knex");
const bcrypt = require("bcrypt");
const User = require("./User");

class PasswordToken{
    async create(email){
        try {
            var user = await User.findByEmail(email);
            var token = Date.now();

            if(result){
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("password_tokens");

                return {status: true}
            }
        } catch (error) {
            console.log(error);
            return {status: false, err: error}
        }
    }

    async validate(token){
        try {
            var result = await knex.select("*").where("token", token).from("password_tokens");

            if(result.length > 0){
                var tk = result[0];

                if(tk.used){
                    return {status: false};
                } else {
                    return {status: true, token: tk};
                }
            } else {
                return {status: false};
            }

        } catch (err) {
            console.log(err);
            return {status: false};
        }
    }

    
}

module.exports = new PasswordToken;