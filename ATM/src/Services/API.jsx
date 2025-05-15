import { getDashboardStats } from './adminAPI'; 
import { getActivityLogs } from './adminAPI';
import { getSystemAlerts } from './adminAPI';
import { getATMs } from './adminAPI';
import { getAnalytics } from './adminAPI';
// api.js - API utility functions
const API_URL = 'http://localhost:8000/api';

// Function to get stored user data
export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Function to get stored token
export const getToken = () => {
    return localStorage.getItem('access_token');
};

// Login function
export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        
        // Store user data and tokens
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Logout function
export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                refresh: localStorage.getItem('refresh_token')
            })
        });

        // Clear local storage regardless of response
        localStorage.clear();

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Get user profile
export const getUserProfile = async () => {
    const response = await fetch(`${API_URL}/profile/`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
};

// Submit ATM review
export const submitReview = async (atmId, rating, comment) => {
    const response = await fetch(`${API_URL}/atms/${atmId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ rating, comment })
    });
    if (!response.ok) throw new Error('Failed to submit review');
    return await response.json();
};

// Get ATM reviews
export const getATMReviews = async (atmId) => {
    const response = await fetch(`${API_URL}/atms/${atmId}/reviews/`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return await response.json();
};

// Dashboard data fetching
const [statsData, activitiesData, alertsData, atmsData] = await Promise.all([
  getDashboardStats(),
  getActivityLogs({ limit: 4 }),
  getSystemAlerts(),
  getATMs()
]);

// Create ATM
await createATM(formData);

// Read ATMs
const response = await getATMs();

// Update ATM
await updateATM(id, formData);

// Delete ATM
await deleteATM(id);

try {
  // API calls
} catch (err) {
  setError(err.message || 'Failed to fetch data');
} finally {
  setLoading(false);
}

{loading ? (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
) : (
    <>Loaded content goes here</>
)}

const filteredATMs = atms.filter(atm => {
  const matchesSearch = atm.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = statusFilter === 'all' || atm.status === statusFilter;
  return matchesSearch && matchesStatus;
});