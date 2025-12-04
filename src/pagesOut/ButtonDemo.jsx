import React, { useState } from "react";
import ReusableButtons from "../components/ReusableButtons/ReusableButtons";

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Saved Successfully!");
    }, 2000);
  };

  return (
    <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px" }}>
      {/* ✅ BASIC VARIANTS */}
      <ReusableButtons>Primary</ReusableButtons>
      <ReusableButtons variant="secondary">Secondary</ReusableButtons>
      <ReusableButtons variant="danger">Danger</ReusableButtons>
      <ReusableButtons variant="success">Success</ReusableButtons>
      <ReusableButtons variant="warning">Warning</ReusableButtons>
      <ReusableButtons variant="outline">Outline</ReusableButtons>
      <ReusableButtons variant="ghost">Ghost</ReusableButtons>

      {/* ✅ SIZES */}
      <ReusableButtons size="xs">XS</ReusableButtons>
      <ReusableButtons size="sm">Small</ReusableButtons>
      <ReusableButtons size="lg">Large</ReusableButtons>
      <ReusableButtons size="xl">Extra Large</ReusableButtons>

      {/* ✅ FULL WIDTH */}
      <ReusableButtons full>Full Width Button</ReusableButtons>

      {/* ✅ ICON BUTTON */}
      <ReusableButtons leftIcon="💾" rightIcon="➡️">
        Save
      </ReusableButtons>

      {/* ✅ LOADING STATE */}
      <ReusableButtons loading={loading} onClick={handleSave}>
        Save Data
      </ReusableButtons>

      {/* ✅ DISABLED */}
      <ReusableButtons disabled>Disabled</ReusableButtons>

      {/* ✅ PILL SHAPE + SHADOW */}
      <ReusableButtons rounded="pill" shadow>
        Rounded Pill
      </ReusableButtons>

      {/* ✅ SUBMIT BUTTON */}
      <ReusableButtons type="submit" variant="success">
        Submit Form
      </ReusableButtons>

      {/* ✅ BOOTSTRAP 5 MODE */}
      <ReusableButtons bootstrap variant="primary">
        Bootstrap Button
      </ReusableButtons>
    </div>
  );
}
