import React from 'react';

export function LearningStyleForm({ formData, handleChange }) {
  const isValid = formData.learningStyle !== "";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Learning Style</h3>
      <p className="text-sm text-gray-400">How do you prefer to learn new skills? This helps us recommend suitable courses and resources.</p>

      <div className="space-y-3">
        {[
          {
            value: "visual",
            label: "Visual Learning (videos, diagrams, demonstrations)",
          },
          {
            value: "practical",
            label: "Practical Learning (hands-on, projects, experimentation)",
          },
          {
            value: "theoretical",
            label: "Theoretical Learning (reading, research, concepts)",
          },
          {
            value: "social",
            label: "Social Learning (discussion, group work, mentorship)",
          },
        ].map((option) => (
          <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.learningStyle === option.value ? "border-violet-400 bg-violet-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
            <div className="flex items-center gap-2">
              <span className={formData.learningStyle === option.value ? "text-violet-400" : "text-gray-300"}>{option.label}</span>
            </div>
            <input type="radio" name="learningStyle" value={option.value} checked={formData.learningStyle === option.value} onChange={(e) => handleChange("learningStyle", e.target.value)} className="sr-only" />
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.learningStyle === option.value ? "border-violet-400 bg-violet-400/20" : "border-white/30 bg-transparent"}`}>{formData.learningStyle === option.value && <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>}</div>
          </label>
        ))}
      </div>

      {!isValid && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
          <p className="text-sm text-amber-400">Please select your preferred learning style to continue</p>
        </div>
      )}
    </div>
  );
}
