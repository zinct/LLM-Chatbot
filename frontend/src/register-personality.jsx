import React from 'react';

export function PersonalityTraitsForm({ formData, handleChange }) {
  const personalityTraits = ["Analytical", "Creative", "Detail-oriented", "Leadership", "Collaborative", "Independent", "Innovative", "Adaptable", "Organized", "Problem-solver", "Communication", "Strategic"];

  const handleTraitToggle = (trait) => {
    const currentTraits = [...formData.personalityTraits];
    if (currentTraits.includes(trait)) {
      handleChange(
        "personalityTraits",
        currentTraits.filter((t) => t !== trait)
      );
    } else {
      handleChange("personalityTraits", [...currentTraits, trait]);
    }
  };

  // Validation
  const isValid = formData.personalityTraits.length >= 3 && formData.personalityTraits.length <= 5;
  const hasSelection = formData.personalityTraits.length > 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personality Traits</h3>
      <p className="text-sm text-gray-400">Select 3-5 traits that best describe you. This helps our AI match you with suitable roles.</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {personalityTraits.map((trait) => (
          <button key={trait} type="button" onClick={() => handleTraitToggle(trait)} className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${formData.personalityTraits.includes(trait) ? "border-cyan-400 bg-cyan-950/20 text-cyan-400" : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}>
            <span>{trait}</span>
          </button>
        ))}
      </div>

      {hasSelection && !isValid && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3 flex items-start gap-2">
          <div>
            <p className="text-sm text-amber-400">Please select between 3-5 traits</p>
            <p className="text-xs text-amber-400/80 mt-1">
              You've selected {formData.personalityTraits.length} {formData.personalityTraits.length === 1 ? "trait" : "traits"}
            </p>
          </div>
        </div>
      )}

      {!hasSelection && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
          <p className="text-sm text-amber-400">Please select at least 3 traits to continue</p>
        </div>
      )}
    </div>
  );
}
