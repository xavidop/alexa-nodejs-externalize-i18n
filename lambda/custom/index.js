/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

let { LaunchRequestHandler } = require('./intents/launchRequestHandler');
let { HelloWorldIntentHandler } = require('./intents/helloWorldIntentHandler');
let { HelpIntentHandler } = require('./intents/helpIntentHandler');
let { CancelAndStopIntentHandler } = require('./intents/cancelAndStopIntentHandler');
let { FallbackIntentHandler } = require('./intents/fallbackIntentHandler');
let { SessionEndedRequestHandler } = require('./intents/sessionEndedRequestHandler');
let { IntentReflectorHandler } = require('./intents/intentReflectorHandler');
let { ErrorHandler } = require('./errors/errorHandler');
let { LocalisationRequestInterceptor } = require('./interceptors/localisationRequestInterceptor');
let { SaveAttributesResponseInterceptor } = require('./interceptors/saveAttributesResponseInterceptor ');
let { getPersistenceAdapter, getLocalDynamoDBClient } = require('./utilities/util');


  var local = process.env.DYNAMODB_LOCAL
  let persistenceAdapter;
  if(local === 'true'){
    let options = { port: 8000 }
    let dynamoDBClient = getLocalDynamoDBClient(options); 
    persistenceAdapter = getPersistenceAdapter("exampleTable", true, dynamoDBClient);
  }else{
    persistenceAdapter = getPersistenceAdapter("exampleTable", true);
  }

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withPersistenceAdapter(persistenceAdapter)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)
    .addResponseInterceptors(
        SaveAttributesResponseInterceptor)
    .lambda();
