const { user, writeUserJSON } = require('../dataBase/dataBase.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')


module.exports = {
    login: (req, res) => { res.render('users/login', {
        session: req.session.user
    }) },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let userLog = user.find(userL => userL.email === req.body.email)
            req.session.userLog = {
                id: userLog.id,
                email: userLog.email,
                nombre: userLog.nombre
            }
 
            if(req.body.recuerdame){
                res.cookie('logSpellbook', req.session.userLog, {expires: new Date(Date.now() + 900000), httpOnly: true})
            }
            res.locals.user = req.session.userLog;
            res.redirect('/user/register'); 
        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },

    signup: (req, res) => { res.render('users/signUp', {
        session: req.session
    }) },

    createUser: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let idUser = 1;
            user.forEach(element => {
                if (element.id > idUser) {
                    idUser = element.id
                }
            });

            let {
                name,
                email,
                password
            } = req.body;

            let newUser = {
                id: ++idUser,
                nombre: name,
                email: email,
                contrasenia: bcrypt.hashSync(password.trim(), 10),
            }

            user.push(newUser);

            writeUserJSON(user);

            res.redirect('/');
        } else {
            res.render('users/signUp', {
                errors: errors.mapped(),
                session: req.session
            })

        }
    },


    
    register: (req, res) => {
        let userL = user.find(userL => userL.id === req.session.userLog.id) 

        res.render('users/register',{
            session: req.session,
            userL
        }) 
    },
}