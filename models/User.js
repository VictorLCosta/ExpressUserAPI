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

    async save(email, password, name){
        try {
            var normalized_email = email.toUpperCase();

            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, normalized_email,password: hash, role: 0}).table("users");

        } catch (err){
            console.log(err);
        }
    }

    async findByEmail(email){
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
}

module.exports = new User;