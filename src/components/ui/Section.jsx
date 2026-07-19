export default function Section({ children, className = '', containerClassName = '', id = '' }) {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
}
