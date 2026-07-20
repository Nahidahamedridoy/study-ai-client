export const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    }).format(new Date(dateString));
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');
