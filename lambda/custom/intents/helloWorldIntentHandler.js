const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
    HelloWorldIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
        },
        handle(handlerInput) {
           
            const speakOutput =  i18nUtils.getTranslation('HELLO_MSG', handlerInput);
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    }
};