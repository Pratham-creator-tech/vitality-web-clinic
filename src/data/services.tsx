import React from "react";
import {
  Activity,
  Baby,
  Bandage,
  BrainCircuit,
  Dumbbell,
  Flame,
  Grid,
  Heart,
  Stethoscope,
  ThermometerSun,
  UserPlus,
  Users,
  Video,
  Bone,
  Syringe,
  Zap,
  Weight,
  Pill,
  Compass,
  Ruler,
  HeartPulse,
  Brain,
  // Remove Walking and use an existing icon
  ListTodo,
  Microscope,
  HandHeart,
  ThumbsUp,
  Waves,
  Bed,
  Footprints,
  Workflow,
} from "lucide-react";

export const serviceData = [
  {
    id: 1,
    title: "Sports Rehabilitation",
    description: "Specialized treatment for sports-related injuries and performance enhancement.",
    icon: <Activity className="h-10 w-10 text-vitality-400" />,
    link: "/services/sports-rehabilitation",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "core",
  },
  {
    id: 2,
    title: "Manual Therapy",
    description: "Hands-on techniques to reduce pain, decrease restriction and restore mobility.",
    icon: <HandHeart className="h-10 w-10 text-vitality-400" />,
    link: "/services/manual-therapy",
    image: "https://images.unsplash.com/photo-1573811381942-10961e9cf296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "core",
  },
  {
    id: 3,
    title: "Post-Surgical Rehabilitation",
    description: "Specialized programs for optimal recovery after surgery.",
    icon: <Bone className="h-10 w-10 text-vitality-400" />,
    link: "/services/post-surgical",
    image: "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80",
    category: "core",
  },
  {
    id: 4,
    title: "Chronic Pain Management",
    description: "Comprehensive approaches to manage and reduce persistent pain.",
    icon: <Heart className="h-10 w-10 text-vitality-400" />,
    link: "/services/chronic-pain",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1820&q=80",
    category: "core",
  },
  {
    id: 5,
    title: "Neurological Rehabilitation",
    description: "Specialized care for neurological conditions and recovery.",
    icon: <BrainCircuit className="h-10 w-10 text-vitality-400" />,
    link: "/services/neurological",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1773&q=80",
    category: "core",
  },
  {
    id: 6,
    title: "Strength & Conditioning",
    description: "Build strength, improve function and prevent injuries with expert guidance.",
    icon: <Dumbbell className="h-10 w-10 text-vitality-400" />,
    link: "/services/strength-conditioning",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "core",
  },
  {
    id: 7,
    title: "Pediatric Rehabilitation",
    description: "Specialized care for children's development and rehabilitation needs.",
    icon: <Baby className="h-10 w-10 text-vitality-400" />,
    link: "/services/pediatric-rehab",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    category: "specialized",
  },
  {
    id: 8,
    title: "Geriatric Rehabilitation",
    description: "Specialized care for elderly patients focusing on mobility and independence.",
    icon: <ThermometerSun className="h-10 w-10 text-vitality-400" />,
    link: "/services/geriatric-rehab",
    image: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1776&q=80",
    category: "specialized",
  },
  {
    id: 9,
    title: "Women's Health",
    description: "Specialized physiotherapy services for women's unique health needs.",
    icon: <Heart className="h-10 w-10 text-vitality-400" />,
    link: "/services/womens-health",
    image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "specialized",
  },
  {
    id: 10,
    title: "Postural Alignment",
    description: "Correct posture problems and improve ergonomic wellness.",
    icon: <UserPlus className="h-10 w-10 text-vitality-400" />,
    link: "/services/postural-alignment",
    image: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1773&q=80",
    category: "specialized",
  },
  {
    id: 11,
    title: "Obesity Management & Fitness",
    description: "Personalized weight management and fitness programs for sustainable results.",
    icon: <Weight className="h-10 w-10 text-vitality-400" />,
    link: "/services/obesity-management",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80",
    category: "specialized",
  },
  {
    id: 12,
    title: "Group Exercise",
    description: "Motivating group sessions for fitness and rehabilitation.",
    icon: <Users className="h-10 w-10 text-vitality-400" />,
    link: "/services/group-exercise",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "specialized",
  },
  {
    id: 13,
    title: "Kinesiotaping",
    description: "Advanced taping techniques for pain relief and muscle support.",
    icon: <Bandage className="h-10 w-10 text-vitality-400" />,
    link: "/services/kinesiotaping",
    image: "https://images.unsplash.com/photo-1619124649874-f21dd6450d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80",
    category: "advanced",
  },
  {
    id: 14,
    title: "Dry Needling Therapy",
    description: "Precision treatment for muscle pain and tension.",
    icon: <Syringe className="h-10 w-10 text-vitality-400" />,
    link: "/services/dry-needling",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "advanced",
  },
  {
    id: 15,
    title: "Neuro Dynamic Solution",
    description: "Advanced treatment for nerve-related conditions.",
    icon: <Zap className="h-10 w-10 text-vitality-400" />,
    link: "/services/neuro-dynamic",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "advanced",
  },
  {
    id: 16,
    title: "Cupping Therapy",
    description: "Traditional therapy for muscle tension and circulation.",
    icon: <Grid className="h-10 w-10 text-vitality-400" />,
    link: "/services/cupping",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80",
    category: "advanced",
  },
  {
    id: 17,
    title: "Virtual Physiotherapy",
    description: "Expert care from the comfort of your home.",
    icon: <Video className="h-10 w-10 text-vitality-400" />,
    link: "/services/virtual",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    category: "advanced",
  },
];
