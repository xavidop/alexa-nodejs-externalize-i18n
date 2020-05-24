const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
    HelpIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
        },
        handle(handlerInput) {
            
            const speakOutput = i18nUtils.getTranslation('HELP_MSG', handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};