
/**
 * Convert service ID to URL path
 * This ensures consistent service URLs throughout the application
 */
export const getServiceUrl = (serviceId: string): string => {
  // Map of service IDs to their respective routes
  const serviceUrlMap: Record<string, string> = {
    "sports-rehabilitation": "/services/sports-rehabilitation",
    "manual-therapy": "/services/manual-therapy",
    "post-surgical": "/services/post-surgical",
    "chronic-pain": "/services/chronic-pain",
    "neurological": "/services/neurological",
    "strength-conditioning": "/services/strength-conditioning",
    "pediatric-rehabilitation": "/services/pediatric-rehab",
    "geriatric-rehabilitation": "/services/geriatric-rehab",
    "womens-health": "/services/womens-health",
    "postural-alignment": "/services/postural-alignment",
    "obesity-management": "/services/obesity-management",
    "group-exercises": "/services/group-exercise",
    "kinesiotaping": "/services/kinesiotaping",
    "dry-needling": "/services/dry-needling",
    "neuro-dynamic": "/services/neuro-dynamic",
    "cupping-therapy": "/services/cupping",
    "virtual-physiotherapy": "/services/virtual",
  };

  return serviceUrlMap[serviceId] || `/services/${serviceId}`;
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
