//This function will initiate when the user clicks the start button, and should render the first question.
function start() {
    $(".counts").show();
    $(".start-btn").click(function (event) {
      $(".start-btn").hide()
      renderQuestion(STORE.questionNumber)
      displayInfo();
    });
  }
   //Provides user with feedback about their choice when they have chosen the correct answer. Will display a "next" button which they can use to render the next question.
  function correctAns() {
    let responseHtml = `<div class = "response"><h3>You chose the correct answer, "${STORE.questions[STORE.questionNumber].answer}"</h3><button type="button" class="button" id="nextButton">Next</button></div>`
    $(".ans-eval").html(responseHtml)
    STORE.score += 1;
    displayInfo();
  
  }
  
  //Provides user with feedback about their choice when they have not chosen the correct answer. Will display a "next" button which they can use to render the next question.
  function incorrectAns() {
    let responseHtml = `<div class = "response"><h3>You chose an incorrect answer. The correct answer is, "${STORE.questions[STORE.questionNumber].answer}"<div><button type="button" class="button" id="nextButton">Next</button></div></div>`
    $(".ans-eval").html(responseHtml)
    displayInfo();
  }
  //This function will take the user to the next question after they have received feedback about their answer choice.
  function next() {
    $(".ans-eval").on("click", "#nextButton", function(event){
      console.log("next has ran")
      $(".ans-eval").hide();
      $(".question").show();
      STORE.questionNumber += 1;
      if (STORE.questionNumber < STORE.questions.length) {
        renderQuestion(STORE.questionNumber);
      }
      else {
        displayResults();
      }
    });
  }
  
  //This function should add appropriate html to present the questions to the user via a form with answer choices. It will need to reference data from, "STORE" and choose the correct question by using the index value of the objects in the array.
  function renderQuestion(questionNum) {
    let question = STORE.questions[questionNum]
    let questionHtml = `<form class="question-form"><legend class="quizQuestion">${question.question}</legend>`
    for (let i = 0; i < question.choices.length; i++) {
      questionHtml += `<label id="choices-text"><input type ="radio" name="question" id="selection" required value="${question.choices[i]}"</input>${question.choices[i]}</label>`
    }
    questionHtml += `<input class="button" type="submit"/></form>`;
    $(".question").html(questionHtml)
}
  
  //When the user submits their answer, this function should handle the outcome. It will tell the user to select an answer if the submit button is clicked and no option was chosen.
  function submitChoice() {
    $(".question").on("submit", ".question-form", function (event) {
      event.preventDefault();
      $(".question").hide();
      $(".ans-eval").show();
      let userAnswer = $('input[name="question"]:checked').val();
      let correctChoice = STORE.questions[STORE.questionNumber].answer;
      if (!userAnswer) {
        alert("Please select a choice.");
        return;
      }
  
      if (userAnswer === correctChoice) {
        correctAns();
  
      } else {
        incorrectAns();
      }
    });
  }
  
  
  
  //This function will show the current question the user is on, as well as the number of questions they have answered correctly.
  function displayInfo() {
    const counts =
      `<ul><li class="questionCounter">Question Number: ${STORE.questionNumber + 1}/${STORE.questions.length}</li></ul>
    <ul><li class="userScore">Score: ${STORE.score}/${STORE.questions.length}</li></ul>`;
    $(".counts").html(counts)
  }

  //This function will show the final page of the quiz, after all questions have been answered. The score count and question count final. The user will see a "restart quiz" button.
  function displayResults() {
    $(".results-box").show();
    const results =
      `<p>Congratulations, you have completed the quiz!</p><button class="button" id="restart">Restart Quiz</button>`;
    $(".results-box").html(results);
    $(".question").hide();
  
  
  }
  //This function will reset the question number and score count, then take the user to beginning of the quiz. 
  function restart(){
  $(".results-box").on("click", "#restart", function(event){
    STORE.questionNumber = 0;
    STORE.score = 0;
    renderQuestion(STORE.questionNumber);
    $(".results-box").hide();
    $(".question").show();
  
  });
  }
  
  //A function to run the others above, then we call this particular function.
  function handleApp() {
    start();
    submitChoice();
    next();
    restart();
  }
  
  $(handleApp)