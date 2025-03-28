import React, { useState } from "react";

export function CareerPreferencesForm({ step, formData, handleChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Define options for each step
  const jobRoles = [
    // Technology
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Cloud Architect",
    "Data Scientist",
    "Data Engineer",
    "Machine Learning Engineer",
    "AI Specialist",
    "Blockchain Developer",
    "Game Developer",
    "QA Engineer",
    "Security Engineer",
    "Systems Administrator",
    "Network Engineer",
    "Database Administrator",

    // Design
    "UX Designer",
    "UI Designer",
    "Product Designer",
    "Graphic Designer",
    "Motion Designer",
    "3D Artist",
    "Web Designer",

    // Product & Management
    "Product Manager",
    "Project Manager",
    "Scrum Master",
    "Agile Coach",
    "Business Analyst",
    "Program Manager",

    // Marketing & Content
    "Digital Marketing Specialist",
    "Content Writer",
    "SEO Specialist",
    "Social Media Manager",
    "Growth Hacker",
    "Brand Manager",
    "Marketing Analyst",

    // Business & Finance
    "Financial Analyst",
    "Accountant",
    "Business Development",
    "Sales Representative",
    "Customer Success Manager",
    "Operations Manager",

    // Other
    "HR Specialist",
    "Recruiter",
    "Legal Counsel",
    "Executive Assistant",
    "Customer Support",
    "Teacher/Instructor",
    "Healthcare Professional",
    "Research Scientist",
  ].sort();

  const industries = ["Aerospace", "Automation", "Banking", "Healthcare", "IT", "Education", "E-commerce", "Entertainment", "Manufacturing", "Retail", "Telecommunications", "Transportation"];

  const educationLevels = [
    { value: "high-school", label: "High School Diploma" },
    { value: "associate", label: "Associate Degree" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD or Doctorate" },
    { value: "vocational", label: "Vocational Training" },
    { value: "certification", label: "Professional Certification" },
    { value: "self-taught", label: "Self-taught" },
  ];

  const locations = ["Indonesia", "Australia", "United States", "Singapore", "Japan", "United Kingdom", "Canada", "Germany", "India", "Remote (Worldwide)"];

  const handleMultiSelect = (field, value) => {
    const currentValues = [...formData[field]];
    if (currentValues.includes(value)) {
      handleChange(
        field,
        currentValues.filter((v) => v !== value)
      );
    } else {
      handleChange(field, [...currentValues, value]);
    }
  };

  const filteredJobRoles = jobRoles.filter((role) => role.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const removeJobRole = (role) => {
    handleChange(
      "jobRolePreferences",
      formData.jobRolePreferences.filter((r) => r !== role)
    );
  };

  // Render different form based on step
  switch (step) {
    case 1: // Job Role Preferences
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Job Role Preferences</h3>
          <p className="text-sm text-gray-400">Select the job roles you're interested in (select multiple if applicable)</p>

          {/* Selected roles display */}
          {formData.jobRolePreferences.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.jobRolePreferences.map((role) => (
                <div key={role} className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-cyan-400 text-sm">
                  {role}
                  <button type="button" onClick={() => removeJobRole(role)} className="ml-1 text-cyan-400/70 hover:text-cyan-400"></button>
                </div>
              ))}
            </div>
          )}

          {/* Dropdown */}
          <div className="relative">
            <button type="button" onClick={toggleDropdown} className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-left text-gray-300 hover:border-white/30">
              <span>{formData.jobRolePreferences.length > 0 ? `${formData.jobRolePreferences.length} role(s) selected` : "Select job roles"}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-white/10 bg-gray-900 shadow-lg">
                <div className="p-2">
                  <input type="text" placeholder="Search roles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none" />
                </div>
                <div className="max-h-60 overflow-y-auto p-2">
                  {filteredJobRoles.length > 0 ? (
                    filteredJobRoles.map((role) => (
                      <button key={role} type="button" onClick={() => handleMultiSelect("jobRolePreferences", role)} className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm ${formData.jobRolePreferences.includes(role) ? "bg-cyan-950/50 text-cyan-400" : "text-gray-300 hover:bg-white/5"}`}>
                        <span>{role}</span>
                      </button>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-400">No matching roles found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {formData.jobRolePreferences.length === 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select at least one job role to continue</p>
            </div>
          )}
        </div>
      );

    case 2: // Job Search Status
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Job Search Status</h3>
          <p className="text-sm text-gray-400">Where are you in your job search?</p>

          <div className="space-y-3">
            {[
              {
                value: "active",
                label: "Active Job Seeker (Currently looking for new opportunities)",
              },
              {
                value: "passive",
                label: "Passive Job Seeker (Open to opportunities but not actively looking)",
              },
              {
                value: "not-seeking",
                label: "Not A Job Seeker (Just exploring the platform)",
              },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.jobSearchStatus === option.value ? "border-cyan-400 bg-cyan-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <span className={formData.jobSearchStatus === option.value ? "text-cyan-400" : "text-gray-300"}>{option.label}</span>
                <input type="radio" name="jobSearchStatus" value={option.value} checked={formData.jobSearchStatus === option.value} onChange={(e) => handleChange("jobSearchStatus", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.jobSearchStatus === option.value ? "border-cyan-400 bg-cyan-400/20" : "border-white/30 bg-transparent"}`}>{formData.jobSearchStatus === option.value && <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.jobSearchStatus === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your job search status to continue</p>
            </div>
          )}
        </div>
      );

    case 3: // Role Level
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Role Level</h3>
          <p className="text-sm text-gray-400">What level of role are you looking for?</p>

          <div className="space-y-3">
            {[
              { value: "intern", label: "Intern" },
              { value: "entry", label: "Entry Level" },
              { value: "junior", label: "Junior" },
              { value: "mid", label: "Mid-Level" },
              { value: "senior", label: "Senior" },
              { value: "lead", label: "Lead/Managerial" },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.roleLevel === option.value ? "border-violet-400 bg-violet-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <span className={formData.roleLevel === option.value ? "text-violet-400" : "text-gray-300"}>{option.label}</span>
                <input type="radio" name="roleLevel" value={option.value} checked={formData.roleLevel === option.value} onChange={(e) => handleChange("roleLevel", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.roleLevel === option.value ? "border-violet-400 bg-violet-400/20" : "border-white/30 bg-transparent"}`}>{formData.roleLevel === option.value && <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.roleLevel === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your desired role level to continue</p>
            </div>
          )}
        </div>
      );

    case 4: // Work Mode
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Preferred Work Mode</h3>
          <p className="text-sm text-gray-400">What type of work environment do you prefer?</p>

          <div className="space-y-3">
            {[
              { value: "remote", label: "Remote (Work from anywhere)" },
              { value: "hybrid", label: "Hybrid (Mix of remote and on-site)" },
              { value: "onsite", label: "On-site (Work at the office)" },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.workMode === option.value ? "border-cyan-400 bg-cyan-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <div className="flex items-center gap-3">
                  <span className={formData.workMode === option.value ? "text-cyan-400" : "text-gray-300"}>{option.label}</span>
                </div>
                <input type="radio" name="workMode" value={option.value} checked={formData.workMode === option.value} onChange={(e) => handleChange("workMode", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.workMode === option.value ? "border-cyan-400 bg-cyan-400/20" : "border-white/30 bg-transparent"}`}>{formData.workMode === option.value && <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.workMode === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your preferred work mode to continue</p>
            </div>
          )}
        </div>
      );

    case 5: // Company Size
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Preferred Company Size</h3>
          <p className="text-sm text-gray-400">What size of company would you prefer to work for?</p>

          <div className="space-y-3">
            {[
              {
                value: "startup",
                label: "Startup (1-10 employees)",
                icon: <></>,
              },
              {
                value: "small",
                label: "Small (11-50 employees)",
                icon: <></>,
              },
              {
                value: "medium",
                label: "Medium (51-200 employees)",
                icon: <></>,
              },
              {
                value: "large",
                label: "Large (201+ employees)",
                icon: <></>,
              },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.companySize === option.value ? "border-violet-400 bg-violet-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span className={formData.companySize === option.value ? "text-violet-400" : "text-gray-300"}>{option.label}</span>
                </div>
                <input type="radio" name="companySize" value={option.value} checked={formData.companySize === option.value} onChange={(e) => handleChange("companySize", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.companySize === option.value ? "border-violet-400 bg-violet-400/20" : "border-white/30 bg-transparent"}`}>{formData.companySize === option.value && <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.companySize === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your preferred company size to continue</p>
            </div>
          )}
        </div>
      );

    case 6: // Industries of Interest
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Industries of Interest</h3>
          <p className="text-sm text-gray-400">Select the industries you're interested in working in (select multiple if applicable)</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {industries.map((industry) => (
              <button key={industry} type="button" onClick={() => handleMultiSelect("industriesOfInterest", industry)} className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${formData.industriesOfInterest.includes(industry) ? "border-cyan-400 bg-cyan-950/20 text-cyan-400" : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}>
                <span>{industry}</span>
              </button>
            ))}
          </div>
          {formData.industriesOfInterest.length === 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select at least one industry to continue</p>
            </div>
          )}
        </div>
      );

    case 7: // Education Level
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Education Level</h3>
          <p className="text-sm text-gray-400">What is your highest level of education?</p>

          <div className="space-y-3">
            {educationLevels.map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.educationLevel === option.value ? "border-violet-400 bg-violet-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <span className={formData.educationLevel === option.value ? "text-violet-400" : "text-gray-300"}>{option.label}</span>
                <input type="radio" name="educationLevel" value={option.value} checked={formData.educationLevel === option.value} onChange={(e) => handleChange("educationLevel", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.educationLevel === option.value ? "border-violet-400 bg-violet-400/20" : "border-white/30 bg-transparent"}`}>{formData.educationLevel === option.value && <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.educationLevel === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your education level to continue</p>
            </div>
          )}
        </div>
      );

    case 8: // Years of Experience (shifted from 7 to 8)
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Years of Experience</h3>
          <p className="text-sm text-gray-400">How many years of professional experience do you have?</p>

          <div className="space-y-3">
            {[
              { value: "0", label: "No experience" },
              { value: "1-2", label: "1-2 years" },
              { value: "3-5", label: "3-5 years" },
              { value: "6-9", label: "6-9 years" },
              { value: "10+", label: "10+ years" },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.yearsOfExperience === option.value ? "border-cyan-400 bg-cyan-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <span className={formData.yearsOfExperience === option.value ? "text-cyan-400" : "text-gray-300"}>{option.label}</span>
                <input type="radio" name="yearsOfExperience" value={option.value} checked={formData.yearsOfExperience === option.value} onChange={(e) => handleChange("yearsOfExperience", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.yearsOfExperience === option.value ? "border-cyan-400 bg-cyan-400/20" : "border-white/30 bg-transparent"}`}>{formData.yearsOfExperience === option.value && <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.yearsOfExperience === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your years of experience to continue</p>
            </div>
          )}
        </div>
      );

    case 9: // Expected Location (shifted from 8 to 9)
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Expected Location</h3>
          <p className="text-sm text-gray-400">Where would you prefer to work?</p>

          <div className="space-y-3">
            {locations.map((location) => (
              <label key={location} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${formData.expectedLocation === location ? "border-cyan-400 bg-cyan-950/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>
                <div className="flex items-center gap-3">
                  <span className={formData.expectedLocation === location ? "text-cyan-400" : "text-gray-300"}>{location}</span>
                </div>
                <input type="radio" name="expectedLocation" value={location} checked={formData.expectedLocation === location} onChange={(e) => handleChange("expectedLocation", e.target.value)} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.expectedLocation === location ? "border-cyan-400 bg-cyan-400/20" : "border-white/30 bg-transparent"}`}>{formData.expectedLocation === location && <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>}</div>
              </label>
            ))}
          </div>
          {formData.expectedLocation === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">Please select your expected location to continue</p>
            </div>
          )}
        </div>
      );

    default:
      return <div>Unknown step</div>;
  }
}
