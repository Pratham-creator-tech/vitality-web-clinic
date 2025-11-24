import { Calendar, User, Settings, CreditCard, Activity, Users, Stethoscope, LayoutDashboard, Gift } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { MobileNavItemWithIcon } from "./MobileNavItemWithIcon";

export const MobileNavUserDashboard = () => {
  const { user, userRole } = useAuth();
  
  if (!user) return null;

  return (
    <div className="pt-4 mt-4 border-t border-gray-100">
      <div className="px-3 mb-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Dashboard
        </h3>
      </div>
      
      <MobileNavItemWithIcon to="/profile" icon={User}>
        My Profile
      </MobileNavItemWithIcon>

      {userRole === "patient" && (
        <MobileNavItemWithIcon to="/patient-dashboard" icon={LayoutDashboard}>
          Patient Dashboard
        </MobileNavItemWithIcon>
      )}

      {userRole === "doctor" && (
        <MobileNavItemWithIcon to="/doctor-dashboard" icon={LayoutDashboard}>
          Doctor Dashboard
        </MobileNavItemWithIcon>
      )}
      
      <MobileNavItemWithIcon to="/booking" icon={Calendar}>
        {userRole === "doctor" ? "Appointments" : "Book Appointment"}
      </MobileNavItemWithIcon>
      
      {userRole === "patient" && (
        <>
          <MobileNavItemWithIcon to="/pain-tracker" icon={Activity}>
            Pain Tracker
          </MobileNavItemWithIcon>
          <MobileNavItemWithIcon to="/progress-tracker" icon={Activity}>
            Progress Tracker
          </MobileNavItemWithIcon>
          <MobileNavItemWithIcon to="/recommendations" icon={Stethoscope}>
            Recommendations
          </MobileNavItemWithIcon>
          <MobileNavItemWithIcon to="/referral-program" icon={Gift}>
            Referral Program
          </MobileNavItemWithIcon>
        </>
      )}
      
      {userRole === "doctor" && (
        <MobileNavItemWithIcon to="/patients" icon={Users}>
          My Patients
        </MobileNavItemWithIcon>
      )}
      
      <MobileNavItemWithIcon to="/account-settings" icon={Settings}>
        Settings
      </MobileNavItemWithIcon>
      
      <MobileNavItemWithIcon to="/billing" icon={CreditCard}>
        Billing
      </MobileNavItemWithIcon>
    </div>
  );
};