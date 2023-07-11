
const questions = [
  {
      question: 'Commonly used data types DO NOT include:',
      answers: ["strings", "booleans", "alerts", "numbers"],
      correctAnswer: "alerts"
  },
  {
      question: 'The condition in an if/else statement is enclosed with _____.',
      answers: ["quotes", "curly brakets", "parenthesis", "square brackets"],
      correctAnswer: "curly brakets"
  },
  {
      question: 'Arrays in JavaScript can be used to store _____.',
      answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      correctAnswer: "all of the above"
  },
  {
      question: 'String values must be enclosed within _____ when being assinged to variables',
      answers: ["commas", "curly brackets", "quotes", "parenthesis"],
      correctAnswer: "quotes"
  },
  {
      question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      answers: ["JavaScript", "Terminal/bash", "for loops", "console.log"],
      correctAnswer: "console.log"
  }
];

let score = 0;
let timer;
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-btn");
const timerContainer = document.getElementById("timer-container");
const showScoresButton = document.getElementById("show-scores-btn");



function displayQuestion(questionObj) {
  const questionElement = document.createElement("h2");
  questionElement.textContent = questionObj.question;
  quizContainer.appendChild(questionElement);

  const answerList = document.createElement("ul");
  questionObj.answers.forEach((answer) => {
      const answerItem = document.createElement("li");

      const answerButton = document.createElement("button");
      answerButton.textContent = answer;
      answerButton.addEventListener("click", function () {
          checkAnswer(answer, questionObj.correctAnswer);
          answerButton.disabled = true;
          
          setTimeout(() => {
              quizContainer.innerHTML = "";
              if (questions.length > 0) {
                  displayQuestion(questions.shift());
              } else {
                  showScore();
              }
          }, 500);
      });

      answerItem.appendChild(answerButton);
      answerList.appendChild(answerItem);
  });
  quizContainer.appendChild(answerList);
}


function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
      console.log("Correct!");
      score++;
  } else {
      console.log("Incorrect!");
  }
}


function showScore() {
  clearInterval(timer);
  const scoreElement = document.createElement("h2");
  scoreElement.textContent = `Quiz ended. Your score: ${score}`;
  quizContainer.appendChild(scoreElement);

  const initials = prompt("Please enter your initials:");
  if (initials) {
      saveScoreToLocalStorage(initials, score);
  }
}


function startQuiz() {
  startButton.disabled = true; // Disable the start button
  timerContainer.style.display = "block"; // Show the timer container
  displayQuestion(questions.shift());

  // Set the duration of the quiz in seconds
  const quizDuration = 60; // 1 minute

  // Start the timer
  let timeLeft = quizDuration;
  timer = setInterval(() => {
      if (timeLeft <= 0) {
          clearInterval(timer);
          quizContainer.innerHTML = ""; // Clear the quiz container
          showScore();
      } else {
          timerContainer.textContent = `Time remaining: ${timeLeft} seconds`;
          timeLeft--;
      }
  }, 1000);
}

function saveScoreToLocalStorage(initials, score) {

  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ initials, score });
  scores.sort((a, b) => b.score - a.score);

  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function showPastScores() {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  if (scores.length > 0) {
      const scoresContainer = document.createElement("div");
      scoresContainer.classList.add("scores-container");

      const scoresTitle = document.createElement("h2");
      scoresTitle.textContent = "Past Scores";
      scoresContainer.appendChild(scoresTitle);

      const scoresList = document.createElement("ul");
      scores.forEach((scoreObj) => {
          const scoreItem = document.createElement("li");
          scoreItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
          scoresList.appendChild(scoreItem);
      });

      scoresContainer.appendChild(scoresList);
      quizContainer.appendChild(scoresContainer);
  } else {
      alert("No past scores found.");
  }
}


showScoresButton.addEventListener("click", showPastScores);

startButton.addEventListener("click", startQuiz);