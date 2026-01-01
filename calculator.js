/**
         * Member configuration
         */
const MEMBERS = [
    { id: 'ashu', name: 'Ashu' },
    { id: 'jay', name: 'Jay' },
    { id: 'bhaiya', name: 'Bhaiya' },
    { id: 'aunty', name: 'Aunty' }
];

const TOTAL_MEMBERS = MEMBERS.length;

/**
 * Show error message for an input field
 */
function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.parentElement.classList.add('error');
        error.textContent = message;
        error.classList.add('show');
    }
}

/**
 * Clear error message for an input field
 */
function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.parentElement.classList.remove('error');
        error.classList.remove('show');
    }
}

/**
 * Clear all errors
 */
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.classList.remove('show');
    });
    
    const errorInputs = document.querySelectorAll('.input-group.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Validate and get numeric value from input
 */
function getNumericValue(inputId, errorId, fieldName) {
    const input = document.getElementById(inputId);
    if (!input) return null;

    const value = parseFloat(input.value);
    
    if (isNaN(value) || value < 0) {
        showError(inputId, errorId, `${fieldName} must be a valid positive number`);
        return null;
    }

    clearError(inputId, errorId);
    return value;
}

/**
 * Validate electricity meter readings
 */
function validateMeterReadings(memberId, memberName) {
    const previous = getNumericValue(
        `${memberId}-previous`,
        `${memberId}-previous-error`,
        `${memberName} Previous Reading`
    );
    
    const current = getNumericValue(
        `${memberId}-current`,
        `${memberId}-current-error`,
        `${memberName} Current Reading`
    );

    if (previous === null || current === null) {
        return null;
    }

    if (current < previous) {
        showError(
            `${memberId}-current`,
            `${memberId}-current-error`,
            'Current reading cannot be less than previous reading'
        );
        return null;
    }

    return { previous, current };
}

/**
 * Calculate per unit cost from bill amount and total units
 */
function calculatePerUnit() {
    const billAmount = parseFloat(document.getElementById('per-unit-bill').value);
    const totalUnits = parseFloat(document.getElementById('per-unit-total').value);
    const resultDiv = document.getElementById('per-unit-result');

    if (isNaN(billAmount) || billAmount <= 0) {
        resultDiv.textContent = 'Please enter a valid bill amount';
        resultDiv.style.color = '#dc2626';
        resultDiv.classList.add('show');
        return;
    }

    if (isNaN(totalUnits) || totalUnits <= 0) {
        resultDiv.textContent = 'Please enter valid total units';
        resultDiv.style.color = '#dc2626';
        resultDiv.classList.add('show');
        return;
    }

    const perUnitCost = billAmount / totalUnits;
    resultDiv.innerHTML = `💰 <strong>Price Per Unit: ₹${roundToTwoDecimals(perUnitCost).toFixed(2)}</strong>`;
    resultDiv.style.color = '#92400e';
    resultDiv.classList.add('show');
}

/**
 * Calculate electricity bills
 * Always calculates individually: Price Per Unit × (Current - Previous) for each member
 */
function calculateElectricityBills() {
    // Get total electricity bill amount
    const totalBillAmount = getNumericValue(
        'total-electricity-bill',
        'electricity-bill-error',
        'Total Electricity Bill'
    );

    if (totalBillAmount === null) {
        return null;
    }

    // Always calculate from individual meter readings
    const memberReadings = {};
    let totalUnits = 0;

    // Get meter readings for all members and calculate individual units
    for (const member of MEMBERS) {
        const readings = validateMeterReadings(member.id, member.name);
        if (readings === null) {
            return null;
        }

        // Calculate units consumed for this member: Current - Previous
        const units = readings.current - readings.previous;
        memberReadings[member.id] = {
            name: member.name,
            previous: readings.previous,
            current: readings.current,
            units: units
        };

        // Add to total units
        totalUnits += units;
    }

    // Validate total units
    if (totalUnits === 0) {
        showError(
            'total-electricity-bill',
            'electricity-bill-error',
            'Total units consumed cannot be zero'
        );
        return null;
    }

    // Calculate price per unit: Total Bill Amount / Total Units
    const perUnitCost = totalBillAmount / totalUnits;

    // Calculate individual electricity bills for each member
    // Individual Bill = Price Per Unit × (Current - Previous)
    const electricityResults = {};
    for (const member of MEMBERS) {
        const memberData = memberReadings[member.id];
        // Individual calculation: Per Unit Cost × Individual Units Consumed
        const electricityAmount = memberData.units * perUnitCost;
        
        electricityResults[member.id] = {
            name: memberData.name,
            units: memberData.units, // Individual units: current - previous
            electricityAmount: electricityAmount // Per unit cost × individual units
        };
    }

    return {
        totalUnits: totalUnits,
        perUnitCost: perUnitCost,
        results: electricityResults
    };
}

/**
 * Calculate water bills
 */
function calculateWaterBills() {
    let totalWaterUnits = 0;

    // Check if water readings are provided
    const waterPrevious = document.getElementById('water-previous-reading').value;
    const waterCurrent = document.getElementById('water-current-reading').value;

    if (waterPrevious && waterPrevious.trim() !== '' && waterCurrent && waterCurrent.trim() !== '') {
        // Calculate from water meter readings
        const previousReading = getNumericValue(
            'water-previous-reading',
            'water-previous-error',
            'Water Previous Reading'
        );

        if (previousReading === null) {
            return null;
        }

        const currentReading = getNumericValue(
            'water-current-reading',
            'water-current-error',
            'Water Current Reading'
        );

        if (currentReading === null) {
            return null;
        }

        if (currentReading < previousReading) {
            showError(
                'water-current-reading',
                'water-current-error',
                'Current reading cannot be less than previous reading'
            );
            return null;
        }

        totalWaterUnits = currentReading - previousReading;
    } else {
        // Get total water units from input
        const providedUnits = getNumericValue(
            'total-water-units',
            'water-units-error',
            'Total Water Units'
        );

        if (providedUnits === null) {
            return null;
        }

        totalWaterUnits = providedUnits;
    }

    // Validate total units
    if (totalWaterUnits === 0) {
        showError(
            'total-water-units',
            'water-units-error',
            'Total water units cannot be zero'
        );
        return null;
    }

    // Get water price per unit
    const waterPricePerUnit = getNumericValue(
        'water-price-per-unit',
        'water-price-error',
        'Water Price per Unit'
    );

    if (waterPricePerUnit === null) {
        return null;
    }

    // Calculate water units per member (divided equally)
    const waterUnitsPerMember = totalWaterUnits / TOTAL_MEMBERS;

    // Calculate water bill per member
    const waterBillPerMember = waterUnitsPerMember * waterPricePerUnit;

    return {
        totalWaterUnits: totalWaterUnits,
        waterUnitsPerMember: waterUnitsPerMember,
        waterBillPerMember: waterBillPerMember
    };
}

/**
 * Round to 2 decimal places
 */
function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return `₹${roundToTwoDecimals(amount).toFixed(2)}`;
}

