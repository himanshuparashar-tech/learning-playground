import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'
import '../../calculator.css'

const DEFAULT_MEMBERS = [
    { id: 'm_ashu', name: 'Ashu' },
    { id: 'm_jay', name: 'Jay' },
    { id: 'm_bhaiya', name: 'Bhaiya' },
    { id: 'm_aunty', name: 'Aunty' }
];

const STORAGE_KEY_PREVIOUS_READINGS = 'hbc_previous_readings';
const STORAGE_KEY_MEMBERS = 'hbc_members';

const generateMemberId = () => `m_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

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

const cardFocusVariants = {
    idle: { opacity: 1, y: 0, scale: 1, boxShadow: '0 4px 15px rgba(102, 126, 234, 0.08)' },
    focused: {
        opacity: 1,
        y: 0,
        scale: 1.02,
        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.25), 0 0 0 2px rgba(102, 126, 234, 0.4)',
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const motorCardFocusVariants = {
    idle: { opacity: 1, y: 0, scale: 1, boxShadow: '0 4px 15px rgba(5, 150, 105, 0.08)' },
    focused: {
        opacity: 1,
        y: 0,
        scale: 1.02,
        boxShadow: '0 12px 32px rgba(5, 150, 105, 0.3), 0 0 0 2px rgba(5, 150, 105, 0.5)',
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const getInitialMembers = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_MEMBERS);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) { /* ignore */ }
    return [...DEFAULT_MEMBERS];
};

const HBC = () => {
    // Electricity Bill State
    const [totalElectricityBill, setTotalElectricityBill] = useState('');
    const [totalUnits, setTotalUnits] = useState('');
    const [perUnitBill, setPerUnitBill] = useState('');
    const [perUnitTotal, setPerUnitTotal] = useState('');
    const [perUnitResult, setPerUnitResult] = useState({ show: false, value: '', color: '' });
    const [savedPerUnitPrice, setSavedPerUnitPrice] = useState(null);

    // Dynamic members (add/remove)
    const [members, setMembers] = useState(getInitialMembers);
    const [memberReadings, setMemberReadings] = useState(() => {
        const m = getInitialMembers();
        const obj = {};
        m.forEach(mem => { obj[mem.id] = { previous: '', current: '' }; });
        return obj;
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

    // Track which card is focused (for focus animation)
    const [focusedCardId, setFocusedCardId] = useState(null);

    // Meter photos (optional — record proof, monthly history)
    const [meterImages, setMeterImages] = useState(() => {
        const m = getInitialMembers();
        const obj = { motor: null };
        m.forEach(mem => { obj[mem.id] = null; });
        return obj;
    });
    const [readingPeriodDate, setReadingPeriodDate] = useState('');

    // Persist members when they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
        } catch (e) { /* ignore */ }
    }, [members]);

    // Clear results when members change (user must recalculate)
    useEffect(() => {
        setResults(null);
    }, [members]);

    // Load stored previous readings on mount (auto-fill for next month)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_PREVIOUS_READINGS);
            if (stored) {
                const data = JSON.parse(stored);
                setMemberReadings(prev => {
                    const next = { ...prev };
                    members.forEach(m => {
                        if (data[m.id] != null && data[m.id] !== '') {
                            next[m.id] = { ...next[m.id], previous: String(data[m.id]) };
                        }
                    });
                    return next;
                });
                if (data.motor != null && data.motor !== '') {
                    setWaterPreviousReading(String(data.motor));
                }
            }
        } catch (e) {
            /* ignore parse errors */
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- load once on mount

    // Helper Functions (defined before useEffect to avoid hoisting issues)
    const roundToTwoDecimals = (value) => {
        return Math.round(value * 100) / 100;
    };

    // Auto-calculate total units when member readings change
    useEffect(() => {
        let total = 0;
        let allReadingsValid = true;
        let hasAnyReading = false;

        for (const member of members) {
            const r = memberReadings[member.id];
            if (!r) continue;
            const previous = parseFloat(r.previous);
            const current = parseFloat(r.current);

            if (r.previous !== '' || r.current !== '') {
                hasAnyReading = true;
            }

            if (!isNaN(previous) && !isNaN(current) && current >= previous) {
                total += (current - previous);
            } else if (r.previous !== '' || r.current !== '') {
                allReadingsValid = false;
            }
        }

        if (!hasAnyReading) {
            setTotalUnits('');
        } else if (allReadingsValid && total > 0) {
            setTotalUnits(roundToTwoDecimals(total).toFixed(2));
        }
    }, [memberReadings, members]);

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
        // Store full precision so total bill matches exactly; only round for display
        setSavedPerUnitPrice(perUnitCost);
        setWaterPricePerUnit(roundToTwoDecimals(perUnitCost).toFixed(2));
        setPerUnitResult({
            show: true,
            value: `💰 <strong>Price Per Unit: ₹${roundToTwoDecimals(perUnitCost).toFixed(2)}</strong> (Saved - will be used in calculations)`,
            color: '#92400e'
        });
    };

    // Calculate Electricity Bills (only active members)
    const calculateElectricityBills = () => {
        const readings = {};
        let totalUnitsValue = 0;

        for (const member of members) {
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
        for (const member of members) {
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

        // Use saved full-precision per-unit price when available (ensures total matches bill)
        let waterPricePerUnitValue;
        if (savedPerUnitPrice !== null && savedPerUnitPrice > 0) {
            waterPricePerUnitValue = savedPerUnitPrice;
        } else {
            waterPricePerUnitValue = getNumericValue(
                waterPricePerUnit,
                'Motor price per unit',
                'water-price'
            );
            if (waterPricePerUnitValue === null) return null;
        }

        // ✅ Divide ONLY for per-member calculation (among active members)
        const waterUnitsPerMember = roundToTwoDecimals(
            totalWaterUnitsValue / members.length
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
        savePreviousReadings();
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
        savePreviousReadings();
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

    // Handle meter photo upload (record proof, monthly history)
    const handleMeterImageUpload = (meterId, e) => {
        const file = e?.target?.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
            setMeterImages(prev => ({ ...prev, [meterId]: reader.result }));
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleRemoveMeterImage = (meterId) => {
        setMeterImages(prev => ({ ...prev, [meterId]: null }));
    };

    // Save current readings as previous for next month (auto-storage)
    const savePreviousReadings = () => {
        try {
            const data = {};
            members.forEach(m => {
                const curr = memberReadings[m.id]?.current;
                if (curr != null && curr !== '') data[m.id] = curr;
            });
            if (waterCurrentReading != null && waterCurrentReading !== '') {
                data.motor = waterCurrentReading;
            }
            if (Object.keys(data).length > 0) {
                localStorage.setItem(STORAGE_KEY_PREVIOUS_READINGS, JSON.stringify(data));
            }
        } catch (e) {
            /* ignore storage errors */
        }
    };

    // Add new member
    const addMember = (name) => {
        const trimmed = (name || '').trim();
        if (!trimmed) return;
        const id = generateMemberId();
        setMembers(prev => [...prev, { id, name: trimmed }]);
        setMemberReadings(prev => ({ ...prev, [id]: { previous: '', current: '' } }));
        setMeterImages(prev => ({ ...prev, [id]: null }));
    };

    // Remove member (require at least 1)
    const removeMember = (id) => {
        if (members.length <= 1) return;
        setMembers(prev => prev.filter(m => m.id !== id));
        setMemberReadings(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
        setMeterImages(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
        clearError(`${id}-previous`);
        clearError(`${id}-current`);
    };

    // Update member name
    const updateMemberName = (id, newName) => {
        const trimmed = (newName || '').trim();
        if (!trimmed) return;
        setMembers(prev => prev.map(m => m.id === id ? { ...m, name: trimmed } : m));
    };

    // Handle key press for Enter key
    const handleKeyPress = (e, action) => {
        if (e.key === 'Enter') {
            action();
        }
    };

    // Price per unit section is disabled until all active cards have previous + current readings
    const allReadingsFilled = (() => {
        for (const member of members) {
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

    // Copy total units and main bill to top section (section 1)
    const handleCalculateTotalUnits = () => {
        if (totalAllDifferences && parseFloat(totalAllDifferences) > 0) {
            setPerUnitTotal(totalAllDifferences);
        }
        if (totalElectricityBill && parseFloat(totalElectricityBill) > 0) {
            setPerUnitBill(totalElectricityBill);
        }
    };

    const resultsSectionRef = useRef(null);

    const getTableBodyData = () => {
        if (!results) return { headers: [], body: [] };
        const headers = ['Member', 'Sub-meter units', 'Sub-meter (₹)', 'Motor (₹)', 'Total (₹)'];
        const body = [];
        let grandTotal = 0;
        members.forEach(member => {
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
        const totalMotor = results.water ? formatCurrency(results.water.waterBillPerMember * members.length) : 'N/A';
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
        members.forEach((member, i) => {
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

        // ——— Reading period (if set) ———
        if (readingPeriodDate) {
            addPageIfNeeded(lineHeight * 2);
            doc.setFont(undefined, 'bold');
            doc.text(`Reading period: ${readingPeriodDate}`, left, y);
            doc.setFont(undefined, 'normal');
            y += lineHeight + 4;
        }

        // ——— Meter photos (record proof) ———
        const metersWithPhotos = [...members.map(m => ({ id: m.id, label: m.name })), { id: 'motor', label: 'Motor' }].filter(m => meterImages[m.id]);
        if (metersWithPhotos.length > 0) {
            addPageIfNeeded(lineHeight * 4);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(11);
            doc.text('Meter Photos (Record Proof)', centerX, y, { align: 'center' });
            y += lineHeight + 4;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);

            const imgMaxW = 50;
            const imgMaxH = 35;
            for (const m of metersWithPhotos) {
                const dataUrl = meterImages[m.id];
                if (!dataUrl) continue;
                addPageIfNeeded(imgMaxH + 12);
                const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
                if (match) {
                    const fmt = match[1].toUpperCase() === 'JPG' ? 'JPEG' : match[1].toUpperCase();
                    const base64 = match[2];
                    try {
                        doc.text(`${m.label} meter:`, left, y);
                        y += 4;
                        doc.addImage(base64, fmt, left, y, imgMaxW, imgMaxH);
                        y += imgMaxH + 6;
                    } catch (err) {
                        doc.text(`[Image for ${m.label} could not be embedded]`, left, y);
                        y += 6;
                    }
                }
            }
            y += sectionGap;
        }

        // ——— Section 2: Total used Unit & Unit wise bill (centered, bold heading) ———
        addPageIfNeeded(lineHeight * 4);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('Total used Unit & Unit wise bill', centerX, y, { align: 'center' });
        y += lineHeight + 2;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);

        const perUnitCost = results.electricity ? results.electricity.perUnitCost : parseFloat(waterPricePerUnit || 0);
        const motorUnitsPerMember = results.water ? roundToTwoDecimals(results.water.totalWaterUnits / members.length) : 0;

        members.forEach((member, i) => {
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

    const downloadAsExcel = () => {
        if (!results) return;
        const wb = XLSX.utils.book_new();

        // Sheet 1: Summary + Meter Readings + Bill Breakdown
        const rows = [];

        if (readingPeriodDate) {
            rows.push(['Reading period', readingPeriodDate], []);
        }

        rows.push(['HBC Bill Calculator - Results'], []);

        // Summary
        rows.push(['Summary']);
        rows.push(['Total sub-meter units', results.type === 'water-only' ? 'N/A' : roundToTwoDecimals(results.electricity.totalUnits).toFixed(2)]);
        rows.push(['Per unit cost (₹)', results.type === 'water-only' ? 'N/A' : formatCurrency(results.electricity.perUnitCost)]);
        rows.push(['Motor total units', results.type === 'electricity-only' ? 'N/A' : roundToTwoDecimals(results.water.totalWaterUnits).toFixed(2)]);
        rows.push(['Motor per person (equal)', results.type === 'electricity-only' ? 'N/A' : roundToTwoDecimals(results.water.waterUnitsPerMember).toFixed(2)]);
        rows.push([]);

        // Meter Readings
        rows.push(['Meter Readings']);
        rows.push(['Meter', 'Previous', 'Current', 'Difference']);
        members.forEach((member, i) => {
            const prev = memberReadings[member.id].previous;
            const curr = memberReadings[member.id].current;
            const prevN = prev !== '' ? parseFloat(prev) : NaN;
            const currN = curr !== '' ? parseFloat(curr) : NaN;
            const diff = (!isNaN(prevN) && !isNaN(currN) && currN >= prevN) ? roundToTwoDecimals(currN - prevN) : '—';
            rows.push([`${i + 1} house ${member.name}`, prev || '—', curr || '—', diff]);
        });
        const motorPrevN = waterPreviousReading !== '' ? parseFloat(waterPreviousReading) : NaN;
        const motorCurrN = waterCurrentReading !== '' ? parseFloat(waterCurrentReading) : NaN;
        const motorDiff = (!isNaN(motorPrevN) && !isNaN(motorCurrN) && motorCurrN >= motorPrevN) ? roundToTwoDecimals(motorCurrN - motorPrevN) : '—';
        rows.push(['MOTOR', waterPreviousReading || '—', waterCurrentReading || '—', motorDiff]);
        rows.push([]);

        // Bill Breakdown
        rows.push(['Bill Breakdown']);
        const { headers, body } = getTableBodyData();
        rows.push(headers);
        body.forEach(r => rows.push(r));
        rows.push([]);

        // Member-wise usage (electricity only)
        if (results.type !== 'water-only' && results.electricity) {
            rows.push(['Member-wise Electricity Usage']);
            rows.push(['Member', 'Units']);
            members.forEach(member => {
                const r = results.electricity.results[member.id];
                rows.push([member.name, roundToTwoDecimals(r.units).toFixed(2)]);
            });
        }

        const ws = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'HBC Results');

        const filename = readingPeriodDate ? `hbc-results-${readingPeriodDate}.xlsx` : 'hbc-results.xlsx';
        XLSX.writeFile(wb, filename);
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
                        One main meter bill, <strong>sub-meters</strong> (pay by your units), and <strong>1 motor meter</strong> (split equally). Add or remove members, set the rate, enter readings, then click <strong>Calculate Bills</strong>.
                    </p>

                    <div className="calculator-members-manager">
                        <label>Members ({members.length} — motor split equally among)</label>
                        <div className="calculator-add-member-row">
                            <input
                                type="text"
                                id="new-member-name"
                                placeholder="New member name"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addMember(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <motion.button
                                type="button"
                                className="calculator-add-member-btn"
                                onClick={() => {
                                    const input = document.getElementById('new-member-name');
                                    if (input) {
                                        addMember(input.value);
                                        input.value = '';
                                        input.focus();
                                    }
                                }}
                                whileHover={buttonHover}
                                whileTap={buttonTap}
                            >
                                + Add member
                            </motion.button>
                        </div>
                    </div>
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
                        {allReadingsFilled ? 'Use your main meter bill to get ₹/unit; same rate for sub-meters and motor.' : `Fill previous & current readings in every active card (${members.length} sub-meters + motor) to enable this section.`}
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
                    <p className="calculator-section-hint">Enter each active person’s sub-meter readings. Motor is split equally among {members.length} {members.length === 1 ? 'person' : 'persons'}.</p>
                    <div className="calculator-reading-period-row">
                        <div className="calculator-input-group calculator-reading-period-input">
                            <label htmlFor="reading-period-date">📅 Reading period (for monthly history)</label>
                            <input
                                type="month"
                                id="reading-period-date"
                                value={readingPeriodDate}
                                onChange={(e) => setReadingPeriodDate(e.target.value)}
                            />
                        </div>
                    </div>
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
                        {members.map((member, index) => (
                            <motion.div
                                key={member.id}
                                className="calculator-member-card"
                                variants={staggerItem}
                                custom={index}
                                animate={focusedCardId === member.id ? cardFocusVariants.focused : cardFocusVariants.idle}
                            >
                                <div className="calculator-member-card-header">
                                    <input
                                        type="text"
                                        className="calculator-member-name-input"
                                        value={member.name}
                                        onChange={(e) => updateMemberName(member.id, e.target.value)}
                                        placeholder="Member name"
                                    />
                                    <span className="calculator-member-card-subtitle">— sub-meter</span>
                                    <motion.button
                                        type="button"
                                        className="calculator-remove-member-btn"
                                        onClick={() => removeMember(member.id)}
                                        disabled={members.length <= 1}
                                        aria-label={`Remove ${member.name}`}
                                        whileHover={members.length > 1 ? buttonHover : undefined}
                                        whileTap={members.length > 1 ? buttonTap : undefined}
                                    >
                                        ✕
                                    </motion.button>
                                </div>
                                <div className="calculator-member-inputs">
                                    <div className={`calculator-input-group ${errors[`${member.id}-previous`] ? 'calculator-error' : ''}`}>
                                        <label htmlFor={`${member.id}-previous`}>Previous reading</label>
                                        <input
                                            type="number"
                                            id={`${member.id}-previous`}
                                            step="0.01"
                                            min="0"
                                            placeholder="Previous"
                                            value={(memberReadings[member.id] || {}).previous || ''}
                                            onChange={(e) => {
                                                handleMemberReadingChange(member.id, 'previous', e.target.value);
                                                clearError(`${member.id}-previous`);
                                            }}
                                            onFocus={() => setFocusedCardId(member.id)}
                                            onBlur={() => setFocusedCardId(null)}
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
                                            value={(memberReadings[member.id] || {}).current || ''}
                                            onChange={(e) => {
                                                handleMemberReadingChange(member.id, 'current', e.target.value);
                                                clearError(`${member.id}-current`);
                                            }}
                                            onFocus={() => setFocusedCardId(member.id)}
                                            onBlur={() => setFocusedCardId(null)}
                                            onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                                        />
                                        {errors[`${member.id}-current`] && (
                                            <span className="calculator-error-message show">{errors[`${member.id}-current`]}</span>
                                        )}
                                    </div>
                                    {(() => {
                                        const r = memberReadings[member.id] || {};
                                        const prev = parseFloat(r.previous);
                                        const curr = parseFloat(r.current);
                                        if (r.previous === '' || r.current === '' || isNaN(prev) || isNaN(curr) || curr < prev) return null;
                                        return (
                                            <div className="calculator-member-diff-inline">
                                                Difference: <strong>{roundToTwoDecimals(curr - prev).toFixed(2)}</strong>
                                            </div>
                                        );
                                    })()}
                                    <div className="calculator-meter-photo-upload">
                                        <label className="calculator-meter-photo-label">📷 Meter photo (optional)</label>
                                        {meterImages[member.id] ? (
                                            <div className="calculator-meter-photo-preview">
                                                <img src={meterImages[member.id]} alt={`${member.name} meter`} />
                                                <motion.button type="button" className="calculator-meter-photo-remove" onClick={() => handleRemoveMeterImage(member.id)} whileHover={buttonHover} whileTap={buttonTap} aria-label="Remove photo">✕</motion.button>
                                            </div>
                                        ) : (
                                            <label className="calculator-meter-photo-dropzone">
                                                <input type="file" accept="image/*" capture="environment" onChange={(e) => handleMeterImageUpload(member.id, e)} />
                                                <span>+ Add photo</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Motor meter card — same grid */}
                        <motion.div
                            className="calculator-member-card calculator-motor-card"
                            variants={staggerItem}
                            animate={focusedCardId === 'motor' ? motorCardFocusVariants.focused : motorCardFocusVariants.idle}
                        >
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
                                        onFocus={() => setFocusedCardId('motor')}
                                        onBlur={() => setFocusedCardId(null)}
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
                                        onFocus={() => setFocusedCardId('motor')}
                                        onBlur={() => setFocusedCardId(null)}
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
                                <div className="calculator-meter-photo-upload">
                                    <label className="calculator-meter-photo-label">📷 Meter photo (optional)</label>
                                    {meterImages.motor ? (
                                        <div className="calculator-meter-photo-preview">
                                            <img src={meterImages.motor} alt="Motor meter" />
                                            <motion.button type="button" className="calculator-meter-photo-remove" onClick={() => handleRemoveMeterImage('motor')} whileHover={buttonHover} whileTap={buttonTap} aria-label="Remove photo">✕</motion.button>
                                        </div>
                                    ) : (
                                        <label className="calculator-meter-photo-dropzone calculator-meter-photo-dropzone-motor">
                                            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleMeterImageUpload('motor', e)} />
                                            <span>+ Add photo</span>
                                        </label>
                                    )}
                                </div>
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
                        <div className="calculator-submeter-buttons">
                            <motion.button
                                type="button"
                                className="calculator-per-unit-btn calculator-total-units-btn"
                                onClick={handleCalculateTotalUnits}
                                disabled={!totalAllDifferences || parseFloat(totalAllDifferences) <= 0}
                                aria-label="Copy total units and bill to top section"
                                whileHover={buttonHover}
                                whileTap={buttonTap}
                            >
                                Add total Units
                            </motion.button>
                            <motion.button
                                type="button"
                                className="calculator-per-unit-btn"
                                onClick={calculatePerUnit}
                                disabled={!allReadingsFilled || !perUnitTotal || parseFloat(perUnitTotal) <= 0 || !perUnitBill || parseFloat(perUnitBill) <= 0}
                                aria-label="Calculate price per unit"
                                whileHover={allReadingsFilled ? buttonHover : undefined}
                                whileTap={allReadingsFilled ? buttonTap : undefined}
                            >
                                Calculate Per Unit
                            </motion.button>
                        </div>
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

                {/* Auto Summary — live preview as user enters data */}
                <motion.div
                        className="calculator-auto-summary-section"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="calculator-auto-summary-title">⭐ Auto Summary</h3>
                        <div className="calculator-summary-box calculator-auto-summary-box">
                            {totalUnits && (
                                <motion.div className="calculator-summary-card" variants={staggerItem}>
                                    <h4>Sub-meters total</h4>
                                    <div className="calculator-value">{totalUnits}</div>
                                </motion.div>
                            )}
                            {motorDifference != null && (
                                <motion.div className="calculator-summary-card" variants={staggerItem}>
                                    <h4>Motor units</h4>
                                    <div className="calculator-value">{motorDifference.toFixed(2)}</div>
                                </motion.div>
                            )}
                            {totalAllDifferences && (
                                <motion.div className="calculator-summary-card calculator-auto-summary-total" variants={staggerItem}>
                                    <h4>Total units</h4>
                                    <div className="calculator-value">{totalAllDifferences}</div>
                                </motion.div>
                            )}
                            {savedPerUnitPrice != null && savedPerUnitPrice > 0 && (
                                <motion.div className="calculator-summary-card" variants={staggerItem}>
                                    <h4>Per unit (₹)</h4>
                                    <div className="calculator-value">{formatCurrency(savedPerUnitPrice)}</div>
                                </motion.div>
                            )}
                            {readingPeriodDate && (
                                <motion.div className="calculator-summary-card" variants={staggerItem}>
                                    <h4>Reading period</h4>
                                    <div className="calculator-value">{readingPeriodDate}</div>
                                </motion.div>
                            )}
                            <motion.div className="calculator-summary-card" variants={staggerItem}>
                                <h4>Members</h4>
                                <div className="calculator-value">{members.length}</div>
                            </motion.div>
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
                            <motion.button type="button" className="calculator-download-btn calculator-download-excel" onClick={downloadAsExcel} aria-label="Download as Excel" whileHover={buttonHover} whileTap={buttonTap}>
                                Excel
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

                        {/* Meter photos in results (record proof — included in JPG) */}
                        {(() => {
                            const withPhotos = [...members.map(m => ({ id: m.id, label: m.name })), { id: 'motor', label: 'Motor' }].filter(m => meterImages[m.id]);
                            if (withPhotos.length === 0) return null;
                            return (
                                <motion.div className="calculator-results-meter-photos" variants={staggerItem}>
                                    <h4 className="calculator-results-meter-photos-title">📷 Meter Photos (Record Proof)</h4>
                                    {readingPeriodDate && <p className="calculator-results-meter-photos-period">Period: {readingPeriodDate}</p>}
                                    <div className="calculator-results-meter-photos-grid">
                                        {withPhotos.map(m => (
                                            <div key={m.id} className="calculator-results-meter-photo-item">
                                                <img src={meterImages[m.id]} alt={`${m.label} meter`} />
                                                <span>{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })()}

                        {/* Member-wise Usage Chart (electricity only) */}
                        {results.type !== 'water-only' && results.electricity && (
                            <motion.div className="calculator-usage-chart-wrapper" variants={staggerItem}>
                                <h4 className="calculator-usage-chart-title">Member-wise Electricity Usage</h4>
                                <div className="calculator-usage-chart">
                                    {members.map((member, index) => {
                                        const r = results.electricity.results[member.id];
                                        const units = roundToTwoDecimals(r.units);
                                        const maxUnits = results.electricity.totalUnits;
                                        const percent = maxUnits > 0 ? (units / maxUnits) * 100 : 0;
                                        const colors = [
                                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                            'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                                        ];
                                        return (
                                            <div key={member.id} className="calculator-usage-chart-row">
                                                <span className="calculator-usage-chart-label">{member.name}</span>
                                                <div className="calculator-usage-chart-bar-track">
                                                    <motion.div
                                                        className="calculator-usage-chart-bar"
                                                        style={{ background: colors[index % colors.length] }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.max(percent, 4)}%` }}
                                                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                    />
                                                </div>
                                                <span className="calculator-usage-chart-value">{units.toFixed(2)} units</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Desktop/Tablet: Table view */}
                        <motion.div className="calculator-table-wrapper calculator-results-table-desktop" variants={staggerItem}>
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
                                    const rows = members.map(member => {
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
                                                        formatCurrency(results.water.waterBillPerMember * members.length)}
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

                        {/* Mobile: Card layout for better UX on small screens */}
                        <motion.div className="calculator-results-cards-mobile" variants={staggerItem}>
                            {members.map(member => {
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
                                return (
                                    <div key={member.id} className="calculator-result-card-mobile">
                                        <div className="calculator-result-card-mobile-header">{member.name}</div>
                                        <div className="calculator-result-card-mobile-body">
                                            {results.type !== 'water-only' && (
                                                <>
                                                    <div className="calculator-result-card-row">
                                                        <span>Sub-meter units</span>
                                                        <strong>{roundToTwoDecimals(electricityUnits).toFixed(2)}</strong>
                                                    </div>
                                                    <div className="calculator-result-card-row">
                                                        <span>Sub-meter (₹)</span>
                                                        <strong>{formatCurrency(electricityAmount)}</strong>
                                                    </div>
                                                </>
                                            )}
                                            {results.type !== 'electricity-only' && (
                                                <div className="calculator-result-card-row">
                                                    <span>Motor (₹)</span>
                                                    <strong>{formatCurrency(waterAmount)}</strong>
                                                </div>
                                            )}
                                            <div className="calculator-result-card-row calculator-result-card-total">
                                                <span>Total (₹)</span>
                                                <strong>{formatCurrency(totalPayable)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {(() => {
                                let grandTotal = 0;
                                members.forEach(member => {
                                    let electricityAmount = 0, waterAmount = 0;
                                    if (results.type !== 'water-only' && results.electricity) electricityAmount = results.electricity.results[member.id].electricityAmount;
                                    if (results.type !== 'electricity-only' && results.water) waterAmount = results.water.waterBillPerMember;
                                    grandTotal += electricityAmount + waterAmount;
                                });
                                return (
                                    <div key="total" className="calculator-result-card-mobile calculator-result-card-total-row">
                                        <div className="calculator-result-card-mobile-header">TOTAL</div>
                                        <div className="calculator-result-card-mobile-body">
                                            <div className="calculator-result-card-row calculator-result-card-total">
                                                <span>Grand Total</span>
                                                <strong>{formatCurrency(grandTotal)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
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
