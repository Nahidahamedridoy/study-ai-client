export const apiFetch = async (endpoint, options = {}) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }
    return response.json();
};
