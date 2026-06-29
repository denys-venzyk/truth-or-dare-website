import questionsTruth from "./questionsTruth.js";
import questionsDare from "./questionsDare.js";

const txt = document.getElementById("question-text");
const startBtn = document.getElementById("start-btn");
let newBtn = document.getElementById("next-btn");
let choiceBtn1 = document.getElementById("choice-btn1");
let choiceBtn2 = document.getElementById("choice-btn2");
let counter = -1;

function startGame() {
  
  startBtn.remove();

  newBtn = document.createElement("button");
  newBtn.id = "next-btn";
  document.body.appendChild(newBtn);

  choiceBtn1 = document.createElement("input");
  choiceBtn2 = document.createElement("input");
  choiceBtn1.type = "radio";
  choiceBtn1.id = "choice-btn1";
  choiceBtn1.name = "yes/no";
  choiceBtn1.value = "Truth";

  choiceBtn2.type = "radio";
  choiceBtn2.id = "choice-btn2";
  choiceBtn2.name = "yes/no";
  document.body.appendChild(choiceBtn1);
  
  const label1 = document.createElement("label1");
  const label2 = document.createElement("label2");
  label1.htmlFor = "choice-btn1";
  label1.textContent = "Truth";

  label2.htmlFor = "choice-btn2";
  label2.textContent = "Dare";
  document.body.appendChild(label1);
  document.body.appendChild(choiceBtn2);
  document.body.appendChild(label2);
  newBtn.innerText = "Next";
  newBtn.addEventListener("click", next);
}

function next() {
  if (counter > questionsTruth.length - 2) {
    txt.innerText = "Congrats, you answered all questions";
    newBtn.innerText = "restart";
    return;
  }
  counter++;
  const question =(choiceBtn1.checked ? questionsTruth[counter] : questionsDare[counter]);
  txt.innerText = question;
}

startBtn.addEventListener("click", startGame);
