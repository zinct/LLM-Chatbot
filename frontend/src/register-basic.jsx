import React from 'react';

export function BasicInfoForm({ formData, handleChange }) {
  // Track if fields are valid
  const isNameValid = formData.name.trim() !== "";
  const isDateOfBirthValid = formData.dateOfBirth !== "";
  const isFormValid = isNameValid && isDateOfBirthValid;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <p className="text-sm text-gray-400">Let's start with some basic details about you</p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <span>Full Name</span>
              <span className="text-red-400">*</span>
            </div>
          </label>
          <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className={`w-full rounded-lg border ${!isNameValid && formData.name !== "" ? "border-red-400" : "border-white/10"} bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`} placeholder="Enter your full name" required />
          {!isNameValid && formData.name !== "" && <p className="mt-1 text-xs text-red-400">Please enter your name</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <span>Date of Birth</span>
              <span className="text-red-400">*</span>
            </div>
          </label>
          <input type="date" value={formData.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} className={`w-full rounded-lg border ${!isDateOfBirthValid && formData.dateOfBirth !== "" ? "border-red-400" : "border-white/10"} bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`} required />
          {!isDateOfBirthValid && formData.dateOfBirth !== "" && <p className="mt-1 text-xs text-red-400">Please select your date of birth</p>}
        </div>
      </div>

      {!isFormValid && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
          <p className="text-sm text-amber-400">Please fill in all required fields to continue</p>
        </div>
      )}
    </div>
  );
}
