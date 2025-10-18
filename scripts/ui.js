function cleanDisplay() {
  document.getElementById("display").value = "";
}

function addDisplay(value) {
  const display = document.getElementById("display");
  display.value += value;
}

export { cleanDisplay, addDisplay };