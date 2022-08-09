const Controller = require("./Controller");
const User = require('../models/UserSchema').User;
const _ = require("lodash");
const Model = require("../models/Model");
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;

class UserController extends Controller{
    constructor(){
        super();
    }


    /*************************************************************************************
     Admin login existing user
    **************************************************************************************/
    async login() {
        let _this = this;

        let defaultEmail = "test@gmail.com";
        let defaultPassword = "$2a$10$WnHVAW.NxE0VdOS1LJEjier3U.BSqQOnwgWF714jf4PmexDhm.bCe";   //Test@123

        try {
            if (_this.req.body.email == '' || _this.req.body.password == '')
                return _this.res.send({message: "All field's required.", status: 0});


            if (defaultEmail != _this.req.body.email) {
                return _this.res.send({status: 0, message: "User not exist."});
            } else {
                const checkPassword = await bcrypt.compare(_this.req.body.password, defaultPassword);

                if (checkPassword) {
                    const token = await this.getToken({ email: _this.req.body.email });

                    let filter = {email : _this.req.body.email};
                    let updateData = { "accessToken" : token};

                    const updatedUser = await new Model(User).update(filter, updateData, { new: true });

                    let adminUserData = {
                        email: _this.req.body.email,
                        accessToken: token
                    };
                    return _this.res.send({status: 1, message: "Login successfully", data: adminUserData});
                } else {
                    return _this.res.send({status: 0, message: "Incorrect email or password."})
                }
            }
        } catch (error) {
            console.log("error occurred in login : ", error);
           return  _this.res.send({status: 0, message: "Something went wrong."});
        }
    }


    /*************************************************************************************
      use for token
    **************************************************************************************/
    getToken(id) {
        let _this = this;

        return new Promise(async (resolve, reject) => {

            try {
                // Generate Token
                let token = jwt.sign({
                    id: id,
                    algorithm: "HS256",
                    exp: Math.floor(new Date().getTime() / 1000) + config.tokenExpiry
                }, config.securityToken);

                return resolve(token);

            } catch(err) {
                console.log("Get token", err);
                return reject({message: err, status: 0 });
            }

        });
    }

    getHashPassword(password) {
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    throw err
                } else {
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                            throw err
                        } else {
                            resolve(hash);
                        }
                    })
                }
            })
        });
    }

    checkEmailPattern(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return true;
        else
            return false;
    }
}

module.exports = UserController;