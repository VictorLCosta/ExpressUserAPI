const knex = require('../database/context');
const bcrypt = require('bcrypt');

class User{

    async findAll(){
        try {
            var result = await knex.select("id", "name", "email", "role").from("users");
            return result;
            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    
    async findById(id){
        try {
            var result = await knex.select("id", "name", "email", "role").where("id", id).from("users");

            if(result.length > 0){
                return result[0];
            } else {
                return undefined;
            }

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try {
            var result = await knex.select("id", "name", "email", "password", "role").where("email", email).from("users"); 
            if(result.length > 0){
                return result[0];
            } else {
                return undefined;
            }

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findEmail(email){
        try {
            var result = await knex.select('*').from("users").where({email: email});

            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async save(email, password, name){
        try {
            var normalized_email = email.toUpperCase();

            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, normalized_email,password: hash, role: 0}).table("users");

        } catch (err){
            console.log(err);
        }
    }

    async update(id, email, name, role){
        try {
            var user = await this.findById(id);

            if(user != undefined){
                var newUser = {};

                if(email != undefined){
                    if(email != user.email){
                        var result = await this.findEmail(email);
                        if(result == false){
                            newUser.email = email;
                        } else {
                            return {status: false, err: "O e-mail já está cadastrado"};
                        }
                    }
                }

                if(name != undefined){
                    newUser.name = name;
                }

                if(role != undefined){
                    newUser.role = role;
                }

                await knex.update(newUser).where("id", id).table("users");
                return {status: true};

            } else {
                return {status: false, err: "O usuário não existe!"}
            }

        } catch (err) {
            console.log(err);
        }
    }

    async delete(id){
        try {
            var user = await this.findById(id);
            if(user != undefined){
                await knex("users").where("id", id).del();
                return {status: true};
            }
            else{
                return {status: false, err: "O usuário não existe."};
            }

        } catch (err) {
            console.log(err);
        }
    }

    async changePassword(id, newPassword, token){
        var hash = await bcrypt.hash(newPassword, 10);

        await knex("users").where("id", id).update({password: hash, used: 1});
    }
}

module.exports = new User;