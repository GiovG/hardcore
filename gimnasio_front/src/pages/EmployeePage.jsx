import MembersTable from "../components/MembersTable";

const EmployeePage = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Employee Attendance</h1>
      <MembersTable mode="employee" />
    </div>
  );
};

export default EmployeePage;
