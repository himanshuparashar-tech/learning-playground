import React, { useState, useEffect } from 'react'
import '../../calculator.css'

const MEMBERS = [
    { id: 'ashu', name: 'Ashu' },
    { id: 'jay', name: 'Jay' },
    { id: 'bhaiya', name: 'Bhaiya' },
    { id: 'aunty', name: 'Aunty' }
];

const TOTAL_MEMBERS = MEMBERS.length;

const HBC = () => {
    // Electricity Bill State
    const [totalElectricityBill, setTotalElectricityBill] = useState('');
    const [totalUnits, setTotalUnits] = useState('');
    const [perUnitBill, setPerUnitBill] = useState('');
    const [perUnitTotal, setPerUnitTotal] = useState('');
    const [perUnitResult, setPerUnitResult] = useState({ show: false, value: '', color: '' });
    const [savedPerUnitPrice, setSavedPerUnitPrice] = useState(null);

    // Member readings state
    const [memberReadings, setMemberReadings] = useState({
        ashu: { previous: '', current: '' },
        jay: { previous: '', current: '' },
        bhaiya: { previous: '', current: '' },
        aunty: { previous: '', current: '' }
    });

    // Water Bill State
    const [waterPreviousReading, setWaterPreviousReading] = useState('');
    const [waterCurrentReading, setWaterCurrentReading] = useState('');
    const [totalWaterUnits, setTotalWaterUnits] = useState('');
    const [waterPricePerUnit, setWaterPricePerUnit] = useState('');

    // Errors State
    const [errors, setErrors] = useState({});

    // Results State
    const [results, setResults] = useState(null);

    // Helper Functions (defined before useEffect to avoid hoisting issues)
    const roundToTwoDecimals = (value) => {
        return Math.round(value * 100) / 100;
    };

    // Auto-calculate total units when member readings change
    useEffect(() => {
        let total = 0;
        let allReadingsValid = true;
        let hasAnyReading = false;

        for (const member of MEMBERS) {
            const previous = parseFloat(memberReadings[member.id].previous);
            const current = parseFloat(memberReadings[member.id].current);

            if (memberReadings[member.id].previous !== '' || memberReadings[member.id].current !== '') {
                hasAnyReading = true;
            }

            if (!isNaN(previous) && !isNaN(current) && current >= previous) {
                total += (current - previous);
            } else if (memberReadings[member.id].previous !== '' || memberReadings[member.id].current !== '') {
                allReadingsValid = false;
            }
        }

        if (!hasAnyReading) {
            // Clear total units if all readings are cleared
            setTotalUnits('');
        } else if (allReadingsValid && total > 0) {
            setTotalUnits(roundToTwoDecimals(total).toFixed(2));
        }
    }, [memberReadings]);

    const formatCurrency = (amount) => {
        return `₹${roundToTwoDecimals(amount).toFixed(2)}`;
    };

    const showError = (field, message) => {
        setErrors(prev => ({ ...prev, [field]: message }));
    };

    const clearError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const clearAllErrors = () => {
        setErrors({});
    };

    const getNumericValue = (value, fieldName, errorKey) => {
        const numValue = parseFloat(value);

        if (isNaN(numValue) || numValue < 0) {
            showError(errorKey, `${fieldName} must be a valid positive number`);
            return null;
        }

        clearError(errorKey);
        return numValue;
    };

    const validateMeterReadings = (memberId, memberName) => {
        const previous = getNumericValue(
            memberReadings[memberId].previous,
            `${memberName} Previous Reading`,
            `${memberId}-previous`
        );

        const current = getNumericValue(
            memberReadings[memberId].current,
            `${memberName} Current Reading`,
            `${memberId}-current`
        );

        if (previous === null || current === null) {
            return null;
        }

        if (current < previous) {
            showError(`${memberId}-current`, 'Current reading cannot be less than previous reading');
            return null;
        }

        return { previous, current };
    };

    // Calculate Per Unit
    const calculatePerUnit = () => {
        const billAmount = parseFloat(perUnitBill);
        const totalUnitsValue = parseFloat(perUnitTotal);

        if (isNaN(billAmount) || billAmount <= 0) {
            setPerUnitResult({
                show: true,
                value: 'Please enter a valid bill amount',
                color: '#dc2626'
            });
            return;
        }

        if (isNaN(totalUnitsValue) || totalUnitsValue <= 0) {
            setPerUnitResult({
                show: true,
                value: 'Please enter valid total units',
                color: '#dc2626'
            });
            return;
        }

        const perUnitCost = billAmount / totalUnitsValue;
        const roundedPerUnitCost = roundToTwoDecimals(perUnitCost);
        setSavedPerUnitPrice(roundedPerUnitCost);
        setWaterPricePerUnit(roundedPerUnitCost.toFixed(2));
        setPerUnitResult({
            show: true,
            value: `💰 <strong>Price Per Unit: ₹${roundedPerUnitCost.toFixed(2)}</strong> (Saved - will be used in calculations)`,
            color: '#92400e'
        });
    };

    // Calculate Electricity Bills
    const calculateElectricityBills = () => {
        const readings = {};
        let totalUnitsValue = 0;

        for (const member of MEMBERS) {
            const memberReadingsData = validateMeterReadings(member.id, member.name);
            if (memberReadingsData === null) {
                return null;
            }

            const units = memberReadingsData.current - memberReadingsData.previous;
            readings[member.id] = {
                name: member.name,
                previous: memberReadingsData.previous,
                current: memberReadingsData.current,
                units: units
            };

            totalUnitsValue += units;
        }

        if (totalUnitsValue === 0) {
            showError('total-electricity-bill', 'Total units consumed cannot be zero');
            return null;
        }

        let perUnitCost;

        // Use saved per unit price if available, otherwise calculate from total bill amount
        if (savedPerUnitPrice !== null && savedPerUnitPrice > 0) {
            perUnitCost = savedPerUnitPrice;
        } else {
            const totalBillAmount = getNumericValue(
                totalElectricityBill,
                'Total Electricity Bill',
                'total-electricity-bill'
            );

            if (totalBillAmount === null) {
                return null;
            }

            perUnitCost = totalBillAmount / totalUnitsValue;
        }

        const electricityResults = {};
        for (const member of MEMBERS) {
            const memberData = readings[member.id];
            const electricityAmount = memberData.units * perUnitCost;

            electricityResults[member.id] = {
                name: memberData.name,
                units: memberData.units,
                electricityAmount: electricityAmount
            };
        }

        return {
            totalUnits: totalUnitsValue,
            perUnitCost: perUnitCost,
            results: electricityResults
        };
    };

    // Calculate Water Bills
    // ✅ FIXED Calculate Water Bills
    const calculateWaterBills = () => {
        let totalWaterUnitsValue = 0;

        // Case 1: Meter readings provided
        if (
            waterPreviousReading &&
            waterPreviousReading.trim() !== '' &&
            waterCurrentReading &&
            waterCurrentReading.trim() !== ''
        ) {
            const previousReading = getNumericValue(
                waterPreviousReading,
                'Water Previous Reading',
                'water-previous'
            );

            if (previousReading === null) return null;

            const currentReading = getNumericValue(
                waterCurrentReading,
                'Water Current Reading',
                'water-current'
            );

            if (currentReading === null) return null;

            if (currentReading < previousReading) {
                showError('water-current', 'Current reading cannot be less than previous reading');
                return null;
            }

            // ✅ CORRECT: difference only
            totalWaterUnitsValue = currentReading - previousReading;
        }
        // Case 2: Manual total units provided
        else {
            const providedUnits = getNumericValue(
                totalWaterUnits,
                'Total Water Units',
                'water-units'
            );

            if (providedUnits === null) return null;

            totalWaterUnitsValue = providedUnits;
        }

        const waterPricePerUnitValue = getNumericValue(
            waterPricePerUnit,
            'Water Price per Unit',
            'water-price'
        );

        if (waterPricePerUnitValue === null) return null;

        // ✅ Divide ONLY for per-member calculation
        const waterUnitsPerMember = roundToTwoDecimals(
            totalWaterUnitsValue / TOTAL_MEMBERS
        );

        const waterBillPerMember = roundToTwoDecimals(
            waterUnitsPerMember * waterPricePerUnitValue
        );

        return {
            totalWaterUnits: roundToTwoDecimals(totalWaterUnitsValue), // ✅ FULL units
            waterUnitsPerMember,
            waterBillPerMember
        };
    };


    // Calculate Electricity Only
    const calculateElectricityOnly = (e) => {
        if (e) {
            e.preventDefault();
        }
        clearAllErrors();

        const electricityData = calculateElectricityBills();
        if (electricityData === null) {
            return;
        }

        const waterData = calculateWaterBills();

        if (waterData !== null) {
            setResults({ type: 'electricity-with-water', electricity: electricityData, water: waterData });
        } else {
            setResults({ type: 'electricity-only', electricity: electricityData });
        }
    };

    // Calculate Water Only
    const calculateWaterOnly = (e) => {
        if (e) {
            e.preventDefault();
        }
        clearAllErrors();

        const waterData = calculateWaterBills();
        if (waterData === null) {
            return;
        }

        setResults({ type: 'water-only', water: waterData });
    };

    // Handle member reading change
    const handleMemberReadingChange = (memberId, field, value) => {
        setMemberReadings(prev => ({
            ...prev,
            [memberId]: {
                ...prev[memberId],
                [field]: value
            }
        }));
    };

    // Handle key press for Enter key
    const handleKeyPress = (e, action) => {
        if (e.key === 'Enter') {
            action();
        }
    };

    return (
        <div className="main-body">
            <div className="calculator-container">
                <h1>🏠 HBC</h1>
                {/* <p className="calculator-subtitle">Calculate Electricity & Water Bills for 4 Members</p> */}

                {/* Electricity Bill Section */}
                <div className="calculator-section">
                    <h2 className="calculator-section-title">⚡ Electricity Bill</h2>

                    <div className={`calculator-input-group ${errors['total-electricity-bill'] ? 'calculator-error' : ''}`}>
                        <label htmlFor="total-electricity-bill">
                            Total Electricity Bill Amount (₹)
                            {savedPerUnitPrice !== null && (
                                <span style={{ color: '#92400e', fontSize: '0.85em', marginLeft: '8px' }}>
                                    (Optional - Using saved per unit: ₹{savedPerUnitPrice.toFixed(2)})
                                </span>
                            )}
                        </label>
                        <input
                            type="number"
                            id="total-electricity-bill"
                            step="0.01"
                            min="0"
                            placeholder={savedPerUnitPrice !== null ? "Optional - Saved per unit price will be used" : "Enter total bill amount"}
                            value={totalElectricityBill}
                            onChange={(e) => {
                                setTotalElectricityBill(e.target.value);
                                clearError('total-electricity-bill');
                            }}
                            onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                        />
                        {errors['total-electricity-bill'] && (
                            <span className="calculator-error-message show">{errors['total-electricity-bill']}</span>
                        )}
                    </div>

                    {/* <div className={`calculator-input-group ${errors['total-units'] ? 'calculator-error' : ''}`}>
                        <label htmlFor="total-units">Total Units (Optional - For Reference Only)</label>
                        <input
                            type="number"
                            id="total-units"
                            step="0.01"
                            min="0"
                            placeholder="Auto-calculated from meter readings"
                            value={totalUnits}
                            onChange={(e) => {
                                setTotalUnits(e.target.value);
                                clearError('total-units');
                            }}
                            readOnly
                        />
                        {errors['total-units'] && (
                            <span className="calculator-error-message show">{errors['total-units']}</span>
                        )}
                        <small style={{ color: '#6b7280', fontSize: '0.85em', marginTop: '4px', display: 'block' }}>
                            Note: Calculation uses individual meter readings (Current - Previous) for each member
                        </small>
                    </div> */}

                    {/* Per Unit Calculator */}
                    <div className="calculator-per-unit-calculator">
                        <div className="calculator-input-group">
                            <label htmlFor="per-unit-bill">Bill Amount (₹)</label>
                            <input
                                type="number"
                                id="per-unit-bill"
                                step="0.01"
                                min="0"
                                placeholder="e.g., 4000"
                                value={perUnitBill}
                                onChange={(e) => {
                                    setPerUnitBill(e.target.value);
                                    // Clear water price if it was auto-filled from saved price
                                    if (savedPerUnitPrice !== null && waterPricePerUnit &&
                                        Math.abs(parseFloat(waterPricePerUnit) - savedPerUnitPrice) < 0.01) {
                                        setWaterPricePerUnit('');
                                    }
                                    setSavedPerUnitPrice(null);
                                    setPerUnitResult({ show: false, value: '', color: '' });
                                }}
                                onKeyPress={(e) => handleKeyPress(e, calculatePerUnit)}
                            />
                        </div>
                        <div className="calculator-input-group">
                            <label htmlFor="per-unit-total">Total Units</label>
                            <input
                                type="number"
                                id="per-unit-total"
                                step="0.01"
                                min="0"
                                placeholder="e.g., 1000"
                                value={perUnitTotal}
                                onChange={(e) => {
                                    setPerUnitTotal(e.target.value);
                                    // Clear water price if it was auto-filled from saved price
                                    if (savedPerUnitPrice !== null && waterPricePerUnit &&
                                        Math.abs(parseFloat(waterPricePerUnit) - savedPerUnitPrice) < 0.01) {
                                        setWaterPricePerUnit('');
                                    }
                                    setSavedPerUnitPrice(null);
                                    setPerUnitResult({ show: false, value: '', color: '' });
                                }}
                                onKeyPress={(e) => handleKeyPress(e, calculatePerUnit)}
                            />
                        </div>
                        <button className="calculator-per-unit-btn" onClick={calculatePerUnit}>
                            Calculate Per Unit
                        </button>
                    </div>
                    {perUnitResult.show && (
                        <div
                            className="calculator-per-unit-result show"
                            style={{ color: perUnitResult.color }}
                            dangerouslySetInnerHTML={{ __html: perUnitResult.value }}
                        />
                    )}

                    <div className="calculator-members-grid">
                        {MEMBERS.map(member => (
                            <div key={member.id} className="calculator-member-card">
                                <h3>{member.name}</h3>
                                <div className="calculator-member-inputs">
                                    <div className={`calculator-input-group ${errors[`${member.id}-previous`] ? 'calculator-error' : ''}`}>
                                        <label htmlFor={`${member.id}-previous`}>Previous Reading</label>
                                        <input
                                            type="number"
                                            id={`${member.id}-previous`}
                                            step="0.01"
                                            min="0"
                                            placeholder="Previous"
                                            value={memberReadings[member.id].previous}
                                            onChange={(e) => {
                                                handleMemberReadingChange(member.id, 'previous', e.target.value);
                                                clearError(`${member.id}-previous`);
                                            }}
                                            onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                                        />
                                        {errors[`${member.id}-previous`] && (
                                            <span className="calculator-error-message show">{errors[`${member.id}-previous`]}</span>
                                        )}
                                    </div>
                                    <div className={`calculator-input-group ${errors[`${member.id}-current`] ? 'calculator-error' : ''}`}>
                                        <label htmlFor={`${member.id}-current`}>Current Reading</label>
                                        <input
                                            type="number"
                                            id={`${member.id}-current`}
                                            step="0.01"
                                            min="0"
                                            placeholder="Current"
                                            value={memberReadings[member.id].current}
                                            onChange={(e) => {
                                                handleMemberReadingChange(member.id, 'current', e.target.value);
                                                clearError(`${member.id}-current`);
                                            }}
                                            onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                                        />
                                        {errors[`${member.id}-current`] && (
                                            <span className="calculator-error-message show">{errors[`${member.id}-current`]}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Water Bill Section */}
                <div className="calculator-section">
                    <h2 className="calculator-section-title">💧 Water Bill</h2>

                    <div className={`calculator-input-group ${errors['water-previous'] ? 'calculator-error' : ''}`}>
                        <label htmlFor="water-previous-reading">Previous Water Reading</label>
                        <input
                            type="number"
                            id="water-previous-reading"
                            step="0.01"
                            min="0"
                            placeholder="Enter previous water reading"
                            value={waterPreviousReading}
                            onChange={(e) => {
                                setWaterPreviousReading(e.target.value);
                                clearError('water-previous');
                            }}
                            onKeyPress={(e) => handleKeyPress(e, calculateWaterOnly)}
                        />
                        {errors['water-previous'] && (
                            <span className="calculator-error-message show">{errors['water-previous']}</span>
                        )}
                    </div>

                    <div className={`calculator-input-group ${errors['water-current'] ? 'calculator-error' : ''}`}>
                        <label htmlFor="water-current-reading">Current Water Reading</label>
                        <input
                            type="number"
                            id="water-current-reading"
                            step="0.01"
                            min="0"
                            placeholder="Enter current water reading"
                            value={waterCurrentReading}
                            onChange={(e) => {
                                setWaterCurrentReading(e.target.value);
                                clearError('water-current');
                            }}
                            onKeyPress={(e) => handleKeyPress(e, calculateWaterOnly)}
                        />
                        {errors['water-current'] && (
                            <span className="calculator-error-message show">{errors['water-current']}</span>
                        )}
                    </div>

                    <div className="calculator-members-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <div className={`calculator-input-group ${errors['water-units'] ? 'calculator-error' : ''}`}>
                            <label htmlFor="total-water-units">
                                Total Water Units (Optional - Auto-calculated if readings provided)
                            </label>
                            <input
                                type="number"
                                id="total-water-units"
                                step="0.01"
                                min="0"
                                placeholder="Enter total water units (optional)"
                                value={totalWaterUnits}
                                onChange={(e) => {
                                    setTotalWaterUnits(e.target.value);
                                    clearError('water-units');
                                }}
                                onKeyPress={(e) => handleKeyPress(e, calculateWaterOnly)}
                            />
                            {errors['water-units'] && (
                                <span className="calculator-error-message show">{errors['water-units']}</span>
                            )}
                        </div>
                        <div className={`calculator-input-group ${errors['water-price'] ? 'calculator-error' : ''}`}>
                            <label htmlFor="water-price-per-unit">Water Price per Unit (₹)</label>
                            <input
                                type="number"
                                id="water-price-per-unit"
                                step="0.01"
                                min="0"
                                placeholder="Enter price per unit"
                                value={waterPricePerUnit}
                                onChange={(e) => {
                                    setWaterPricePerUnit(e.target.value);
                                    clearError('water-price');
                                }}
                                onKeyPress={(e) => handleKeyPress(e, calculateWaterOnly)}
                            />
                            {errors['water-price'] && (
                                <span className="calculator-error-message show">{errors['water-price']}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Calculate Buttons */}
                <div className="calculator-button-group">
                    <button className="calculator-calculate-btn" onClick={calculateElectricityOnly}>
                        ⚡ Calculate Electricity Bill
                    </button>
                    <button className="calculator-calculate-btn-secondary" onClick={calculateWaterOnly}>
                        💧 Calculate Water Bill
                    </button>
                </div>

                {/* Results Section */}
                {results && (
                    <div className="calculator-results-section show">
                        <h2 className="calculator-section-title">📊 Calculation Results</h2>

                        <div className="calculator-summary-box">
                            <div className="calculator-summary-card">
                                <h4>Total Electricity Units</h4>
                                <div className="calculator-value">
                                    {results.type === 'water-only' ? 'N/A' :
                                        roundToTwoDecimals(results.electricity.totalUnits).toFixed(2)}
                                </div>
                            </div>
                            <div className="calculator-summary-card">
                                <h4>Per Unit Cost</h4>
                                <div className="calculator-value">
                                    {results.type === 'water-only' ? 'N/A' :
                                        formatCurrency(results.electricity.perUnitCost)}
                                </div>
                            </div>
                            <div className="calculator-summary-card">
                                <h4>Total Water Units</h4>
                                <div className="calculator-value">
                                    {results.type === 'electricity-only' ? 'N/A' :
                                        roundToTwoDecimals(results.water.totalWaterUnits).toFixed(2)}
                                </div>
                            </div>
                            <div className="calculator-summary-card">
                                <h4>Water Units Per Member</h4>
                                <div className="calculator-value">
                                    {results.type === 'electricity-only' ? 'N/A' :
                                        roundToTwoDecimals(results.water.waterUnitsPerMember).toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <table className="calculator-results-table">
                            <thead>
                                <tr>
                                    <th>Member Name</th>
                                    <th>Electricity Units</th>
                                    <th>Electricity Amount (₹)</th>
                                    <th>Water Amount (₹)</th>
                                    <th>Total Payable (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    let grandTotal = 0;
                                    const rows = MEMBERS.map(member => {
                                        let electricityAmount = 0;
                                        let waterAmount = 0;
                                        let electricityUnits = 0;

                                        if (results.type !== 'water-only') {
                                            const electricityResult = results.electricity.results[member.id];
                                            electricityAmount = electricityResult.electricityAmount;
                                            electricityUnits = electricityResult.units;
                                        }

                                        if (results.type !== 'electricity-only') {
                                            waterAmount = results.water.waterBillPerMember;
                                        }

                                        const totalPayable = electricityAmount + waterAmount;
                                        grandTotal += totalPayable;

                                        return (
                                            <tr key={member.id}>
                                                <td><strong>{member.name}</strong></td>
                                                <td>
                                                    {results.type === 'water-only' ? 'N/A' :
                                                        roundToTwoDecimals(electricityUnits).toFixed(2)}
                                                </td>
                                                <td>
                                                    {results.type === 'water-only' ? 'N/A' :
                                                        formatCurrency(electricityAmount)}
                                                </td>
                                                <td>
                                                    {results.type === 'electricity-only' ? 'N/A' :
                                                        formatCurrency(waterAmount)}
                                                </td>
                                                <td><strong>{formatCurrency(totalPayable)}</strong></td>
                                            </tr>
                                        );
                                    });

                                    return [
                                        ...rows,
                                        <tr key="total" className="calculator-total-row">
                                            <td><strong>TOTAL</strong></td>
                                            <td>
                                                <strong>
                                                    {results.type === 'water-only' ? 'N/A' :
                                                        roundToTwoDecimals(results.electricity.totalUnits).toFixed(2)}
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                    {results.type === 'water-only' ? 'N/A' :
                                                        formatCurrency(results.electricity.totalUnits * results.electricity.perUnitCost)}
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                    {results.type === 'electricity-only' ? 'N/A' :
                                                        formatCurrency(results.water.waterBillPerMember * TOTAL_MEMBERS)}
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>{formatCurrency(grandTotal)}</strong>
                                            </td>
                                        </tr>
                                    ];
                                })()}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HBC
