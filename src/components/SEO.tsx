
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Vitality Physio - Professional Physiotherapy & Rehabilitation Services',
  description = 'Vitality Physio offers personalized physiotherapy, rehabilitation, and pain management services. Book an appointment today and start your journey to better health.',
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  keywords = 'physiotherapy, physical therapy, rehabilitation, pain management, sports injuries, chronic pain, neurological rehabilitation',
}) => {
  // Generate the full title
  const fullTitle = title.includes('Vitality Physio') ? title : `${title} | Vitality Physio`;
  
  // Determine canonical URL
  const canonicalUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO best practices */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default SEO;
