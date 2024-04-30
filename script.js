const question = document.getElementById("game-ques");
const choices = Array.from(document.getElementsByClassName("game-ans-choice"));
const ques_display = document.getElementById('user-question');
const progress_display = document.getElementById('current-progress');
const score_display = document.getElementById('user-score');

// core
const MAX_QUESTIONS = 10;
const POINTS_PER_QUES = 10;
let score = 0;

// custom
const listQuestions = [
    {
        question: "Are you ok?",
        choices: [
            {
                text: "I'm fine, thank u. And u?",
                isAnswer: true,
            },
            {
                text: "Nevermind!",
                isAnswer: false,
            },
            {
                text: "Nice question!",
                isAnswer: false,
            },
            {
                text: "You are very handsome!",
                isAnswer: false,
            },
        ],
    },
    {
        question: "Are you still fine?",
        choices: [
            {
                text: "Nevermind!",
                isAnswer: false,
            },
            {
                text: "Nice question!",
                isAnswer: false,
            },
            {
                text: "I'm fine, thank u. And u?",
                isAnswer: true,
            },
            {
                text: "You are very handsome!",
                isAnswer: false,
            },
        ],
    },
];

// config
let hasChoice = false; // avoid multiple click
let quesCount = 0;
let availableQues = [];
let currentQues = {};
let currentQuesAnswer = 0;

// handle
const startGame = () => {
    quesCount = 0;
    score = 0;

    availableQues = [...listQuestions];
    getNewQues();
};

const getNewQues = () => {
    if(quesCount === listQuestions.length) {
        window.location.assign('/pages/end.html');
        return;
    }

    quesCount++;
    ques_display.innerText = quesCount + '/' + listQuestions.length;
    progress_display.style.width = quesCount / listQuestions.length * 100 + '%'

    const quesIndex = Math.floor(Math.random() * availableQues.length);
    currentQues = availableQues[quesIndex];

    // Setup
    question.innerText = currentQues.question;
    choices.forEach((choice, _idx) => {
        choice.innerText = currentQues.choices[_idx].text;
        if(currentQues.choices[_idx].isAnswer) {
            currentQuesAnswer = _idx;
        }
    });

    availableQues = [
        ...availableQues.slice(0, quesIndex),
        ...availableQues.slice(quesIndex + 1),
    ];
};

choices.forEach((choice, _idx) => {
    choice.addEventListener('click', (e) => {
        if(hasChoice) return;
        hasChoice = true;
        const currentEl = e.target;

        const applyClass = currentQuesAnswer === _idx ? 'correct' : 'incorrect'; 
        currentEl.parentElement.classList.add(applyClass);
        
        if(currentQuesAnswer === _idx) {
            increaseScore();
        }

        setTimeout(() => {
            hasChoice = false;
            currentEl.parentElement.classList.remove(applyClass);
            getNewQues();
        }, 2000);
    });
})

function increaseScore() {
    score += 10;
    score_display.innerText = score;
}

function goToEnd() {

}

startGame();
