import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = useCallback((path: string) => {
    try {
      console.log('Navigating to:', path);
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location if React Router fails
      window.location.href = path;
    }
  }, [navigate]);

  return { navigateTo };
}; 