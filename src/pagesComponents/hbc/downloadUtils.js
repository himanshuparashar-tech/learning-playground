import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { roundToTwoDecimals, formatCurrency } from "./utils";

export const downloadAsPDF = ({
  results,
  members,
  memberReadings,
  waterPreviousReading,
  waterCurrentReading,
  waterPricePerUnit,
  readingPeriodDate,
  meterImages,
}) => {
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
    if (v === "" || v == null) return "—";
    const n = parseFloat(v);
    return isNaN(n) ? "—" : Number.isInteger(n) ? String(n) : n.toFixed(2);
  };

  doc.setFontSize(10);
  const centerX = pageW / 2;

  addPageIfNeeded(lineHeight * 12);
  doc.setFont(undefined, "bold");
  doc.setFontSize(11);
  doc.text("Meter Readings", centerX, y, { align: "center" });
  y += lineHeight + 2;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  const meterRows = [];
  members.forEach((member, i) => {
    const prev = memberReadings[member.id]?.previous ?? "";
    const curr = memberReadings[member.id]?.current ?? "";
    const prevN = prev !== "" ? parseFloat(prev) : NaN;
    const currN = curr !== "" ? parseFloat(curr) : NaN;
    const diff =
      !isNaN(prevN) && !isNaN(currN) && currN >= prevN
        ? roundToTwoDecimals(currN - prevN)
        : null;
    meterRows.push([
      `${i + 1} house ${member.name}`,
      fmt(prev),
      fmt(curr),
      diff != null ? diff.toFixed(2) : "—",
    ]);
  });
  const motorPrevN =
    waterPreviousReading !== "" ? parseFloat(waterPreviousReading) : NaN;
  const motorCurrN =
    waterCurrentReading !== "" ? parseFloat(waterCurrentReading) : NaN;
  const motorDiff =
    !isNaN(motorPrevN) && !isNaN(motorCurrN) && motorCurrN >= motorPrevN
      ? roundToTwoDecimals(motorCurrN - motorPrevN)
      : null;
  meterRows.push([
    "MOTOR",
    fmt(waterPreviousReading),
    fmt(waterCurrentReading),
    motorDiff != null ? motorDiff.toFixed(2) : "—",
  ]);

  autoTable(doc, {
    head: [["Meter", "Previous", "Current", "Difference"]],
    body: meterRows,
    startY: y,
    theme: "grid",
    headStyles: { fontStyle: "bold", halign: "center" },
    bodyStyles: { halign: "center" },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
    },
  });
  y = doc.lastAutoTable.finalY + sectionGap;

  if (readingPeriodDate) {
    addPageIfNeeded(lineHeight * 2);
    doc.setFont(undefined, "bold");
    doc.text(`Reading period: ${readingPeriodDate}`, left, y);
    doc.setFont(undefined, "normal");
    y += lineHeight + 4;
  }

  const metersWithPhotos = [
    ...members.map((m) => ({ id: m.id, label: m.name })),
    { id: "motor", label: "Motor" },
  ].filter((m) => meterImages?.[m.id]);
  if (metersWithPhotos.length > 0) {
    addPageIfNeeded(lineHeight * 4);
    doc.setFont(undefined, "bold");
    doc.setFontSize(11);
    doc.text("Meter Photos (Record Proof)", centerX, y, { align: "center" });
    y += lineHeight + 4;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    const imgMaxW = 50;
    const imgMaxH = 35;
    for (const m of metersWithPhotos) {
      const dataUrl = meterImages[m.id];
      if (!dataUrl) continue;
      addPageIfNeeded(imgMaxH + 12);
      const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
      if (match) {
        const fmtImg =
          match[1].toUpperCase() === "JPG" ? "JPEG" : match[1].toUpperCase();
        const base64 = match[2];
        try {
          doc.text(`${m.label} meter:`, left, y);
          y += 4;
          doc.addImage(base64, fmtImg, left, y, imgMaxW, imgMaxH);
          y += imgMaxH + 6;
        } catch (err) {
          doc.text(`[Image for ${m.label} could not be embedded]`, left, y);
          y += 6;
        }
      }
    }
    y += sectionGap;
  }

  addPageIfNeeded(lineHeight * 4);
  doc.setFont(undefined, "bold");
  doc.setFontSize(11);
  doc.text("Total used Unit & Unit wise bill", centerX, y, { align: "center" });
  y += lineHeight + 2;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  const perUnitCost = results.electricity
    ? results.electricity.perUnitCost
    : parseFloat(waterPricePerUnit || 0);
  const motorUnitsPerMember = results.water
    ? roundToTwoDecimals(results.water.totalWaterUnits / members.length)
    : 0;

  members.forEach((member, i) => {
    addPageIfNeeded(lineHeight * 4);
    const subUnits =
      results.type !== "water-only" && results.electricity
        ? roundToTwoDecimals(results.electricity.results[member.id].units)
        : 0;
    const totalUnitsPerson = roundToTwoDecimals(
      subUnits + motorUnitsPerMember
    );
    const amount =
      results.type === "water-only"
        ? roundToTwoDecimals(results.water.waterBillPerMember)
        : roundToTwoDecimals(totalUnitsPerson * perUnitCost);

    doc.text(`${i + 1} house ${member.name} -`, centerX, y, {
      align: "center",
    });
    y += lineHeight;
    doc.text(
      `${subUnits.toFixed(2)} + ${motorUnitsPerMember.toFixed(2)} (motor) = ${totalUnitsPerson.toFixed(2)}`,
      centerX,
      y,
      { align: "center" }
    );
    y += lineHeight;
    doc.text(
      `${totalUnitsPerson.toFixed(2)} x ${perUnitCost.toFixed(2)} = ₹${amount.toFixed(2)}`,
      centerX,
      y,
      { align: "center" }
    );
    y += lineHeight + 2;
  });
  y += sectionGap - 2;

  addPageIfNeeded(lineHeight * 4);
  doc.setFont(undefined, "bold");
  doc.setFontSize(11);
  doc.text("Total bill / Total unit consumed", centerX, y, {
    align: "center",
  });
  y += lineHeight + 2;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);

  const totalUnitsConsumed = results.electricity
    ? roundToTwoDecimals(
        results.electricity.totalUnits +
          (results.water ? results.water.totalWaterUnits : 0)
      )
    : results.water
      ? roundToTwoDecimals(results.water.totalWaterUnits)
      : 0;
  let totalBillAmount = 0;
  if (results.electricity && results.water) {
    totalBillAmount = roundToTwoDecimals(
      results.electricity.totalUnits * results.electricity.perUnitCost +
        results.water.totalWaterUnits * parseFloat(waterPricePerUnit || 0)
    );
  } else if (results.electricity) {
    totalBillAmount = roundToTwoDecimals(
      results.electricity.totalUnits * results.electricity.perUnitCost
    );
  } else if (results.water) {
    totalBillAmount = roundToTwoDecimals(
      results.water.totalWaterUnits * parseFloat(waterPricePerUnit || 0)
    );
  }
  const perUnitDisplay =
    totalUnitsConsumed > 0
      ? roundToTwoDecimals(totalBillAmount / totalUnitsConsumed)
      : perUnitCost;

  doc.text(
    `= ₹${totalBillAmount.toFixed(2)} / ${totalUnitsConsumed.toFixed(2)}`,
    centerX,
    y,
    { align: "center" }
  );
  y += lineHeight;
  doc.text(`= ₹${perUnitDisplay.toFixed(2)} per unit price`, centerX, y, {
    align: "center",
  });

  doc.save("hbc-results.pdf");
};

