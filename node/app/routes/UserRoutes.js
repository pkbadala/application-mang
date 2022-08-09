
module.exports = (app, express)=>{

    const router = express.Router(); 
    const UserController = require('../controllers/UserController');

    router.post('/login', (req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.login();
    });

    app.use(config.baseApiUrl, router);
}