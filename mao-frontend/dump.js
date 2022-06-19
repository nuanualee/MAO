// const AWS = require("aws-sdk");
// // set region
// AWS.config({
//   region: "ap-southeast-1",
// });
// // define dynamo client as constant
// const dynamodb = new AWS.DynamoDB.DocumentClient();
// const userTable = "mao-users";

// const notePath = "/note";
// const notesPath = "/notes";

// exports.handler = async function (event) {
//   console.log("Request event:", event);

//   let response;
//   // based on response, build onto API Gateway

//   switch (true) {
//     // getting all notes
//     case event.httpMethod === "GET" && event.path === notesPath:
//       response = await getNotes();
//       break;
//     // creating a new note
//     case event.httpMethod === "POST" && event.path === notePath:
//       response = await saveNote(JSON.parse(event.body));
//       break;
//     // deleting note
//     case event.httpMethod === "DELETE" && event.path === notePath:
//       response = await deleteNote(JSON.parse(event.body).notes);
//       break;
//   }
// };

// function buildResponse(statusCode, body) {
//   return {
//     statusCode: statusCode,
//     headers: {
//       // allow clients to call api since it has different endpoints
//       // "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   };
// }

// async function getNotes() {
//   const params = {
//     TableName: userTable,
//   };
//   const allProducts = await scanDynamoRecords(params, []);
//   const body = {
//     products: allProducts,
//   };
//   return buildResponse(200, body);
// }

// // async function getNote() {
// //     const params = {
// //       TableName: userTable
// //     }
// //     const allProducts = await scanDynamoRecords(params, []);
// //     const body = {
// //       products: allProducts
// //     }
// //     return buildResponse(200, body);
// // }

// async function scanDynamoRecords(scanParams, itemArray) {
//   try {
//     const dynamoData = await dynamodb.scan(scanParams).promise();
//     itemArray = itemArray.concat(dynamoData.Items);
//     if (dynamoData.LastEvaluatedKey) {
//       scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
//       return await scanDynamoRecords(scanParams, itemArray);
//     }
//     return itemArray;
//   } catch (error) {
//     console.error("Error ", error);
//   }
// }

// async function saveNote(requestBody) {

//   let noteTopic = JSON.parse(requestBody)

//   const params = {
//     TableName: userTable,
//     Item: requestBody,
//   };
//   return await dynamodb
//     .put(params)
//     .promise()
//     .then(
//       () => {
//         const body = {
//           Operation: "SAVE",
//           Message: "SUCCESS",
//           Item: requestBody,
//         };
//         return buildResponse(200, body);
//       },
//       (error) => {
//         console.error("Error", error);
//       }
//     );
// }

// async function deleteNote(noteKey) {
//   const params = {
//     TableName: userTable,
//     Key: {
//       notes: noteKey,
//     },
//     ReturnValues: "ALL_OLD",
//   };
//   return await dynamodb
//     .delete(params)
//     .promise()
//     .then(
//       (response) => {
//         const body = {
//           Operation: "DELETE",
//           Message: "SUCCESS",
//           Item: response,
//         };
//         return buildResponse(200, body);
//       },
//       (error) => {
//         console.error("Error ", error);
//       }
//     );
// }




// //

// <Table responsive>
// <thead>
//   <tr>
//     <th>Details</th>
//     <th>Stats</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td>Words</td>
//     <td>{wordCounter}</td>
//   </tr>
//   <tr>
//     <td>Characters</td>
//     <td>{characterCounter}</td>
//   </tr>
//   <tr>
//     <td>Sentences</td>
//     <td>{sentenceCounter}</td>
//   </tr>
//   <tr>
//     <td>Reading Level</td>
//     <td>{daleChall}</td>
//   </tr>
// </tbody>
// </Table>