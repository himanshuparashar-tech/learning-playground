import React, { useState, useEffect, useCallback } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
    CartesianGrid
} from 'recharts'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useTheme } from '../context/ThemeContext'
import '../../calculator.css'

const formatMonth = (yyyyMm) => {
    if (!yyyyMm) return '—'
    const [y, m] = String(yyyyMm).split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = months[parseInt(m, 10) - 1] || m
    return `${monthName} ${y}`
}

/**
 * Transform readings into bar chart data: units per member (aggregate across all months)
 */
const transformForBarChart = (readings) => {
    const byMember = {}
    for (const r of readings || []) {
        const name = r.member_name || 'Unknown'
        const units = Number(r.units) || 0
        byMember[name] = (byMember[name] || 0) + units
    }
    return Object.entries(byMember).map(([name, units]) => ({ name, units }))
}

/**
 * Transform readings into line chart data: total units per month
 */
const transformForLineChart = (readings) => {
    const byMonth = {}
    for (const r of readings || []) {
        const period = r.reading_period || ''
        if (!period) continue
        const units = Number(r.units) || 0
        byMonth[period] = (byMonth[period] || 0) + units
    }
    return Object.entries(byMonth)
        .map(([month, units]) => ({ month, totalUnits: units, label: formatMonth(month) }))
        .sort((a, b) => a.month.localeCompare(b.month))
}

const HBCDashboard = ({ houseId }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [readings, setReadings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isExpanded, setIsExpanded] = useState(true)

    const gridColor = isDark ? '#404040' : '#e5e7eb'
    const tickStyle = { fontSize: 12, fill: isDark ? '#a3a3a3' : '#374151' }
    const tooltipContentStyle = {
        backgroundColor: isDark ? '#1a1a1a' : '#fff',
        border: `1px solid ${isDark ? '#404040' : '#e5e7eb'}`,
        borderRadius: 8,
    }

    const fetchReadings = useCallback(async () => {
        if (!supabase || !houseId) {
            setReadings([])
            setLoading(false)
            return
        }
        setLoading(true)
        setError(null)
        try {
            const { data, error: err } = await supabase
                .from('readings')
                .select('reading_period, member_name, units')
                .eq('house_id', houseId)
                .order('reading_period', { ascending: false })

            if (err) throw err
            setReadings(data || [])
        } catch (e) {
            setError(e?.message || 'Failed to load readings')
        } finally {
            setLoading(false)
        }
    }, [houseId])

    useEffect(() => {
        fetchReadings()
    }, [fetchReadings])

    // Subscribe to Supabase Realtime — auto-update when readings change
    useEffect(() => {
        if (!supabase || !isSupabaseConfigured() || !houseId) return

        const channel = supabase
            .channel('readings-changes')
            .on(
                'postgres_changes',
                {
                    schema: 'public',
                    table: 'readings',
                    event: '*'
                },
                () => {
                    fetchReadings()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [fetchReadings, houseId])

    const barData = transformForBarChart(readings)
    const lineData = transformForLineChart(readings)

    return (
        <div className="calculator-section" style={{ marginTop: 0 }}>
            <button
                type="button"
                onClick={() => setIsExpanded((e) => !e)}
                className="hbc-dashboard-toggle"
            >
                <span style={{ fontSize: '1.2em' }}>{isExpanded ? '▼' : '▶'}</span>
                <h2 className="calculator-section-title" style={{ margin: 0 }}>
                    📊 Dashboard
                </h2>
            </button>
            <p className="calculator-section-hint" style={{ marginTop: '4px', marginBottom: '16px' }}>
                Electricity usage by member and monthly trend. Updates automatically when new readings are saved.
            </p>

            {isExpanded && (
                <>
                    {!isSupabaseConfigured() && (
                        <div className="calculator-section calculator-supabase-warning">
                            <p>
                                Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and{' '}
                                <code>VITE_SUPABASE_ANON_KEY</code> to your .env file.
                            </p>
                        </div>
                    )}

                    {isSupabaseConfigured() && (
                        <>
                            {loading && (
                                <p style={{ color: '#6b7280', marginBottom: '20px' }}>Loading dashboard...</p>
                            )}
                            {error && (
                                <p style={{ color: '#dc2626', marginBottom: '20px' }}>{error}</p>
                            )}

                            {!loading && !error && barData.length === 0 && lineData.length === 0 && (
                                <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                                    No readings yet. Save readings from the calculator to see charts.
                                </p>
                            )}

                            {!loading && !error && (barData.length > 0 || lineData.length > 0) && (
                                <div className="hbc-dashboard-charts">
                                    {barData.length > 0 && (
                                        <div className="hbc-dashboard-chart-card hbc-dashboard-chart-bar flex-1">
                                            <h3 className="hbc-dashboard-chart-title">Units per member</h3>
                                            <div className="hbc-dashboard-chart-inner" style={{ minHeight: 280 }}>
                                                <ResponsiveContainer width="100%" height={280} minHeight={280}>
                                                    <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                                        <XAxis dataKey="name" tick={tickStyle} />
                                                        <YAxis tick={tickStyle} label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { ...tickStyle } }} />
                                                        <Tooltip
                                                            contentStyle={tooltipContentStyle}
                                                            formatter={(value) => [Number(value).toFixed(2), 'Units']}
                                                            labelFormatter={(label) => `Member: ${label}`}
                                                        />
                                                        <Bar dataKey="units" fill="#667eea" radius={[4, 4, 0, 0]} name="Units consumed" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    )}

                                    {lineData.length > 0 && (
                                        <div className="hbc-dashboard-chart-card hbc-dashboard-chart-line flex-1">
                                            <h3 className="hbc-dashboard-chart-title">Monthly electricity trend</h3>
                                            <div className="hbc-dashboard-chart-inner" style={{ minHeight: 280 }}>
                                                <ResponsiveContainer width="100%" height={280} minHeight={280}>
                                                    <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                                        <XAxis dataKey="label" tick={tickStyle} />
                                                        <YAxis tick={tickStyle} label={{ value: 'Total units', angle: -90, position: 'insideLeft', style: { ...tickStyle } }} />
                                                        <Tooltip
                                                            contentStyle={tooltipContentStyle}
                                                            formatter={(value) => [Number(value).toFixed(2), 'Total units']}
                                                            labelFormatter={(label) => `Month: ${label}`}
                                                        />
                                                        <Legend wrapperStyle={{ fontSize: 11, color: isDark ? '#a3a3a3' : '#374151' }} />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="totalUnits"
                                                            stroke="#764ba2"
                                                            strokeWidth={2}
                                                            dot={{ fill: '#764ba2', r: 4 }}
                                                            name="Total units"
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default HBCDashboard
