/****************************
 Configuration
 ****************************/
module.exports = {
    db: 'mongodb://127.0.0.1:27017/test',
    mongoDBOptions : {
        reconnectTries:  Number.MAX_VALUE,
        reconnectInterval:  1000,
        keepAlive:  1,
        connectTimeoutMS:  30000,
        useMongoClient:  true,
        native_parser: true ,
        poolSize: 5,
        //user: 'Text',
        //pass: 'Text123'
    },
    sessionSecret: 'Text123',
    securityToken: 'Text123',
    baseApiUrl: '/api',
    serverPort: '5000',
    tokenExpiry: 361440, 
    rootUrl:'http://localhost:5000/api',
    apiUrl: 'http://localhost:5000',
    s3upload: false
};
