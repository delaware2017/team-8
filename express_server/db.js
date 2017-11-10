const Promise = require('bluebird');

Promise.promisifyAll(require("mongoose"));

    exports.accessCodesCreateId = (req, res) => {
        return Admin.findById(req.params.id)
        .then((admin) => {
            return Code.find({})
            .then(codes => {
                // Generate unique codes
                for (var i = 0; i < codes.length; i++) {
                    if (code === codes[i].code) {
                        code = Math.floor(Math.random() * 9000) + 1000;
                    }
                }
                code = Math.floor(Math.random * 9000) + 1000;
                var newCode = new Code({
                    code: code,
                    admin: req.params.id,
                    plan: req.body.plan
                });
                return newCode.save()
                .then((err) => {
                    if (err) throw error;
                    user.accessCodes.push(newCode._id);
                    user.save();
                    console.log(user);
                    res.send(newCode.code);
                }).catch(error => {
                    res.status(500);
                    console.error("Something went wrong: " + error);
                    return;
                })
            }).catch(error => {
                res.status(500);
                console.error("Something went wrong generating the code: " + error);
                return;
            })
        }).catch((error) => {
            res.status(500);
            console.error("Something went wrong.")
            return;
        })
    }