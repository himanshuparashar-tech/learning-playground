import React, { useState } from "react";
import ReusableInput from "../components/ReusableInput/ReusableInput";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    about: "",
    agree: false,
    role: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name) newErrors.name = "Name required";
    if (!form.email) newErrors.email = "Email required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ SUBMITTED DATA:", form);
      alert("Profile Updated!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "100%", margin: "40px auto" }}
    >

      {/* ✅ TEXT */}
      <ReusableInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        leftIcon="👤"
      />

      {/* ✅ EMAIL */}
      <ReusableInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        rightIcon="📧"
      />

      {/* ✅ SELECT */}
      <ReusableInput
        label="Gender"
        type="select"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />

      {/* ✅ TEXTAREA */}
      <ReusableInput
        label="About"
        type="textarea"
        name="about"
        value={form.about}
        onChange={handleChange}
        // For the use Bootstrap
        bootstrap={true}
      />

      {/* ✅ RADIO */}
      <ReusableInput
        label="Role"
        type="radio"
        name="role"
        value={form.role}
        onChange={handleChange}
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ]}
      />

      {/* ✅ CHECKBOX */}
      <ReusableInput
        label="Agree to Terms"
        type="checkbox"
        name="agree"
        value={form.agree}
        onChange={handleChange}
      />

      {/* ✅ FILE UPLOAD */}
      <ReusableInput
        label="Profile Picture"
        type="file"
        name="file"
        onChange={handleChange}
      />

      <button type="submit">Save Profile</button>
    </form>
  );
}
