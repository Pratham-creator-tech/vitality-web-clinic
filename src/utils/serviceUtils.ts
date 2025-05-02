
export const getServiceUrl = (service: string): string => {
  const serviceMap: Record<string, string> = {
    'Sports Rehabilitation': '/services/sports-rehabilitation',
    'Manual Therapy': '/services/manual-therapy',
    'Post-Surgical Rehabilitation': '/services/post-surgical',
    'Chronic Pain Management': '/services/chronic-pain',
    'Neurological Rehabilitation': '/services/neurological',
    'Strength & Conditioning': '/services/strength-conditioning',
    'Pediatric Rehabilitation': '/services/pediatric-rehab',
    'Geriatric Rehabilitation': '/services/geriatric-rehab',
    'Women\'s Health': '/services/womens-health',
    'Postural Alignment': '/services/postural-alignment',
    'Obesity Management & Fitness': '/services/obesity-management',
    'Group Exercise': '/services/group-exercises',
    'Kinesiotaping': '/services/kinesiotaping',
    'Dry Needling Therapy': '/services/dry-needling',
    'Neuro Dynamic Solution': '/services/neuro-dynamic',
    'Cupping Therapy': '/services/cupping-therapy',
    'Virtual Physiotherapy': '/services/virtual-physiotherapy',
    // Default to services page if service not found
    'default': '/services'
  };

  return serviceMap[service] || serviceMap.default;
};
