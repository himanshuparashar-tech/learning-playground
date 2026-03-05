import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import HBCDashboard from "./HBCDashboard";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import CustomDropdown from "../components/shared/CustomDropdown";
import MonthPicker from "../components/shared/MonthPicker";
import {
  DEFAULT_MEMBERS,
  STORAGE_KEY_PREVIOUS_READINGS,
  STORAGE_KEY_MEMBERS,
  STORAGE_KEY_SELECTED_HOUSE,
  generateMemberId,
  getInitialMembers,
  getCurrentPeriod,
  roundToTwoDecimals,
  formatCurrency,
  fadeInUp,
  staggerContainer,
  staggerItem,
  resultsVariants,
  buttonTap,
  buttonHover,
  cardFocusVariants,
  motorCardFocusVariants,
  downloadAsPDF,
  downloadAsJPG,
  downloadAsExcel,
} from "./hbc/index.js";
import "../../calculator.css";

const HBC = () => {
  // Electricity Bill State
  const [totalElectricityBill, setTotalElectricityBill] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [perUnitBill, setPerUnitBill] = useState("");
  const [perUnitTotal, setPerUnitTotal] = useState("");
  const [perUnitResult, setPerUnitResult] = useState({
    show: false,
    value: "",
    color: "",
  });
  const [savedPerUnitPrice, setSavedPerUnitPrice] = useState(null);

  // Dynamic members (add/remove)
  const [members, setMembers] = useState(getInitialMembers);
  const [memberReadings, setMemberReadings] = useState(() => {
    const m = getInitialMembers();
    const obj = {};
    m.forEach((mem) => {
      obj[mem.id] = { previous: "", current: "" };
    });
    return obj;
  });

  // Water Bill State
  const [waterPreviousReading, setWaterPreviousReading] = useState("");
  const [waterCurrentReading, setWaterCurrentReading] = useState("");
  const [totalWaterUnits, setTotalWaterUnits] = useState("");
  const [waterPricePerUnit, setWaterPricePerUnit] = useState("");

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
    m.forEach((mem) => {
      obj[mem.id] = null;
    });
    return obj;
  });
  const [readingPeriodDate, setReadingPeriodDate] = useState(() => getCurrentPeriod());

  // Houses (multi-house support)
  const [houses, setHouses] = useState([]);
  const [selectedHouseId, setSelectedHouseId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SELECTED_HOUSE) || "";
    } catch (e) {
      return "";
    }
  });
  const [newHouseName, setNewHouseName] = useState("");
  const [addingHouse, setAddingHouse] = useState(false);

  // Persist members when they change (localStorage + Supabase, per house)
  useEffect(() => {
    if (!selectedHouseId) return;
    try {
      localStorage.setItem(
        `${STORAGE_KEY_MEMBERS}_${selectedHouseId}`,
        JSON.stringify(members),
      );
    } catch (e) {
      /* ignore */
    }
  }, [members, selectedHouseId]);

  // Sync members to Supabase when they change (per house)
  useEffect(() => {
    if (!supabase || members.length === 0 || !selectedHouseId) return;
    const saveMembers = async () => {
      try {
        const { data: existing } = await supabase
          .from("members")
          .select("id")
          .eq("house_id", selectedHouseId);
        const ids = (existing || []).map((r) => r.id);
        if (ids.length > 0) {
          await supabase.from("members").delete().in("id", ids);
        }
        const rows = members.map((m) => ({
          house_id: selectedHouseId,
          user_id: m.id,
          name: m.name,
        }));
        if (rows.length > 0) {
          await supabase.from("members").insert(rows);
        }
      } catch (e) {
        /* ignore */
      }
    };
    saveMembers();
  }, [members, selectedHouseId]);

  // Clear results when members change (user must recalculate)
  useEffect(() => {
    setResults(null);
  }, [members]);

  // Results shown only when user clicks "Calculate Bills" (no auto-calculation)

  // Auto-save calculated readings to Supabase (debounced 2s)
  const autoSaveTimeoutRef = useRef(null);
  useEffect(() => {
    if (!supabase || !selectedHouseId || !results?.electricity) return;
    const period = readingPeriodDate || getCurrentPeriod();
    if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    autoSaveTimeoutRef.current = setTimeout(async () => {
      try {
        const { data: existing } = await supabase
          .from("readings")
          .select("id")
          .eq("house_id", selectedHouseId)
          .eq("reading_period", period);
        if (existing?.length) {
          await supabase
            .from("readings")
            .delete()
            .eq("house_id", selectedHouseId)
            .eq("reading_period", period);
        }
        for (const member of members) {
          const r = memberReadings[member.id];
          if (!r?.previous || !r?.current) continue;
          const units = parseFloat(r.current) - parseFloat(r.previous);
          const imgUrl = meterImages[member.id]?.startsWith?.("http")
            ? meterImages[member.id]
            : null;
          await supabase.from("readings").insert({
            house_id: selectedHouseId,
            reading_period: period,
            member_id: member.id,
            member_name: member.name,
            previous_reading: parseFloat(r.previous),
            current_reading: parseFloat(r.current),
            units,
            meter_image_url: imgUrl,
          });
        }
        fetchSavedPeriods();
      } catch (e) {
        /* ignore */
      }
      autoSaveTimeoutRef.current = null;
    }, 2000);
    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [
    results,
    selectedHouseId,
    readingPeriodDate,
    members,
    memberReadings,
    meterImages,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch houses on mount
  useEffect(() => {
    const fetchHouses = async () => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from("houses")
          .select("id, house_name")
          .order("house_name");
        setHouses(data || []);
        if ((data || []).length > 0 && !selectedHouseId) {
          const saved = localStorage.getItem(STORAGE_KEY_SELECTED_HOUSE);
          const found = (data || []).some((h) => h.id === saved);
          setSelectedHouseId(found ? saved : data[0].id);
        }
      } catch (e) {
        /* ignore */
      }
    };
    fetchHouses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist selected house
  useEffect(() => {
    if (selectedHouseId) {
      try {
        localStorage.setItem(STORAGE_KEY_SELECTED_HOUSE, selectedHouseId);
      } catch (e) {
        /* ignore */
      }
    }
  }, [selectedHouseId]);

  // Load members from Supabase when house changes
  useEffect(() => {
    const loadMembersForHouse = async () => {
      if (!supabase || !selectedHouseId) return;
      try {
        const { data: cloudMembers } = await supabase
          .from("members")
          .select("user_id, name")
          .eq("house_id", selectedHouseId)
          .order("created_at", { ascending: true });
        if (cloudMembers?.length > 0) {
          const byId = new Map();
          cloudMembers
            .filter((r) => r.user_id)
            .forEach((r) =>
              byId.set(r.user_id, { id: r.user_id, name: r.name || "" }),
            );
          const loadedMembers = [...byId.values()];
          const prevData = (() => {
            try {
              const s = localStorage.getItem(
                `${STORAGE_KEY_PREVIOUS_READINGS}_${selectedHouseId}`,
              );
              return s ? JSON.parse(s) : {};
            } catch (e) {
              return {};
            }
          })();
          const readings = {};
          loadedMembers.forEach((m) => {
            readings[m.id] = {
              previous: prevData[m.id] != null ? String(prevData[m.id]) : "",
              current: "",
            };
          });
          const images = { motor: null };
          loadedMembers.forEach((m) => {
            images[m.id] = null;
          });
          setMembers(loadedMembers);
          setMemberReadings(readings);
          setMeterImages(images);
          setWaterPreviousReading(
            prevData.motor != null && prevData.motor !== ""
              ? String(prevData.motor)
              : "",
          );
          setWaterCurrentReading("");
        } else {
          let loadedMembers = null;
          try {
            const stored = localStorage.getItem(
              `${STORAGE_KEY_MEMBERS}_${selectedHouseId}`,
            );
            if (stored) {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const byId = new Map();
                parsed.forEach((m) => byId.set(m.id, m));
                loadedMembers = [...byId.values()];
              }
            }
          } catch (e) {
            /* ignore */
          }
          const m = loadedMembers || DEFAULT_MEMBERS;
          const obj = {};
          m.forEach((mem) => {
            obj[mem.id] = { previous: "", current: "" };
          });
          setMembers(m);
          setMemberReadings(obj);
          setMeterImages({
            motor: null,
            ...Object.fromEntries(m.map((mem) => [mem.id, null])),
          });
          setWaterPreviousReading("");
          setWaterCurrentReading("");
        }
      } catch (e) {
        /* ignore */
      }
    };
    loadMembersForHouse();
  }, [selectedHouseId]); // eslint-disable-line react-hooks/exhaustive-deps

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

      if (r.previous !== "" || r.current !== "") {
        hasAnyReading = true;
      }

      if (!isNaN(previous) && !isNaN(current) && current >= previous) {
        total += current - previous;
      } else if (r.previous !== "" || r.current !== "") {
        allReadingsValid = false;
      }
    }

    if (!hasAnyReading) {
      setTotalUnits("");
    } else if (allReadingsValid && total > 0) {
      setTotalUnits(roundToTwoDecimals(total).toFixed(2));
    }
  }, [memberReadings, members]);

  const showError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearError = (field) => {
    setErrors((prev) => {
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
      `${memberId}-previous`,
    );

    const current = getNumericValue(
      memberReadings[memberId].current,
      `${memberName} Current Reading`,
      `${memberId}-current`,
    );

    if (previous === null || current === null) {
      return null;
    }

    if (current < previous) {
      showError(
        `${memberId}-current`,
        "Current reading cannot be less than previous reading",
      );
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
        value: "Please enter a valid bill amount",
        color: "#dc2626",
      });
      return;
    }

    if (isNaN(totalUnitsValue) || totalUnitsValue <= 0) {
      setPerUnitResult({
        show: true,
        value: "Please enter valid total units",
        color: "#dc2626",
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
      color: "#92400e",
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
        units: units,
      };

      totalUnitsValue += units;
    }

    if (totalUnitsValue === 0) {
      showError(
        "total-electricity-bill",
        "Total units consumed cannot be zero",
      );
      return null;
    }

    let perUnitCost;

    // Use saved per unit price if available, otherwise calculate from total bill amount
    if (savedPerUnitPrice !== null && savedPerUnitPrice > 0) {
      perUnitCost = savedPerUnitPrice;
    } else {
      const totalBillAmount = getNumericValue(
        totalElectricityBill,
        "Total Electricity Bill",
        "total-electricity-bill",
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
        electricityAmount: electricityAmount,
      };
    }

    return {
      totalUnits: totalUnitsValue,
      perUnitCost: perUnitCost,
      results: electricityResults,
    };
  };

  // Calculate Water Bills
  // ✅ FIXED Calculate Water Bills
  const calculateWaterBills = () => {
    let totalWaterUnitsValue = 0;

    // Case 1: Meter readings provided
    if (
      waterPreviousReading &&
      waterPreviousReading.trim() !== "" &&
      waterCurrentReading &&
      waterCurrentReading.trim() !== ""
    ) {
      const previousReading = getNumericValue(
        waterPreviousReading,
        "Motor previous reading",
        "water-previous",
      );

      if (previousReading === null) return null;

      const currentReading = getNumericValue(
        waterCurrentReading,
        "Motor current reading",
        "water-current",
      );

      if (currentReading === null) return null;

      if (currentReading < previousReading) {
        showError(
          "water-current",
          "Motor current reading cannot be less than previous",
        );
        return null;
      }

      // ✅ CORRECT: difference only
      totalWaterUnitsValue = currentReading - previousReading;
    }
    // Case 2: Manual total units provided
    else {
      const providedUnits = getNumericValue(
        totalWaterUnits,
        "Motor total units",
        "water-units",
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
        "Motor price per unit",
        "water-price",
      );
      if (waterPricePerUnitValue === null) return null;
    }

    // ✅ Divide ONLY for per-member calculation (among active members)
    const waterUnitsPerMember = roundToTwoDecimals(
      totalWaterUnitsValue / members.length,
    );

    const waterBillPerMember = roundToTwoDecimals(
      waterUnitsPerMember * waterPricePerUnitValue,
    );

    return {
      totalWaterUnits: roundToTwoDecimals(totalWaterUnitsValue), // ✅ FULL units
      waterUnitsPerMember,
      waterBillPerMember,
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
      setResults({
        type: "electricity-with-water",
        electricity: electricityData,
        water: waterData,
      });
    } else {
      setResults({ type: "electricity-only", electricity: electricityData });
    }
    savePreviousReadings();
  };

  // Handle member reading change
  const handleMemberReadingChange = (memberId, field, value) => {
    setMemberReadings((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value,
      },
    }));
  };

  // Handle meter photo upload — upload to Supabase Storage, store URL
  const [meterImageUploading, setMeterImageUploading] = useState({});
  const handleMeterImageUpload = async (meterId, e) => {
    const file = e?.target?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    e.target.value = "";

    if (!supabase || !isSupabaseConfigured()) {
      const reader = new FileReader();
      reader.onload = () =>
        setMeterImages((prev) => ({ ...prev, [meterId]: reader.result }));
      reader.readAsDataURL(file);
      return;
    }

    setMeterImageUploading((prev) => ({ ...prev, [meterId]: true }));
    try {
      const period = readingPeriodDate || getCurrentPeriod();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${selectedHouseId || "default"}/${period}/${meterId}.${ext}`;

      const { error } = await supabase.storage
        .from("meter-images")
        .upload(path, file, { upsert: true });
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("meter-images").getPublicUrl(path);
      setMeterImages((prev) => ({ ...prev, [meterId]: publicUrl }));
    } catch (err) {
      toast.error(err?.message || "Upload failed");
      const reader = new FileReader();
      reader.onload = () =>
        setMeterImages((prev) => ({ ...prev, [meterId]: reader.result }));
      reader.readAsDataURL(file);
    } finally {
      setMeterImageUploading((prev) => ({ ...prev, [meterId]: false }));
    }
  };

  const handleRemoveMeterImage = (meterId) => {
    setMeterImages((prev) => ({ ...prev, [meterId]: null }));
  };

  // Save current readings as previous for next month (auto-storage, per house)
  const savePreviousReadings = () => {
    if (!selectedHouseId) return;
    try {
      const data = {};
      members.forEach((m) => {
        const curr = memberReadings[m.id]?.current;
        if (curr != null && curr !== "") data[m.id] = curr;
      });
      if (waterCurrentReading != null && waterCurrentReading !== "") {
        data.motor = waterCurrentReading;
      }
      if (Object.keys(data).length > 0) {
        localStorage.setItem(
          `${STORAGE_KEY_PREVIOUS_READINGS}_${selectedHouseId}`,
          JSON.stringify(data),
        );
      }
    } catch (e) {
      /* ignore storage errors */
    }
  };

  // Add new member
  const addMember = (name) => {
    const trimmed = (name || "").trim();
    if (!trimmed) return;
    const id = generateMemberId();
    setMembers((prev) => [...prev, { id, name: trimmed }]);
    setMemberReadings((prev) => ({
      ...prev,
      [id]: { previous: "", current: "" },
    }));
    setMeterImages((prev) => ({ ...prev, [id]: null }));
  };

  // Remove member (require at least 1)
  const removeMember = (id) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setMemberReadings((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setMeterImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    clearError(`${id}-previous`);
    clearError(`${id}-current`);
  };

  // Update member name
  const updateMemberName = (id, newName) => {
    const trimmed = (newName || "").trim();
    if (!trimmed) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: trimmed } : m)),
    );
  };

  // Supabase: saved periods & cloud sync
  const [savedPeriods, setSavedPeriods] = useState([]);
  const [cloudSaving, setCloudSaving] = useState(false);
  const [cloudLoading, setCloudLoading] = useState(false);

  const fetchSavedPeriods = useCallback(async () => {
    if (!supabase || !selectedHouseId) return;
    try {
      const { data } = await supabase
        .from("readings")
        .select("reading_period")
        .eq("house_id", selectedHouseId)
        .order("reading_period", { ascending: false });
      const unique = [
        ...new Set((data || []).map((r) => r.reading_period).filter(Boolean)),
      ];
      setSavedPeriods(unique);
    } catch (e) {
      /* ignore */
    }
  }, [selectedHouseId]);

  useEffect(() => {
    if (isSupabaseConfigured() && selectedHouseId) fetchSavedPeriods();
  }, [selectedHouseId, fetchSavedPeriods]);

  const saveReadingsToSupabase = async () => {
    if (!supabase || !allReadingsFilled || !selectedHouseId) return;
    setCloudSaving(true);
    try {
      const period = readingPeriodDate || getCurrentPeriod();
      const { data: existing, error: selectErr } = await supabase
        .from("readings")
        .select("id")
        .eq("house_id", selectedHouseId)
        .eq("reading_period", period);
      if (selectErr) throw selectErr;
      if (existing?.length) {
        const { error: deleteErr } = await supabase
          .from("readings")
          .delete()
          .eq("house_id", selectedHouseId)
          .eq("reading_period", period);
        if (deleteErr) throw deleteErr;
      }
      const { error: deleteMotorErr } = await supabase
        .from("motor_readings")
        .delete()
        .eq("house_id", selectedHouseId)
        .eq("reading_period", period);
      if (deleteMotorErr) throw deleteMotorErr;
      for (const member of members) {
        const r = memberReadings[member.id];
        if (!r?.previous || !r?.current) continue;
        const units = parseFloat(r.current) - parseFloat(r.previous);
        const imgUrl = meterImages[member.id]?.startsWith?.("http")
          ? meterImages[member.id]
          : null;
        const { error: insertErr } = await supabase.from("readings").insert({
          house_id: selectedHouseId,
          reading_period: period,
          member_id: member.id,
          member_name: member.name,
          previous_reading: parseFloat(r.previous),
          current_reading: parseFloat(r.current),
          units,
          meter_image_url: imgUrl,
        });
        if (insertErr) throw insertErr;
      }
      if (waterPreviousReading && waterCurrentReading) {
        const motorImgUrl = meterImages.motor?.startsWith?.("http")
          ? meterImages.motor
          : null;
        const { error: motorErr } = await supabase.from("motor_readings").insert({
          house_id: selectedHouseId,
          reading_period: period,
          previous_reading: parseFloat(waterPreviousReading),
          current_reading: parseFloat(waterCurrentReading),
          units:
            parseFloat(waterCurrentReading) - parseFloat(waterPreviousReading),
          meter_image_url: motorImgUrl,
        });
        if (motorErr) throw motorErr;
      }
      await fetchSavedPeriods();
      const [y, m] = period.split("-");
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthLabel = monthNames[parseInt(m, 10) - 1] || m;
      toast.success(`Saved to cloud for ${monthLabel} ${y}`);
    } catch (e) {
      toast.error(e?.message || "Failed to save");
    } finally {
      setCloudSaving(false);
    }
  };

  const loadHistoryFromSupabase = async (period) => {
    if (!supabase || !period || !selectedHouseId) return;
    setCloudLoading(true);
    try {
      const { data: readings, error: readingsErr } = await supabase
        .from("readings")
        .select("*")
        .eq("house_id", selectedHouseId)
        .eq("reading_period", period);
      if (readingsErr) throw readingsErr;
      const { data: motor, error: motorErr } = await supabase
        .from("motor_readings")
        .select("*")
        .eq("house_id", selectedHouseId)
        .eq("reading_period", period)
        .maybeSingle();
      if (motorErr) throw motorErr;
      setReadingPeriodDate(period);
      if (readings?.length) {
        setMemberReadings((prev) => {
          const next = { ...prev };
          readings.forEach((r) => {
            if (next[r.member_id]) {
              next[r.member_id] = {
                previous: String(r.previous_reading ?? ""),
                current: String(r.current_reading ?? ""),
              };
            }
          });
          return next;
        });
        setMeterImages((prev) => {
          const next = { ...prev };
          members.forEach((m) => {
            const r = readings.find((rd) => rd.member_id === m.id);
            next[m.id] = r?.meter_image_url || null;
          });
          next.motor = motor?.meter_image_url || null;
          return next;
        });
      }
      if (motor) {
        setWaterPreviousReading(String(motor.previous_reading ?? ""));
        setWaterCurrentReading(String(motor.current_reading ?? ""));
        if (motor.meter_image_url) {
          setMeterImages((prev) => ({ ...prev, motor: motor.meter_image_url }));
        }
      }
      if (readings?.length || motor) {
        toast.success(`Loaded ${period}`);
      } else {
        toast("No saved data for this month", { icon: "ℹ️" });
      }
    } catch (e) {
      toast.error(e?.message || "Failed to load");
    } finally {
      setCloudLoading(false);
    }
  };

  const addHouse = async () => {
    const name = (newHouseName || "").trim();
    if (!name || !supabase) return;
    setAddingHouse(true);
    try {
      const { data, error } = await supabase
        .from("houses")
        .insert({ house_name: name })
        .select("id, house_name")
        .single();
      if (error) throw error;
      setHouses((prev) => [...prev, data]);
      setSelectedHouseId(data.id);
      setNewHouseName("");
      toast.success(`Added "${name}"`);
    } catch (e) {
      toast.error(e?.message || "Failed to add house");
    } finally {
      setAddingHouse(false);
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  // Price per unit section is disabled until all active cards have previous + current readings
  const allReadingsFilled = (() => {
    for (const member of members) {
      const r = memberReadings[member.id];
      if (r.previous.trim() === "" || r.current.trim() === "") return false;
    }
    if (waterPreviousReading.trim() === "" || waterCurrentReading.trim() === "")
      return false;
    return true;
  })();

  // Motor meter difference (current - previous) when both valid
  const motorDifference = (() => {
    const prev = parseFloat(waterPreviousReading);
    const curr = parseFloat(waterCurrentReading);
    if (
      waterPreviousReading === "" ||
      waterCurrentReading === "" ||
      isNaN(prev) ||
      isNaN(curr) ||
      curr < prev
    )
      return null;
    return roundToTwoDecimals(curr - prev);
  })();

  // Total of all differences: sub-meters total + motor difference
  const totalAllDifferences = (() => {
    const subTotal = totalUnits ? parseFloat(totalUnits) : 0;
    const motor = motorDifference != null ? motorDifference : 0;
    const combined = subTotal + motor;
    return subTotal > 0 || motor > 0
      ? roundToTwoDecimals(combined).toFixed(2)
      : null;
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
    const headers = [
      "Member",
      "Sub-meter units",
      "Sub-meter (₹)",
      "Motor (₹)",
      "Total (₹)",
    ];
    const body = [];
    let grandTotal = 0;
    members.forEach((member) => {
      let electricityAmount = 0,
        waterAmount = 0,
        electricityUnits = 0;
      if (results.type !== "water-only" && results.electricity) {
        const r = results.electricity.results[member.id];
        electricityAmount = r.electricityAmount;
        electricityUnits = r.units;
      }
      if (results.type !== "electricity-only" && results.water) {
        waterAmount = results.water.waterBillPerMember;
      }
      const totalPayable = electricityAmount + waterAmount;
      grandTotal += totalPayable;
      body.push([
        member.name,
        results.type === "water-only"
          ? "N/A"
          : roundToTwoDecimals(electricityUnits).toFixed(2),
        results.type === "water-only"
          ? "N/A"
          : formatCurrency(electricityAmount),
        results.type === "electricity-only"
          ? "N/A"
          : formatCurrency(waterAmount),
        formatCurrency(totalPayable),
      ]);
    });
    const totalSub = results.electricity
      ? roundToTwoDecimals(results.electricity.totalUnits).toFixed(2)
      : "N/A";
    const totalSubAmt = results.electricity
      ? formatCurrency(
          results.electricity.totalUnits * results.electricity.perUnitCost,
        )
      : "N/A";
    const totalMotor = results.water
      ? formatCurrency(results.water.waterBillPerMember * members.length)
      : "N/A";
    body.push([
      "TOTAL",
      totalSub,
      totalSubAmt,
      totalMotor,
      formatCurrency(grandTotal),
    ]);
    return { headers, body };
  };

  const handleDownloadPDF = () => {
    downloadAsPDF({
      results,
      members,
      memberReadings,
      waterPreviousReading,
      waterCurrentReading,
      waterPricePerUnit,
      readingPeriodDate,
      meterImages,
    });
  };

  const handleDownloadJPG = () => {
    downloadAsJPG(resultsSectionRef);
  };

  const handleDownloadExcel = () => {
    downloadAsExcel({
      results,
      members,
      memberReadings,
      waterPreviousReading,
      waterCurrentReading,
      waterPricePerUnit,
      readingPeriodDate,
    });
  };

  return (
    <div className="main-body">
      <Toaster position="top-right" />
      <motion.div
        className="calculator-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
        >
          <h1>🏠 HBC</h1>
          <p className="calculator-intro">
            One main meter bill, <strong>sub-meters</strong> (pay by your
            units), and <strong>1 motor meter</strong> (split equally). Enter
            total bill and readings —{" "}
            <strong>bill calculates automatically</strong>. Results and readings
            are saved to the cloud.
          </p>

          {isSupabaseConfigured() && (
            <div className="calculator-section calculator-house-row">
              <div className="calculator-house-filters">
                <div
                  className="calculator-input-group mb-0"
                  style={{ marginBottom: 0 }}
                >
                  <label htmlFor="house-select">House</label>
                  <CustomDropdown
                    id="house-select"
                    value={selectedHouseId}
                    onChange={(val) => setSelectedHouseId(val)}
                    placeholder="Select house..."
                    options={houses.map((h) => ({
                      value: h.id,
                      label: h.house_name,
                    }))}
                    className="calculator-load-history-select"
                  />
                </div>
                <div className="calculator-add-house-row">
                  <div
                    className="calculator-input-group"
                    style={{ marginBottom: 0 }}
                  >
                    <label htmlFor="new-house-name">Add new house</label>
                    <input
                      id="new-house-name"
                      type="text"
                      placeholder="House name"
                      value={newHouseName}
                      onChange={(e) => setNewHouseName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addHouse()}
                    />
                  </div>
                  <motion.button
                    type="button"
                    className="calculator-add-member-btn"
                    onClick={addHouse}
                    disabled={!newHouseName.trim() || addingHouse}
                    whileHover={
                      newHouseName.trim() && !addingHouse
                        ? buttonHover
                        : undefined
                    }
                    whileTap={
                      newHouseName.trim() && !addingHouse
                        ? buttonTap
                        : undefined
                    }
                  >
                    {addingHouse ? "Adding..." : "+ Add house"}
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          <div className="calculator-members-manager">
            <label>
              Members ({members.length} — motor split equally among)
            </label>
            <div className="calculator-add-member-row">
              <input
                type="text"
                id="new-member-name"
                placeholder="New member name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addMember(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <motion.button
                type="button"
                className="calculator-add-member-btn"
                onClick={() => {
                  const input = document.getElementById("new-member-name");
                  if (input) {
                    addMember(input.value);
                    input.value = "";
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

        <ErrorBoundary>
          <HBCDashboard houseId={selectedHouseId} />
        </ErrorBoundary>

        {/* Step 1: Price per unit — from main bill (disabled until all readings filled) */}
        <motion.div
          className={`calculator-section calculator-section-per-unit ${!allReadingsFilled ? "calculator-section-disabled" : ""}`}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
        >
          <h2 className="calculator-section-title">
            1. Price per unit (from main bill)
          </h2>
          <p className="calculator-section-hint">
            {allReadingsFilled
              ? "Use your main meter bill to get ₹/unit; same rate for sub-meters and motor."
              : `Fill previous & current readings in every active card (${members.length} sub-meters + motor) to enable this section.`}
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
                  if (
                    savedPerUnitPrice !== null &&
                    waterPricePerUnit &&
                    Math.abs(
                      parseFloat(waterPricePerUnit) - savedPerUnitPrice,
                    ) < 0.01
                  ) {
                    setWaterPricePerUnit("");
                  }
                  setSavedPerUnitPrice(null);
                  setPerUnitResult({ show: false, value: "", color: "" });
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
                  if (
                    savedPerUnitPrice !== null &&
                    waterPricePerUnit &&
                    Math.abs(
                      parseFloat(waterPricePerUnit) - savedPerUnitPrice,
                    ) < 0.01
                  ) {
                    setWaterPricePerUnit("");
                  }
                  setSavedPerUnitPrice(null);
                  setPerUnitResult({ show: false, value: "", color: "" });
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
          <h2 className="calculator-section-title">
            2. Sub-meters (pay by your units)
          </h2>
          <p className="calculator-section-hint">
            Enter each active person’s sub-meter readings. Motor is split
            equally among {members.length}{" "}
            {members.length === 1 ? "person" : "persons"}.
          </p>
          <div className="calculator-reading-period-row">
            <div
              className="calculator-input-group calculator-reading-period-input"
              style={{ marginBottom: 0 }}
            >
              <label htmlFor="reading-period-date">
                📅 Reading period (for monthly history)
              </label>
              <MonthPicker
                id="reading-period-date"
                value={readingPeriodDate}
                onChange={(period) => {
                  setReadingPeriodDate(period);
                  if (period && isSupabaseConfigured() && selectedHouseId) {
                    loadHistoryFromSupabase(period);
                  }
                }}
                placeholder="Select month"
                className="calculator-month-picker"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="supabas-block-top">
                {isSupabaseConfigured() && (
                  <div className="calculator-cloud-row supabas-block">
                    <CustomDropdown
                      className="calculator-load-history-select"
                      value=""
                      onChange={(p) => {
                        if (p) loadHistoryFromSupabase(p);
                      }}
                      placeholder="Load from cloud..."
                      placeholderAsOption={false}
                      options={savedPeriods.map((p) => ({
                        value: p,
                        label: p,
                      }))}
                      disabled={cloudLoading || savedPeriods.length === 0}
                    />
                    <div>
                      <motion.button
                        type="button"
                        className="calculator-save-cloud-btn"
                        onClick={saveReadingsToSupabase}
                        disabled={!allReadingsFilled || cloudSaving}
                        whileHover={
                          allReadingsFilled && !cloudSaving
                            ? buttonHover
                            : undefined
                        }
                        whileTap={
                          allReadingsFilled && !cloudSaving
                            ? buttonTap
                            : undefined
                        }
                      >
                        {cloudSaving ? "Saving..." : "☁️ Save to cloud"}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`calculator-input-group ${errors["total-electricity-bill"] ? "calculator-error" : ""}`}
          >
            <label htmlFor="total-electricity-bill">
              Main meter total bill (₹){" "}
              <span className="calculator-label-optional"></span>
              {savedPerUnitPrice !== null && (
                <span className="calculator-saved-rate">
                  Using saved rate: ₹{savedPerUnitPrice.toFixed(2)}/unit
                </span>
              )}
            </label>
            <input
              type="number"
              id="total-electricity-bill"
              step="0.01"
              min="0"
              placeholder={
                savedPerUnitPrice !== null
                  ? "Leave blank to use saved rate"
                  : "Enter main bill to derive rate"
              }
              value={totalElectricityBill}
              onChange={(e) => {
                setTotalElectricityBill(e.target.value);
                clearError("total-electricity-bill");
              }}
              onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
            />
            {errors["total-electricity-bill"] && (
              <span className="calculator-error-message show">
                {errors["total-electricity-bill"]}
              </span>
            )}
          </div>

          <motion.div
            className="calculator-members-grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                className="calculator-member-card"
                variants={staggerItem}
                custom={index}
                animate={
                  focusedCardId === member.id
                    ? cardFocusVariants.focused
                    : cardFocusVariants.idle
                }
              >
                <div className="calculator-member-card-header">
                  <input
                    type="text"
                    className="calculator-member-name-input"
                    value={member.name}
                    onChange={(e) =>
                      updateMemberName(member.id, e.target.value)
                    }
                    placeholder="Member name"
                  />
                  <span className="calculator-member-card-subtitle">
                    — sub-meter
                  </span>
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
                  <div
                    className={`calculator-input-group ${errors[`${member.id}-previous`] ? "calculator-error" : ""}`}
                  >
                    <label htmlFor={`${member.id}-previous`}>
                      Previous reading
                    </label>
                    <input
                      type="number"
                      id={`${member.id}-previous`}
                      step="0.01"
                      min="0"
                      placeholder="Previous"
                      value={(memberReadings[member.id] || {}).previous || ""}
                      onChange={(e) => {
                        handleMemberReadingChange(
                          member.id,
                          "previous",
                          e.target.value,
                        );
                        clearError(`${member.id}-previous`);
                      }}
                      onFocus={() => setFocusedCardId(member.id)}
                      onBlur={() => setFocusedCardId(null)}
                      onKeyPress={(e) =>
                        handleKeyPress(e, calculateElectricityOnly)
                      }
                    />
                    {errors[`${member.id}-previous`] && (
                      <span className="calculator-error-message show">
                        {errors[`${member.id}-previous`]}
                      </span>
                    )}
                  </div>
                  <div
                    className={`calculator-input-group ${errors[`${member.id}-current`] ? "calculator-error" : ""}`}
                  >
                    <label htmlFor={`${member.id}-current`}>
                      Current reading
                    </label>
                    <input
                      type="number"
                      id={`${member.id}-current`}
                      step="0.01"
                      min="0"
                      placeholder="Current"
                      value={(memberReadings[member.id] || {}).current || ""}
                      onChange={(e) => {
                        handleMemberReadingChange(
                          member.id,
                          "current",
                          e.target.value,
                        );
                        clearError(`${member.id}-current`);
                      }}
                      onFocus={() => setFocusedCardId(member.id)}
                      onBlur={() => setFocusedCardId(null)}
                      onKeyPress={(e) =>
                        handleKeyPress(e, calculateElectricityOnly)
                      }
                    />
                    {errors[`${member.id}-current`] && (
                      <span className="calculator-error-message show">
                        {errors[`${member.id}-current`]}
                      </span>
                    )}
                  </div>
                  {(() => {
                    const r = memberReadings[member.id] || {};
                    const prev = parseFloat(r.previous);
                    const curr = parseFloat(r.current);
                    if (
                      r.previous === "" ||
                      r.current === "" ||
                      isNaN(prev) ||
                      isNaN(curr) ||
                      curr < prev
                    )
                      return null;
                    return (
                      <div className="calculator-member-diff-inline">
                        Difference:{" "}
                        <strong>
                          {roundToTwoDecimals(curr - prev).toFixed(2)}
                        </strong>
                      </div>
                    );
                  })()}
                  <div className="calculator-meter-photo-upload">
                    <label className="calculator-meter-photo-label">
                      📷 Meter photo (optional)
                    </label>
                    {meterImages[member.id] ? (
                      <div className="calculator-meter-photo-preview">
                        <img
                          src={meterImages[member.id]}
                          alt={`${member.name} meter`}
                        />
                        <motion.button
                          type="button"
                          className="calculator-meter-photo-remove"
                          onClick={() => handleRemoveMeterImage(member.id)}
                          whileHover={buttonHover}
                          whileTap={buttonTap}
                          aria-label="Remove photo"
                        >
                          ✕
                        </motion.button>
                      </div>
                    ) : (
                      <label className="calculator-meter-photo-dropzone">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMeterImageUpload(member.id, e)}
                          disabled={meterImageUploading[member.id]}
                        />
                        <span>
                          {meterImageUploading[member.id]
                            ? "Uploading..."
                            : "+ Add photo"}
                        </span>
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
              animate={
                focusedCardId === "motor"
                  ? motorCardFocusVariants.focused
                  : motorCardFocusVariants.idle
              }
            >
              <h3>Motor meter (split equally)</h3>
              <div className="calculator-member-inputs">
                <div
                  className={`calculator-input-group ${errors["water-previous"] ? "calculator-error" : ""}`}
                >
                  <label htmlFor="water-previous-reading">
                    Previous reading
                  </label>
                  <input
                    type="number"
                    id="water-previous-reading"
                    step="0.01"
                    min="0"
                    placeholder="Previous"
                    value={waterPreviousReading}
                    onChange={(e) => {
                      setWaterPreviousReading(e.target.value);
                      clearError("water-previous");
                    }}
                    onFocus={() => setFocusedCardId("motor")}
                    onBlur={() => setFocusedCardId(null)}
                    onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                  />
                  {errors["water-previous"] && (
                    <span className="calculator-error-message show">
                      {errors["water-previous"]}
                    </span>
                  )}
                </div>
                <div
                  className={`calculator-input-group ${errors["water-current"] ? "calculator-error" : ""}`}
                >
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
                      clearError("water-current");
                    }}
                    onFocus={() => setFocusedCardId("motor")}
                    onBlur={() => setFocusedCardId(null)}
                    onKeyPress={(e) => handleKeyPress(e, calculateElectricityOnly)}
                  />
                  {errors["water-current"] && (
                    <span className="calculator-error-message show">
                      {errors["water-current"]}
                    </span>
                  )}
                </div>
                {motorDifference != null && (
                  <div className="calculator-motor-diff-inline">
                    Difference: <strong>{motorDifference.toFixed(2)}</strong>
                  </div>
                )}
                <div className="calculator-meter-photo-upload">
                  <label className="calculator-meter-photo-label">
                    📷 Meter photo (optional)
                  </label>
                  {meterImages.motor ? (
                    <div className="calculator-meter-photo-preview">
                      <img src={meterImages.motor} alt="Motor meter" />
                      <motion.button
                        type="button"
                        className="calculator-meter-photo-remove"
                        onClick={() => handleRemoveMeterImage("motor")}
                        whileHover={buttonHover}
                        whileTap={buttonTap}
                        aria-label="Remove photo"
                      >
                        ✕
                      </motion.button>
                    </div>
                  ) : (
                    <label className="calculator-meter-photo-dropzone calculator-meter-photo-dropzone-motor">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMeterImageUpload("motor", e)}
                        disabled={meterImageUploading.motor}
                      />
                      <span>
                        {meterImageUploading.motor
                          ? "Uploading..."
                          : "+ Add photo"}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="calculator-submeter-total-row">
            <span className="calculator-submeter-total-label">
              {totalUnits && (
                <>
                  Sub-meters total: <strong>{totalUnits}</strong>
                </>
              )}
              {totalUnits && motorDifference != null && " · "}
              {totalAllDifferences && (
                <>
                  Total of all (sub-meters + motor):{" "}
                  <strong>{totalAllDifferences}</strong>
                </>
              )}
            </span>
            <div className="calculator-submeter-buttons">
              <motion.button
                type="button"
                className="calculator-per-unit-btn calculator-total-units-btn"
                onClick={handleCalculateTotalUnits}
                disabled={
                  !totalAllDifferences || parseFloat(totalAllDifferences) <= 0
                }
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
                disabled={
                  !allReadingsFilled ||
                  !perUnitTotal ||
                  parseFloat(perUnitTotal) <= 0 ||
                  !perUnitBill ||
                  parseFloat(perUnitBill) <= 0
                }
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
              <motion.div
                className="calculator-summary-card"
                variants={staggerItem}
              >
                <h4>Sub-meters total</h4>
                <div className="calculator-value">{totalUnits}</div>
              </motion.div>
            )}
            {motorDifference != null && (
              <motion.div
                className="calculator-summary-card"
                variants={staggerItem}
              >
                <h4>Motor units</h4>
                <div className="calculator-value">
                  {motorDifference.toFixed(2)}
                </div>
              </motion.div>
            )}
            {totalAllDifferences && (
              <motion.div
                className="calculator-summary-card calculator-auto-summary-total"
                variants={staggerItem}
              >
                <h4>Total units</h4>
                <div className="calculator-value">{totalAllDifferences}</div>
              </motion.div>
            )}
            {savedPerUnitPrice != null && savedPerUnitPrice > 0 && (
              <motion.div
                className="calculator-summary-card"
                variants={staggerItem}
              >
                <h4>Per unit (₹)</h4>
                <div className="calculator-value">
                  {formatCurrency(savedPerUnitPrice)}
                </div>
              </motion.div>
            )}
            {readingPeriodDate && (
              <motion.div
                className="calculator-summary-card"
                variants={staggerItem}
              >
                <h4>Reading period</h4>
                <div className="calculator-value">{readingPeriodDate}</div>
              </motion.div>
            )}
            <motion.div
              className="calculator-summary-card"
              variants={staggerItem}
            >
              <h4>Members</h4>
              <div className="calculator-value">{members.length}</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="calculator-button-group"
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
        >
          <motion.button
            type="button"
            className="calculator-calculate-btn"
            onClick={calculateElectricityOnly}
            aria-label="Calculate sub-meter and motor bills"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Calculate Bills
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

              {/* Member | Units | Bill Amount table (electricity) */}
              {results.type !== "water-only" && results.electricity && (
                <motion.div
                  className="calculator-table-wrapper"
                  variants={staggerItem}
                  style={{ marginBottom: "24px" }}
                >
                  <table className="calculator-results-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Units</th>
                        <th>Bill Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => {
                        const r = results.electricity.results[member.id];
                        return (
                          <tr key={member.id}>
                            <td>
                              <strong>{member.name}</strong>
                            </td>
                            <td>{roundToTwoDecimals(r.units).toFixed(2)}</td>
                            <td>{formatCurrency(r.electricityAmount)}</td>
                          </tr>
                        );
                      })}
                      <tr className="calculator-total-row">
                        <td>
                          <strong>TOTAL</strong>
                        </td>
                        <td>
                          <strong>
                            {roundToTwoDecimals(
                              results.electricity.totalUnits,
                            ).toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {formatCurrency(
                              results.electricity.totalUnits *
                                results.electricity.perUnitCost,
                            )}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}

              <motion.div
                className="calculator-download-row"
                variants={staggerItem}
              >
                <span className="calculator-download-label">Download:</span>
                <motion.button
                  type="button"
                  className="calculator-download-btn calculator-download-pdf"
                  onClick={handleDownloadPDF}
                  aria-label="Download as PDF"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  PDF
                </motion.button>
                <motion.button
                  type="button"
                  className="calculator-download-btn calculator-download-excel"
                  onClick={handleDownloadExcel}
                  aria-label="Download as Excel"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Excel
                </motion.button>
                <motion.button
                  type="button"
                  className="calculator-download-btn calculator-download-jpg"
                  onClick={handleDownloadJPG}
                  aria-label="Download as JPG"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  JPG
                </motion.button>
              </motion.div>

              <motion.div
                ref={resultsSectionRef}
                className="calculator-results-download-area"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  className="calculator-summary-box"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    className="calculator-summary-card"
                    variants={staggerItem}
                  >
                    <h4>Total sub-meter units</h4>
                    <div className="calculator-value">
                      {results.type === "water-only"
                        ? "N/A"
                        : roundToTwoDecimals(
                            results.electricity.totalUnits,
                          ).toFixed(2)}
                    </div>
                  </motion.div>
                  <motion.div
                    className="calculator-summary-card"
                    variants={staggerItem}
                  >
                    <h4>Per unit cost (₹)</h4>
                    <div className="calculator-value">
                      {results.type === "water-only"
                        ? "N/A"
                        : formatCurrency(results.electricity.perUnitCost)}
                    </div>
                  </motion.div>
                  <motion.div
                    className="calculator-summary-card"
                    variants={staggerItem}
                  >
                    <h4>Motor total units</h4>
                    <div className="calculator-value">
                      {results.type === "electricity-only"
                        ? "N/A"
                        : roundToTwoDecimals(
                            results.water.totalWaterUnits,
                          ).toFixed(2)}
                    </div>
                  </motion.div>
                  <motion.div
                    className="calculator-summary-card"
                    variants={staggerItem}
                  >
                    <h4>Motor per person (equal)</h4>
                    <div className="calculator-value">
                      {results.type === "electricity-only"
                        ? "N/A"
                        : roundToTwoDecimals(
                            results.water.waterUnitsPerMember,
                          ).toFixed(2)}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Meter photos in results (record proof — included in JPG) */}
                {(() => {
                  const withPhotos = [
                    ...members.map((m) => ({ id: m.id, label: m.name })),
                    { id: "motor", label: "Motor" },
                  ].filter((m) => meterImages[m.id]);
                  if (withPhotos.length === 0) return null;
                  return (
                    <motion.div
                      className="calculator-results-meter-photos"
                      variants={staggerItem}
                    >
                      <h4 className="calculator-results-meter-photos-title">
                        📷 Meter Photos (Record Proof)
                      </h4>
                      {readingPeriodDate && (
                        <p className="calculator-results-meter-photos-period">
                          Period: {readingPeriodDate}
                        </p>
                      )}
                      <div className="calculator-results-meter-photos-grid">
                        {withPhotos.map((m) => (
                          <div
                            key={m.id}
                            className="calculator-results-meter-photo-item"
                          >
                            <img
                              src={meterImages[m.id]}
                              alt={`${m.label} meter`}
                            />
                            <span>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Member-wise Usage Chart (electricity only) */}
                {results.type !== "water-only" && results.electricity && (
                  <motion.div
                    className="calculator-usage-chart-wrapper"
                    variants={staggerItem}
                  >
                    <h4 className="calculator-usage-chart-title">
                      Member-wise Electricity Usage
                    </h4>
                    <div className="calculator-usage-chart">
                      {members.map((member, index) => {
                        const r = results.electricity.results[member.id];
                        const units = roundToTwoDecimals(r.units);
                        const maxUnits = results.electricity.totalUnits;
                        const percent =
                          maxUnits > 0 ? (units / maxUnits) * 100 : 0;
                        const colors = [
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                          "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                        ];
                        return (
                          <div
                            key={member.id}
                            className="calculator-usage-chart-row"
                          >
                            <span className="calculator-usage-chart-label">
                              {member.name}
                            </span>
                            <div className="calculator-usage-chart-bar-track">
                              <motion.div
                                className="calculator-usage-chart-bar"
                                style={{
                                  background: colors[index % colors.length],
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.max(percent, 4)}%` }}
                                transition={{
                                  duration: 0.6,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                              />
                            </div>
                            <span className="calculator-usage-chart-value">
                              {units.toFixed(2)} units
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Desktop/Tablet: Table view */}
                <motion.div
                  className="calculator-table-wrapper calculator-results-table-desktop"
                  variants={staggerItem}
                >
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
                        const rows = members.map((member) => {
                          let electricityAmount = 0;
                          let waterAmount = 0;
                          let electricityUnits = 0;

                          if (results.type !== "water-only") {
                            const electricityResult =
                              results.electricity.results[member.id];
                            electricityAmount =
                              electricityResult.electricityAmount;
                            electricityUnits = electricityResult.units;
                          }

                          if (results.type !== "electricity-only") {
                            waterAmount = results.water.waterBillPerMember;
                          }

                          const totalPayable = electricityAmount + waterAmount;
                          grandTotal += totalPayable;

                          return (
                            <tr key={member.id}>
                              <td>
                                <strong>{member.name}</strong>
                              </td>
                              <td>
                                {results.type === "water-only"
                                  ? "N/A"
                                  : roundToTwoDecimals(
                                      electricityUnits,
                                    ).toFixed(2)}
                              </td>
                              <td>
                                {results.type === "water-only"
                                  ? "N/A"
                                  : formatCurrency(electricityAmount)}
                              </td>
                              <td>
                                {results.type === "electricity-only"
                                  ? "N/A"
                                  : formatCurrency(waterAmount)}
                              </td>
                              <td>
                                <strong>{formatCurrency(totalPayable)}</strong>
                              </td>
                            </tr>
                          );
                        });

                        return [
                          ...rows,
                          <tr key="total" className="calculator-total-row">
                            <td>
                              <strong>TOTAL</strong>
                            </td>
                            <td>
                              <strong>
                                {results.type === "water-only"
                                  ? "N/A"
                                  : roundToTwoDecimals(
                                      results.electricity.totalUnits,
                                    ).toFixed(2)}
                              </strong>
                            </td>
                            <td>
                              <strong>
                                {results.type === "water-only"
                                  ? "N/A"
                                  : formatCurrency(
                                      results.electricity.totalUnits *
                                        results.electricity.perUnitCost,
                                    )}
                              </strong>
                            </td>
                            <td>
                              <strong>
                                {results.type === "electricity-only"
                                  ? "N/A"
                                  : formatCurrency(
                                      results.water.waterBillPerMember *
                                        members.length,
                                    )}
                              </strong>
                            </td>
                            <td>
                              <strong>{formatCurrency(grandTotal)}</strong>
                            </td>
                          </tr>,
                        ];
                      })()}
                    </tbody>
                  </table>
                </motion.div>

                {/* Mobile: Card layout for better UX on small screens */}
                <motion.div
                  className="calculator-results-cards-mobile"
                  variants={staggerItem}
                >
                  {members.map((member) => {
                    let electricityAmount = 0,
                      waterAmount = 0,
                      electricityUnits = 0;
                    if (results.type !== "water-only" && results.electricity) {
                      const r = results.electricity.results[member.id];
                      electricityAmount = r.electricityAmount;
                      electricityUnits = r.units;
                    }
                    if (results.type !== "electricity-only" && results.water) {
                      waterAmount = results.water.waterBillPerMember;
                    }
                    const totalPayable = electricityAmount + waterAmount;
                    return (
                      <div
                        key={member.id}
                        className="calculator-result-card-mobile"
                      >
                        <div className="calculator-result-card-mobile-header">
                          {member.name}
                        </div>
                        <div className="calculator-result-card-mobile-body">
                          {results.type !== "water-only" && (
                            <>
                              <div className="calculator-result-card-row">
                                <span>Sub-meter units</span>
                                <strong>
                                  {roundToTwoDecimals(electricityUnits).toFixed(
                                    2,
                                  )}
                                </strong>
                              </div>
                              <div className="calculator-result-card-row">
                                <span>Sub-meter (₹)</span>
                                <strong>
                                  {formatCurrency(electricityAmount)}
                                </strong>
                              </div>
                            </>
                          )}
                          {results.type !== "electricity-only" && (
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
                    members.forEach((member) => {
                      let electricityAmount = 0,
                        waterAmount = 0;
                      if (results.type !== "water-only" && results.electricity)
                        electricityAmount =
                          results.electricity.results[member.id]
                            .electricityAmount;
                      if (results.type !== "electricity-only" && results.water)
                        waterAmount = results.water.waterBillPerMember;
                      grandTotal += electricityAmount + waterAmount;
                    });
                    return (
                      <div
                        key="total"
                        className="calculator-result-card-mobile calculator-result-card-total-row"
                      >
                        <div className="calculator-result-card-mobile-header">
                          TOTAL
                        </div>
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
  );
};

export default HBC;
