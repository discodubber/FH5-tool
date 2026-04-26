import "./App.css"
import { useState } from "react"

function App() {
  const [pi, setPi] = useState("")
  const piNumber = parseInt(pi)

  let piClass = "—"
  let piColor = "#8d9093"

  if (!isNaN(piNumber) && piNumber >= 100 && piNumber <= 999) {
    if (piNumber <= 500) {
      piClass = "D"
      piColor = "#42bdf4"
    } else if (piNumber <= 600) {
      piClass = "C"
      piColor = "#ffc533"
    } else if (piNumber <= 700) {
      piClass = "B"
      piColor = "#ff632c"
    } else if (piNumber <= 800) {
      piClass = "A"
      piColor = "#f43156"
    } else if (piNumber <= 900) {
      piClass = "S1"
      piColor = "#b960e8"
    } else if (piNumber <= 998) {
      piClass = "S2"
      piColor = "#165edb"
    } else if (piNumber === 999) {
      piClass = "X"
      piColor = "#19d858"
    }
  }
  

  return (
    <main className="app-shell">
      <h1>HorizonTune</h1>
      <p>Forza Horizon Tuning Tool</p>
      <div className="header-divider"></div>

      {/* Race type dropdown */}
      <section className="card">
        <label className="field option-row">
          <span>Race Type</span>
          <small>Choose the type of race this tune is for.</small>
          <select defaultValue="">
            <option value="" disabled>
              &lt;Choose a race type&gt;
            </option>
            <option>Road Course</option>
            <option>Street Racing</option>
            <option>Cross-Country Rally</option>
            <option>Dirt Racing</option>
            <option>Drag Racing</option>
            <option>Drifting</option>
          </select>
        </label>

        {/* PI badge and input */}
        <div className="field option-row">
          <span>Performance Index</span>
          <small>Enter the car’s PI number.</small>
          <div className="pi-badge" style={{ borderColor: piColor }}>
            <div className="pi-class" style={{ background: piColor }}> {piClass} </div>
            <input
              className="pi-input"
              placeholder="---"
              maxLength="3"
              value={pi}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*$/.test(value)) {
                  setPi(value)
                }
              }}
            />
          </div>
        </div>

        {/* Drivetrain options */}
        <fieldset className="field option-row">
          <legend>Drivetrain</legend>
          <small>Select a drivetrain.</small>
          <div className="radio-row">
            <label>
              <input type="radio" name="drivetrain" /> FWD
            </label>
            <label>
              <input type="radio" name="drivetrain" /> RWD
            </label>
            <label>
              <input type="radio" name="drivetrain" /> AWD
            </label>
          </div>
        </fieldset>

        {/* Race type information */}
        <div className="description-box">
          Race type description will appear here.
        </div>

        {/* Next button */}
        <small className="continue-hint"> Complete all fields to continue.</small>
        <button className="next-button" type="button">
          NEXT
        </button>
      </section>
    </main>
  )
}

export default App