import { apiFetch } from './api';

/**
 * Fetch a single resource by its ID.
 * GET /resources/:id
 */
export const fetchResourceById = (id) =>
    apiFetch(`/resources/${id}`);

/**
 * Fetch resources related to a given resource ID.
 * GET /resources/:id/related
 */
export const fetchRelatedResources = (id) =>
    apiFetch(`/resources/${id}/related`);

/**
 * Fetch paginated, filtered resource list.
 * GET /resources?search=&category=&level=&sort=&page=&limit=
 */
export const fetchResources = ({ search = '', category = '', level = '', sort = 'newest', page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams();
    if (search)   params.set('search', search);
    if (category) params.set('category', category);
    if (level)    params.set('level', level);
    params.set('sort', sort);
    params.set('page', String(page));
    params.set('limit', String(limit));
    return apiFetch(`/resources?${params.toString()}`);
};

/**
 * Fetch dashboard stats for the current user.
 * GET /dashboard/stats
 */
export const fetchDashboardStats = () =>
    apiFetch('/dashboard/stats');

/**
 * Fetch the current user's own resources.
 * GET /resources/my?page=&limit=
 */
export const fetchMyResources = ({ email, page = 1, limit = 10 } = {}) =>
    apiFetch(`/resources/my?createdBy=${encodeURIComponent(email)}&page=${page}&limit=${limit}`);

/**
 * Create a new resource.
 * POST /resources
 */
export const createResource = (data) =>
    apiFetch('/resources', { method: 'POST', body: JSON.stringify(data) });

/**
 * Update a resource by ID.
 * PUT /resources/:id
 */
export const updateResource = (id, data) =>
    apiFetch(`/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) });

/**
 * Delete a resource by ID.
 * DELETE /resources/:id
 */
export const deleteResource = (id) =>
    apiFetch(`/resources/${id}`, { method: 'DELETE' });
