window.onload = function () {
  show(0);
};

function submitForm(event) {
  let name = document.forms['form']['name'].value;
  event.preventDefault();
  sessionStorage.setItem('name', name);
  location.href = 'quiz.html';
}

let questions = [
  {
    id: 1,
    question: 'What is your name?',
    answer: 'bis',
    options: ['bis', 'hari', 'ram', 'shyam'],
  },

  {
    id: 2,
    question: 'Question number 2?',
    answer: 'bis',
    options: ['bis', 'hari', 'ram', 'shyam'],
  },

  {
    id: 3,
    question: 'Question number 3?',
    answer: 'bis',
    options: ['bis', 'hari', 'ram', 'shyam'],
  },
];
let points = 0;
let question_count = 0;
function nextQuestion() {
  let userAnswer = document.querySelector('li.option.active').innerHTML;
  if (userAnswer == questions[question_count].answer) {
    points += 10;
    sessionStorage.setItem('points', points);
  }

  if (question_count == questions.length - 1) {
    sessionStorage.setItem('time', `${minutes} minutes and ${seconds} seconds`);
    clearInterval(myTime);
    location.href = 'end.html';
    return;
  }
  question_count++;
  show(question_count);
}

function show(count) {
  let quizBody = document.getElementById('quizquestion');
  quizBody.innerHTML = `<h2> Q${question_count + 1}.  ${
    questions[count].question
  }</h2><ul class="option-group">
  <li class="option">${questions[count].options[0]}</li>
  <li class="option">${questions[count].options[1]}</li>
  <li class="option">${questions[count].options[2]}</li>
  <li class="option">${questions[count].options[3]}</li>
 
</ul>`;
  toggleActive();
}

function toggleActive() {
  const options = document.querySelectorAll('li.option');

  for (let i = 0; i < options.length; i++) {
    options[i].onclick = function () {
      for (let j = 0; j < options.length; j++) {
        if (options[j].classList.contains('active')) {
          options[j].classList.remove('active');
        }
      }
      options[i].classList.add('active');
    };
  }
}

// timer
let nd = new Date(new Date().setTime(0));
let time = nd.getTime();
let seconds = Math.floor((time % (100 * 60)) / 1000);
let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
let timer = 0;
let myTime = setInterval(function () {
  let timetaken = document.querySelector('.time');
  if (seconds < 59) {
    seconds++;
  } else {
    minutes++;
    seconds = 0;
  }
  let newSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let newMinutes = minutes < 10 ? `0${minutes}` : minutes;
  timetaken.innerHTML = `${newMinutes}:${newSeconds}`;
}, 1000);

let pointsScored = sessionStorage.getItem('points');
let name = sessionStorage.getItem('name');
let timeTook = sessionStorage.getItem('time');

let username = document.querySelector('.user_name');
let point = document.querySelector('.point');
let timetook = document.querySelector('.timetook');

username.innerHTML = `${name}`;
point.innerHTML = `${pointsScored}`;
timetook.innerHTML = `${timeTook}`;
