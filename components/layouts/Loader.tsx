import React from "react";

function Loader({ className, label }: { className?: string; label?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className={`flex flex-col items-center ${className || ""}`}>
        <span className="loading"></span>
        {label && (
          <div className="mt-2 text-center text-sm text-gray-600">{label}</div>
        )}
      </div>
    </div>
  );
}

export default Loader;
