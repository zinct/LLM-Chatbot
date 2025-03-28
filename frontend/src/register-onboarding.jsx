import React from 'react';

export function OnboardingProgress({ currentStep, totalSteps }) {
  // Calculate progress percentage
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-xs text-gray-400">{Math.round(progressPercentage)}% Complete</span>
      </div>
      <div className="relative mt-2 h-1 w-full rounded-full bg-gray-800">
        <div initial={{ width: "0%" }} animate={{ width: `${progressPercentage}%` }} className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>
      </div>
    </div>
  );
}
