export default function Card({ children, className = '', ...props }) {
    return (
        <div 
            className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
