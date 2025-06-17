
import { Users, Award, MapPin, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Patients Treated",
    color: "text-blue-600"
  },
  {
    icon: Award,
    value: "1000+",
    label: "Certified Physiotherapists", 
    color: "text-green-600"
  },
  {
    icon: MapPin,
    value: "28",
    label: "Cities Covered",
    color: "text-vitality-600"
  },
  {
    icon: Clock,
    value: "98%",
    label: "Same Day Appointments",
    color: "text-orange-600"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
