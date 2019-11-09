import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
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

import { SessionsClient } from 'dialogflow';

export const dialogflowGateway = functions.region('asia-east2').https.onRequest((request, response) => {
cors(request, response, async () => {
    const {queryInput, sessionid } = request.body;

    const sessionClient = new SessionsClient({ credentials: serviceAccount });
    const session = sessionClient.sessionPath('sandbox69', sessionid);

    const responses = await sessionClient.detectIntent({session, queryInput});
    const result = responses[0].queryResult;


    response.send(result);
  });
});
