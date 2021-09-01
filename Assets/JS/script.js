var startGameEl = $("#btn-start");
var timerEl = $("#quiz-timer");
var currentTime = 0;
var quizArea = $("#question-area");
var questionEl = $("#question-text");
var answerAEl = $("#a");
var answerBEl = $("#b");
var answerCEl = $("#c");
var answerDEl = $("#d");
var answersEl = $(".answer");
var scoreEl = $("#score-counter");
var gameOverEl = $("#game-over");
var initialsEl = $("#initials");
var enterScoreEl = $("#enter-score");
var questionNumber = 0;
var correctAnswer;
var guessedAnswer;
var correctAnswers=0;
var highScoresList = [];
var highScore ={
    initials: " ",
    score: 0
}
// var highScoresList = [];
var myQuestions=[
    {
        question: "What is Javascript?",
        answers:
        {
            a: "a programming language.",
            b: "a planet",
            c: "a new car",
            d: "a screenplay about a cup of coffee trying to find it's way home"
        },
        correctAnswer: "a"
    },
    {
        question: "How are arrays stored in local storage?",
        answers:
        {
            a: "at night, elves put each item in it's place",
            b: "very carefully",
            c: "are you going to read all of these?",
            d: "as strings using the JSON.stringify method"
        },
        correctAnswer: "d"
    },
    {
        question: "What API provides styles to make creating a website easier?",
        answers:
        {
            a: "API? I thought you were offering me a pie",
            b: "I don't know, Google it yourself!",
            c: "Bootstrap",
            d: "But, seriously, don't you have anything better to do than read all these fake answers?"
        },
        correctAnswer: "c"
    },
    {
        question: "What are functions and properties on objects called?",
        answers:
        {
            a: "Objectives",
            b: "Lorem Ipsum",
            c: "Maybe you could go outside for a walk, read a book, or just daydream for a bit",
            d: "methods"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the Jquery equivalent of the line: testEl.addEventListener('click', function())?",
        answers:
        {
            a: "testEl.addEventListener('click', function()) but with a french accent",
            b: "testEl.on('click',function())",
            c: "testEl.onClick(function())",
            d: "testEl.on('Dasher', 'Dancer', 'Prancer', 'Vixen', 'Comet', 'Cupid', 'Donner', 'Blitzen')"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the airspeed of an unladen swallow",
        answers:
        {
            a: "African or European?",
            b: "This quiz has really gone off the rails",
            c: "24 mph",
            d: "Where's the holy hand grenade when you need it?"
        },
        correctAnswer: "a"
    },
    {
        question: "Why is Javascript?",
        answers:
        {
            a: "Is that typo?",
            b: "No.",
            c: "What kind of a question is that?",
            d: "42"
        },
        correctAnswer: "c"
    },
    {
        question: "What did you think of this quiz?",
        answers:
        {
            a: "It could be better.",
            b: "The existential enui of everyday life was bearing down on my soul, crushing me with the full weight of the universe.  But, now, after seeing this amazing quiz, I see the beauty in the little things and understand the meaning of life",
            c: "eh...",
            d: "It's obviously B"
        },
        correctAnswer: "b"
    }
];
// display a random question and answers
function displayQuestion(qNo){
    questionEl.html(myQuestions[qNo].question);
    answerAEl.html(myQuestions[qNo].answers.a);
    answerBEl.html(myQuestions[qNo].answers.b);
    answerCEl.html(myQuestions[qNo].answers.c);
    answerDEl.html(myQuestions[qNo].answers.d);
    correctAnswer=myQuestions[qNo].correctAnswer;
}
// Tracks the time left in the game.
function timerCountdown(){
    console.log("timer");
    currentTime=30;
    timerEl.html(currentTime);
    displayQuestion(questionNumber);
    quizArea.removeClass("d-none");
    timer = setInterval(function(){
        console.log(currentTime);
        currentTime--;
        timerEl.html(currentTime);
        if (currentTime<=0){
            clearInterval(timer);
            scoreEl.html(correctAnswers);
            gameOverEl.modal("show");
        }
    },1000)
}

// Starts the game
function startGame(event){
    timerCountdown();
    startGameEl.hide();
};

// Progesses the game if correct answer is chosen
function guessedCorrectly(){
    correctAnswers++;
    scoreEl.html(correctAnswers);
    console.log(questionNumber);
    console.log(myQuestions.length);
    if(questionNumber===myQuestions.length-1){
        clearInterval(timer);
        gameOverEl.modal("show");
        return;
    }
    answersEl.removeClass("btn-danger");
    questionNumber++;
    displayQuestion(questionNumber);  
    
}

// Processes incorrect answers
function guessedIncorrectly(event){
    var answerEl=$(event.target);
    console.log(event.target);
    answerEl.addClass("btn-danger")
    // event.target.attr("class","btn-danger");
    currentTime=currentTime-5;
}

// Compares guessed answer to correct answer
function responseChosen(event){
    guessedAnswer = event.target.id
    if (guessedAnswer===myQuestions[questionNumber].correctAnswer){
        guessedCorrectly();
    }   else {
        guessedIncorrectly(event);
    }
}
// Processes the players initials and score and adds to the high score list.

function endGame(){
    highScore.initials=initialsEl.val().toUpperCase();
    highScore.score=correctAnswers;
    highScoresList.push(highScore);
    localStorage.setItem("HighScores",JSON.stringify(highScoresList));
    window.open("./highscore.html","_self");

}

gameOverEl.on("show.bs.modal", function(event){
    var modal=$(this);
    if(questionNumber===myQuestions.length-1){
        modal.find(".modal-title").text("You win!");
    }
    modal.find("#score-counter").text(correctAnswers);
})
startGameEl.on("click", startGame);
answersEl.on("click", responseChosen);
enterScoreEl.on("click", endGame);
// Initialize the page
function init(){
   var storedhighScoresList = JSON.parse(localStorage.getItem("HighScores"));
   console.log(storedhighScoresList);
   if (storedhighScoresList !== null){
       highScoresList=storedhighScoresList;
   }
};

init();