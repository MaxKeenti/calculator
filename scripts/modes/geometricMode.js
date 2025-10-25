
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".geo-tabs button");
  const figures = document.querySelectorAll(".geo-figures button");
  const inputs = document.querySelectorAll("#geo-inputs input");
  const result = document.getElementById("geo-result");
  const calcBtn = document.getElementById("geo-calculate");

  let currentTab = "perimeter";
  let currentFigure = "triangle";
  let triangleType = "equilateral";

  // === Tab switching ===
  tabs.forEach((btn) =>
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.mode;
      updateTitle();
    })
  );

  // === Figure switching ===
  figures.forEach((btn) =>
    btn.addEventListener("click", () => {
      figures.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFigure = btn.dataset.figure;
      document
        .getElementById("geo-options")
        .classList.toggle("hidden", currentFigure !== "triangle");
      updateTitle();
    })
  );

  // === Triangle type logic ===
  document.querySelectorAll("input[name='triangleType']").forEach((radio) =>
    radio.addEventListener("change", (e) => {
      triangleType = e.target.value;
      adjustInputsForTriangle(triangleType);
    })
  );

  function adjustInputsForTriangle(type) {
    inputs.forEach((inp) => (inp.disabled = false));
    if (type === "equilateral")
      inputs.slice(1).forEach((inp) => (inp.disabled = true));
    if (type === "isosceles") inputs[1].disabled = true;
  }

  function updateTitle() {
    document.getElementById("geo-title").textContent = `${capitalize(
      currentTab
    )} de ${capitalize(currentFigure)}`;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // === Calculate button ===
  calcBtn.addEventListener("click", () => {
    const v1 = parseFloat(inputs[0].value) || 0;
    const v2 = parseFloat(inputs[1].value) || 0;
    const v3 = parseFloat(inputs[2].value) || 0;
    let res = 0;

    if (currentFigure === "triangle" && currentTab === "perimeter") {
      if (triangleType === "equilateral") res = v1 * 3;
      else if (triangleType === "isosceles") res = v1 * 2 + v3;
      else res = v1 + v2 + v3;
    }
    result.textContent = `Resultado: ${res}`;
  });

  // === Return button ===
  const btnReturn = document.getElementById("btnReturn");
  if (btnReturn) {
    btnReturn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
