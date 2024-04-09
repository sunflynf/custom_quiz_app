const question = document.getElementById("game-ques");
const choices = Array.from(document.getElementsByClassName("game-ans-choice"));

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
];

// config
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
    quesCount++;
    const quesIndex = Math.floor(Math.random() * listQuestions.length);
    currentQues = listQuestions[quesIndex];

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
        const currentEl = e.target;
        if(currentQuesAnswer === _idx) {
            currentEl.parentElement.classList.add('correct');
        } else {
            currentEl.parentElement.classList.add('incorrect');
        }
    });
})

startGame();
