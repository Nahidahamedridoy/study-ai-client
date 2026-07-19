import { forwardRef } from "react";

const Select = forwardRef(({ className = "", error, children, ...props }, ref) => {
  return (
    <div className="w-full">
      <select
        ref={ref}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          text-sm
          bg-white
          text-gray-900
          outline-none
          transition-all
          cursor-pointer
          focus:ring-2
          dark:bg-gray-900
          dark:text-white
          [&>option]:bg-white
          [&>option]:text-gray-900
          dark:[&>option]:bg-gray-800
          dark:[&>option]:text-gray-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/40"
              : "border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
