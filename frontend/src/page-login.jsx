
import { Button } from "./button";
import { useAuth } from "./provider-auth";
import React, { useEffect } from "react";

export default function LoginPage({ navigate }) {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* <LoadingOverlay isLoading={isLoading} message={"Please wait, your application is being processed..."} /> */}
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between px-4">
            <a className="flex items-center space-x-2 font-bold" href="/">
              <span className="text-xl">JobPilot</span>
            </a>

            <a
              href="#"
              onClick={() => {
                navigate("/");
              }}
            >
              <Button variant="ghost" className="text-gray-400 hover:bg-white/5 hover:text-white">
                Back to Home
              </Button>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="container relative z-10 pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-2">
              {/* Left Column - Graphic */}
              <div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center justify-center p-6">
                <div className="relative">
                  {/* Background Elements */}
                  <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"></div>

                  {/* Main Illustration */}
                  <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/80 to-black/80 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Blockchain Authentication</h3>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20"></div>
                    </div>

                    {/* Blockchain Visualization */}
                    <div className="mb-8 space-y-6">
                      {/* Blockchain Network Visualization */}
                      <div className="relative h-48 w-full overflow-hidden rounded-lg border border-white/10 bg-black/40">
                        {/* Nodes */}
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{
                              duration: 2 + Math.random() * 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              delay: Math.random() * 2,
                            }}
                            className="absolute h-3 w-3 rounded-full bg-cyan-400"
                            style={{
                              left: `${10 + Math.random() * 80}%`,
                              top: `${10 + Math.random() * 80}%`,
                            }}
                          />
                        ))}

                        {/* Connection Lines */}
                        <svg className="absolute h-full w-full">
                          {[...Array(15)].map((_, i) => {
                            const startX = 10 + Math.random() * 80;
                            const startY = 10 + Math.random() * 80;
                            const endX = 10 + Math.random() * 80;
                            const endY = 10 + Math.random() * 80;

                            return (
                              <line
                                key={i}
                                x1={`${startX}%`}
                                y1={`${startY}%`}
                                x2={`${endX}%`}
                                y2={`${endY}%`}
                                stroke="rgba(34, 211, 238, 0.2)"
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                  pathLength: [0, 1, 1, 0],
                                  opacity: [0, 0.5, 0.5, 0],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.3,
                                }}
                              />
                            );
                          })}
                        </svg>

                        {/* Animated Blocks */}
                        <div
                          initial={{ y: "100%" }}
                          animate={{ y: "-100%" }}
                          transition={{
                            duration: 15,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                          }}
                          className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col gap-3"
                        >
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 w-20 rounded border border-cyan-400/30 bg-cyan-950/30 p-2">
                              <div className="mb-1 h-1.5 w-12 rounded-full bg-cyan-400/40"></div>
                              <div className="h-1.5 w-8 rounded-full bg-cyan-400/40"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wallet Connection Status */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                        <div className="mb-2 flex items-center">
                          <div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="mr-2 h-2 w-2 rounded-full bg-cyan-400"
                          ></div>
                          <p className="text-sm font-medium text-cyan-400">Secure Blockchain Connection</p>
                        </div>
                        <p className="text-xs text-gray-300">Choose your preferred authentication method</p>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute -right-6 top-1/4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-white">Wallet Ready</p>
                      </div>
                    </div>

                    <div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute -left-6 bottom-1/4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-white">Identity Secure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center p-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Authentication Method</h2>
                    <p className="mt-2 text-gray-400">Choose your preferred authentication method to continue</p>
                  </div>

                  <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="grid gap-4">
                      <button onClick={login} className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-violet-400/50 hover:bg-violet-950/20">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500/20 to-violet-500/10">
                          <img src="icon/internet-identity.png" className="rounded" alt="" />
                        </div>
                        <h4 className="text-lg font-medium group-hover:text-violet-400">Internet Identity</h4>
                        <p className="mt-2 text-center text-sm text-gray-400">Use Internet Identity for enhanced security and privacy</p>
                      </button>
                    </div>
                  </div>

                  {/* User Agreement */}
                  <div className="mt-6 text-center text-sm text-gray-400">
                    By signing in, you agree to our{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl"></div>
        </div>
      </div>
    </>
  );
}
