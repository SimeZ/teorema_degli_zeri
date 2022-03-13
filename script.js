"use strict";

// HTML ELEMENTS
const popupEl = document.querySelector(".popup-container");
const resetBtnEl = document.querySelector(".btn--reset");
const rangeDataEl = document.querySelector(".range-data");
const iterationDataEl = document.querySelector(".iteration-data");
const functionDataEl = document.querySelector(".function-data");
const ExecuteBtnEl = document.querySelector(".btn");
const geogebraEl = document.getElementById("ggb-element");
const tableEl = document.querySelector(".table");

// GLOBAL VARIABLES
let functionData, rangeData, iterationData;

// MAIN FUNCTION
document.addEventListener("keypress", keyPressed);

const start = function () {
  popupEl.style.display = "none";
  resetBtnEl.style.display = "inline-block";
  tableEl.style.display = "inline-block";

  getData(); // Gets the data from all the inputs form in the popup window

  // Adds the table title
  document.body.insertAdjacentHTML(
    "beforebegin",
    `
  <div class="title__container table__header">
  <h1>Funzione: ${functionData}</h1>
  <h2>Intervallo: [${rangeData}]</h2>
</div>`
  );

  // Adds the main row in the table
  tableEl.insertAdjacentHTML(
    "beforeend",
    `
  <div class="table__row table__row--primary">
  <div class="table__column iteration--column"></div> 
  <div class="table__column">a</div>
  <div class="table__column">b</div>
  <div class="table__column">c</div>
  <div class="table__column">f(a)</div>
  <div class="table__column">f(b)</div>
  <div class="table__column">f(c)</div>
</div>`
  );

  let a = Number(rangeData[0]);
  let b = Number(rangeData[1]);
  bisezione(a, b);
};

function keyPressed(e) {
  if (e.code === "Enter") start();
}

// METODO BISEZIONE
const calcFunction = function (n) {
  return n * Math.cos(n);
};

const insertRow = function (a, b, c, fA, fB, fC, i) {
  const rowEl = `      
  <div class="table__row table__row--secondary">
  <div class="table__column iteration--column">${i}.</div>
  <div class="table__column">${truncateDecimals(a, 6)}</div>
  <div class="table__column">${truncateDecimals(b, 6)}</div>
  <div class="table__column">${truncateDecimals(c, 6)}</div>
  <div class="table__column">${truncateDecimals(fA, 6)}</div>
  <div class="table__column">${truncateDecimals(fB, 6)}</div>
  <div class="table__column">${truncateDecimals(fC, 6)}</div>
</div>`;
  tableEl.insertAdjacentHTML("beforeend", rowEl);
};

const bisezione = function (a, b) {
  let c;

  for (let i = 1; i <= iterationData; i++) {
    c = (a + b) / 2;

    const fA = calcFunction(a);
    const fB = calcFunction(b);
    const fC = calcFunction(c);
    insertRow(a, b, c, fA, fB, fC, i); // Inserisce i valori calcolati all'interno della tabella

    if (fC === 0) {
      return;
    } else {
      if (Math.sign(fC) === Math.sign(fA)) {
        a = c;
      } else b = c;
    }
  }
};

// GET DATA FUNCTION
const getData = function () {
  functionData = functionDataEl.value;
  rangeData = rangeDataEl.value.split(",");
  iterationData = Number(iterationDataEl.value);
};

// TRUNC FUNCTION
const truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

// RESETS THE UI
const reset = function () {
  popupEl.style.display = "inline-block";
  resetBtnEl.style.display = "none";
  tableEl.style.display = "none";

  // reset the form content
  functionDataEl.value = "";
  rangeDataEl.value = "";

  tableEl.innerHTML = "";
};