/**
 * Display electricity results only
 */
function displayElectricityResults(electricityData) {
    // Show results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.add('show');

    // Display summary
    document.getElementById('total-units-display').textContent = 
        roundToTwoDecimals(electricityData.totalUnits).toFixed(2);
    document.getElementById('per-unit-cost-display').textContent = 
        formatCurrency(electricityData.perUnitCost);
    document.getElementById('total-water-display').textContent = 'N/A';
    document.getElementById('water-per-member-display').textContent = 'N/A';

    // Build results table
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = '';

    let grandTotal = 0;

    for (const member of MEMBERS) {
        const electricityResult = electricityData.results[member.id];
        const electricityAmount = electricityResult.electricityAmount;
        const totalPayable = electricityAmount;
        grandTotal += totalPayable;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${electricityResult.name}</strong></td>
            <td>${roundToTwoDecimals(electricityResult.units).toFixed(2)}</td>
            <td>${formatCurrency(electricityAmount)}</td>
            <td>N/A</td>
            <td><strong>${formatCurrency(totalPayable)}</strong></td>
        `;
        resultsBody.appendChild(row);
    }

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
        <td><strong>TOTAL</strong></td>
        <td><strong>${roundToTwoDecimals(electricityData.totalUnits).toFixed(2)}</strong></td>
        <td><strong>${formatCurrency(electricityData.totalUnits * electricityData.perUnitCost)}</strong></td>
        <td><strong>N/A</strong></td>
        <td><strong>${formatCurrency(grandTotal)}</strong></td>
    `;
    resultsBody.appendChild(totalRow);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display electricity results with water bill included in total
 */
function displayElectricityResultsWithWater(electricityData, waterData) {
    // Show results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.add('show');

    // Display summary
    document.getElementById('total-units-display').textContent = 
        roundToTwoDecimals(electricityData.totalUnits).toFixed(2);
    document.getElementById('per-unit-cost-display').textContent = 
        formatCurrency(electricityData.perUnitCost);
    document.getElementById('total-water-display').textContent = 
        roundToTwoDecimals(waterData.totalWaterUnits).toFixed(2);
    document.getElementById('water-per-member-display').textContent = 
        roundToTwoDecimals(waterData.waterUnitsPerMember).toFixed(2);

    // Build results table
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = '';

    let grandTotal = 0;

    for (const member of MEMBERS) {
        const electricityResult = electricityData.results[member.id];
        const electricityAmount = electricityResult.electricityAmount;
        const waterAmount = waterData.waterBillPerMember;
        const totalPayable = electricityAmount + waterAmount;
        grandTotal += totalPayable;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${electricityResult.name}</strong></td>
            <td>${roundToTwoDecimals(electricityResult.units).toFixed(2)}</td>
            <td>${formatCurrency(electricityAmount)}</td>
            <td>${formatCurrency(waterAmount)}</td>
            <td><strong>${formatCurrency(totalPayable)}</strong></td>
        `;
        resultsBody.appendChild(row);
    }

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
        <td><strong>TOTAL</strong></td>
        <td><strong>${roundToTwoDecimals(electricityData.totalUnits).toFixed(2)}</strong></td>
        <td><strong>${formatCurrency(electricityData.totalUnits * electricityData.perUnitCost)}</strong></td>
        <td><strong>${formatCurrency(waterData.waterBillPerMember * TOTAL_MEMBERS)}</strong></td>
        <td><strong>${formatCurrency(grandTotal)}</strong></td>
    `;
    resultsBody.appendChild(totalRow);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display water results only
 */
function displayWaterResults(waterData) {
    // Show results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.add('show');

    // Display summary
    document.getElementById('total-units-display').textContent = 'N/A';
    document.getElementById('per-unit-cost-display').textContent = 'N/A';
    document.getElementById('total-water-display').textContent = 
        roundToTwoDecimals(waterData.totalWaterUnits).toFixed(2);
    document.getElementById('water-per-member-display').textContent = 
        roundToTwoDecimals(waterData.waterUnitsPerMember).toFixed(2);

    // Build results table
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = '';

    let grandTotal = 0;

    for (const member of MEMBERS) {
        const waterAmount = waterData.waterBillPerMember;
        const totalPayable = waterAmount;
        grandTotal += totalPayable;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${member.name}</strong></td>
            <td>N/A</td>
            <td>N/A</td>
            <td>${formatCurrency(waterAmount)}</td>
            <td><strong>${formatCurrency(totalPayable)}</strong></td>
        `;
        resultsBody.appendChild(row);
    }

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
        <td><strong>TOTAL</strong></td>
        <td><strong>N/A</strong></td>
        <td><strong>N/A</strong></td>
        <td><strong>${formatCurrency(waterData.waterBillPerMember * TOTAL_MEMBERS)}</strong></td>
        <td><strong>${formatCurrency(grandTotal)}</strong></td>
    `;
    resultsBody.appendChild(totalRow);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display results
 */
function displayResults(electricityData, waterData) {
    // Show results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.add('show');

    // Display summary
    document.getElementById('total-units-display').textContent = 
        roundToTwoDecimals(electricityData.totalUnits).toFixed(2);
    document.getElementById('per-unit-cost-display').textContent = 
        formatCurrency(electricityData.perUnitCost);
    document.getElementById('total-water-display').textContent = 
        roundToTwoDecimals(waterData.totalWaterUnits).toFixed(2);
    document.getElementById('water-per-member-display').textContent = 
        roundToTwoDecimals(waterData.waterUnitsPerMember).toFixed(2);

    // Build results table
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = '';

    let grandTotal = 0;

    for (const member of MEMBERS) {
        const electricityResult = electricityData.results[member.id];
        const electricityAmount = electricityResult.electricityAmount;
        const waterAmount = waterData.waterBillPerMember;
        const totalPayable = electricityAmount + waterAmount;
        grandTotal += totalPayable;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${electricityResult.name}</strong></td>
            <td>${roundToTwoDecimals(electricityResult.units).toFixed(2)}</td>
            <td>${formatCurrency(electricityAmount)}</td>
            <td>${formatCurrency(waterAmount)}</td>
            <td><strong>${formatCurrency(totalPayable)}</strong></td>
        `;
        resultsBody.appendChild(row);
    }

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
        <td><strong>TOTAL</strong></td>
        <td><strong>${roundToTwoDecimals(electricityData.totalUnits).toFixed(2)}</strong></td>
        <td><strong>${formatCurrency(electricityData.totalUnits * electricityData.perUnitCost)}</strong></td>
        <td><strong>${formatCurrency(waterData.waterBillPerMember * TOTAL_MEMBERS)}</strong></td>
        <td><strong>${formatCurrency(grandTotal)}</strong></td>
    `;
    resultsBody.appendChild(totalRow);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Calculate electricity only (with water bill included in total)
 */
function calculateElectricityOnly() {
    // Clear all previous errors
    clearAllErrors();

    // Calculate electricity bills
    const electricityData = calculateElectricityBills();
    if (electricityData === null) {
        return; // Validation failed
    }

    // Also calculate water bills to include in total
    const waterData = calculateWaterBills();
    
    // Display electricity results with water bill included
    if (waterData !== null) {
        displayElectricityResultsWithWater(electricityData, waterData);
    } else {
        // If water calculation fails, show only electricity
        displayElectricityResults(electricityData);
    }
}

/**
 * Calculate water only
 */
function calculateWaterOnly() {
    // Clear all previous errors
    clearAllErrors();

    // Calculate water bills
    const waterData = calculateWaterBills();
    if (waterData === null) {
        return; // Validation failed
    }

    // Display water results only
    displayWaterResults(waterData);
}

/**
 * Main calculation function (for both)
 */
function calculateBills() {
    // Clear all previous errors
    clearAllErrors();

    // Calculate electricity bills
    const electricityData = calculateElectricityBills();
    if (electricityData === null) {
        return; // Validation failed
    }

    // Calculate water bills
    const waterData = calculateWaterBills();
    if (waterData === null) {
        return; // Validation failed
    }

    // Display results
    displayResults(electricityData, waterData);
}

/**
 * Auto-calculate total units from meter readings
 */
function autoCalculateTotalUnits() {
    let totalUnits = 0;
    let allReadingsValid = true;

    for (const member of MEMBERS) {
        const previousInput = document.getElementById(`${member.id}-previous`);
        const currentInput = document.getElementById(`${member.id}-current`);
        
        if (previousInput && currentInput) {
            const previous = parseFloat(previousInput.value);
            const current = parseFloat(currentInput.value);
            
            if (!isNaN(previous) && !isNaN(current) && current >= previous) {
                totalUnits += (current - previous);
            } else if (previousInput.value !== '' || currentInput.value !== '') {
                allReadingsValid = false;
            }
        }
    }

    const totalUnitsInput = document.getElementById('total-units');
    if (totalUnitsInput && allReadingsValid && totalUnits > 0) {
        totalUnitsInput.value = roundToTwoDecimals(totalUnits).toFixed(2);
    } else if (totalUnitsInput && !allReadingsValid) {
        // Don't update if readings are incomplete or invalid
    }
}

/**
 * Initialize - Add Enter key support and auto-calculation
 */
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger calculation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBills();
            }
        });
    });

    // Auto-calculate total units when meter readings change
    MEMBERS.forEach(member => {
        const previousInput = document.getElementById(`${member.id}-previous`);
        const currentInput = document.getElementById(`${member.id}-current`);
        
        if (previousInput) {
            previousInput.addEventListener('input', autoCalculateTotalUnits);
            previousInput.addEventListener('blur', autoCalculateTotalUnits);
        }
        
        if (currentInput) {
            currentInput.addEventListener('input', autoCalculateTotalUnits);
            currentInput.addEventListener('blur', autoCalculateTotalUnits);
        }
    });
});