//On page open, start button in body to be replaced by quiz, start button prompts timer to begin

//global variables
var timeEl = document.querySelector(".time");
var start = document.getElementById("startBtn");
var startDiv = document.getElementById("startDiv");
var quizDiv = document.getElementById("quizDiv");
var correct = document.getElementById("correct");
var endScore = document.getElementById("endScore");
var highScore = document.getElementById("highScores");
var highScoreLink = document.getElementById("scoreLink");
var highList = document.getElementById("highList");
var btn1 = document.getElementById("C1");
var btn2 = document.getElementById("C2");
var btn3 = document.getElementById("C3");
var btn4 = document.getElementById("C4");
var choiceBtn = document.querySelectorAll(".choiceBtn");
var choiceButton = document.querySelectorAll(".choiceBtn");
var timerInterval;
var submit = document.querySelector(".submitBtn");
var clear = document.querySelector(".clearBtn");
var scores = [];

//question objects
var Q1 = {
  qNumber: "Question 1",
  question: "Which is the best attribute to increase over all?",
  C1: "Command",
  C2: "Defense",
  C3: "Beauty",
  C4: "Besiege",
  answer: "C2",
}
var Q2 = {
  qNumber: "Question 2",
  question: "Which blue team member has the best beard?",
  C1: "Blues",
  C2: "Haut",
  C3: "Olsen",
  C4: "Dank",
  answer: "C2",
}
var Q3 = {
  qNumber: "Question 3",
  question: "Which best describes InHisNamE?",
  C1: "Grumpy",
  C2: "Chicken",
  C3: "Dodo",
  C4: "Handsome",
  answer: "C4",
}
var Q4 = {
  qNumber: "Question 4",
  question: "How many times do we have to repeat not to promote a hero until it is leveled?",
  C1: "Never again.",
  C2: "Do what now?",
  C3: "At least 100 more.",
  C4: "What is promoting a hero?",
  answer: "C3",
}
var Q5 = {
  qNumber: "Question 5",
  question: "How many times a day can Olsen send all 4 heros to one rebel?",
  C1: "She would never!",
  C2: "Wait you don't have to send 4?",
  C3: "Haut told her to!",
  C4: "At least 3!",
  answer: "C4",
}
var Q6 = {
  qNumber: "Question 6",
  question: "Where the heck is Twist?",
  C1: "I dunno, but I hope he comes back!",
  C2: "Is that a drink?",
  C3: "No... that's an old dance move!",
  C4: "Really? How old are you?!",
  answer: "C1",
}

//global var dependant on above objects must be below to function
var questionsArray = [Q1, Q2, Q3, Q4, Q5, Q6];
var secondsLeft = questionsArray.length * 15;
var questionIndex = 0;

//function for timer
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds remaining";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
      endQuiz();
    }

  }, 1000);
}

function sendMessage() {
  timeEl.textContent = "Time's Up!";
}

function hideCorrect() {
  correct.textContent = " ";
}

//on click start button, start time and quiz
function startQuiz() {
  startDiv.className = "invisible"
  startDiv.style = "display:none";
  quizDiv.classList.remove("invisible");
  quizDiv.className = "visible";
  setTime();
  quizDisplay();
}

//function to display each question in quiz
function quizDisplay() {
  document.getElementById("Q").innerHTML = questionsArray[questionIndex].qNumber + ": " + questionsArray[questionIndex].question;
  document.getElementById("C1").innerHTML = questionsArray[questionIndex].C1;
  document.getElementById("C2").innerHTML = questionsArray[questionIndex].C2;
  document.getElementById("C3").innerHTML = questionsArray[questionIndex].C3;
  document.getElementById("C4").innerHTML = questionsArray[questionIndex].C4;
}

//find which button is selected, post if correct, continue questions or end
for (var i = 0; i < choiceBtn.length; i++) {
  choiceBtn[i].addEventListener("click", choices);
}

function choices() {
  var btnId = this.getAttribute("id");
  isCorrect(btnId);
  questionIndex++;
  if (questionIndex <= questionsArray.length - 1) {
    quizDisplay();
  }
  else {
    endQuiz();
    timeEl.className = "invisible";
  }
}

//function for if selected button is correct or incorrect answer
function isCorrect(btnId) {

  if (btnId == questionsArray[questionIndex].answer) {
    correct.textContent = "CORRECT!";

  }
  else {
    correct.textContent = "Incorrect...";

    if (secondsLeft > 15) {
      secondsLeft = secondsLeft - 15;
    }
    else {
      endQuiz();
    }

  }

  //clear correct/incorrect message after one second
  setTimeout(hideCorrect, 1000);

}



//Close quiz div and see final score (time is up or all questions answered)
function endQuiz() {
  quizDiv.classList.remove("visible");
  quizDiv.className = "invisible";
  quizDiv.style = "display:none";
  endScore.classList.remove("invisible");
  endScore.classList.className = "visible";
  document.getElementById("finalScore").textContent = secondsLeft;

}

//push score and name to local storage
function logHighScore() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    scores = storedScores;
  }
  scores.push(secondsLeft + " - " + document.querySelector(".nameEntered").value);
  localStorage.setItem("scores", JSON.stringify(scores));

}

//Get scores out of local storage & add to ul
function renderScores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    scores = storedScores;
  }
  for (var i = 0; i < scores.length; i++) {
    scores.sort();
    scores.reverse();
    var score = scores[i];
    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    highList.appendChild(li);
  }

}

//View high score list
function highScores() {
  //on submit, log high score to local storage
  logHighScore();

  //clear area and make high score list visible
  endScore.classList.remove("visible");
  endScore.className = "invisible";
  endScore.style = "display:none";
  highScore.classList.remove("invisible");
  highScore.classList.className = "visible";

  renderScores();
}

function highScoresLink() {
  timeEl.className = "invisible";
  startDiv.className = "invisible"
  startDiv.style = "display:none";
  quizDiv.classList.remove("visible");
  quizDiv.className = "invisible";
  quizDiv.style = "display:none";
  endScore.classList.remove("visible");
  endScore.className = "invisible";
  endScore.style = "display:none";
  highScore.classList.remove("invisible");
  highScore.classList.className = "visible";
  renderScores();
}

//Click submit to log and display high scores or high scores link
submit.addEventListener("click", highScores);
highScoreLink.addEventListener("click", highScoresLink);

//Clear scores button
function clearS() {
  localStorage.clear();
  highList.innerHTML = "";
}

clear.addEventListener("click", clearS);


//Start button for quiz
start.addEventListener("click", startQuiz);

