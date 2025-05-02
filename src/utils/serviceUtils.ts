
/**
 * Convert service ID to URL path
 * This ensures consistent service URLs throughout the application
 */
export const getServiceUrl = (serviceId: string): string => {
  return `/services/${serviceId}`;
};

/**
 * Format service name for display
 */
export const formatServiceName = (name: string): string => {
  return name.replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
