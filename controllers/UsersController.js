const { default: knex } = require('knex');
const validator = require('validator');
const User = require('../models/User')

class UsersController{

    async index(req, res){
        try {
            var users = await User.findAll();
            res.sendStatus(200);
            res.json(users);
        } catch (err) {
            console.log(err);
        }
    }

    async findUser(req, res){
        try {
            var id = req.params.id;
            var user = User.findById(id);

            if(user == undefined){
                res.sendStatus(404);
                res.json({});
            } else {
                res.sendStatus(200);
                res.json(user);
            }

        } catch (err) {
            
        }
    }

    async create(req, res){
        var {name, email, password} = req.body;

        if(name == undefined || email == undefined || password == undefined){
            res.sendStatus(400);
            return;
        }

        if(!validator.isEmail(email)){
            res.sendStatus(422);
            return;
        }
        
        var emailExists = await User.findByEmail(email)

        if(emailExists){
            res.sendStatus(406);
            return;
        }

        await User.save({name, email, password})
        res.sendStatus(201);
    }

}

module.exports = new UsersController;