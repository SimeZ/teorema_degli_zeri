"use strict";

// HTML ELEMENTS

// FORM ELEMENTS
const popupEl = document.querySelector(".popup-container");
const resetBtnEl = document.querySelector(".btn--reset");
const rangeDataEl = document.querySelector(".range-data");
const iterationDataEl = document.querySelector(".iteration-data");
const functionDataEl = document.querySelector(".function-data");
const ExecuteBtnEl = document.querySelector(".btn");

// TABLE ELEMENTS
const tableEl = document.querySelector(".table");
const tableHeaderContainer = document.querySelector(".table__header");
const tableH1El = document.querySelector(".table__header--h1");
const tableH2El = document.querySelector(".table__header--h2");

// GLOBAL VARIABLES
let functionData,
  rangeData,
  iterationData,
  isRunning = false; // is used to understand if the bisezione() function is running or not

// SHORTCUTS FUNCTIONS
document.addEventListener("keypress", keyPressed);

function keyPressed(e) {
  if (e.code === "Enter" && !isRunning) main();
  else if (e.code === "KeyE" && isRunning) reset();
}

// MAIN FUNCTION
const main = function () {
  isRunning = true;
  getData(); // Gets the data from all the inputs form in the popup window

  // Adds the table header
  tableHeaderContainer.style.display = "inline-block";
  tableH1El.textContent = `Funzione: ${functionData}`;
  tableH2El.textContent = `Intervallo: [${rangeData}]`;

  // Hides the popup windows and shows the reset btn and the table
  popupEl.style.display = "none";
  resetBtnEl.style.display = "inline-block";
  tableEl.style.display = "inline-block";

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

// TABLE FUNCTIONS
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

// METODO BISEZIONE
const calcFunction = function (n) {
  return 2 * n + Math.log2(n);
};

const bisezione = function (a, b) {
  let c;

  for (let i = 1; i <= iterationData; i++) {
    c = (a + b) / 2;

    const fA = calcFunction(a);
    const fB = calcFunction(b);
    const fC = calcFunction(c);
    insertRow(a, b, c, fA, fB, fC, i); // Writes the calcutaed values in the table

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

// TRUNC DECIMALS FUNCTION
const truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

// RESETS THE UI
const reset = function () {
  isRunning = false;

  // reset the form content
  functionDataEl.value = "";
  rangeDataEl.value = "";

  // Shows the popup window
  popupEl.style.display = "inline-block";
  resetBtnEl.style.display = "none";
  tableEl.style.display = "none";

  // Resets the rows inside the table and hiddens the table itself
  tableEl.innerHTML = "";
  tableHeaderContainer.style.display = "none";
};
