import { forwardRef } from "react";

const Textarea = forwardRef(({ className = "", error, rows = 4, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          text-sm
          bg-white
          text-gray-900
          placeholder:text-gray-400
          outline-none
          resize-none
          transition-all
          focus:ring-2
          dark:bg-gray-900
          dark:text-white
          dark:placeholder:text-gray-500
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/40"
              : "border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
