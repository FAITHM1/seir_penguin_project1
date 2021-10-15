const state = {
  player1: 0,
  player2: 0,
  currentQuestion: {},
  which: true,
};

let questions = [];
/////dom elements
const $question = $("#question");
const $a = $("#a");
const $b = $("#b");
const $c = $("#c");
const $d = $("#d");
const $correct = $("#correctAns");
const $p1score = $("#player1 h4");
const $p2score = $("#player2 h4");
const $window = window;

///test
if (state.which === true) {
  state.which = $("#player2");
} else if (state.which === false) {
  $("#player2").css("border-bottom", "1px solid red");
  state.which === !state.which;
}

//functions
// name input and adds it to the body
const playersName = () => {
  const $player1Input = $("#player1-input").val();
  $("#player1 h3").text($player1Input);
  ///player two
  const $player2Input = $("#player2-input").val();
  $("#player2 h3").text($player2Input);
};

const chooseANS = (event, question) => {
  // console.log(event);
  if (
    event.currentTarget.innerText.toLowerCase() ===
    question.answer.toLowerCase()
  ) {
    if (state.which) {
      event.stopPropagation();
      state.player1++;
      state.which = !state.which;
      setBoard(questions);
    } else {
      event.stopPropagation();
      state.player2++;
      state.which = !state.which;
      setBoard(questions);
    }
  } else {
    state.which = !state.which;
    setBoard(questions);
  }

  if (state.player1 === 1) {
    $(".wincon").css("display", "block");
    $("#player1 h3").clone().appendTo(".winner p");
  } else if (state.player2 === 10) {
    $(".wincon").css("display", "block");
    $("#player2 h3").clone().appendTo(".winner p");
  }
  $("#reset").on("click", (event) => {
    state.player1 = 0;
    state.player2 = 0;
    $(".wincon").css("display", "none");
    $("#player1 h3").text("");
    $("#player2 h3").text("");
    $("#player2-input").val("");
    $("#player1-input").val("");
    $(".input-container").show();
    setBoard(questions);
  });
};

// reset function
const reset = () => {
  state.player1 = 0;
  state.player2 = 0;
  $("#player1 h3").text("");
  $("#player2 h3").text("");
  $(".input-container").show();
  $("#player2-input").val("");
  $("#player1-input").val("");
  setBoard(questions);
};
//win
$("input[type=submit]").on("click", (event) => {
  event.preventDefault();
  playersName();
  $(".input-container").hide("fast");

  $(".reset").on("click", (event) => {
    // event.preventDefault();
    reset();
  });
});

$("input[value=defalut]").on("click", () => {
  $("#player1 h3").text("Player 1");
  $("#player2 h3").text("Player 2");
});

const setBoard = (q) => {
  //getting a random question
  const randomIndex = Math.floor(Math.random() * q.length);
  const randomQuestion = q[randomIndex];
  //updates quest
  $question.text(randomQuestion.question);
  $a.text(randomQuestion.a);
  $b.text(randomQuestion.b);
  $c.text(randomQuestion.c);
  $d.text(randomQuestion.d);
  $correct.text(randomQuestion.answer);
  //update score
  $p1score.text(state.player1);
  $p2score.text(state.player2);

  $("button").off();
  $("#answer button").on("click", (event) => {
    event.preventDefault();
    chooseANS(event, randomQuestion);
    // if(event.currentTarget.innerText===)
  });
  // if (state.player1 === 10 && state.player2 < ) {

  // } else if (state.player2 === 10 && state.player1 < 10) {
  //   $(".player2").append($("<p>").text(state.player2));
  // }
};

const url =
  "https://cdn.contentful.com/spaces/hyjhad0lmcb0/environments/master/entries?access_token=tHJ5ExqGDtNjZRPeFs5Aa2lZ6S6a3qSpiDuW-6_Ouk8&content_type=triviaQ";

$.ajax(url).then((data) => {
  questions = data.items.map((q) => q.fields);

  setBoard(questions);
  $(window).on("keypress", (target, key) => {
    if (target.key === "k" || target.key === "K") {
      $("#correctAns").css("display", "block");
    }
  });
});
