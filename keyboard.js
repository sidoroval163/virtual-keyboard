const new_keyboard = [
  { code: "Backquote value", eng: "`", ru: "ё" },
  { code: "Digit1 value", eng: "1", ru: "1" },
  { code: "Digit2 value", eng: "2", ru: "2" },
  { code: "Digit3 value", eng: "3", ru: "3" },
  { code: "Digit4 value", eng: "4", ru: "4" },
  { code: "Digit5 value", eng: "5", ru: "5" },
  { code: "Digit6 value", eng: "6", ru: "6" },
  { code: "Digit7 value", eng: "7", ru: "7" },
  { code: "Digit8 value", eng: "8", ru: "8" },
  { code: "Digit9 value", eng: "9", ru: "9" },
  { code: "Digit0 value", eng: "0", ru: "0" },
  { code: "Minus value", eng: "-", ru: "-" },
  { code: "Equal value", eng: "=", ru: "=" },
  { code: "Backspace", eng: "Backspace", ru: "Backspace" },
  { code: "Tab", eng: "Tab", ru: "Tab" },
  { code: "KeyQ value", eng: "q", ru: "й" },
  { code: "KeyW value", eng: "w", ru: "ц" },
  { code: "KeyE value", eng: "e", ru: "у" },
  { code: "KeyR value", eng: "r", ru: "к" },
  { code: "KeyT value", eng: "t", ru: "е" },
  { code: "KeyY value", eng: "y", ru: "н" },
  { code: "KeyU value", eng: "u", ru: "г" },
  { code: "KeyI value", eng: "i", ru: "ш" },
  { code: "KeyO value", eng: "o", ru: "щ" },
  { code: "KeyP value", eng: "p", ru: "з" },
  { code: "BracketLeft value", eng: "[", ru: "х" },
  { code: "BracketRight value", eng: "]", ru: "ъ" },
  { code: "Backslash value", eng: "|", ru: "/" },
  { code: "CapsLock", eng: "Caps lock", ru: "Caps lock" },
  { code: "KeyA value", eng: "a", ru: "ф" },
  { code: "KeyS value", eng: "s", ru: "ы" },
  { code: "KeyD value", eng: "d", ru: "в" },
  { code: "KeyF value", eng: "f", ru: "а" },
  { code: "KeyG value", eng: "g", ru: "п" },
  { code: "KeyH value", eng: "h", ru: "р" },
  { code: "KeyJ value", eng: "j", ru: "о" },
  { code: "KeyK value", eng: "k", ru: "л" },
  { code: "KeyL value", eng: "l", ru: "д" },
  { code: "Semicolon value", eng: ";", ru: "ж" },
  { code: "Quote value", eng: "'", ru: "э" },
  { code: "Enter", eng: "Enter", ru: "Enter" },
  { code: "ShiftLeft", eng: "L Shift", ru: "L Shift" },
  { code: "KeyZ value", eng: "z", ru: "я" },
  { code: "KeyX value", eng: "x", ru: "ч" },
  { code: "KeyC value", eng: "c", ru: "с" },
  { code: "KeyV value", eng: "v", ru: "м" },
  { code: "KeyB value", eng: "b", ru: "и" },
  { code: "KeyN value", eng: "n", ru: "т" },
  { code: "KeyM value", eng: "m", ru: "ь" },
  { code: "Comma value", eng: ",", ru: "б" },
  { code: "Period value", eng: ".", ru: "ю" },
  { code: "Slash value", eng: "/", ru: "." },
  { code: "ShiftRight", eng: "R Shift", ru: "R Shift" },
  { code: "ArrowUp", eng: "^", ru: "^" },
  { code: "ControlLeft", eng: "L Ctrl", ru: "L Ctrl" },
  { code: "MetaLeft", eng: "win", ru: "win" },
  { code: "AltLeft", eng: "L Alt", ru: "L Alt" },
  { code: "Space", eng: "space", ru: "space" },
  { code: "AltRight", eng: "R Alt", ru: "R Alt" },
  { code: "ControlRight", eng: "R Ctrl", ru: "R Ctrl" },
  { code: "ArrowLeft", eng: "<", ru: "<" },
  { code: "ArrowDown", eng: "↓", ru: "↓" },
  { code: "ArrowRight", eng: ">", ru: ">" },
];
let language = localStorage.lang ? localStorage.getItem("lang") : "ru";

