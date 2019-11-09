"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./sandbox-admin.json");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sandbox69.firebaseio.com"
});
const dialogflow_1 = require("dialogflow");
exports.dialogflowGateway = functions.region('asia-east2').https.onRequest((request, response) => {
    cors(request, response, async () => {
        const { queryInput, sessionid } = request.body;
        const sessionClient = new dialogflow_1.SessionsClient({ credentials: serviceAccount });
        const session = sessionClient.sessionPath('sandbox69', sessionid);
        const responses = await sessionClient.detectIntent({ session, queryInput });
        const result = responses[0].queryResult;
        response.send(result);
    });
});
//# sourceMappingURL=index.js.map