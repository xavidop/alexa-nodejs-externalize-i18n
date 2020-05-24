const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
module.exports = {
    FallbackIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
        },
        handle(handlerInput) {
            const speakOutput = i18nUtils.getTranslation('FALLBACK_MSG', handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};