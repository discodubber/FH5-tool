export function getPiClass(piNumber) {    let piClass = "—"
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
    return { piClass, piColor }
}