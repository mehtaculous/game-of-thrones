/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "What is the name of Jon Snow's Direwolf?": [
            "Ghost",
            "Grey Wind",
            "Gargamel",
            "Graham"
        ]
    },
    {
        "How is The Queen Of Thorns more commonly known?": [
            "Olenna Tyrell",
            "Margaery Tyrell",
            "Cersei Lannister",
            "Catelyn Stark"
        ]
    },
    {
        "Whose skull was crushed like an egg by The Mountain's giant hands?": [
            "Oberyn Martell",
            "Beric Dondarrion",
            "Lady the direwolf",
            "Auric Goldfinger"
        ]
    },
    {
        "Who did Khal Drogo kill by pouring molten gold over his head?": [
            "Viseries Targaryen",
            "Rhaegar Targaryen",
            "Mago",
            "Mirri Maz Duur"
        ]
    },
    {
        "What is the official Lannister family motto?": [
            "Hear Me Roar",
            "A Lannister always pays his debts",
            "None So Fierce",
            "Never knowingly undersold"
        ]
    },
    {
        "Grey Worm is the leader of which group?": [
            "The Unsullied",
            "The Undertones",
            "The Unjust",
            "The Unthanks"
        ]
    },
    {
        "Who gave Sandor Clegane the scars on his face?": [
            "Gregor Clegane",
            "Ilyn Payne",
            "Joffrey Baratheon",
            "Robert Baratheon"
        ]
    },
    {
        "Which house’s motto is Fire and Blood?": [
            "Targaryen",
            "Martel",
            "Greyjoy",
            "Davro"
        ]
    },
    {
        "Who masterminded the plot to kill King Joffrey?": [
            "Petyr Baelish",
            "René Artois",
            "Olenna Tyrell",
            "Little Mix"
        ]
    },
    {
        "Who pushed young Bran Stark out of the window?": [
            "Jamie Lannister",
            "Cersei Lannister",
            "Theon Greyjoy",
            "Tyrion Lannister"
        ]
    },
    {
        "What is one of only two things that can kill a White Walker?": [
            "Dragonglass",
            "Dragon fire",
            "Sunlight",
            "Iron"
        ]
    },
    {
        "Where did Tyrion Lannister first meet Shae?": [
            "The Lannister camp",
            "King's Landing",
            "The Eyrie",
            "A brothel in the north"
        ]
    },
    {
        "Which language does Daenerys Targaryen NOT speak?": [
            "Old tongue",
            "Dothraki",
            "High Valyrian",
            "Common tongue"
        ]
    },
    {
        "How old was Theon Greyjoy when he was taken as a ward?": [
            "10 years old",
            "9 years old",
            "8 years old",
            "7 years old"
        ]
    },
    {
        "What does one horn blast mean for the Night's Watch?": [
            "Rangers returning",
            "Others spotted",
            "Rangers in trouble",
            "Wildlings spotted"
        ]
    },
    {
        "What do the wildlings call those living south of the Wall?": [
            "Kneelers",
            "Sheep",
            "Followers",
            "Dunces"
        ]
    },
    {
        "Where does the Red Wedding take place?": [
            "The Twins",
            "Riverrun",
            "The Red Keep",
            "The Eyrie"
        ]
    },
    {
        "Who has NOT competed in a trial by combat?": [
            "Jamie Lannister",
            "Oberyn Martell",
            "Bronn",
            "The Hound",
        ]
    },
    {
        "During which season were all the Stark children born?": [
            "Summer",
            "Winter",
            "Spring",
            "Autumn"
        ]
    },
    {
        "Who is the Master of Whisperers?": [
            "Varies",
            "Tywin Lannister",
            "Tyrion Lannister",
            "Petyr Baelish"
        ]
    },
    {
        "What is the name of Rickon's direwolf?": [
            "Shaggydog",
            "Summer",
            "Grey Wind",
            "Wolf"
        ]
    },
    {
        "Who has never been on the small council?": [
            "Olenna Tyrell",
            "Mace Tyrell",
            "Cersei Lannister",
            "Renly Baratheon"
        ]
    },
    {
        "At the end of his training, what must an Unsullied kill to prove he has no mercy or weakness?": [
            "A newborn slave child",
            "One of the young slave girls who helped raise them",
            "Another Unsullied in hand-to-hand combat",
            "A warrior of their master's choosing"
        ]
    },
    {
        "When Arya Stark plays the game of faces with Jaqen H'ghar, Jaqen hits Arya with a switch when he knows she is telling a lie. Arya talks about escaping King's Landing and says, I had to kill a stable boy. I stabbed him in the back. Jaquen then hits her. Why?": [
            "Arya stabbed the boy in the stomach, not the back",
            "Arya did not stab the boy, she sliced his throat with a knife",
            "Arya stabbed a young Lannister guard, not a stable boy",
            "Arya did not stab the boy, she hid until the boy walked away"
        ]
    },
    {
        "What distinct feature does Brienne of Tarth recall about the entity that killed Renly Baratheon?": [
            "It had Stannis Baratheon's face",
            "It had Tywin Lannister's face",
            "It had Melisandre's red eyes",
            "It had Renly Baratheon's geen eyes"
        ]
    },
    {
        "Before he was killed, Ser Rodrik Cassel said which haunting last words?": [
            "Gods help you, Theon Greyjoy. Now you are truly lost.",
            "Please. I'm afraid. I've always been afraid.",
            "Kill me, and be cursed. You are no king of mine.",
            "Unhand her. I shall have your head for this!"
        ]
    },
    {
        "Whose death does Arya Stark witness at the notoriously killer Red Wedding?": [
            "Grey Wind",
            "Robb Stark",
            "Edmure Tully",
            "The Blackfish"
        ]
    },
    {
        "You killed her children. Say her name! Prince Oberyn Martell is shouting at the Mountain to say whose name?": [
            "Ellia",
            "Ashara",
            "Obara",
            "Ellaria"
        ]
    },
    {
        "What was the name of the person who chopped off Jamie's right hand?": [
            "Locke",
            "Vargo Hoat",
            "Roose Bolton",
            "Qyburn"
        ]
    },
    {
        "What is the name of Arya Stark's sword?": [
            "Needle",
            "Spear",
            "Slash",
            "Thorn"
        ]
    },
    {
        "By what name do the Seven Kingdoms refer to the Free Folk who live north of the Wall?": [
            "Wildlings",
            "Savages",
            "Hostiles",
            "Barbarians"
        ]
    },
    {
        "Which of the following is NOT a position on King Joffrey's small council?": [
            "Master of Seas",
            "Master of Ships",
            "The Hand of the King",
            "Master of Whisperers",
        ]
    },
    {
        "Which position on the king's small council is his closest adviser and has the power to make decisions in the king's absence?": [
            "Hand of the King",
            "Queen Regent",
            "Master of the Realm",
            "Lord to the Throne"
        ]
    },
    {
        "Why was Ned Stark executed?": [
            "He challenged Joffrey's right to be king",
            "He refused to allow King Joffrey to marry his daughter Sansa",
            "He was responsible for the death of King Robert",
            "He plotted to kill Joffrey's mother, Cersei"
        ]
    },
    {
        "What noble house is Catelyn Stark from?": [
            "House Tully",
            "House Stark",
            "House Lannister",
            "House Tyrell"
        ]
    },
    {
        "Who is the true heir to the iron throne after Robert Baratheon's death?": [
            "Stannis Baratheon",
            "Joffrey Baratheon",
            "Eddard Stark",
            "Renly Baratheon"
        ]
    },
    {
        "What is the name of Robb Stark's wife?": [
            "Talisa",
            "Ros",
            "Shae",
            "Mary"
        ]
    },
    {
        "Which house has a sigil of a silver trout?": [
            "House Tully",
            "House Stark",
            "House Tyrell",
            "House Greyjoy"
        ]
    },
    {
        "Which House has a sigil of a dire wolf?": [
            "House Stark",
            "House Bolton",
            "House Frey",
            "House Tully"
        ]
    },
    {
        "Which House has a sigil of a golden rose?": [
            "House Tyrell",
            "House Lannister",
            "House Frey",
            "House Bolton"
        ]
    },
    {
        "Which House has a sigil of a golden kraken": [
            "House Greyjoy",
            "House Tyrell",
            "House Bolton",
            "House Lannister"
        ]
    },
    {
        "Who was the Hand of the King before Ned Stark?": [
            "Jon Arryn",
            "Tywin Lannister",
            "Tyrion Lannister",
            "Renly Baratheon"
        ]
    },
    {
        "How many men did Theon Greyjoy use to capture Winterfell?": [
            "20 men",
            "50 men",
            "100 men",
            "1,000 men"
        ]
    },
    {
        "Who does Tyrion tell Varys he is planning on marrying to Princess Myrcella?": [
            "Theon Greyjoy",
            "Bran Stark",
            "Robin Arryn",
            "Trystane Martell of Dorne"
        ]
    },
    {
        "Who attempts to kill Tyrion on the battlefield in the Battle of Blackwater Bay?": [
            "Ser Mandon Moore",
            "Ser Arthur Dayne",
            "Ser Boros Blount",
            "Ser Meryn Trant"
        ]
    },
    {
        "Which of the following types of wine does the wine merchant attempt to poison Daenerys with?": [
            "Arbor Red",
            "Dornish Red",
            "Vale White",
            "Stormland Red"
        ]
    },
    {
        "What were Tywin Lannister's last words before Tyrion killed him?": [
            "You're no son of mine.",
            "She was a whore.",
            "You're afraid of a dead whore?",
            "You shot me."
        ]
    },
    {
        "Who travels with Jamie Lannister after he escapes Robb Stark's prison?": [
            "Brienne of Tarth",
            "Tyrion Lannister",
            "Cersei Lannister",
            "Sandor Clegane"
        ]
    },
    {
        "Who has Petyr Baelish loved since he was a child?": [
            "Catelyn Stark",
            "Sansa Stark",
            "Lysa Arryn",
            "Cersei Lannister"
        ]
    },
    {
        "Who says, When you play the game of thrones, you win or you die?": [
            "Cersei Lannister",
            "Tyrion Lannister",
            "Varys",
            "Petyr Baelish"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.62243547-0e42-4255-92b6-211ba40262f5") {
            context.fail("Invalid Application ID");
         }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 10;
var CARD_TITLE = "The Seven Kingdoms";

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = {
            speech: "<speak><audio src='https://s3-eu-west-1.amazonaws.com/57647285525fb836561944563.samehta91/samehta91gmail.comtheme.mp3'/><break time = \"0.5s\"/>Welcome to The Seven Kingdoms. I will ask you " + GAME_LENGTH.toString() + " questions. Try to get as many correct as you can. Just say the number of the answer. Let's begin. </speak>",
            type: "SSML"
        },
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer. "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}