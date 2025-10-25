document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".geo-tabs button");
  const figures = document.querySelectorAll(".geo-figures button");
  const inputs = document.querySelectorAll("#geo-inputs input");
  const result = document.getElementById("geo-result");
  const calcBtn = document.getElementById("geo-calculate");

  // Spanish label mappings for UI
  const spanishLabels = {
    area: "Área",
    perimeter: "Perímetro",
    volume: "Volumen",
    triangle: "Triángulo",
    square: "Cuadrado",
    circle: "Círculo",
  };

  let currentTab = "perímetro";
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
    // Use Spanish labels and handle correct display for currentTab
    let tabLabel = spanishLabels[currentTab] || currentTab;
    let figureLabel = spanishLabels[currentFigure] || currentFigure;
    document.getElementById("geo-title").textContent = `${tabLabel} de ${figureLabel}`;
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
  const modeDialog = document.getElementById("modeDialog");
  const switchBtn = document.getElementById("buttonSwitchMode");

  switchBtn.addEventListener("click", () => {
    modeDialog.classList.toggle("hidden");
  });

  // Mode switching redirects
  document.getElementById("btnModeBasic").addEventListener("click", () => {
    window.location.href = "index.html?mode=basic";
  });
  document.getElementById("btnModeScientific").addEventListener("click", () => {
    window.location.href = "index.html?mode=scientific";
  });
  document.getElementById("btnModeGeometric").addEventListener("click", () => {
    modeDialog.classList.add("hidden");
  });
});
