import "./App.css"
import { useRef, useState } from "react"
import { getPiClass } from "./data/piClasses"
import { raceMap } from "./Data/raceTypes"
import InfoPopover from "./components/InfoPopover"

function App() {
    const [activeInfo, setActiveInfo] = useState("")
    const [pi, setPi] = useState("")
    const piNumber = parseInt(pi || "0")
    const [raceType, setRaceType] = useState("")
    const [drivetrain, setDrivetrain] = useState("")
    const [showErrors, setShowErrors] = useState(false)

    const raceTypeRef = useRef(null)
    const piRef = useRef(null)
    const drivetrainRef = useRef(null)

    const { piClass, piColor } = getPiClass(piNumber)

    const raceDescription = raceMap[raceType] || ""

    const isValidPi = !isNaN(piNumber) && piNumber >= 100 && piNumber <= 999
    const isRaceTypeValid = raceType !== ""
    const isDrivetrainValid = drivetrain !== ""

    const isFormValid = isValidPi && isRaceTypeValid && isDrivetrainValid

    return (
        <main className="app-shell">
            <h1>
                HorizonTune
            </h1>
            <p>
                Forza Horizon Tuning Tool
            </p>
            <div className="header-divider"></div>
            <p>
                <strong>Welcome!</strong>
            </p>
            <p>
                This tool helps you tune your Forza cars for specific race types.
            </p>
            <p>
                Start by choosing the type of race you want to build for. If you're unsure, select a race type from the dropdown below and review the description.<br /><br />

                Once you've chosen a race type, select a PI class and upgrade your car to match. After upgrading, return here and follow the tuning steps.
            </p>

            {/* Race type dropdown */}
            <section className="card">
                <label ref={raceTypeRef} className="field option-row">
                    <span>
                        Race Type
                        <InfoPopover id="raceType" activeInfo={activeInfo} setActiveInfo={setActiveInfo}>
                            Choose the type of race you want to tune for. Each race type has different surface conditions and tuning priorities.
                        </InfoPopover>
                    </span>
                    <small>
                        Choose the type of race this tune is for.
                    </small>
                    <select value={raceType} onChange={(e) => setRaceType(e.target.value)}>
                        <option value="" disabled>
                            &lt;Choose a race type&gt;
                        </option>
                        <option>
                            Road Course
                        </option>
                        <option>
                            Street Racing
                        </option>
                        <option>
                            Cross-Country Rally
                        </option>
                        <option>
                            Dirt Racing
                        </option>
                        <option>
                            Drag Racing
                        </option>
                        <option>
                            Drifting
                        </option>
                    </select>
                    {showErrors && !isRaceTypeValid && (
                        <div className="error-text">
                            Please select a race type.
                        </div>
                    )}
                    {/* Race type information */}
                    <div className="description-box">
                        {raceDescription || "Race type description will appear here."}
                    </div>
                </label>

                {/* PI badge and input */}
                <div ref={piRef} className="field option-row">
                    <span>
                        Performance Index
                        <InfoPopover id="pi" activeInfo={activeInfo} setActiveInfo={setActiveInfo}>
                            Performance Index (PI) is calculated from power, weight, grip, and other factors.<br /><br />
                            
                            Check your car's PI at the top of the screen in Forza. Upgrade your car first, then enter that value here.
                        </InfoPopover>
                    </span>
                    <small>
                        Enter the car’s PI number.
                    </small>
                    <div className="pi-badge" style={{ borderColor: piColor }}>
                        <div className="pi-class" style={{ background: piColor }}> {piClass} </div>
                        <input className="pi-input" placeholder="---" maxLength="3" value={pi}onChange={(e) => {
                                const value = e.target.value
                                if (/^\d*$/.test(value)) {
                                    setPi(value)
                                }
                            }}
                        />
                    </div>
                    {showErrors && !isValidPi && (
                        <div className="error-text">
                            PI must be a number between 100–999.
                        </div>
                    )}
                </div>

                {/* Drivetrain options */}
                <fieldset ref={drivetrainRef} className="field option-row">
                    <legend>
                        Drivetrain
                        <InfoPopover id="drivetrain" activeInfo={activeInfo} setActiveInfo={setActiveInfo}>
                            Drivetrain determines how power is delivered to the wheels. <br /><br />

                            FWD (front-wheel drive) is stable and forgiving,<br />
                            RWD (rear-wheel drive) offers balance and control, and<br />
                            AWD (all-wheel drive) provides maximum traction at the cost of weight and drag.
                        </InfoPopover>
                    </legend>
                    <small>
                        Select a drivetrain.
                    </small>
                    <div className="radio-row">
                        <label>
                            <input type="radio" name="drivetrain" value="FWD" checked={drivetrain === "FWD"} onChange={(e) => setDrivetrain(e.target.value)}/>
                            FWD
                        </label>
                        <label>
                            <input type="radio" name="drivetrain" value="RWD" checked={drivetrain === "RWD"} onChange={(e) => setDrivetrain(e.target.value)}/>
                            RWD
                        </label>
                        <label>
                            <input type="radio" name="drivetrain" value="AWD" checked={drivetrain === "AWD"} onChange={(e) => setDrivetrain(e.target.value)}/>
                            AWD
                        </label>
                    </div>
                    {showErrors && !isDrivetrainValid && (
                        <div className="error-text">
                            Please select a drivetrain.
                        </div>
                    )}
                </fieldset>

                {/* Next button */}
                <small className="continue-hint">
                    Complete all fields to continue.
                </small>
                <button className={`next-button ${isFormValid ? "active" : ""}`} type="button" onClick={() => {
                        if (!isFormValid) {
                            setShowErrors(true)
                            if (!isRaceTypeValid) {
                                raceTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                            } else if (!isValidPi) {
                                piRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                            } else if (!isDrivetrainValid) {
                                drivetrainRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                            }
                            return
                        }
                        // later: next page
                    }}
                >NEXT</button>
            </section>
        </main>
    )
}
export default App