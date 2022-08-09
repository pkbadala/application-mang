const Common = require("../common/common");

module.exports = (app, express)=>{

    const router = express.Router(); 
    const ApplicationController = require('../controllers/ApplicationController');
    

    router.post('/saveApplication', (req, res, next) => {
        const applicationObj = (new ApplicationController()).boot(req, res);
        return applicationObj.saveApplication();
    });

    router.get('/getAllApplication', Common.isAuthorised(), (req, res, next) => {
        const applicationObj = (new ApplicationController()).boot(req, res);
        return applicationObj.getAllApplication();
    });

    router.get('/deleteApplication/:id', Common.isAuthorised(), (req, res, next) => {
        const applicationObj = (new ApplicationController()).boot(req, res);
        return applicationObj.deleteApplication();
    });

    app.use(config.baseApiUrl, router);
}