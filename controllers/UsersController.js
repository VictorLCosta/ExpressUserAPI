const { default: knex } = require('knex');
const validator = require('validator');
const User = require('../models/User')
const PasswordToken = require("../models/PasswordToken");

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

    async edit(req, res){
        var {id, email, role, email} = req.body;
        var result = await User.update(id, email, role, email);

        if(result != undefined){
            if(result.status){
                res.sendStatus(200);
            } else {
                res.sendStatus(406);
            }
        } 
    }

    async delete(req, res){
        var id = req.params.id;

        var result = User.delete(id);
        if(result.status){
            res.sendStatus(200).send("Usuário deletado");
        } else {
            res.sendStatus(406).send(result.err);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);

        if(result.status){
            res.sendStatus(200).send("" + result.token);
        } else {
            res.sendStatus(406).send(result.err);
        }
    }

}

module.exports = new UsersController;