const { zipFunctions } = require("@netlify/zip-it-and-ship-it");

zipFunctions("functions", "functions-dist")

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vue-hq.firebaseio.com"
});


exports.handler = function (event, context, callback) {
    const firestore = admin.firestore();

    firestore.collection('users').where('email', '==', 'test@designcode.io').limit(1).get().then(response => {
        if (response.empty) { return Promise.reject() }

        const userInfo = response.docs[0].data()

        console.log(userInfo)

        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(userInfo)
        })
    }).catch(error => {
        console.log(error)

        callback(null, {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
            },
            body: error
        })
    })
}
