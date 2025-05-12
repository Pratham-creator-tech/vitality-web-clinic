import { Link } from "react-router-dom";

const PatientDetail = () => {
  return (
    <div>
      <h1>Patient Details</h1>
      <Link to="/patients">Back to Patients List</Link>
    </div>
  );
};

export default PatientDetail;