
import { useEffect, useState } from 'react';

// Types for doctors and recommendation data
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  treatmentsPerformed: number;
  languages: string[];
}

interface PatientCondition {
  painArea: string;
  severity: number;
  duration: string;
  previousInjury: boolean;
  ageGroup: string;
  preferredLanguage?: string;
}

export const useDoctorRecommendation = (patientCondition: PatientCondition) => {
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock doctors data (in a real app, this would come from the database)
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Sports Rehabilitation',
      experience: 12,
      rating: 4.9,
      treatmentsPerformed: 1500,
      languages: ['English', 'Spanish'],
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Neurological Rehabilitation',
      experience: 15,
      rating: 4.8,
      treatmentsPerformed: 2000,
      languages: ['English', 'Mandarin'],
    },
    {
      id: '3',
      name: 'Dr. Emma Rodriguez',
      specialization: 'Manual Therapy',
      experience: 8,
      rating: 4.7,
      treatmentsPerformed: 1200,
      languages: ['English', 'Spanish', 'Portuguese'],
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Chronic Pain',
      experience: 20,
      rating: 4.9,
      treatmentsPerformed: 3000,
      languages: ['English'],
    },
    {
      id: '5',
      name: 'Dr. Aisha Patel',
      specialization: 'Post-Surgical',
      experience: 10,
      rating: 4.8,
      treatmentsPerformed: 1800,
      languages: ['English', 'Hindi', 'Gujarati'],
    },
    {
      id: '6',
      name: 'Dr. Robert Kim',
      specialization: 'Strength Conditioning',
      experience: 7,
      rating: 4.6,
      treatmentsPerformed: 900,
      languages: ['English', 'Korean'],
    },
  ];

  // Specialization mapping to match conditions to doctor specialties
  const specializationMapping: Record<string, string[]> = {
    'knee': ['Sports Rehabilitation', 'Post-Surgical', 'Manual Therapy'],
    'back': ['Chronic Pain', 'Manual Therapy', 'Strength Conditioning'],
    'neck': ['Chronic Pain', 'Manual Therapy', 'Neurological Rehabilitation'],
    'shoulder': ['Sports Rehabilitation', 'Manual Therapy', 'Strength Conditioning'],
    'hip': ['Sports Rehabilitation', 'Post-Surgical', 'Strength Conditioning'],
    'ankle': ['Sports Rehabilitation', 'Post-Surgical'],
    'wrist': ['Manual Therapy', 'Post-Surgical'],
    'elbow': ['Sports Rehabilitation', 'Manual Therapy'],
    'head': ['Neurological Rehabilitation'],
    'spine': ['Neurological Rehabilitation', 'Chronic Pain', 'Manual Therapy'],
    'general': ['Strength Conditioning', 'Manual Therapy']
  };

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate async AI process
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Algorithm to match patient condition to appropriate doctors
        // 1. Filter by specialization first
        const relevantSpecializations = 
          patientCondition.painArea.toLowerCase() in specializationMapping
            ? specializationMapping[patientCondition.painArea.toLowerCase()]
            : ['Manual Therapy', 'Chronic Pain']; // Default if no specific match
  
        // Base filtering
        let filteredDoctors = mockDoctors.filter(doctor => 
          relevantSpecializations.includes(doctor.specialization)
        );

        // 2. Consider language preference if specified
        if (patientCondition.preferredLanguage) {
          const languageMatch = filteredDoctors.filter(doctor => 
            doctor.languages.includes(patientCondition.preferredLanguage!)
          );
          
          // Only filter by language if we still have matches
          if (languageMatch.length > 0) {
            filteredDoctors = languageMatch;
          }
        }

        // 3. Scoring system (higher score = better match)
        const scoredDoctors = filteredDoctors.map(doctor => {
          let score = 0;
          
          // Experience points (0-20)
          score += Math.min(doctor.experience, 20);
          
          // Rating points (0-5)
          score += doctor.rating;
          
          // Volume of treatments (0-5)
          score += Math.min(doctor.treatmentsPerformed / 500, 5);
          
          // Specialization relevance bonus
          const isSpecializationPerfectMatch = 
            (patientCondition.painArea.toLowerCase() === 'knee' && doctor.specialization === 'Sports Rehabilitation') ||
            (patientCondition.painArea.toLowerCase() === 'back' && doctor.specialization === 'Chronic Pain') ||
            (patientCondition.painArea.toLowerCase() === 'neck' && doctor.specialization === 'Manual Therapy') ||
            (patientCondition.severity >= 7 && doctor.specialization === 'Chronic Pain') ||
            (patientCondition.previousInjury && doctor.specialization === 'Post-Surgical');
            
          if (isSpecializationPerfectMatch) {
            score += 10;
          }
          
          return { ...doctor, score };
        });
        
        // 4. Sort by score and return top matches
        const sortedDoctors = scoredDoctors
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .map(({ score, ...doctor }) => doctor); // Remove the score prop
        
        setRecommendedDoctors(sortedDoctors);
      } catch (err) {
        console.error('Error in doctor recommendation algorithm:', err);
        setError('Failed to generate recommendations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (patientCondition) {
      getRecommendations();
    }
  }, [patientCondition]);

  return { recommendedDoctors, isLoading, error };
};
