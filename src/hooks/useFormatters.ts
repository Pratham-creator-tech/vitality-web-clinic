
import { useState, useCallback } from "react";

export const useFormatters = () => {
  const getInitials = useCallback((name: string = "") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }, []);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const calculateAge = useCallback((dobString: string | null) => {
    if (!dobString) return "N/A";
    
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return `${age} years`;
  }, []);

  return { getInitials, formatDate, calculateAge };
};
