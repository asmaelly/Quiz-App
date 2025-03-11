const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

const Questions = [
    {
        question: "What does OOP stand for?",
        answer: "Object-Oriented Programming",
        options: [
            "Object-Oriented Programming",
            "Open Online Protocol",
            "Only Output Processing",
        ]
    },
    {
        question: "Which of the following is NOT a programming language?",
        answer: "HTML",
        options: [
            "Python",
            "Java",
            "HTML",
            "C++",
        ]
    },
    {
        question: "Which of these is a dynamically typed language?",
        answer: "Python",
        options: [
            "C++",
            "Java",
            "Python",
            "Swift",
        ]
    },
    {
        question: "What is the smallest unit of data in a computer?",
        answer: "Bit",
        options: [
            "Byte",
            "Bit",
            "Kilobyte",
            "Megabyte",
        ]
    },
    {
        question: "What is the primary purpose of an algorithm?",
        answer: "Process information efficiently",
        options: [
            "Store data",
            "Process information efficiently",
            "Display user interfaces",
            "Encrypt passwords",
        ]
    },
    {
        question: "What is an API?",
        answer: "A way for applications to communicate",
        options: [
            "A programming language",
            "A type of database",
            "A way for applications to communicate",
            "A cloud storage system",
        ]
    }
];

// Load a question
function loadQuestion() {
    const currentQuestion = Questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide "Next" button initially
}

// Check the selected answer
function checkAnswer(selectedOption, button) {
    const currentQuestion = Questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        button.style.backgroundColor = "green"; // Correct answer
        score++;
    } else {
        button.style.backgroundColor = "red"; // Incorrect answer
    }

    // Disable all buttons after an answer is selected
    const allButtons = optionsElement.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    nextButton.style.display = "block"; // Show "Next" button
}

// Show results at the end of the quiz
function showResults() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    resultElement.textContent = `Your score: ${score} out of ${Questions.length}`;
    nextButton.style.display = "none";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", restartQuiz);
    optionsElement.appendChild(restartButton);
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = "";
    loadQuestion();
    startScreen.style.display = "block";
    quizScreen.style.display = "none";
}

// Event listener for "Next" button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Event listener for "Start Quiz" button
document.getElementById("start-button").addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
});

// Load the first question when the script runs
loadQuestion();