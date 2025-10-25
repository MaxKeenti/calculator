document.addEventListener("DOMContentLoaded", () => {
  // Spanish label mappings for UI
  const spanishLabels = {
    area: "Área",
    perimeter: "Perímetro",
    volume: "Volumen",
    triangle: "Triángulo",
    square: "Cuadrado",
    circle: "Círculo",
  };

  // State variables
  let currentTab = "perimeter";
  let currentFigure = "triangle";
  let triangleType = "equilateral";

  const tabs = document.querySelectorAll(".geo-tabs button");
  const figures = document.querySelectorAll(".geo-figures button");
  const result = document.getElementById("geo-result");
  const calcBtn = document.getElementById("geo-calculate");

  // === Tab switching ===
  tabs.forEach((btn) =>
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.mode;
      renderLayout();
    })
  );

  // === Figure switching ===
  figures.forEach((btn) =>
    btn.addEventListener("click", () => {
      figures.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFigure = btn.dataset.figure;
      renderLayout();
    })
  );

  // === Renders triangle, square, and circle input fields dynamically ===
  function renderLayout() {
    // Update title, with special handling for cube
    let tabLabel = spanishLabels[currentTab] || currentTab;
    let figureLabel = spanishLabels[currentFigure] || currentFigure;
    // For cube, show "Cubo" in volume
    if (currentFigure === "square" && currentTab === "volume") {
      figureLabel = "Cubo";
    }
    document.getElementById("geo-title").textContent = `${tabLabel} de ${figureLabel}`;

    const geoOptions = document.getElementById("geo-options");
    // Triangle options
    if (currentFigure === "triangle") {
      geoOptions.classList.remove("hidden");
      geoOptions.innerHTML = `
        <label><input type="radio" name="triangleType" value="equilateral" ${triangleType === "equilateral" ? "checked" : ""}/> Equilátero</label>
        <label><input type="radio" name="triangleType" value="isosceles" ${triangleType === "isosceles" ? "checked" : ""}/> Isósceles</label>
        <label><input type="radio" name="triangleType" value="scalene" ${triangleType === "scalene" ? "checked" : ""}/> Escaleno</label>
      `;
      // Attach event listeners to radios
      geoOptions.querySelectorAll("input[name='triangleType']").forEach((radio) =>
        radio.addEventListener("change", (e) => {
          triangleType = e.target.value;
          renderLayout();
        })
      );
    } else if (currentFigure === "square") {
      geoOptions.classList.add("hidden");
      geoOptions.innerHTML = "";
    } else {
      geoOptions.classList.add("hidden");
      geoOptions.innerHTML = "";
    }

    // Build input fields
    const geoInputs = document.getElementById("geo-inputs");
    geoInputs.innerHTML = "";
    // For triangle, input fields depend on type and tab
    if (currentFigure === "triangle") {
      // For volume, always need a height as well
      if (currentTab === "volume") {
        // Base area inputs + altura
        if (triangleType === "equilateral") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado/Base</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Altura</label>
              <input type="number" id="altura" required />
            </div>
          `;
        } else if (triangleType === "isosceles") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Base</label>
              <input type="number" id="side3" required />
            </div>
            <div class="geo-input">
              <label>Altura</label>
              <input type="number" id="altura" required />
            </div>
          `;
        } else if (triangleType === "scalene") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado 1</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Lado 2</label>
              <input type="number" id="side2" required />
            </div>
            <div class="geo-input">
              <label>Lado 3</label>
              <input type="number" id="side3" required />
            </div>
            <div class="geo-input">
              <label>Altura</label>
              <input type="number" id="altura" required />
            </div>
          `;
        }
      } else if (currentTab === "area") {
        if (triangleType === "equilateral") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado/Base</label>
              <input type="number" id="side1" required />
            </div>
          `;
        } else if (triangleType === "isosceles") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Base</label>
              <input type="number" id="side3" required />
            </div>
          `;
        } else if (triangleType === "scalene") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado 1</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Lado 2</label>
              <input type="number" id="side2" required />
            </div>
            <div class="geo-input">
              <label>Lado 3</label>
              <input type="number" id="side3" required />
            </div>
          `;
        }
      } else if (currentTab === "perimeter") {
        if (triangleType === "equilateral") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado</label>
              <input type="number" id="side1" required />
            </div>
          `;
        } else if (triangleType === "isosceles") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Base</label>
              <input type="number" id="side3" required />
            </div>
          `;
        } else if (triangleType === "scalene") {
          geoInputs.innerHTML += `
            <div class="geo-input">
              <label>Lado 1</label>
              <input type="number" id="side1" required />
            </div>
            <div class="geo-input">
              <label>Lado 2</label>
              <input type="number" id="side2" required />
            </div>
            <div class="geo-input">
              <label>Lado 3</label>
              <input type="number" id="side3" required />
            </div>
          `;
        }
      }
    } else if (currentFigure === "square") {
      geoOptions.classList.add("hidden");
      geoOptions.innerHTML = "";
      geoInputs.innerHTML = "";
      if (currentTab === "perimeter") {
        geoInputs.innerHTML = `
          <div class="geo-input">
            <label>Lado</label>
            <input type="number" id="side" required />
          </div>`;
      } else if (currentTab === "area") {
        geoInputs.innerHTML = `
          <div class="geo-input">
            <label>Lado</label>
            <input type="number" id="side" required />
          </div>`;
      } else if (currentTab === "volume") {
        geoInputs.innerHTML = `
          <div class="geo-input">
            <label>Lado del Cubo</label>
            <input type="number" id="side" required />
          </div>`;
      }
    } else {
      // For other figures: TODO (not in scope)
      geoInputs.innerHTML = `<div style="color:#aaa;margin-bottom:8px;">(No implementado)</div>`;
    }
  }

  // Initial render
  renderLayout();

  // === Calculate button handler ===
  calcBtn.addEventListener("click", () => {
    // Read inputs by id
    let res = "";
    if (currentFigure === "triangle") {
      // Perimeter
      if (currentTab === "perimeter") {
        if (triangleType === "equilateral") {
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          res = lado > 0 ? (lado * 3) : "—";
        } else if (triangleType === "isosceles") {
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          const base = parseFloat(document.getElementById("side3")?.value || 0);
          res = (lado > 0 && base > 0) ? (lado * 2 + base) : "—";
        } else if (triangleType === "scalene") {
          const l1 = parseFloat(document.getElementById("side1")?.value || 0);
          const l2 = parseFloat(document.getElementById("side2")?.value || 0);
          const l3 = parseFloat(document.getElementById("side3")?.value || 0);
          res = (l1 > 0 && l2 > 0 && l3 > 0) ? (l1 + l2 + l3) : "—";
        }
      }
      // Area
      else if (currentTab === "area") {
        if (triangleType === "equilateral") {
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          res = lado > 0 ? ((Math.sqrt(3) / 4) * lado * lado) : "—";
        } else if (triangleType === "isosceles") {
          // Lado = side1, Base = side3
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          const base = parseFloat(document.getElementById("side3")?.value || 0);
          if (lado > 0 && base > 0 && lado > base/2) {
            // h = sqrt(lado^2 - (base/2)^2)
            const h = Math.sqrt(lado ** 2 - (base / 2) ** 2);
            res = (base * h) / 2;
          } else {
            res = "—";
          }
        } else if (triangleType === "scalene") {
          // Heron's formula
          const l1 = parseFloat(document.getElementById("side1")?.value || 0);
          const l2 = parseFloat(document.getElementById("side2")?.value || 0);
          const l3 = parseFloat(document.getElementById("side3")?.value || 0);
          if (l1 > 0 && l2 > 0 && l3 > 0) {
            const s = (l1 + l2 + l3) / 2;
            const area = Math.sqrt(s * (s - l1) * (s - l2) * (s - l3));
            res = !isNaN(area) ? area : "—";
          } else {
            res = "—";
          }
        }
      }
      // Volume
      else if (currentTab === "volume") {
        // Volume = (1/3) * area_base * altura
        let area = null, altura = null;
        altura = parseFloat(document.getElementById("altura")?.value || 0);
        if (triangleType === "equilateral") {
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          if (lado > 0 && altura > 0) {
            area = (Math.sqrt(3) / 4) * lado * lado;
            res = (1 / 3) * area * altura;
          } else {
            res = "—";
          }
        } else if (triangleType === "isosceles") {
          const lado = parseFloat(document.getElementById("side1")?.value || 0);
          const base = parseFloat(document.getElementById("side3")?.value || 0);
          if (lado > 0 && base > 0 && altura > 0 && lado > base/2) {
            const h = Math.sqrt(lado ** 2 - (base / 2) ** 2);
            area = (base * h) / 2;
            res = (1 / 3) * area * altura;
          } else {
            res = "—";
          }
        } else if (triangleType === "scalene") {
          const l1 = parseFloat(document.getElementById("side1")?.value || 0);
          const l2 = parseFloat(document.getElementById("side2")?.value || 0);
          const l3 = parseFloat(document.getElementById("side3")?.value || 0);
          if (l1 > 0 && l2 > 0 && l3 > 0 && altura > 0) {
            const s = (l1 + l2 + l3) / 2;
            area = Math.sqrt(s * (s - l1) * (s - l2) * (s - l3));
            res = !isNaN(area) ? (1 / 3) * area * altura : "—";
          } else {
            res = "—";
          }
        }
      }
    } else if (currentFigure === "square") {
      const side = parseFloat(document.getElementById("side")?.value || 0);
      if (currentTab === "perimeter") {
        res = side > 0 ? side * 4 : "—";
      } else if (currentTab === "area") {
        res = side > 0 ? side * side : "—";
      } else if (currentTab === "volume") {
        res = side > 0 ? side ** 3 : "—";
      }
    } else {
      // Not implemented
      res = "—";
    }
    // Format result
    let resStr = "—";
    if (typeof res === "number" && isFinite(res)) {
      resStr = (Math.round(res * 1e6) / 1e6).toString();
    } else if (typeof res === "string") {
      resStr = res;
    }
    result.textContent = `Resultado: ${resStr}`;
  });

  // === Mode dialog ===
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