export const downloadAsJPG = async (resultsSectionRef) => {
  if (!resultsSectionRef?.current) return;
  try {
    const canvas = await html2canvas(resultsSectionRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    const link = document.createElement("a");
    link.download = "hbc-results.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.click();
  } catch (e) {
    console.error("JPG export failed", e);
  }
};

export const downloadAsExcel = ({
  results,
  members,
  memberReadings,
  waterPreviousReading,
  waterCurrentReading,
  waterPricePerUnit,
  readingPeriodDate,
}) => {
  if (!results) return;
  const wb = XLSX.utils.book_new();
  const rows = [];

  if (readingPeriodDate) {
    rows.push(["Reading period", readingPeriodDate], []);
  }

  rows.push(["HBC Bill Calculator - Results"], []);

  rows.push(["Summary"]);
  rows.push([
    "Total sub-meter units",
    results.type === "water-only"
      ? "N/A"
      : roundToTwoDecimals(results.electricity.totalUnits).toFixed(2),
  ]);
  rows.push([
    "Per unit cost (₹)",
    results.type === "water-only"
      ? "N/A"
      : formatCurrency(results.electricity.perUnitCost),
  ]);
  rows.push([
    "Motor total units",
    results.type === "electricity-only"
      ? "N/A"
      : roundToTwoDecimals(results.water.totalWaterUnits).toFixed(2),
  ]);
  rows.push([
    "Motor per person (equal)",
    results.type === "electricity-only"
      ? "N/A"
      : roundToTwoDecimals(results.water.waterUnitsPerMember).toFixed(2),
  ]);
  rows.push([]);

  rows.push(["Meter Readings"]);
  rows.push(["Meter", "Previous", "Current", "Difference"]);
  members.forEach((member, i) => {
    const prev = memberReadings[member.id]?.previous ?? "";
    const curr = memberReadings[member.id]?.current ?? "";
    const prevN = prev !== "" ? parseFloat(prev) : NaN;
    const currN = curr !== "" ? parseFloat(curr) : NaN;
    const diff =
      !isNaN(prevN) && !isNaN(currN) && currN >= prevN
        ? roundToTwoDecimals(currN - prevN)
        : "—";
    rows.push([
      `${i + 1} house ${member.name}`,
      prev || "—",
      curr || "—",
      diff,
    ]);
  });
  const motorPrevN =
    waterPreviousReading !== "" ? parseFloat(waterPreviousReading) : NaN;
  const motorCurrN =
    waterCurrentReading !== "" ? parseFloat(waterCurrentReading) : NaN;
  const motorDiff =
    !isNaN(motorPrevN) && !isNaN(motorCurrN) && motorCurrN >= motorPrevN
      ? roundToTwoDecimals(motorCurrN - motorPrevN)
      : "—";
  rows.push([
    "MOTOR",
    waterPreviousReading != null ? waterPreviousReading : "—",
    waterCurrentReading != null ? waterCurrentReading : "—",
    motorDiff,
  ]);

  rows.push([]);

  // Bill Breakdown
  rows.push(["Bill Breakdown"]);
  rows.push(["Member", "Sub-meter units", "Sub-meter (₹)", "Motor (₹)", "Total (₹)"]);
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
    rows.push([
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
        results.electricity.totalUnits * results.electricity.perUnitCost
      )
    : "N/A";
  const totalMotor = results.water
    ? formatCurrency(results.water.waterBillPerMember * members.length)
    : "N/A";
  rows.push(["TOTAL", totalSub, totalSubAmt, totalMotor, formatCurrency(grandTotal)]);
  rows.push([]);

  // Member-wise usage (electricity only)
  if (results.type !== "water-only" && results.electricity) {
    rows.push(["Member-wise Electricity Usage"]);
    rows.push(["Member", "Units"]);
    members.forEach((member) => {
      const r = results.electricity.results[member.id];
      rows.push([member.name, roundToTwoDecimals(r.units).toFixed(2)]);
    });
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "HBC Results");

  const filename = readingPeriodDate
    ? `hbc-results-${readingPeriodDate}.xlsx`
    : "hbc-results.xlsx";
  XLSX.writeFile(wb, filename);
};
