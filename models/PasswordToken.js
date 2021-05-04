const knex = require("knex");
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
}

module.exports = new PasswordToken;