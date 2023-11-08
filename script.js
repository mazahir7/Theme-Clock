"use strict";

const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const modeToggle = document.querySelector(".toggle-mode");

modeToggle.addEventListener("click", () => {
  const htmlEl = document.documentElement;
  htmlEl.classList.toggle("dark");
  if (htmlEl.classList.contains("dark")) { modeToggle.textContent = "Light mode" }
  else {
    modeToggle.textContent = "Dark mode"
  }
});

function setTime() {
  const currTime = new Date();
  const monthName = currTime.toLocaleString("default", { month: "short" });
  const weekDay = currTime.toLocaleString("default", { weekday: "long" });

  const seconds = scale(currTime.getSeconds(), 0, 59, 0, 360);
  const minutes = scale(currTime.getMinutes(), 0, 59, 0, 360);
  // 330 is used instead of 360 to get precision for the hour hand
  const hours = scale(currTime.getHours() % 12, 0, 11, 0, 330);
  // const hours = scale(12, 0, 11, 0, 330);

  timeEl.textContent = `${currTime.getHours()}:${String(currTime.getMinutes()).padStart(2, '0')}`;
  dateEl.innerHTML = `${weekDay}, ${monthName} <span class="day">${currTime.getDate()}</span>`;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${hours}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutes}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${seconds}deg)`;
}


setInterval(setTime, 1000);


// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
