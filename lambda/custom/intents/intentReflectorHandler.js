const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');


/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
module.exports = {
    IntentReflectorHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
        },
        handle(handlerInput) {
           
            const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
           
            const speakOutput = i18nUtils.getTranslation('REFLECTOR_MSG', handlerInput, {intentName: intentName});

            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    }
};