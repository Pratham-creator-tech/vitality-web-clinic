
import { MapPin, Users, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PanIndiaSection = () => {
  const cities = [
    { name: "Mumbai", state: "Maharashtra", doctors: 150 },
    { name: "Delhi", state: "Delhi", doctors: 120 },
    { name: "Bangalore", state: "Karnataka", doctors: 100 },
    { name: "Chennai", state: "Tamil Nadu", doctors: 85 },
    { name: "Kolkata", state: "West Bengal", doctors: 75 },
    { name: "Pune", state: "Maharashtra", doctors: 60 },
    { name: "Hyderabad", state: "Telangana", doctors: 55 },
    { name: "Ahmedabad", state: "Gujarat", doctors: 45 },
  ];

  const stats = [
    { icon: MapPin, label: "Cities Covered", value: "100+" },
    { icon: Users, label: "Active Doctors", value: "1,000+" },
    { icon: Award, label: "Years of Service", value: "15+" },
    { icon: Clock, label: "24/7 Support", value: "Available" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-vitality-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vitality-700 dark:text-vitality-300 mb-4 font-display">
            Serving All of India
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From Kashmir to Kanyakumari, we provide world-class physiotherapy services across the entire nation. 
            Our network of certified professionals ensures quality care wherever you are in India.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-vitality-500 mx-auto mb-3" />
                <p className="text-2xl font-bold text-vitality-700 dark:text-vitality-300">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Major Cities */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-8 text-vitality-700 dark:text-vitality-300">
            Available in Major Cities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-vitality-500" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{city.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{city.state}</p>
                <p className="text-xs text-vitality-600 dark:text-vitality-400 mt-1">
                  {city.doctors} doctors available
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Map Visual */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-vitality-100 to-vitality-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-vitality-200 dark:border-gray-600">
            <h4 className="text-xl font-semibold mb-4 text-vitality-700 dark:text-vitality-300">
              Complete Pan-India Coverage
            </h4>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[
                "North India", "South India", "East India", "West India", 
                "Central India", "Northeast India"
              ].map((region, index) => (
                <span 
                  key={index}
                  className="bg-vitality-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              No matter where you are in India, quality physiotherapy care is just a click away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanIndiaSection;
