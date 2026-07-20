export const apiFetch = async (endpoint, options = {}) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    // Ensure endpoint starts with a slash
    const path = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    let finalUrl = `${base}${path}`;
    
    // Remove any duplicate '/api' from the request path
    if (base.endsWith('/api') && path.startsWith('/api/')) {
        finalUrl = `${base}${path.substring(4)}`;
    } else if (base.endsWith('/api') && path === '/api') {
        finalUrl = base;
    }

    console.log("Base URL:", baseUrl);
    console.log("Request:", finalUrl);

    const response = await fetch(finalUrl, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            // response was not JSON
        }
        console.error("Backend error:", errorMessage);
        throw new Error(errorMessage);
    }

    return response.json();
};