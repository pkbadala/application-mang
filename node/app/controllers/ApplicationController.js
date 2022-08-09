const Controller = require("./Controller");
const Products = require('../models/ApplicationSchema').Application;
const _ = require("lodash");
const Model = require("../models/Model");
// const { Application } = require("../models/ApplicationSchema");
const Applications = require("../models/ApplicationSchema").Application;
const ObjectId = require('mongodb').ObjectID;

class ApplicationController extends Controller{
    constructor(){
        super();
    }

    /*************************************************************************************
        save application
    **************************************************************************************/
    async saveApplication() {
        let _this = this;

        try {
            const App = await new Model(Applications).store(_this.req.body);

            if (_.isEmpty(App))
                return _this.res.send({ status: 0, message: 'Application not saved.' })

            _this.res.send({ status: 1, message: 'Congratulation, You have added application successfully.'});
        } catch (error) {
            console.log("error :: ",error)
            if (error.message.name == 'ValidationError') {
                return _this.res.send({ status: 0, message: "All field's are required." });
            } else {
                return _this.res.send({ status: 0, message: error });
            }
        }
    }

    /*************************************************************************************
     get all appliction
     **************************************************************************************/
    async getAllApplication(req, res){

        let _this = this;

        try {
            const applicationListing = await Applications.find();

            if (!applicationListing) { return _this.res.send({status : 0 , message:'No application available.'}); }
            return _this.res.send({status : 1 , message:'List of all application.', data: applicationListing});
        } catch (error) {
            console.log("error- ", error);
            _this.res.send({status : 0 , message:'An internal error has occurred, please try again.'});
        }
    }

    /*************************************************************************************
     delete appliction
     **************************************************************************************/
    async deleteApplication(req, res){

        let _this = this;

        console.log("_this id : ", _this.req.params.id);

        try {
            const application = await Applications.deleteOne({"_id": ObjectId(_this.req.params.id)});

            if (_.isEmpty(application)) {
                return _this.res.send({status: 0, message: "Application not exist."});
            } 
            return _this.res.send({status : 1 , message:'Application deleted successfully.'});
        } catch (error) {
            console.log("error- ", error);
            _this.res.send({status : 0 , message:'An internal error has occurred, please try again.'});
        }
    }

}

module.exports = ApplicationController;