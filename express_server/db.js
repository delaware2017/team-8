const Promise = require('bluebird');

Promise.promisifyAll(require("mongoose"));
const Admin = require('./models/admin');
const User = require('./models/user');
const Code = require('./models/code');


    exports.accessCodesCreateId = (req, res) => {
        console.log("Got to start of accessCodes: " + req.params.id);
        return Admin.findById(req.params.id)
        .then((admin, error) => {
            console.log("admin: " + admin);
            return Code.find({})
            .then((codes, error) => {
                var newCode = new Code({
                    code: Math.floor(Math.random() * 9000) + 1000,
                    admin: req.params.id,
                    plan: req.body.plan
                });
                return newCode.save()
                .then((model) => {
                    console.log("Okay here 1: " + model);
                    admin.accessCodes.push(newCode._id);
                    console.log("Okay here 2");
                    admin.save();
                    console.log("Sending new CODE: " + newCode.code);
                    res.send(newCode.code);
                }).catch(error => {
                    res.status(500);
                    console.error("Something went wrong sending the code: " + error);
                    return;
                })
            }).catch(error => {
                res.status(500);
                console.error("Something went wrong generating the code: " + error);
                return;
            })
        }).catch((error) => {
            res.status(500);
            console.log("Something went wrong getting admin creds: " + error);
            return;
        })
    }
    

    // Check that access code is valid.
    // If value, response with true.
    // Otherwise, respond with false.
    exports.accessCodes = (req, res) => {
        return Code.findOne({code: req.body.code})
        .then(code => {
            if (!code) throw error;
            else if (code.user) {
                res.send(false);
            } else {
                res.send(true);
            }
        }).catch(err => {
            console.error("Code not found: " + err);
            res.status(500);
            return;
        })
    }


    exports.adminSignup = (req, res) => {
        var admin = new Admin({
            "username": req.body.username,
            "password": req.body.password,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName
        });
        return admin.save()
        .then(admin => {
            console.log("Admin saved.");
            res.status(200);
        }).catch(error => {
            console.error("Something went wrong:  " + error);
            res.status(500);
        })
    }

    exports.adminLogin = (req, res) => {
        console.log("got to admin login: " + req.body.username);
        return Admin.findOne({username: req.body.username})
            .then((admin, err) => {
                if (req.body.password === admin.password) {
                    return User.find({"_id": admin.listOfUsers})
                        .then((docs, err) => {
                            if (err) throw err;
                            res.send(docs);
                        }).catch((err) => {
                            res.status(500);
                            console.error("Something went wrong: " + err);
                            return;
                        })
                } else {
                    res.status(500);
                    console.log("Bad username/password combo.");
                    return;
                }
            })
    }

