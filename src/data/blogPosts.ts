
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  featured?: boolean;
  content: string; // Added for details page
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Exercises to Relieve Lower Back Pain",
    excerpt: "Discover effective stretches and strengthening exercises that can help alleviate lower back pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1720&q=80",
    date: "April 12, 2023",
    readTime: "5 min read",
    category: "Pain Management",
    slug: "lower-back-pain-exercises",
    featured: true,
    content: `
### Why Lower Back Pain Happens
Lower back pain is common, often caused by poor posture, weak muscles, or overuse.
#### 5 Helpful Exercises
1. **Cat-Cow Stretch** – Gentle movement to mobilize the spine.  
2. **Child’s Pose** – Relieves tension in back muscles.  
3. **Pelvic Tilts** – Engages deep core stability.  
4. **Bridge Exercise** – Strengthens glutes and back.  
5. **Knee-to-Chest Stretch** – Stretches the lower back and hips.
**Tip:** Move within a pain-free range and consult a physio before starting new routines.
`
  },
  {
    id: 2,
    title: "The Importance of Proper Posture for Office Workers",
    excerpt: "Learn how maintaining good posture during long hours at a desk can prevent chronic pain and improve your overall wellbeing.",
    image: "https://images.unsplash.com/photo-1541591425126-4e6dcb9351d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 28, 2023",
    readTime: "7 min read",
    category: "Injury Prevention",
    slug: "office-worker-posture",
    featured: false,
    content: `
Sitting for long hours? Proper posture is essential for preventing musculoskeletal pain and stress.
#### Top Posture Tips:
- Sit with your feet flat, knees at hip level, and your monitor at eye level.
- Take microbreaks every 30–45 minutes to stand and stretch.
- Use an ergonomic chair and adjustable desk when possible.
Your physiotherapist can show you the right stretches and desk setup!
`
  },
  {
    id: 3,
    title: "Recovering from a Sports Injury: What You Need to Know",
    excerpt: "A comprehensive guide to the recovery process after a sports injury, including what to expect and how to enhance healing.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 15, 2023",
    readTime: "8 min read",
    category: "Rehabilitation",
    slug: "sports-injury-recovery",
    featured: false,
    content: `
Sports injuries require patience and a structured rehab plan.
#### Key Phases:
- **Acute care** (reduce swelling, manage pain)
- **Restore mobility** (gentle stretching, manual therapy)
- **Strengthening** (progressive exercise)
- **Return to sport** (sport-specific drills)
A physiotherapist will tailor your program for safe, effective recovery.
`
  },
  {
    id: 4,
    title: "How to Choose the Right Running Shoes to Prevent Injuries",
    excerpt: "Find out what factors to consider when selecting running shoes that will support your unique gait and help prevent common injuries.",
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    date: "February 28, 2023",
    readTime: "6 min read",
    category: "Injury Prevention",
    slug: "choosing-running-shoes",
    featured: false,
    content: `
Running shoes do matter!
#### What to Look For:
- The right fit for your foot type & running style (neutral, stability, motion control)
- Good shock absorption and support
- Replace shoes every 500–700km
**Tip:** Consult with a physiotherapist or specialist for a gait assessment before picking your next pair.
`
  },
  {
    id: 5,
    title: "The Role of Physiotherapy in Managing Chronic Conditions",
    excerpt: "Explore how physiotherapy can help manage and improve quality of life for those living with chronic health conditions.",
    image: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
    date: "February 15, 2023",
    readTime: "9 min read",
    category: "Wellness",
    slug: "physio-for-chronic-conditions",
    featured: false,
    content: `
Physiotherapy plays a crucial role in chronic condition management.
- Teaches self-management strategies
- Improves mobility, function and confidence
- Helps manage pain and fatigue
Examples: Arthritis, diabetes, heart and lung disease. Personalized programs always yield best results!
`
  },
  {
    id: 6,
    title: "Core Strengthening Exercises for Better Stability",
    excerpt: "Discover effective core exercises that improve stability, posture, and help prevent back injuries.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "January 30, 2023",
    readTime: "7 min read",
    category: "Exercise Tips",
    slug: "core-strengthening",
    featured: false,
    content: `
A strong core is your foundation!
#### Try these:
- Planks and side planks
- Dead bugs
- Bird-dog
- Glute bridges
Start slow, progress as your strength improves, and keep excellent form.
`
  },
  {
    id: 7,
    title: "Nutrition Tips for Optimal Recovery After Injury",
    excerpt: "Learn about the key nutrients and dietary strategies that can support healing and recovery after an injury or surgery.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
    date: "January 15, 2023",
    readTime: "8 min read",
    category: "Wellness",
    slug: "nutrition-for-recovery",
    featured: false,
    content: `
Nutrition has a major role in healing:
- **Protein** builds and repairs tissues
- **Vitamin C** aids in collagen synthesis
- **Calcium & Vitamin D** support bone healing
- Stay hydrated!
Work with your physio and a nutritionist for a best-in-class recovery plan.
`
  },
  {
    id: 8,
    title: "Improving Athletic Performance with Sport-Specific Training",
    excerpt: "Discover how targeted physiotherapy and training can enhance performance in your specific sport or athletic activity.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "January 5, 2023",
    readTime: "10 min read",
    category: "Sports Performance",
    slug: "sport-specific-training",
    featured: false,
    content: `
Every sport is different—training should be too.
- Train with sport-specific drills
- Focus on injury prevention
- Balance strength, flexibility, and agility
- Periodize training for peak competition
Sports physiotherapists provide guidance for safe performance gains!
`
  }
];
