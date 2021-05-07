const { default: knex } = require('knex');
const validator = require('validator');
const User = require('../models/User')
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "_cWxl`]T@cvn43!$xvIDuDU[J.G,L~";

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

    async changePassword(req, res){
        var {token, password} = req.body;

        var isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){
            await User.changePassword(isTokenValid.token.user_id, password, isTokenValid.token.token);
            res.sendStatus(200).send("Senha alterada");

        } else {
            res.sendStatus(406).send("Token inválido");
        }
    }

    async login(req, res){
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){
            var result = await bcrypt.compare(password, user.password);

            if(result){

                const token = jwt.sign({
                    email: user.email, 
                    name: user.name,
                    role: user.role
                }, secret, {
                    algorithm: "HS256",
                });

                res.sendStatus(200).json({token: token});

            } else {
                res.sendStatus(406).send("Senha incorreta!");
            }

        } else {
            res.sendStatus(404).send("Email não encontrado");
        }
    }
}

module.exports = new UsersController;