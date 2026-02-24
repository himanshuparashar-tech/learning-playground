import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import '../../calculator.css'

const MEMBERS = [
    { id: 'ashu', name: 'Himanshu Bhai' },
    { id: 'jay', name: 'Jay Bhai' },
    { id: 'sudhir', name: 'Sudhir Bhai' },
    { id: 'govind', name: 'Govind Bhai' }
];

const TOTAL_MEMBERS = MEMBERS.length;

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};
const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
};
const staggerItem = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 }
};
const resultsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};
const buttonTap = { scale: 0.98 };
const buttonHover = { scale: 1.02 };

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
        sudhir: { previous: '', current: '' },
        govind: { previous: '', current: '' }
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
                'Motor previous reading',
                'water-previous'
            );

            if (previousReading === null) return null;

            const currentReading = getNumericValue(
                waterCurrentReading,
                'Motor current reading',
                'water-current'
            );

            if (currentReading === null) return null;

            if (currentReading < previousReading) {
                showError('water-current', 'Motor current reading cannot be less than previous');
                return null;
            }

            // ✅ CORRECT: difference only
            totalWaterUnitsValue = currentReading - previousReading;
        }
        // Case 2: Manual total units provided
        else {
            const providedUnits = getNumericValue(
                totalWaterUnits,
                'Motor total units',
                'water-units'
            );

            if (providedUnits === null) return null;

            totalWaterUnitsValue = providedUnits;
        }

        const waterPricePerUnitValue = getNumericValue(
            waterPricePerUnit,
            'Motor price per unit',
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

    // Price per unit section is disabled until all cards have previous + current readings
    const allReadingsFilled = (() => {
        for (const member of MEMBERS) {
            const r = memberReadings[member.id];
            if (r.previous.trim() === '' || r.current.trim() === '') return false;
        }
        if (waterPreviousReading.trim() === '' || waterCurrentReading.trim() === '') return false;
        return true;
    })();

    // Motor meter difference (current - previous) when both valid
    const motorDifference = (() => {
        const prev = parseFloat(waterPreviousReading);
        const curr = parseFloat(waterCurrentReading);
        if (waterPreviousReading === '' || waterCurrentReading === '' || isNaN(prev) || isNaN(curr) || curr < prev) return null;
        return roundToTwoDecimals(curr - prev);
    })();

    // Total of all differences: sub-meters total + motor difference
    const totalAllDifferences = (() => {
        const subTotal = totalUnits ? parseFloat(totalUnits) : 0;
        const motor = motorDifference != null ? motorDifference : 0;
        const combined = subTotal + motor;
        return (subTotal > 0 || motor > 0) ? roundToTwoDecimals(combined).toFixed(2) : null;
    })();

    // Copy total of all differences (sub-meters + motor) to "Total units" at the top (section 1)
    const handleCalculateTotalUnits = () => {
        if (totalAllDifferences && parseFloat(totalAllDifferences) > 0) {
            setPerUnitTotal(totalAllDifferences);
        }
    };

    const resultsSectionRef = useRef(null);

    const getTableBodyData = () => {
        if (!results) return { headers: [], body: [] };
        const headers = ['Member', 'Sub-meter units', 'Sub-meter (₹)', 'Motor (₹)', 'Total (₹)'];
        const body = [];
        let grandTotal = 0;
        MEMBERS.forEach(member => {
            let electricityAmount = 0, waterAmount = 0, electricityUnits = 0;
            if (results.type !== 'water-only' && results.electricity) {
                const r = results.electricity.results[member.id];
                electricityAmount = r.electricityAmount;
                electricityUnits = r.units;
            }
            if (results.type !== 'electricity-only' && results.water) {
                waterAmount = results.water.waterBillPerMember;
            }
            const totalPayable = electricityAmount + waterAmount;
            grandTotal += totalPayable;
            body.push([
                member.name,
                results.type === 'water-only' ? 'N/A' : roundToTwoDecimals(electricityUnits).toFixed(2),
                results.type === 'water-only' ? 'N/A' : formatCurrency(electricityAmount),
                results.type === 'electricity-only' ? 'N/A' : formatCurrency(waterAmount),
                formatCurrency(totalPayable)
            ]);
        });
        const totalSub = results.electricity ? roundToTwoDecimals(results.electricity.totalUnits).toFixed(2) : 'N/A';
        const totalSubAmt = results.electricity ? formatCurrency(results.electricity.totalUnits * results.electricity.perUnitCost) : 'N/A';
        const totalMotor = results.water ? formatCurrency(results.water.waterBillPerMember * TOTAL_MEMBERS) : 'N/A';
        body.push(['TOTAL', totalSub, totalSubAmt, totalMotor, formatCurrency(grandTotal)]);
        return { headers, body };
    };

    const downloadAsPDF = () => {
        if (!results) return;
        const doc = new jsPDF();
        const left = 14;
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const marginBottom = 20;
        let y = 18;
        const lineHeight = 6;
        const sectionGap = 6;

        const addPageIfNeeded = (requiredSpace = lineHeight) => {
            if (y + requiredSpace > pageH - marginBottom) {
                doc.addPage();
                y = 18;
            }
        };

        const fmt = (v) => {
            if (v === '' || v == null) return '—';
            const n = parseFloat(v);
            return isNaN(n) ? '—' : (Number.isInteger(n) ? String(n) : n.toFixed(2));
        };

        doc.setFontSize(10);
        const centerX = pageW / 2;

        // ——— Section 1: Meter Readings (table, centered) ———
        addPageIfNeeded(lineHeight * 12);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('Meter Readings', centerX, y, { align: 'center' });
        y += lineHeight + 2;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        const meterRows = [];
        MEMBERS.forEach((member, i) => {
            const prev = memberReadings[member.id].previous;
            const curr = memberReadings[member.id].current;
            const prevN = prev !== '' ? parseFloat(prev) : NaN;
            const currN = curr !== '' ? parseFloat(curr) : NaN;
            const diff = (!isNaN(prevN) && !isNaN(currN) && currN >= prevN) ? roundToTwoDecimals(currN - prevN) : null;
            meterRows.push([`${i + 1} house ${member.name}`, fmt(prev), fmt(curr), diff != null ? diff.toFixed(2) : '—']);
        });
        const motorPrevN = waterPreviousReading !== '' ? parseFloat(waterPreviousReading) : NaN;
        const motorCurrN = waterCurrentReading !== '' ? parseFloat(waterCurrentReading) : NaN;
        const motorDiff = (!isNaN(motorPrevN) && !isNaN(motorCurrN) && motorCurrN >= motorPrevN) ? roundToTwoDecimals(motorCurrN - motorPrevN) : null;
        meterRows.push(['MOTOR', fmt(waterPreviousReading), fmt(waterCurrentReading), motorDiff != null ? motorDiff.toFixed(2) : '—']);

        autoTable(doc, {
            head: [['Meter', 'Previous', 'Current', 'Difference']],
            body: meterRows,
            startY: y,
            theme: 'grid',
            headStyles: { fontStyle: 'bold', halign: 'center' },
            bodyStyles: { halign: 'center' },
            columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' } }
        });
        y = doc.lastAutoTable.finalY + sectionGap;

        // ——— Section 2: Total used Unit & Unit wise bill (centered, bold heading) ———
        addPageIfNeeded(lineHeight * 4);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('Total used Unit & Unit wise bill', centerX, y, { align: 'center' });
        y += lineHeight + 2;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        const perUnitCost = results.electricity ? results.electricity.perUnitCost : parseFloat(waterPricePerUnit || 0);
        const motorUnitsPerMember = results.water ? roundToTwoDecimals(results.water.totalWaterUnits / TOTAL_MEMBERS) : 0;

        MEMBERS.forEach((member, i) => {
            addPageIfNeeded(lineHeight * 4);
            const subUnits = results.type !== 'water-only' && results.electricity
                ? roundToTwoDecimals(results.electricity.results[member.id].units)
                : 0;
            const totalUnitsPerson = roundToTwoDecimals(subUnits + motorUnitsPerMember);
            const amount = results.type === 'water-only'
                ? roundToTwoDecimals(results.water.waterBillPerMember)
                : roundToTwoDecimals(totalUnitsPerson * perUnitCost);

            doc.text(`${i + 1} house ${member.name} -`, centerX, y, { align: 'center' });
            y += lineHeight;
            doc.text(`${subUnits.toFixed(2)} + ${motorUnitsPerMember.toFixed(2)} (motor) = ${totalUnitsPerson.toFixed(2)}`, centerX, y, { align: 'center' });
            y += lineHeight;
            doc.text(`${totalUnitsPerson.toFixed(2)} x ${perUnitCost.toFixed(2)} = ₹${amount.toFixed(2)}`, centerX, y, { align: 'center' });
            y += lineHeight + 2;
        });
        y += sectionGap - 2;

        // ——— Section 3: Total bill / Total unit consumed (centered, bold heading) ———
        addPageIfNeeded(lineHeight * 4);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('Total bill / Total unit consumed', centerX, y, { align: 'center' });
        y += lineHeight + 2;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        const totalUnitsConsumed = results.electricity
            ? roundToTwoDecimals(results.electricity.totalUnits + (results.water ? results.water.totalWaterUnits : 0))
            : (results.water ? roundToTwoDecimals(results.water.totalWaterUnits) : 0);
        let totalBillAmount = 0;
        if (results.electricity && results.water) {
            totalBillAmount = roundToTwoDecimals(
                results.electricity.totalUnits * results.electricity.perUnitCost +
                results.water.totalWaterUnits * parseFloat(waterPricePerUnit || 0)
            );
        } else if (results.electricity) {
            totalBillAmount = roundToTwoDecimals(results.electricity.totalUnits * results.electricity.perUnitCost);
        } else if (results.water) {
            totalBillAmount = roundToTwoDecimals(results.water.totalWaterUnits * parseFloat(waterPricePerUnit || 0));
        }
        const perUnitDisplay = totalUnitsConsumed > 0 ? roundToTwoDecimals(totalBillAmount / totalUnitsConsumed) : perUnitCost;

        doc.text(`= ₹${totalBillAmount.toFixed(2)} / ${totalUnitsConsumed.toFixed(2)}`, centerX, y, { align: 'center' });
        y += lineHeight;
        doc.text(`= ₹${perUnitDisplay.toFixed(2)} per unit price`, centerX, y, { align: 'center' });

        doc.save('hbc-results.pdf');
    };

    const downloadAsJPG = async () => {
        if (!resultsSectionRef.current) return;
        try {
            const canvas = await html2canvas(resultsSectionRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            });
            const link = document.createElement('a');
            link.download = 'hbc-results.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.92);
            link.click();
        } catch (e) {
            console.error('JPG export failed', e);
        }
    };

    return (
        <div className="main-body">
            <motion.div
                className="calculator-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} transition={fadeInUp.transition}>
                    <h1>🏠 HBC</h1>
                    <p className="calculator-intro">
                        One main meter bill, <strong>4 sub-meters</strong> (pay by your units), and <strong>1 motor meter</strong> (split equally). Set the rate, enter readings, then click <strong>Calculate Bills</strong>.
                    </p>
                    <div className="calculator-steps-pill">
                        <span className="calculator-step-dot">1</span>
                        <span className="calculator-step-label">Rate</span>
                        <span className="calculator-step-arrow">→</span>
                        <span className="calculator-step-dot">2</span>
                        <span className="calculator-step-label">Readings</span>
                        <span className="calculator-step-arrow">→</span>
                        <span className="calculator-step-dot">3</span>
                        <span className="calculator-step-label">Calculate</span>
                    </div>
                </motion.div>

                {/* Step 1: Price per unit — from main bill (disabled until all readings filled) */}
                <motion.div
                    className={`calculator-section calculator-section-per-unit ${!allReadingsFilled ? 'calculator-section-disabled' : ''}`}
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                >
                    <h2 className="calculator-section-title">1. Price per unit (from main bill)</h2>
                    <p className="calculator-section-hint">
                        {allReadingsFilled ? 'Use your main meter bill to get ₹/unit; same rate for sub-meters and motor.' : 'Fill previous & current readings in every card (4 sub-meters + motor) to enable this section.'}
                    </p>
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
                                disabled={!allReadingsFilled}
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
                                disabled={!allReadingsFilled}
                            />
                        </div>
                        <motion.button
                            type="button"
                            className="calculator-per-unit-btn"
                            onClick={calculatePerUnit}
                            whileHover={allReadingsFilled ? buttonHover : undefined}
                            whileTap={allReadingsFilled ? buttonTap : undefined}
                            disabled={!allReadingsFilled}
                        >
                            Calculate Per Unit
                        </motion.button>
                    </div>
                    {perUnitResult.show && (
                        <motion.div
                            className="calculator-per-unit-result show"
                            style={{ color: perUnitResult.color }}
                            dangerouslySetInnerHTML={{ __html: perUnitResult.value }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </motion.div>

                {/* Step 2: Sub-meters — pay by your units */}
                <motion.div
                    className="calculator-section"
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                >
                    <h2 className="calculator-section-title">2. Sub-meters (pay by your units)</h2>
                    <p className="calculator-section-hint">Enter each person’s sub-meter readings. Bill is split by who used how many units.</p>
                    <div className={`calculator-input-group ${errors['total-electricity-bill'] ? 'calculator-error' : ''}`}>
                        <label htmlFor="total-electricity-bill">
                            Main meter total bill (₹) <span className="calculator-label-optional"></span>
                            {savedPerUnitPrice !== null && (
                                <span className="calculator-saved-rate">Using saved rate: ₹{savedPerUnitPrice.toFixed(2)}/unit</span>
                            )}
                        </label>
                        <input
                            type="number"
                            id="total-electricity-bill"
                            step="0.01"
                            min="0"
                            placeholder={savedPerUnitPrice !== null ? "Leave blank to use saved rate" : "Enter main bill to derive rate"}
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

                    <motion.div className="calculator-members-grid" variants={staggerContainer} initial="initial" animate="animate">
                        {MEMBERS.map((member, index) => (
                            <motion.div key={member.id} className="calculator-member-card" variants={staggerItem} custom={index}>
                                <h3>{member.name} — sub-meter</h3>
                                <div className="calculator-member-inputs">
                                    <div className={`calculator-input-group ${errors[`${member.id}-previous`] ? 'calculator-error' : ''}`}>
                                        <label htmlFor={`${member.id}-previous`}>Previous reading</label>
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
                                        <label htmlFor={`${member.id}-current`}>Current reading</label>
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
                                    {(() => {
                                        const prev = parseFloat(memberReadings[member.id].previous);
                                        const curr = parseFloat(memberReadings[member.id].current);
                                        if (memberReadings[member.id].previous === '' || memberReadings[member.id].current === '' || isNaN(prev) || isNaN(curr) || curr < prev) return null;
                                        return (
                                            <div className="calculator-member-diff-inline">
                                                Difference: <strong>{roundToTwoDecimals(curr - prev).toFixed(2)}</strong>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </motion.div>
                        ))}

                        {/* Motor meter card — same grid */}
                        <motion.div className="calculator-member-card calculator-motor-card" variants={staggerItem}>
                            <h3>Motor meter (split equally)</h3>
                            <div className="calculator-member-inputs">
                                <div className={`calculator-input-group ${errors['water-previous'] ? 'calculator-error' : ''}`}>
                                    <label htmlFor="water-previous-reading">Previous reading</label>
                                    <input
                                        type="number"
                                        id="water-previous-reading"
                                        step="0.01"
                                        min="0"
                                        placeholder="Previous"
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
                                    <label htmlFor="water-current-reading">Current reading</label>
                                    <input
                                        type="number"
                                        id="water-current-reading"
                                        step="0.01"
                                        min="0"
                                        placeholder="Current"
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
                                {motorDifference != null && (
                                    <div className="calculator-motor-diff-inline">
                                        Difference: <strong>{motorDifference.toFixed(2)}</strong>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="calculator-submeter-total-row">
                        <span className="calculator-submeter-total-label">
                            {totalUnits && <>Sub-meters total: <strong>{totalUnits}</strong></>}
                            {totalUnits && motorDifference != null && ' · '}
                            {totalAllDifferences && (
                                <>Total of all (sub-meters + motor): <strong>{totalAllDifferences}</strong></>
                            )}
                        </span>
                        <motion.button
                            type="button"
                            className="calculator-per-unit-btn calculator-total-units-btn"
                            onClick={handleCalculateTotalUnits}
                            disabled={!totalAllDifferences || parseFloat(totalAllDifferences) <= 0}
                            aria-label="Copy total of all differences to top section"
                            whileHover={buttonHover}
                            whileTap={buttonTap}
                        >
                            Add total Units
                        </motion.button>
                    </div>
                </motion.div>

                {/* Primary action: sub-meter + motor; secondary: motor only */}
                <motion.div
                    className="calculator-button-group"
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                >
                    <motion.button type="button" className="calculator-calculate-btn" onClick={calculateElectricityOnly} aria-label="Calculate sub-meter and motor bills" whileHover={buttonHover} whileTap={buttonTap}>
                        Calculate Bills
                    </motion.button>
                    <motion.button type="button" className="calculator-calculate-btn-secondary" onClick={calculateWaterOnly} aria-label="Calculate motor meter only" whileHover={buttonHover} whileTap={buttonTap}>
                        Motor only
                    </motion.button>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                {results && (
                    <motion.div
                        className="calculator-results-section show"
                        variants={resultsVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h2 className="calculator-section-title">📊 Your results</h2>

                        <motion.div className="calculator-download-row" variants={staggerItem}>
                            <span className="calculator-download-label">Download:</span>
                            <motion.button type="button" className="calculator-download-btn calculator-download-pdf" onClick={downloadAsPDF} aria-label="Download as PDF" whileHover={buttonHover} whileTap={buttonTap}>
                                PDF
                            </motion.button>
                            <motion.button type="button" className="calculator-download-btn calculator-download-jpg" onClick={downloadAsJPG} aria-label="Download as JPG" whileHover={buttonHover} whileTap={buttonTap}>
                                JPG
                            </motion.button>
                        </motion.div>

                        <motion.div ref={resultsSectionRef} className="calculator-results-download-area" variants={staggerContainer} initial="initial" animate="animate">
                        <motion.div className="calculator-summary-box" variants={staggerContainer} initial="initial" animate="animate">
                            <motion.div className="calculator-summary-card" variants={staggerItem}>
                                <h4>Total sub-meter units</h4>
                                <div className="calculator-value">
                                    {results.type === 'water-only' ? 'N/A' :
                                        roundToTwoDecimals(results.electricity.totalUnits).toFixed(2)}
                                </div>
                            </motion.div>
                            <motion.div className="calculator-summary-card" variants={staggerItem}>
                                <h4>Per unit cost (₹)</h4>
                                <div className="calculator-value">
                                    {results.type === 'water-only' ? 'N/A' :
                                        formatCurrency(results.electricity.perUnitCost)}
                                </div>
                            </motion.div>
                            <motion.div className="calculator-summary-card" variants={staggerItem}>
                                <h4>Motor total units</h4>
                                <div className="calculator-value">
                                    {results.type === 'electricity-only' ? 'N/A' :
                                        roundToTwoDecimals(results.water.totalWaterUnits).toFixed(2)}
                                </div>
                            </motion.div>
                            <motion.div className="calculator-summary-card" variants={staggerItem}>
                                <h4>Motor per person (equal)</h4>
                                <div className="calculator-value">
                                    {results.type === 'electricity-only' ? 'N/A' :
                                        roundToTwoDecimals(results.water.waterUnitsPerMember).toFixed(2)}
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div className="calculator-table-wrapper" variants={staggerItem}>
                        <table className="calculator-results-table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Sub-meter units</th>
                                    <th>Sub-meter (₹)</th>
                                    <th>Motor (₹)</th>
                                    <th>Total (₹)</th>
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
                        </motion.div>
                        </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default HBC
