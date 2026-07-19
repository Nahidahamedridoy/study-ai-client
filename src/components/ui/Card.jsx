import { forwardRef } from 'react';

const Card = forwardRef(({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
        default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm',
        glass: 'glass',
        gradient: 'bg-white dark:bg-gray-900 border border-transparent shadow-sm hover:border-primary-500/50 transition-colors duration-300 relative before:absolute before:inset-0 before:-z-10 before:p-[1px] before:bg-gradient-to-b before:from-primary-500/20 before:to-transparent before:rounded-2xl',
    };

    return (
        <div 
            ref={ref}
            className={`rounded-2xl overflow-hidden ${variants[variant]} ${className}`} 
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';
export default Card;
