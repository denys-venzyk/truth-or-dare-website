import questions from "./questions.js";

console.log(questions);

const txt = document.getElementById("question-text");
const startBtn = document.getElementById("start-btn");

function startGame() {
    const question = questions[0];
    txt.innerText = question;
    startBtn.remove();
let newBtn = document.getElementById("next-btn"); 

if (!newBtn) { 
    newBtn = document.createElement("button");
    newBtn.id = "next-btn"; 
    document.body.appendChild(newBtn); 
}
newBtn.innerText = "Next";

}

startBtn.addEventListener("click", startGame);