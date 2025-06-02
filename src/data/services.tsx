
import { Activity, Heart, Users, Brain, Baby, User, Dumbbell, Scissors, Zap, Droplets, Video, MapPin } from "lucide-react";

export const serviceData = [
  {
    id: "sports-rehabilitation",
    title: "Sports Rehabilitation",
    description: "Specialized treatment for sports injuries and performance enhancement.",
    icon: <Activity className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    category: "core",
    link: "/services/sports-rehabilitation"
  },
  {
    id: "manual-therapy",
    title: "Manual Therapy",
    description: "Hands-on treatment techniques for pain relief and mobility improvement.",
    icon: <Heart className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    category: "core",
    link: "/services/manual-therapy"
  },
  {
    id: "post-surgical",
    title: "Post-Surgical Rehabilitation",
    description: "Comprehensive recovery programs after surgical procedures.",
    icon: <Scissors className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    category: "core",
    link: "/services/post-surgical"
  },
  {
    id: "chronic-pain",
    title: "Chronic Pain Management",
    description: "Long-term strategies for managing persistent pain conditions.",
    icon: <Zap className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    category: "specialized",
    link: "/services/chronic-pain"
  },
  {
    id: "neurological",
    title: "Neurological Rehabilitation",
    description: "Treatment for conditions affecting the nervous system.",
    icon: <Brain className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
    category: "specialized",
    link: "/services/neurological"
  },
  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    description: "Customized fitness programs to build strength and endurance.",
    icon: <Dumbbell className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    category: "specialized",
    link: "/services/strength-conditioning"
  },
  {
    id: "pediatric-rehabilitation",
    title: "Pediatric Rehabilitation",
    description: "Specialized care for children's developmental and injury-related needs.",
    icon: <Baby className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
    category: "specialized",
    link: "/services/pediatric-rehabilitation"
  },
  {
    id: "geriatric-rehabilitation",
    title: "Geriatric Rehabilitation",
    description: "Age-specific therapy to maintain independence and quality of life.",
    icon: <User className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=600&fit=crop",
    category: "specialized",
    link: "/services/geriatric-rehabilitation"
  },
  {
    id: "womens-health",
    title: "Women's Health Physiotherapy",
    description: "Specialized care for women's unique health needs.",
    icon: <Heart className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/womens-health"
  },
  {
    id: "postural-alignment",
    title: "Postural Alignment Therapy",
    description: "Corrective treatments for posture-related issues.",
    icon: <User className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/postural-alignment"
  },
  {
    id: "obesity-management",
    title: "Obesity Management Program",
    description: "Comprehensive approach to weight management through exercise therapy.",
    icon: <Activity className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/obesity-management"
  },
  {
    id: "group-exercises",
    title: "Group Exercise Classes",
    description: "Fun and motivating group sessions for various fitness levels.",
    icon: <Users className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/group-exercises"
  },
  {
    id: "kinesiotaping",
    title: "Kinesiotaping",
    description: "Therapeutic taping technique for support and pain relief.",
    icon: <Zap className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/kinesiotaping"
  },
  {
    id: "dry-needling",
    title: "Dry Needling",
    description: "Trigger point therapy using fine needles for pain relief.",
    icon: <Zap className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/dry-needling"
  },
  {
    id: "neuro-dynamic",
    title: "Neuro-Dynamic Treatment",
    description: "Advanced nerve mobilization techniques for optimal function.",
    icon: <Brain className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/neuro-dynamic"
  },
  {
    id: "cupping-therapy",
    title: "Cupping Therapy",
    description: "Traditional therapy technique using suction for muscle recovery.",
    icon: <Droplets className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/cupping-therapy"
  },
  {
    id: "virtual-physiotherapy",
    title: "Virtual Physiotherapy",
    description: "Remote consultations and guided therapy sessions online.",
    icon: <Video className="h-6 w-6 text-vitality-500" />,
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&h=600&fit=crop",
    category: "advanced",
    link: "/services/virtual-physiotherapy"
  }
];
