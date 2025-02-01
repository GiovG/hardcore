import MembersTable from "../components/MembersTable";

const AdminPage = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Members</h1>
      <MembersTable mode="admin" />
    </div>
  );
};

export default AdminPage;
