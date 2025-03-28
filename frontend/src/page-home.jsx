import { Button } from "./button";
import React, { useEffect, useState } from "react";

const HomePage = ({ navigate }) => {
  // State for resume process animation
  const [animationStep, setAnimationStep] = useState(0);

  // State for job recommendation animation
  const [jobAnimationStep, setJobAnimationStep] = useState(0);

  // Loop through animation steps
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 5);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Control job recommendation animation sequence
  useEffect(() => {
    const timings = [2000, 3000, 1000, 6000];

    if (jobAnimationStep < 4) {
      const timeout = setTimeout(() => {
        setJobAnimationStep((prev) => prev + 1);
      }, timings[jobAnimationStep]);

      return () => clearTimeout(timeout);
    } else {
      // Reset animation after a delay
      const resetTimeout = setTimeout(() => {
        setJobAnimationStep(0);
      }, 5000);

      return () => clearTimeout(resetTimeout);
    }
  }, [jobAnimationStep]);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between px-4">
            <a className="flex items-center space-x-2 font-bold" href="/">
              <span className="text-xl">JobPilot</span>
            </a>

            {/* Auth Buttons */}
            <div
              className="flex items-center"
              onClick={() => {
                navigate("/get-started");
              }}
            >
              <Button className="hover:border-cyan-400 border-none hover:text-cyan-400 bg-cyan-400/10 text-cyan-300">Get Started</Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Curved Lines */}
            <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
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
                d="M 100 100 Q 300 0 500 100 T 900 100"
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
                d="M 0 200 Q 200 100 400 200 T 800 200"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="1"
              />
              {/* Bottom Curves */}
              <path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 1,
                }}
                d="M 100 600 Q 300 500 500 600 T 900 600"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1"
              />
            </svg>

            {/* Straight Lines */}
            <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{
                    x: "-100%",
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  className="absolute right-0"
                  style={{
                    top: `${15 + i * 10}%`,
                    height: "1px",
                    width: "100%",
                    background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}60, transparent)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Animated Background */}
          <div className="absolute inset-0 z-[1]">
            <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
            <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }} className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
          </div>

          {/* Content */}
          <div className="container relative z-[3] px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mx-auto max-w-3xl space-y-8 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">Decentralize AI-Powered Career Advancement</h1>
                <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl lg:mx-0">Our platform leverages AI and blockchain technology to revolutionize how professionals discover opportunities, develop skills, and advance their careers</p>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Button
                    onClick={() => {
                      navigate("/get-started");
                    }}
                    className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600"
                  >
                    Get Started
                  </Button>
                </div>
              </div>

              {/* CV Visualization */}
              <div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="hidden lg:block">
                <div className="relative mx-auto max-w-md">
                  {/* CV Document */}
                  <div className="rounded-lg border border-white/20 bg-gradient-to-b from-gray-800/80 to-gray-900/80 p-6 shadow-2xl backdrop-blur-sm">
                    {/* CV Header with AI Analysis */}
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">Professional Resume</h3>
                        <p className="text-sm text-cyan-400">AI-Optimized</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20"></div>
                    </div>

                    {/* AI Analysis Indicators */}
                    <div className="mb-6 rounded-md border border-cyan-400/30 bg-cyan-950/20 p-3">
                      <div className="mb-2 flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-cyan-400"></div>
                        <p className="text-sm font-medium text-cyan-400">AI Match Score: 94%</p>
                      </div>
                      <p className="text-xs text-gray-300">Optimized for Senior Developer positions</p>
                    </div>

                    {/* CV Content with Highlights */}
                    <div className="space-y-4">
                      {/* Experience Section */}
                      <div>
                        <h4 className="mb-2 font-medium text-white">Experience</h4>
                        <div className="space-y-3">
                          <div className="rounded-md bg-white/5 p-3">
                            <div className="flex justify-between">
                              <p className="font-medium text-white">Senior Developer</p>
                              <div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                                className="rounded-sm bg-cyan-400/20 px-2 py-0.5 text-xs text-cyan-400"
                              >
                                AI Highlighted
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">TechCorp Inc. • 2020-Present</p>
                            <p className="mt-1 text-xs text-gray-300">Led development of cloud-based solutions...</p>
                          </div>
                          <div className="rounded-md bg-white/5 p-3">
                            <p className="font-medium text-white">Web Developer</p>
                            <p className="text-sm text-gray-400">Digital Solutions • 2018-2020</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <h4 className="mb-2 font-medium text-white">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {["JavaScript", "React", "Node.js", "Cloud", "AI/ML"].map((skill, index) => (
                            <span
                              key={index}
                              initial={{ opacity: 0.7 }}
                              animate={{
                                opacity: index === 0 || index === 4 ? [0.7, 1, 0.7] : 0.7,
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                              className={`rounded-full px-3 py-1 text-xs ${index === 0 || index === 4 ? "border border-cyan-400/50 bg-cyan-950/30 text-cyan-400" : "bg-white/10 text-gray-300"}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Scanning Effect */}
                    <div
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                      }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      style={{ opacity: 0.7 }}
                    />
                  </div>

                  {/* AI Analysis Floating Elements */}
                  <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute -right-10 -top-10 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <p className="text-xs text-white">Analyzing skills</p>
                    </div>
                  </div>
                  <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute -bottom-5 -left-5 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                      <p className="text-xs text-white">Job matching</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our AI-Powered Solutions</h2>
              <p className="mt-4 text-gray-400">Experience career development that works for you</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50">
                <h3 className="mb-2 text-xl font-bold">AI Job Matching</h3>
                <p className="text-gray-400">Smart job recommendations personalized to your profile, skills, and career preferences.</p>
              </div>
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50">
                <h3 className="mb-2 text-xl font-bold">Resume Analysis</h3>
                <p className="text-gray-400">Create and analyze professional resumes with our AI tools to stand out to recruiters and ATS systems.</p>
              </div>
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50">
                <h3 className="mb-2 text-xl font-bold">Career Assistant</h3>
                <p className="text-gray-400">AI-powered assistant providing career advice, interview tips, and professional guidance.</p>
              </div>
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50">
                <h3 className="mb-2 text-xl font-bold">AI Resume Maker</h3>
                <p className="text-gray-400">Resume-building tool that generates optimized CVs tailored to specific job opportunities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Features Section */}
        <section id="resume-features" className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advanced Resume Tools
              </h2>
              <p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="mt-4 text-gray-400">
                Create, analyze, and optimize your resume with our AI-powered tools
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* AI Resume Builder Feature */}
              <div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-400/10"></div>
                  <h3 className="text-2xl font-bold">AI Resume Builder</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300">Create professional resumes with our AI-powered builder that optimizes your content for ATS systems and helps you stand out to recruiters.</p>

                  <div className="space-y-3">
                    {["Multiple professional templates", "AI-powered content suggestions", "Keyword optimization for job matching", "Real-time preview and editing", "One-click export to PDF"].map((feature, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Resume Analysis Feature */}
              <div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-400/20 to-violet-400/10"></div>
                  <h3 className="text-2xl font-bold">Resume Analysis</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300">Upload your existing resume for instant AI analysis that identifies strengths, weaknesses, and provides actionable recommendations.</p>

                  <div className="space-y-3">
                    {["Comprehensive content evaluation", "Formatting and structure review", "Skill gap identification", "Keyword optimization suggestions", "Personalized improvement recommendations"].map((feature, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Process Animation */}
            <div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="mt-24 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6 backdrop-blur-sm">
              <h3 className="mb-8 text-center text-2xl font-bold">The Resume Creation & Analysis Process</h3>

              <div className="relative">
                {/* Timeline Track */}
                <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-white/10"></div>

                {/* Timeline Steps */}
                <div className="relative space-y-16 pb-8">
                  {/* Step 1: Choose Template */}
                  <div className={`relative flex ${animationStep === 0 ? "opacity-100" : "opacity-40"} transition-opacity duration-500`}>
                    <div className="flex w-1/2 justify-end pr-8">
                      <div className="max-w-xs space-y-2 text-right">
                        <h4 className="font-bold text-white">1. Choose Template</h4>
                        <p className="text-sm text-gray-400">Select from multiple professional templates designed for various industries and career levels.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-black">
                      <div className={`h-5 w-5 rounded-full ${animationStep === 0 ? "bg-cyan-400" : "bg-white/20"}`}></div>
                    </div>
                    <div className="w-1/2 pl-8">
                      <div className="aspect-video max-w-xs overflow-hidden rounded-md border border-white/10 bg-white/5 p-2">
                        <div className="h-full w-full rounded bg-gradient-to-br from-gray-800 to-gray-900 p-3">
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className={`aspect-[3/4] rounded ${i === 0 && animationStep === 0 ? "border-2 border-cyan-400 ring-2 ring-cyan-400/30" : "border border-white/10"} bg-gradient-to-br from-gray-700 to-gray-800`}>
                                <div className="h-1/4 w-full rounded-t bg-gradient-to-r from-gray-600 to-gray-700"></div>
                                <div className="p-1">
                                  <div className="h-1 w-8 rounded-full bg-white/20"></div>
                                  <div className="mt-2 h-1 w-full rounded-full bg-white/10"></div>
                                  <div className="mt-1 h-1 w-full rounded-full bg-white/10"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Add Content */}
                  <div className={`relative flex ${animationStep === 1 ? "opacity-100" : "opacity-40"} transition-opacity duration-500`}>
                    <div className="flex w-1/2 justify-end pr-8">
                      <div className="aspect-video max-w-xs overflow-hidden rounded-md border border-white/10 bg-white/5 p-2">
                        <div className="flex h-full flex-col rounded bg-gradient-to-br from-gray-800 to-gray-900 p-3">
                          <div className="space-y-2">
                            <div className={`h-4 w-3/4 rounded-full ${animationStep === 1 ? "bg-cyan-400/30" : "bg-white/10"}`}></div>
                            <div className="h-3 w-full rounded-full bg-white/10"></div>
                            <div className="h-3 w-full rounded-full bg-white/10"></div>
                          </div>
                          <div className="mt-2 flex-1 rounded border border-white/10 p-2">
                            <div className={`h-4 w-1/3 rounded-full ${animationStep === 1 ? "bg-cyan-400/20" : "bg-white/10"}`}></div>
                            <div className="mt-1 h-3 w-full rounded-full bg-white/10"></div>
                            <div animate={{ opacity: animationStep === 1 ? [0.3, 1, 0.3] : 0.3 }} transition={{ duration: 1, repeat: animationStep === 1 ? Number.POSITIVE_INFINITY : 0 }} className="mt-1 h-3 w-2/3 rounded-full bg-cyan-400/20"></div>
                            <div className="mt-1 h-3 w-full rounded-full bg-white/10"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-black">
                      <div className={`h-5 w-5 rounded-full ${animationStep === 1 ? "bg-cyan-400" : "bg-white/20"}`}></div>
                    </div>
                    <div className="w-1/2 pl-8">
                      <div className="max-w-xs space-y-2">
                        <h4 className="font-bold text-white">2. Add Your Information</h4>
                        <p className="text-sm text-gray-400">Input your experience, education, skills, and projects with AI assistance to optimize your content.</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: AI Enhancement */}
                  <div className={`relative flex ${animationStep === 2 ? "opacity-100" : "opacity-40"} transition-opacity duration-500`}>
                    <div className="flex w-1/2 justify-end pr-8">
                      <div className="max-w-xs space-y-2 text-right">
                        <h4 className="font-bold text-white">3. AI Enhancement</h4>
                        <p className="text-sm text-gray-400">Our AI suggests improvements to your content, enhances your descriptions, and optimizes keywords.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-black">
                      <div className={`h-5 w-5 rounded-full ${animationStep === 2 ? "bg-cyan-400" : "bg-white/20"}`}></div>
                    </div>
                    <div className="w-1/2 pl-8">
                      <div className="aspect-video max-w-xs overflow-hidden rounded-md border border-white/10 bg-white/5 p-2">
                        <div className="relative h-full w-full rounded bg-gradient-to-br from-gray-800 to-gray-900 p-3">
                          {/* AI Suggestions */}
                          <div className="space-y-2">
                            <div className="h-4 w-2/3 rounded-full bg-white/20"></div>
                            <div className="h-3 w-full rounded-full bg-white/10"></div>

                            <div className={`relative rounded border border-white/10 p-2 ${animationStep === 2 ? "border-cyan-400/30 bg-cyan-950/20" : ""}`}>
                              <div className="flex items-center justify-between">
                                <div className="h-3 w-1/3 rounded-full bg-white/20"></div>
                                {animationStep === 2 && (
                                  <div className="flex items-center space-x-1 rounded-sm bg-cyan-400/20 px-1.5 py-0.5">
                                    <span className="text-[10px] text-cyan-400">AI Suggestion</span>
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 h-3 w-full rounded-full bg-white/10"></div>
                              {animationStep === 2 && <div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }} className="mt-1 h-3 w-2/3 rounded-full bg-cyan-400/30"></div>}
                            </div>

                            <div className="h-3 w-full rounded-full bg-white/10"></div>
                          </div>

                          {/* Scanning animation */}
                          {animationStep === 2 && <div initial={{ top: 0 }} animate={{ top: "100%" }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }} className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Preview & Export */}
                  <div className={`relative flex ${animationStep === 3 ? "opacity-100" : "opacity-40"} transition-opacity duration-500`}>
                    <div className="flex w-1/2 justify-end pr-8">
                      <div className="aspect-video max-w-xs overflow-hidden rounded-md border border-white/10 bg-white/5 p-2">
                        <div className="flex h-full flex-col rounded bg-white p-3">
                          {/* Resume Preview */}
                          <div className="mb-1 h-4 w-1/3 rounded-full bg-gray-800"></div>
                          <div className="mb-3 h-3 w-2/3 rounded-full bg-gray-300"></div>

                          <div className="mb-2 h-3 w-1/4 rounded-full bg-gray-800"></div>
                          <div className="mb-1 h-2 w-full rounded-full bg-gray-200"></div>
                          <div className="mb-1 h-2 w-full rounded-full bg-gray-200"></div>
                          <div className="mb-3 h-2 w-2/3 rounded-full bg-gray-200"></div>

                          <div className="mb-2 h-3 w-1/4 rounded-full bg-gray-800"></div>
                          <div className="mb-1 h-2 w-full rounded-full bg-gray-200"></div>
                          <div className="mb-1 h-2 w-full rounded-full bg-gray-200"></div>

                          {/* Export buttons */}
                          {animationStep === 3 && (
                            <div className="mt-auto flex justify-end space-x-2">
                              <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="h-6 w-12 rounded-sm bg-gray-300"></div>
                              <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="h-6 w-12 rounded-sm bg-cyan-400"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-black">
                      <div className={`h-5 w-5 rounded-full ${animationStep === 3 ? "bg-cyan-400" : "bg-white/20"}`}></div>
                    </div>
                    <div className="w-1/2 pl-8">
                      <div className="max-w-xs space-y-2">
                        <h4 className="font-bold text-white">4. Preview & Export</h4>
                        <p className="text-sm text-gray-400">Preview your finalized resume, make any adjustments, and export as a professional PDF ready for job applications.</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Analyze & Optimize */}
                  <div className={`relative flex ${animationStep === 4 ? "opacity-100" : "opacity-40"} transition-opacity duration-500`}>
                    <div className="flex w-1/2 justify-end pr-8">
                      <div className="max-w-xs space-y-2 text-right">
                        <h4 className="font-bold text-white">5. Analyze & Optimize</h4>
                        <p className="text-sm text-gray-400">Get detailed analysis of your resume with actionable recommendations to improve your chances of landing interviews.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-black">
                      <div className={`h-5 w-5 rounded-full ${animationStep === 4 ? "bg-violet-400" : "bg-white/20"}`}></div>
                    </div>
                    <div className="w-1/2 pl-8">
                      <div className="aspect-video max-w-xs overflow-hidden rounded-md border border-white/10 bg-white/5 p-2">
                        <div className="relative h-full w-full rounded bg-gradient-to-br from-gray-800 to-gray-900 p-3">
                          <div className="flex justify-between">
                            <div className="h-5 w-1/3 rounded-full bg-white/20"></div>
                            {animationStep === 4 && (
                              <div className="flex items-center space-x-1">
                                <div className="text-sm font-bold text-violet-400">{Math.floor(Math.random() * 20) + 80}%</div>
                                <div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}></div>
                              </div>
                            )}
                          </div>

                          {/* Analysis items */}
                          <div className="mt-3 space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className={`flex items-center space-x-2 rounded border border-white/10 p-2 ${animationStep === 4 && i === 0 ? "border-violet-400/30 bg-violet-950/20" : ""}`}>
                                {animationStep === 4 && i === 0 ? <></> : <div className="h-3.5 w-3.5 rounded-full bg-white/20"></div>}
                                <div className="flex-1">
                                  <div className="h-2.5 w-full rounded-full bg-white/20"></div>
                                </div>
                                {animationStep === 4 && i === 0 && <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}></div>}
                              </div>
                            ))}
                          </div>

                          {/* Animation effect */}
                          {animationStep === 4 && <div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} className="absolute right-3 top-3 h-12 w-12 rounded-full bg-violet-400/10"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blockchain Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blockchain Integration</h2>
              <p className="mt-4 text-gray-400">Secure, transparent, and decentralized career management</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50">
                <h3 className="mb-2 text-xl font-bold">Decentralized Identity</h3>
                <p className="text-gray-400">Own your professional identity with blockchain-based credentials that you control.</p>
              </div>
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50">
                <h3 className="mb-2 text-xl font-bold">Proof-of-Skill</h3>
                <p className="text-gray-400">Verifiable skill credentials that prove your expertise through blockchain verification.</p>
              </div>
              <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50">
                <h3 className="mb-2 text-xl font-bold">Credential Validation</h3>
                <p className="text-gray-400">Transparent validation of job credentials and certifications through immutable records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Job Recommendations Section */}
        <section id="job-recommendations" className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI-Powered Job Recommendations
              </h2>
              <p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="mt-4 text-gray-400">
                Discover perfect job matches tailored to your unique skills and experience
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Description */}
              <div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col justify-center space-y-8">
                <div>
                  <h3 className="text-2xl font-bold">Find Your Dream Job with AI</h3>
                  <p className="mt-4 text-gray-300">Our advanced AI analyzes thousands of job listings in real-time, matching them against your unique profile to find opportunities that truly align with your career goals.</p>
                </div>

                <div className="space-y-4">
                  {["Personalized job matches based on your skills, experience, and preferences", "Real-time opportunity alerts for high-match positions", "Intelligent filtering that prioritizes roles with the best career growth potential", "Transparent match scores showing why each job is recommended", "Skill gap analysis with suggestions to improve your qualifications"].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Animation */}
              <div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="relative h-[500px] overflow-hidden rounded-2xl p-6">
                {/* Profile Card */}
                {jobAnimationStep == 1 ? (
                  <div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{
                      y: jobAnimationStep >= 2 ? -20 : 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-10 w-[90%] max-w-[320px] -translate-x-1/2 rounded-xl border border-white/10 bg-gray-800/80 p-4 backdrop-blur-sm"
                  >
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>
                      <div>
                        <h4 className="font-medium text-white">Indra Mahesa</h4>
                        <p className="text-sm text-gray-400">Senior Developer</p>
                      </div>
                    </div>

                    <div className="mb-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Experience</span>
                        <span className="text-xs text-gray-400">5+ years</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-700">
                        <div initial={{ width: "0%" }} animate={{ width: "85%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>
                      </div>
                    </div>

                    <div className="mb-4 space-y-1">
                      <span className="text-xs text-gray-400">Top Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "React", "Node.js", "Cloud", "AI/ML"].map((skill, index) => (
                          <span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + index * 0.1 }} className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Scanning Effect */}
                    {jobAnimationStep < 3 && (
                      <div
                        initial={{ top: "0%", opacity: 0 }}
                        animate={{
                          top: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          times: [0, 0.1, 0.9, 1],
                        }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />
                    )}
                  </div>
                ) : (
                  <></>
                )}

                {/* AI Processing Animation */}
                {jobAnimationStep >= 2 && jobAnimationStep < 3 && (
                  <div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative h-20 w-20">
                      <div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400"></div>
                      <div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-400"></div>
                      <div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} className="absolute inset-0 flex items-center justify-center"></div>
                    </div>
                    <div className="mt-4 text-center text-sm text-cyan-400">
                      <p animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}>
                        Analyzing profile...
                      </p>
                    </div>
                  </div>
                )}

                {/* Job Recommendations */}
                <div className="absolute bottom-6 left-1/2 w-[90%] max-w-[320px] -translate-x-1/2 space-y-3">
                  {jobAnimationStep >= 3 && (
                    <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="text-center">
                      <div className="mb-2 text-sm font-medium text-white">Top Job Matches</div>
                    </div>
                  )}

                  {[
                    { title: "Senior Frontend Developer", company: "TechCorp", match: 98, location: "Remote" },
                    { title: "Full Stack Engineer", company: "InnovateTech", match: 92, location: "New York, NY" },
                    { title: "React Team Lead", company: "FutureSoft", match: 87, location: "San Francisco, CA" },
                  ].map((job, index) => (
                    <div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: jobAnimationStep >= 3 ? 0 : 20,
                        opacity: jobAnimationStep >= 3 ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: jobAnimationStep >= 3 ? index * 0.2 : 0,
                      }}
                      className="relative rounded-lg border border-white/10 bg-gray-800/80 p-3 backdrop-blur-sm"
                    >
                      <div className="mb-1 flex justify-between">
                        <h5 className="font-medium text-white">{job.title}</h5>
                        <div
                          initial={{ scale: 0 }}
                          animate={{
                            scale: jobAnimationStep >= 3 ? 1 : 0,
                          }}
                          transition={{
                            delay: jobAnimationStep >= 3 ? 0.3 + index * 0.2 : 0,
                            type: "spring",
                          }}
                          className={`flex h-6 w-12 items-center justify-center rounded-full text-xs font-bold ${job.match > 95 ? "bg-green-400/20 text-green-400" : job.match > 85 ? "bg-cyan-400/20 text-cyan-400" : "bg-violet-400/20 text-violet-400"}`}
                        >
                          {job.match}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{job.company}</span>
                        <span>{job.location}</span>
                      </div>

                      {/* Match Reasons */}
                      <div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: jobAnimationStep >= 3 ? "auto" : 0,
                          opacity: jobAnimationStep >= 3 ? 1 : 0,
                        }}
                        transition={{
                          delay: jobAnimationStep >= 3 ? 0.5 + index * 0.2 : 0,
                          duration: 0.3,
                        }}
                        className="mt-2 overflow-hidden rounded border-t border-white/5 pt-2"
                      >
                        <div className="flex items-center space-x-1 text-[10px] text-gray-400">
                          <span>Match factors:</span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {["React", index === 0 ? "5+ yrs exp" : "Cloud", index === 2 ? "Leadership" : "Node.js"].map((factor, i) => (
                            <span key={i} className="rounded-sm bg-cyan-950/30 px-1.5 py-0.5 text-[10px] text-cyan-400">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlight Pulse Effect for first job */}
                      {index === 0 && jobAnimationStep >= 3 && (
                        <div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.2, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatDelay: 1,
                          }}
                          className="absolute inset-0 rounded-lg bg-cyan-400"
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Connection Lines Animation */}
                {jobAnimationStep >= 2 && (
                  <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M160,80 C160,140 160,200 160,260"
                      fill="none"
                      stroke="url(#jobGrad)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1],
                        opacity: [0, 0.6],
                      }}
                      transition={{ duration: 1.5 }}
                    />
                    <defs>
                      <linearGradient id="jobGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                {/* Floating Data Points */}
                {jobAnimationStep === 2 &&
                  [...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      initial={{
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                        opacity: 0,
                      }}
                      animate={{
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                        opacity: [0, 0.7, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                      }}
                      className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
                    ></div>
                  ))}

                {/* AI Analysis Floating Elements */}
                {jobAnimationStep === 1 && (
                  <div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [-30, 0, 0, 30],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.8, 1],
                    }}
                    className="absolute left-10 top-1/2 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <p className="text-xs text-white">Matching skills</p>
                    </div>
                  </div>
                )}

                {jobAnimationStep === 2 && (
                  <div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [30, 0, 0, -30],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.8, 1],
                    }}
                    className="absolute right-10 top-1/3 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                      <p className="text-xs text-white">Analyzing requirements</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Demo Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-8">
                <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Experience Our AI Career Assistant</h2>
                  <p className="mt-4 text-xl text-gray-400">Get personalized career advice, interview tips, and professional guidance from our AI-powered chatbot.</p>
                </div>

                <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="space-y-4">
                  {["Resume optimization suggestions", "Interview preparation and practice", "Career path planning and guidance", "Skill development recommendations"].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-lg text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Chat Interface */}
              <div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900 to-black p-6">
                <div className="mb-6 space-y-2">
                  <h3 className="text-xl font-semibold text-white">Career Assistant</h3>
                  <p className="text-sm text-gray-400">AI-powered career guidance</p>
                </div>

                <div className="mb-4 rounded-xl bg-gray-800/50 p-4">
                  <p className="text-gray-100">Hi there! I'm your AI career assistant. How can I help with your career journey today?</p>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="relative">
                  <input type="text" placeholder="Ask about your career..." className="w-full rounded-xl border border-white/10 bg-gray-800/30 px-4 py-3 pr-12 text-white placeholder-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10"></Button>
                </div>
                <p className="mt-3 text-sm text-gray-500">This is a demo. Try asking about resume tips, interview preparation, or career paths.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/50 to-violet-950/50 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Career?</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">Join thousands of professionals who trust JobPilot to advance their careers through AI and blockchain technology.</p>
              <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
                <li className="flex items-center space-x-3">
                  <span>Personalized job recommendations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>Skill-based learning paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span>Blockchain-verified credentials</span>
                </li>
              </ul>
              <Button
                onClick={() => {
                  navigate("/get-started");
                }}
                className="mt-8 bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600"
              >
                Create Your Profile
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black py-8">
          <div className="container flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="font-bold">JobPilot</span>
            </div>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} JobPilot. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
