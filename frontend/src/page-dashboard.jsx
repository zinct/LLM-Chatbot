import { Button } from "./button";
import React, { useEffect, useState } from "react";

const DashboardPage = ({ navigate }) => {
  const [animateBackground, setAnimateBackground] = useState(false);

  // Start background animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBackground(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved Lines */}
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Top Curves */}
            <path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 0 50 Q 150 20 300 50 T 600 50"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 100 Q 120 70 240 100 T 480 100"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
          </svg>

          {/* Straight Lines */}
          <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${30 + i * 20}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}60, transparent)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-[1]">
          <div initial={{ opacity: 0 }} animate={{ opacity: animateBackground ? 0.2 : 0 }} transition={{ duration: 2 }} className="absolute -left-1/4 top-1/4 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl" />
          <div initial={{ opacity: 0 }} animate={{ opacity: animateBackground ? 0.2 : 0 }} transition={{ duration: 2, delay: 0.5 }} className="absolute -right-1/4 top-1/2 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20"></div>
              <h2 className="text-2xl font-bold">Welcome to JobPilot</h2>
            </div>

            <p className="text-gray-300">JobPilot is an AI-powered career advancement platform that helps professionals discover opportunities, develop skills, and accelerate their career growth through cutting-edge technology.</p>

            <div className="space-y-2 pt-2">
              <div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex items-start gap-2">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">AI-Powered Matching:</span> Our algorithms connect you with the perfect job opportunities based on your unique skills and preferences.
                </p>
              </div>

              <div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex items-start gap-2">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Resume Optimization:</span> Create and analyze professional resumes with our AI tools to stand out to recruiters and ATS systems.
                </p>
              </div>

              <div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="flex items-start gap-2">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Blockchain Verification:</span> Secure and transparent credential verification that gives you an edge in the job market.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-center">
            <div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative">
              {/* Career Path Visualization */}
              <div className="w-full max-w-[280px] rounded-lg border border-white/20 bg-gradient-to-b from-gray-800/80 to-gray-900/80 p-4 shadow-xl backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium">Your Career Path</h3>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20"></div>
                </div>

                <div className="relative mb-2 h-1 w-full rounded-full bg-white/10">
                  <div initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ delay: 1, duration: 1.5 }} className="absolute h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>

                <div className="mb-4 flex justify-between text-xs text-gray-400">
                  <span>Junior</span>
                  <span>Mid-level</span>
                  <span>Senior</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-xs">Current Skills</span>
                    </div>
                    <span className="text-xs font-medium">75%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <span className="text-xs">Job Matches</span>
                    </div>
                    <span className="text-xs font-medium">24</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                      <span className="text-xs">Growth Potential</span>
                    </div>
                    <span className="text-xs font-medium">High</span>
                  </div>
                </div>

                {/* AI Scanning Effect */}
                <div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    repeatDelay: 5,
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{ opacity: 0.7 }}
                />
              </div>

              {/* Floating Elements */}
              <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="absolute -right-4 -top-4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                  <p className="text-xs text-white">AI analyzing profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* CV Generator Card */}
        <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20"></div>
              <h3 className="text-lg font-medium">CV Generator</h3>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">AI-Powered</span>
          </div>
          <p className="mb-4 text-gray-400">Create professional resumes tailored to specific job opportunities.</p>
          <Button
            className="w-full justify-between"
            onClick={() => {
              navigate("/dashboard/cv-generator");
            }}
          >
            Create New CV
          </Button>
        </div>

        {/* Job Recommendations Card */}
        <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/20"></div>
              <h3 className="text-lg font-medium">Job Matches</h3>
            </div>
            <span className="rounded-full bg-violet-400/20 px-2 py-1 text-xs text-violet-400">AI-Recommendation</span>
          </div>
          <p className="mb-4 text-gray-400">Personalized job recommendations based on your profile.</p>
          <Button
            className="w-full justify-between"
            onClick={() => {
              navigate("/dashboard/job-recommendations");
            }}
          >
            View Job Matches
          </Button>
        </div>

        {/* Course Recommendations Card */}
        <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20"></div>
              <h3 className="text-lg font-medium">Resume Analysis</h3>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">AI-Expert</span>
          </div>
          <p className="mb-4 text-gray-400">Get insights on your resume with AI-driven feedback to improve your chances of landing a job.</p>
          <Button
            className="w-full justify-between"
            onClick={() => {
              navigate("/dashboard/cv-analysis");
            }}
          >
            Analyze My Resume
          </Button>
        </div>

        {/* Course Recommendations Card */}
        <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/20"></div>
              <h3 className="text-lg font-medium">Career Assistant</h3>
            </div>
            <span className="rounded-full bg-violet-400/20 px-2 py-1 text-xs text-violet-400">Expert-Assistant</span>
          </div>
          <p className="mb-4 text-gray-400 flex-grow">Get personalized career guidance and job search support tailored to your goals.</p>
          <Button className="w-full mt-auto flex justify-between">Start your career plan</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
