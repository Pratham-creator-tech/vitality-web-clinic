
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

  const formatPhoneNumber = useCallback((phoneNumber: string | null) => {
    if (!phoneNumber) return "N/A";
    
    // Remove non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length > 10) {
      // Handle international numbers, assume US/Canada +1 format if 11 digits
      if (cleaned.length === 11 && cleaned.charAt(0) === '1') {
        return `+1 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
      }
      // Generic international format
      return `+${cleaned.substring(0, cleaned.length - 10)} (${cleaned.substring(cleaned.length - 10, cleaned.length - 7)}) ${cleaned.substring(cleaned.length - 7, cleaned.length - 4)}-${cleaned.substring(cleaned.length - 4)}`;
    }
    
    // If format doesn't match expected patterns, return as is with hyphens
    return phoneNumber;
  }, []);

  return { getInitials, formatDate, calculateAge, formatPhoneNumber };
};
