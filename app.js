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

//functions
const chooseANS = (event, question) => {
  // console.log(event);

  if (
    event.currentTarget.innerText.toLowerCase() ===
    question.answer.toLowerCase()
  ) {
    console.log(
      event.target,
      event.currentTarget,
      "correct",
      question.answer.toLowerCase(),
      event.target.innerText.toLowerCase()
    );
    event.stopPropagation();
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
    console.log(
      event.target,
      event.currentTarget,
      "incorrent",
      state.which,
      question.answer.toLowerCase(),
      event.target.innerText.toLowerCase()
    );
    state.which = !state.which;
    setBoard(questions);
  }
};

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
  $("button").on("click", (event) => {
    event.preventDefault();
    chooseANS(event, randomQuestion);
  });
};

const url =
  "https://cdn.contentful.com/spaces/hyjhad0lmcb0/environments/master/entries?access_token=tHJ5ExqGDtNjZRPeFs5Aa2lZ6S6a3qSpiDuW-6_Ouk8&content_type=triviaQ";

$.ajax(url).then((data) => {
  questions = data.items.map((q) => q.fields);

  setBoard(questions);
});
