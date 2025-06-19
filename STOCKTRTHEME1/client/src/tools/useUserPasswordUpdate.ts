import { useState } from 'react';
import { API_BASE_URL } from '@/config';

export const useUserPasswordUpdate = () => {
    const [NEWPassword, setNEWPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const sendNewPassword = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setSuccess(null);
            
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
    
            if (!NEWPassword) {
                throw new Error('Please enter a new password');
            }

            const response = await fetch(`${API_BASE_URL}/api/updatePassword`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: NEWPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            setSuccess('Password updated successfully');
            setNEWPassword(''); // Clear the password field
            console.log('Password updated successfully:', data);
    
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Password update error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        NEWPassword,
        isLoading,
        error,
        success,
        setNEWPassword,
        sendNewPassword
    };
};