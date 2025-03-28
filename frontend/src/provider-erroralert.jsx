import React, { useState, useEffect, createContext, useContext } from "react";
import { Button } from "./button";

export function ErrorAlert({ message = "An unexpected error occurred", onRetry, type = "error", isVisible = true, onClose, autoClose = false, autoCloseDelay = 5000, showDetails = false }) {
  const [visible, setVisible] = useState(isVisible);
  const [expanded, setExpanded] = useState(false);

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === "development" || showDetails;

  // Extract error information
  const errorObject = message instanceof Error ? message : null;
  const errorMessage = errorObject ? errorObject.message : message;
  const errorStack = errorObject?.stack || "";

  // Format the stack trace to remove the first line (which is the error message)
  const formattedStack = errorStack ? errorStack.split("\n").slice(1).join("\n") : "";

  // Handle auto-close functionality
  useEffect(() => {
    setVisible(isVisible);

    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  // Handle manual close
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  // Determine icon and colors based on type
  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          icon: <></>,
          bgColor: "bg-yellow-950/90",
          borderColor: "border-yellow-500/20",
          iconBgColor: "bg-yellow-500/20",
        };
      case "error":
      default:
        return {
          icon: <></>,
          bgColor: "bg-red-950/90",
          borderColor: "border-red-500/20",
          iconBgColor: "bg-red-500/20",
        };
    }
  };

  const { icon, bgColor, borderColor, iconBgColor } = getTypeStyles();

  // Toggle expanded state for error details
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <>
      {visible && (
        <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleClose}>
          <div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className={`mx-4 max-w-3xl rounded-xl border ${borderColor} ${bgColor} p-6 shadow-2xl backdrop-blur-sm`} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 rounded-full ${iconBgColor} p-4`}>{icon}</div>

              <h3 className="mb-2 text-xl font-semibold text-white">Something went wrong</h3>

              <p className="mb-4 text-gray-300">{errorMessage}</p>

              {/* Development mode error details */}
              {isDevelopment && (errorStack || errorObject) && (
                <div className="w-full mb-6">
                  <button onClick={toggleExpanded} className="flex items-center justify-center w-full text-sm text-gray-400 hover:text-white mb-2">
                    {expanded ? <>Hide Details</> : <>Show Details</>}
                  </button>

                  {expanded && (
                    <div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full">
                      <div className="bg-black/50 rounded-md p-4 text-left overflow-auto max-h-[50vh] w-full">
                        <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-words">
                          <code>
                            {errorObject ? (
                              <>
                                <span className="text-red-400">
                                  {errorObject.name}: {errorObject.message}
                                </span>
                                {formattedStack && (
                                  <>
                                    {"\n"}
                                    <span className="text-gray-500">{formattedStack}</span>
                                  </>
                                )}
                              </>
                            ) : (
                              <span className="text-red-400">{errorMessage}</span>
                            )}

                            {/* Display additional error properties if available */}
                            {errorObject && Object.keys(errorObject).length > 0 && (
                              <>
                                {"\n\n"}
                                <span className="text-blue-400">Additional Error Properties:</span>
                                {"\n"}
                                {Object.entries(errorObject)
                                  .filter(([key]) => !["name", "message", "stack"].includes(key))
                                  .map(([key, value]) => (
                                    <span key={key}>
                                      <span className="text-purple-400">{key}:</span> {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                                      {"\n"}
                                    </span>
                                  ))}
                              </>
                            )}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {onRetry && (
                  <Button onClick={onRetry} className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
                    Try Again
                  </Button>
                )}

                <Button className="border-white/10 text-white hover:bg-white/10" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ErrorAlertContext = createContext(null);

export function ErrorAlertProvider({ children }) {
  const [errorState, setErrorState] = useState({
    isVisible: false,
    message: "",
    type: "error",
    onRetry: null,
    autoClose: false,
    showDetails: false,
  });

  const showError = (error, options = {}) => {
    setErrorState({
      isVisible: true,
      message: error, // Can be string or Error object
      type: options.type || "error",
      onRetry: options.onRetry || null,
      autoClose: options.autoClose || false,
      autoCloseDelay: options.autoCloseDelay || 5000,
      showDetails: options.showDetails || false,
    });
  };

  const hideError = () => {
    setErrorState((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <ErrorAlertContext.Provider value={{ showError, hideError }}>
      {children}
      <ErrorAlert message={errorState.message} type={errorState.type} isVisible={errorState.isVisible} onRetry={errorState.onRetry} onClose={hideError} autoClose={errorState.autoClose} autoCloseDelay={errorState.autoCloseDelay} showDetails={errorState.showDetails} />
    </ErrorAlertContext.Provider>
  );
}

export const useErrorAlert = () => {
  const context = useContext(ErrorAlertContext);
  if (!context) {
    throw new Error("useErrorAlert must be used within an ErrorAlertProvider");
  }
  return context;
};

export const withErrorHandling = (fn, options = {}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      // Use the full error object instead of just the message
      const errorToShow = options.errorMessage ? new Error(options.errorMessage) : error;

      if (options.onError) {
        options.onError(error);
      }

      // If we're in a component with access to the error alert context
      if (typeof window !== "undefined") {
        // We can't directly use the hook here, so we'll dispatch a custom event
        const event = new CustomEvent("app:error", {
          detail: {
            message: errorToShow,
            onRetry: options.retry ? () => withErrorHandling(fn, options)(...args) : null,
            type: options.type || "error",
            showDetails: options.showDetails,
          },
        });
        window.dispatchEvent(event);
      }

      throw error;
    }
  };
};

// Event listener for the error alert (to be added in _app.js or a layout component)
export const setupErrorListener = (showError) => {
  if (typeof window !== "undefined") {
    const handleAppError = (event) => {
      const { message, onRetry, type, showDetails } = event.detail;
      showError(message, { onRetry, type, showDetails });
    };

    window.addEventListener("app:error", handleAppError);
    return () => window.removeEventListener("app:error", handleAppError);
  }

  return () => {};
};
