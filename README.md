# Calculator Web App

A modular web-based calculator inspired by the iPhone interface.  
This project demonstrates JavaScript modularization, UI event binding, and finite-state machine logic for interactive input handling.

---

## 🧩 Project Structure

```
calculator/
│
├── index.html               # Main HTML structure and layout for the calculator
├── styles/
│   └── style.css            # Defines visual layout and iPhone-style design
└── scripts/
    ├── main.js              # Entry point; initializes calculator and binds DOM events
    ├── stateMachine.js      # Core finite-state machine managing calculator logic
    ├── calculatorState.js   # Shared global state object and reset logic
    ├── ui.js                # UI helpers for display management
    └── basicOperations.js   # Core arithmetic and helper functions
```

---

## ⚙️ Overview of Each Module

### **Further details**

Check out our [educational document regarding every structure in this project](/docs/educational/README.md).

### **index.html**

- **Purpose:** Main HTML structure for Calculator Web App.
- **Description:** Provides calculator layout, display, and buttons; connects frontend to JavaScript logic through module scripts.
- **Dependencies:** `styles/style.css`, `scripts/main.js`
- **Exports:** None

### **style.css**

- **Purpose:** Styles for Calculator Web App.
- **Description:** Defines visual layout and theme for the calculator following an iPhone-style interface.
- **Dependencies:** None
- **Exports:** None

### **main.js**

- **Purpose:** Entry point and event binding for Calculator Web App.
- **Description:** Initializes the calculator, binds DOM events to buttons, and delegates actions to the state machine.
- **Dependencies:** `stateMachine`, `resetCalculator`, `addDisplay`, and arithmetic operation constants.
- **Exports:** None (entry script)

### **stateMachine.js**

- **Purpose:** Core finite-state machine controlling calculator logic.
- **Description:** Handles all user actions depending on the current internal state.  
  Implements handlers for numbers, operations, results, sign change, and decimal inputs.
- **Dependencies:** `equals`, `sign_change`, `cleanDisplay`, `calculatorState`, `resetCalculator`.
- **Exports:**
  - `stateMachine` → Dispatcher for calculator actions
  - `calculatorState` → Global shared state
  - `resetCalculator` → State reset helper
  - Constants: `STATE_ZERO`, `STATE_CAPTURE_A`, `STATE_CAPTURE_OPERATION`, `STATE_CAPTURE_B`, `STATE_EQUALS`, `ACTION_NUMBER`, `ACTION_OPERATION`, `ACTION_RESULT`, `ACTION_SIGN_CHANGE`, `ACTION_PERIOD`

### **calculatorState.js**

- **Purpose:** Defines and manages the shared calculator state object.
- **Description:** Provides a universal state for the calculator. Exposes state and reset functionality for use by other modules.
- **Dependencies:** `cleanDisplay`
- **Exports:** `calculatorState`, `resetCalculator`

### **ui.js**

- **Purpose:** UI helpers for calculator display manipulation.
- **Description:** Provides functions to clear and update the calculator display.
- **Dependencies:** None
- **Exports:** `cleanDisplay`, `addDisplay`

### **basicOperations.js**

- **Purpose:** Implements core arithmetic operations for Calculator Web App.
- **Description:** Defines arithmetic operation constants, their handlers, and provides functions for sign change and calculating results.
- **Dependencies:** `calculatorState`
- **Exports:**
  - `equals`, `sign_change`, `operationHandlers`
  - Constants: `OPERATION_ADD`, `OPERATION_SUBTRACT`, `OPERATION_TIMES`, `OPERATION_DIVIDE`, `OPERATION_PERCENTAGE`

---

## 🧠 How It Works

1. **main.js** initializes the app and binds event listeners to calculator buttons.
2. Each button triggers an action sent to **stateMachine.js**.
3. The **state machine** determines what should happen based on the current state (capturing `a`, operation, or `b`).
4. **basicOperations.js** performs the computation when the result is requested.
5. The **UI module** updates the display accordingly.
6. **calculatorState.js** stores values and allows resetting.

---

## 🎨 Design

- Dark iPhone-like theme with responsive circular buttons.
- Layout built using CSS Grid for button arrangement.
- Text input styled to simulate a calculator display.

---

## 👤 Author

**Maximiliano González Calzada**  
Project: _Calculator Web App_  
Created: _2025-10-14_  
Last Updated: _2025-10-18_

---

## 🛠️ Setup & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/calculator-web-app.git
   cd calculator-web-app
   ```
2. Open index.html directly in your browser — no build step needed.
   (You can also run it with a lightweight server like live-server or VSCode’s Live Preview.)
3. Enjoy your iPhone-style calculator!

---

## 📄 License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE.md) for details.
