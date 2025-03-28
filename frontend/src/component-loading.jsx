import React, { useEffect } from "react";

export function LoadingOverlay({ isLoading = false, message = "Processing your request...", fullScreen = true, showSpinner = true, showBrain = true }) {
  // Prevent scrolling when overlay is active
  useEffect(() => {
    if (isLoading && fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, fullScreen]);

  return (
    <>
      {isLoading && (
        <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={`${fullScreen ? "fixed inset-0" : "absolute inset-0"} z-50 flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md`} aria-live="polite" aria-busy={isLoading}>
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
            {message && (
              <div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-md px-4">
                <p className="text-lg font-medium text-white">{message}</p>
                <div
                  className="mt-2 flex justify-center space-x-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
