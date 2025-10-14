function load() {
  for (let index = 0; index < 10; index++) {
    let buttZero = document.getElementById("button" + index);
    buttZero.addEventListener("click", function () {
      let display = document.getElementById("display");
      display.value = display.value + index;
    });
  }
}

function clean (){}

function addDisplay (value){

}