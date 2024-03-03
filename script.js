// Get the button element
const calculateButton = document.getElementById('calculateButton');

// Add event listener to the button
calculateButton.addEventListener('click', calculateResults);

// script.js

// Function to reset the form fields and clear results


// Event listener for the reset button
document.getElementById("resetButton").addEventListener("click", resetForm);

function resetForm() {
    document.getElementById("rocketForm").reset(); // Reset the form fields
    document.getElementById("myModal").style.display = "none";
}
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});


function calculateResults() {
    // Retrieve all input values from the form
    const fuelCombination = document.getElementById('fuelCombination').value;
    const thrust = parseFloat(document.getElementById('thrust').value);
    const chamberPressure = parseFloat(document.getElementById('chamberPressure').value);
    const altitude = parseFloat(document.getElementById('altitude').value);
    const oxidizerFuelRatio = parseFloat(document.getElementById('oxidizerFuelRatio').value);
    const characteristicVelocity = parseFloat(document.getElementById('characteristicVelocity').value);
    const chamberTemperature = parseFloat(document.getElementById('chamberTemperature').value);
    const exitMolecularMass = parseFloat(document.getElementById('exitMolecularMass').value);
    const exitSpecificHeatRatio = parseFloat(document.getElementById('exitSpecificHeatRatio').value);
    const characteristicsLength = parseFloat(document.getElementById('characteristicsLength').value);
    const contractionRatio = parseFloat(document.getElementById('contractionRatio').value);

    // Perform calculations
    const Ru = 8314.3; // J/Kg mol-K
    const T3 = (15.04 - (0.00649 * altitude)) + 273;
    const P3 = (101.29 * Math.pow((T3 / 288.08), 5.256)) * 1000;
    const P0 = chamberPressure;
    const P0_P3 = P0 / P3;
    const Gamma = exitSpecificHeatRatio;

    // Calculations for Step 2
    const areaRatio = Math.pow(((Gamma + 1) / 2), (1 / (Gamma - 1))) * Math.pow((P3 / P0), (1 / Gamma)) * Math.sqrt(((Gamma + 1) / (Gamma - 1)) * (1 - Math.pow((P3 / P0), ((Gamma - 1) / Gamma))));
    const epsilon = 1 / areaRatio;
    const v2 = Math.sqrt(((2 * Gamma) / (Gamma - 1)) * ((Ru * chamberTemperature) / exitMolecularMass) * (1 - Math.pow((P3 / P0), ((Gamma - 1) / Gamma))));
    const m_dot = thrust / v2;
    const m_dot_fuel = m_dot * (1 / (oxidizerFuelRatio + 1));
    const m_dot_oxidizer = m_dot * (oxidizerFuelRatio / (oxidizerFuelRatio + 1));
    const throatArea = (m_dot / P0) * Math.sqrt(((Ru * chamberTemperature) / exitMolecularMass) / (Gamma * Math.pow((2 / (Gamma + 1)), ((Gamma + 1) / (Gamma - 1)))));
    const exitArea = epsilon * throatArea;
    const g0 = 9.81; // m/s^2
    const Isp = v2 / g0; // Specific Impulse at SeaLevel
    const C_F = thrust / (P0 * throatArea);
    const inletArea = contractionRatio * throatArea;
    const Lc = (throatArea * characteristicsLength / inletArea) * 1000;
    const rc = Math.sqrt(inletArea / Math.PI) * 1000;

    // Display the results
    document.getElementById('results').innerHTML = `
        <h2>Results</h2>
        <h2>Ambient Conditions:</h2>
        <p>The Ambient Pressure [Pa] : ${P3.toFixed(3)}</p>
        <p>The Ambient Temperature [K] : ${T3.toFixed(3)}</p>
        <p>Chamber to Exit Pressure Ratio : ${P0_P3.toFixed(3)}</p>0
        <p>Expansion Ratio (Epsilon): ${epsilon}</p>
        <p>Ideal Exit Velocity (m/s): ${v2}</p>
        <p>Total Mass Flow Rate (Kg/s): ${m_dot}</p>
        <p>Mass Flow rate of Fuel (Kg/s): ${m_dot_fuel}</p>
        <p>Mass Flow rate of Oxidizer (Kg/s): ${m_dot_oxidizer}</p>
        <p>Throat Area (m^2): ${throatArea}</p>
        <p>Exit Area (m^2): ${exitArea}</p>
        <p>Specific Impulse (s): ${Isp}</p>
        <p>Thrust Coefficient: ${C_F}</p>
        <p>Combustion Chamber Length (mm): ${Lc}</p>
        <p>Combustion Chamber Radius (mm): ${rc}</p>
        <p>Convergence and Divergence half angle: 45deg (Convergence), 15deg (Divergence)</p>
    `;
    document.getElementById("myModal").style.display = "block";
}
