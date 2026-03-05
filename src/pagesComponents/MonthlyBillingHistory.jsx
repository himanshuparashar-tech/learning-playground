import React, { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import CustomDropdown from '../components/shared/CustomDropdown'
import MonthPicker from '../components/shared/MonthPicker'
import '../../calculator.css'

const formatMonth = (yyyyMm) => {
    if (!yyyyMm) return '—'
    const [y, m] = yyyyMm.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = months[parseInt(m, 10) - 1] || m
    return `${monthName} ${y}`
}

const formatCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return '—'
    return `₹${Number(amount).toFixed(2)}`
}

const MonthlyBillingHistory = () => {
    const [houses, setHouses] = useState([])
    const [selectedHouseId, setSelectedHouseId] = useState('')
    const [readings, setReadings] = useState([])
    const [motorReadings, setMotorReadings] = useState(null)
    const [billPeriod, setBillPeriod] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState('')
    const [perUnitRate, setPerUnitRate] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchHouses = async () => {
            if (!supabase) return
            try {
                const { data } = await supabase.from('houses').select('id, house_name').order('house_name')
                setHouses(data || [])
                if ((data || []).length > 0 && !selectedHouseId) setSelectedHouseId(data[0].id)
            } catch (e) { /* ignore */ }
        }
        fetchHouses()
    }, [])

    useEffect(() => {
        const fetchReadings = async () => {
            if (!supabase || !selectedHouseId) {
                setReadings([])
                setMotorReadings(null)
                setBillPeriod(null)
                setLoading(false)
                return
            }
            setLoading(true)
            setError(null)
            try {
                const { data, error: err } = await supabase
                    .from('readings')
                    .select('reading_period, member_name, previous_reading, current_reading, units')
                    .eq('house_id', selectedHouseId)
                    .order('reading_period', { ascending: false })

                if (err) throw err

                const uniqueMonths = [...new Set((data || []).map(r => r.reading_period).filter(Boolean))]
                setReadings(data || [])
                if (uniqueMonths.length > 0) setSelectedMonth(uniqueMonths[0])
            } catch (e) {
                setError(e?.message || 'Failed to load')
            } finally {
                setLoading(false)
            }
        }
        fetchReadings()
    }, [selectedHouseId])

    useEffect(() => {
        const fetchMotorAndBill = async () => {
            if (!supabase || !selectedHouseId || !selectedMonth) {
                setMotorReadings(null)
                setBillPeriod(null)
                setPerUnitRate('')
                return
            }
            try {
                const [motorRes, billRes] = await Promise.allSettled([
                    supabase
                        .from('motor_readings')
                        .select('*')
                        .eq('house_id', selectedHouseId)
                        .eq('reading_period', selectedMonth)
                        .maybeSingle(),
                    supabase
                        .from('bill_periods')
                        .select('total_bill, per_unit_cost')
                        .eq('house_id', selectedHouseId)
                        .eq('reading_period', selectedMonth)
                        .maybeSingle(),
                ])
                const motor = motorRes.status === 'fulfilled' ? motorRes.value?.data : null
                const bill = billRes.status === 'fulfilled' ? billRes.value?.data : null
                setMotorReadings(motor || null)
                setBillPeriod(bill || null)
                if (bill?.per_unit_cost != null) {
                    setPerUnitRate(String(bill.per_unit_cost))
                } else {
                    setPerUnitRate('')
                }
            } catch (e) { /* ignore */ }
        }
        fetchMotorAndBill()
    }, [selectedHouseId, selectedMonth])

    const filteredReadings = selectedMonth
        ? readings.filter(r => r.reading_period === selectedMonth)
        : readings

    const rate = parseFloat(perUnitRate)
    const hasValidRate = !isNaN(rate) && rate > 0
    const motorUnits = motorReadings?.units != null ? Number(motorReadings.units) : 0
    const motorBillTotal = hasValidRate && motorUnits > 0 ? motorUnits * rate : 0

    return (
        <div className="main-body">
            <div className="calculator-container">
                <h1>📅 Monthly Billing History</h1>
                <p className="calculator-intro">
                    View all saved meter readings from Supabase. Filter by month and optionally enter rate per unit to see bill amounts.
                </p>

                {!isSupabaseConfigured() && (
                    <div className="calculator-section calculator-supabase-warning">
                        <p>Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your .env file.</p>
                    </div>
                )}

                {isSupabaseConfigured() && (
                    <>
                        <div className="calculator-section">
                            <div className="calculator-history-filters">
                                <div className="calculator-input-group">
                                    <label htmlFor="house-filter">House</label>
                                    <CustomDropdown
                                        id="house-filter"
                                        value={selectedHouseId}
                                        onChange={(val) => setSelectedHouseId(val)}
                                        placeholder="Select house..."
                                        options={houses.map(h => ({ value: h.id, label: h.house_name }))}
                                        className="calculator-load-history-select"
                                    />
                                </div>
                                <div className="calculator-input-group">
                                    <label htmlFor="month-filter">Filter by month</label>
                                    <MonthPicker
                                        id="month-filter"
                                        value={selectedMonth}
                                        onChange={setSelectedMonth}
                                        placeholder="Select month"
                                        className="calculator-month-picker"
                                    />
                                </div>
                                <div className="calculator-input-group">
                                    <label htmlFor="per-unit-rate">
                                        Rate per unit (₹) {billPeriod?.per_unit_cost != null && (
                                            <span className="calculator-label-optional" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                                                — loaded for {formatMonth(selectedMonth)}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id="per-unit-rate"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="e.g. 4.50 (auto-filled when month has saved data)"
                                        value={perUnitRate}
                                        onChange={(e) => setPerUnitRate(e.target.value)}
                                        className="calculator-history-rate-input"
                                    />
                                </div>
                            </div>

                            {loading && <p className="calculator-history-loading">Loading...</p>}
                            {error && <p className="calculator-history-error">{error}</p>}

                            {!loading && !error && (
                                <>
                                    <div className="calculator-table-wrapper calculator-history-table-desktop">
                                        <table className="calculator-results-table">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Member</th>
                                                <th>Previous Reading</th>
                                                <th>Current Reading</th>
                                                <th>Units Consumed</th>
                                                <th>Bill Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredReadings.length === 0 && !motorReadings ? (
                                                <tr>
                                                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                                                        No readings found. Save readings from the HBC calculator first.
                                                    </td>
                                                </tr>
                                            ) : (
                                                <>
                                                    {filteredReadings.map((row, i) => {
                                                        const units = Number(row.units) || 0
                                                        const billAmount = hasValidRate ? units * rate : null
                                                        return (
                                                            <tr key={`${row.reading_period}-${row.member_name}-${i}`}>
                                                                <td>{formatMonth(row.reading_period)}</td>
                                                                <td><strong>{row.member_name || '—'}</strong></td>
                                                                <td>{row.previous_reading != null ? Number(row.previous_reading).toFixed(2) : '—'}</td>
                                                                <td>{row.current_reading != null ? Number(row.current_reading).toFixed(2) : '—'}</td>
                                                                <td>{units.toFixed(2)}</td>
                                                                <td>{hasValidRate ? formatCurrency(billAmount) : '—'}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {motorReadings && (
                                                        <tr>
                                                            <td>{formatMonth(selectedMonth)}</td>
                                                            <td><strong>Motor (shared)</strong></td>
                                                            <td>{motorReadings.previous_reading != null ? Number(motorReadings.previous_reading).toFixed(2) : '—'}</td>
                                                            <td>{motorReadings.current_reading != null ? Number(motorReadings.current_reading).toFixed(2) : '—'}</td>
                                                            <td>{motorUnits.toFixed(2)}</td>
                                                            <td>{hasValidRate ? formatCurrency(motorBillTotal) : '—'}</td>
                                                        </tr>
                                                    )}
                                                    {(filteredReadings.length > 0 || motorReadings) && hasValidRate && (
                                                        <tr className="calculator-total-row">
                                                            <td colSpan={4}><strong>Total</strong></td>
                                                            <td>
                                                                {(filteredReadings.reduce((s, r) => s + (Number(r.units) || 0), 0) + motorUnits).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                {formatCurrency(
                                                                    filteredReadings.reduce((s, r) => s + (Number(r.units) || 0) * rate, 0) + motorBillTotal
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                    <div className="calculator-history-cards-mobile">
                                        {filteredReadings.length === 0 && !motorReadings ? (
                                            <div className="calculator-history-empty">No readings found. Save readings from the HBC calculator first.</div>
                                        ) : (
                                            <>
                                                {filteredReadings.map((row, i) => {
                                                    const units = Number(row.units) || 0
                                                    const billAmount = hasValidRate ? units * rate : null
                                                    return (
                                                        <div key={`${row.reading_period}-${row.member_name}-${i}`} className="calculator-history-card-mobile">
                                                            <div className="calculator-history-card-header">
                                                                <strong>{row.member_name || '—'}</strong>
                                                                <span>{formatMonth(row.reading_period)}</span>
                                                            </div>
                                                            <div className="calculator-history-card-body">
                                                                <div className="calculator-history-card-row">
                                                                    <span>Previous</span>
                                                                    <span>{row.previous_reading != null ? Number(row.previous_reading).toFixed(2) : '—'}</span>
                                                                </div>
                                                                <div className="calculator-history-card-row">
                                                                    <span>Current</span>
                                                                    <span>{row.current_reading != null ? Number(row.current_reading).toFixed(2) : '—'}</span>
                                                                </div>
                                                                <div className="calculator-history-card-row">
                                                                    <span>Units</span>
                                                                    <span>{units.toFixed(2)}</span>
                                                                </div>
                                                                <div className="calculator-history-card-row calculator-history-card-total">
                                                                    <span>Bill</span>
                                                                    <span>{hasValidRate ? formatCurrency(billAmount) : '—'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {motorReadings && (
                                                    <div className="calculator-history-card-mobile">
                                                        <div className="calculator-history-card-header">
                                                            <strong>Motor (shared)</strong>
                                                            <span>{formatMonth(selectedMonth)}</span>
                                                        </div>
                                                        <div className="calculator-history-card-body">
                                                            <div className="calculator-history-card-row">
                                                                <span>Previous</span>
                                                                <span>{motorReadings.previous_reading != null ? Number(motorReadings.previous_reading).toFixed(2) : '—'}</span>
                                                            </div>
                                                            <div className="calculator-history-card-row">
                                                                <span>Current</span>
                                                                <span>{motorReadings.current_reading != null ? Number(motorReadings.current_reading).toFixed(2) : '—'}</span>
                                                            </div>
                                                            <div className="calculator-history-card-row">
                                                                <span>Units</span>
                                                                <span>{motorUnits.toFixed(2)}</span>
                                                            </div>
                                                            <div className="calculator-history-card-row calculator-history-card-total">
                                                                <span>Bill</span>
                                                                <span>{hasValidRate ? formatCurrency(motorBillTotal) : '—'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(filteredReadings.length > 0 || motorReadings) && hasValidRate && (
                                                    <div className="calculator-history-card-mobile calculator-history-card-total">
                                                        <div className="calculator-history-card-header">
                                                            <strong>Total</strong>
                                                        </div>
                                                        <div className="calculator-history-card-body">
                                                            <div className="calculator-history-card-row calculator-history-card-total">
                                                                <span>Total units</span>
                                                                <span>{(filteredReadings.reduce((s, r) => s + (Number(r.units) || 0), 0) + motorUnits).toFixed(2)}</span>
                                                            </div>
                                                            <div className="calculator-history-card-row calculator-history-card-total">
                                                                <span>Total bill</span>
                                                                <span>{formatCurrency(filteredReadings.reduce((s, r) => s + (Number(r.units) || 0) * rate, 0) + motorBillTotal)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default MonthlyBillingHistory