//document.onkeypress = function (event) {
//console.log(event);
// keyboard.push(event.charCode);
// console.log(keyboard);
//};
//let language = localStorage.getItem("lang");
let text_area = document.createElement("textarea");
text_area.id = "textarea";
document.body.append(text_area);

let keyboard_draw = document.createElement("div");
keyboard_draw.id = "keyboard";
document.body.append(keyboard_draw);

let info = document.createElement("div");
info.id = "info";
info.innerHTML = "Сделано под Windows, смена раскладки  L Alt+ L Shift. ";
document.body.append(info);
//одновременное нажатие шифт и альт

let capsStatus = false;

let pressed = new Set();
const codes = ["ShiftLeft", "AltLeft"];

document.addEventListener("keydown", function (event) {
  pressed.add(event.code);

  for (let code of codes) {
    if (!pressed.has(code)) {
      return;
    }
  }

  pressed.clear();
  language === "eng" ? (language = "ru") : (language = "eng");
  localStorage.setItem("lang", language);
  console.log(localStorage.lang);
  init(new_keyboard, language);
});

document.addEventListener("keyup", ({ code }) => pressed.delete(code));

function init(keys, lang) {
  let out = "";
  keys.forEach((item, index) => {
    if (index == 14 || index == 28 || index == 41 || index == 54) {
      out += '<div class="clearfix"></div>';
    }
    out += `
      <div class="k-key ${item.code}" data="${item.code}">${item[lang]}</div>
      `;
  });
  document.querySelector("#keyboard").innerHTML = out;
}
init(new_keyboard, language); //отрисовка клавиатуры

document.onkeydown = ({ code, which }) => {
  text_area.focus();
  console.log(code);

  console.log("кейкод", which);
  document
    .querySelectorAll("#keyboard .k-key")
    .forEach((element) => element.classList.remove("active"));
  document.querySelector(`.${code}`).classList.add("active");
  setTimeout(
    () => document.querySelector(`.${code}`).classList.remove("active"),
    100
  );
};

keyboard_draw.addEventListener("click", function ({ target }) {
  if (target.classList.contains("k-key")) highlight(target);
  if (target.classList.contains("CapsLock")) caps(target); // подсветить TD
});

function highlight(key) {
  key.classList.add("active");
  setTimeout(() => key.classList.remove("active"), 100);

  console.log(key);
  if (key.classList.contains("value") && key.innerHTML && capsStatus == false) {
    document.getElementById("textarea").value += key.innerHTML.toLowerCase();
  }

  if (key.classList.contains("value") && key.innerHTML && capsStatus == true) {
    document.getElementById("textarea").value += key.innerHTML.toUpperCase();
  }

  if (key.classList.contains("Space") && key.innerHTML) {
    document.getElementById("textarea").value += " ";
  }
  if (key.classList.contains("Backspace") && key.innerHTML) {
    document.getElementById("textarea").value = document
      .getElementById("textarea")
      .value.slice(0, -1);
  }
  if (key.classList.contains("Enter") && key.innerHTML) {
    document.getElementById("textarea").value += "\n";
  }
  if (key.classList.contains("Tab") && key.innerHTML) {
    document.getElementById("textarea").value += "  ";
  }
}
function caps() {
  capsStatus === false ? (capsStatus = true) : (capsStatus = false);
  capsStatus === true
    ? document.querySelector(".CapsLock").classList.add("activat")
    : document.querySelector(".CapsLock").classList.remove("activat");

  console.log(capsStatus);
}
