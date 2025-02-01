import React, { useEffect, useState } from "react";

const MembersTable = ({ mode }) => {
  const [members, setMembers] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("https://api.example.com/members");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  // Cambiar rol de usuario
  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "employee" ? "socio" : "employee";
    try {
      const response = await fetch(`/members/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === id ? { ...member, role: newRole } : member
          )
        );
        alert(`El rol del usuario con ID: ${id} ha sido cambiado a "${newRole}".`);
      } else {
        alert("No se pudo actualizar el rol del usuario.");
      }
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  // Actualizar estado de pago
  const handleUpdatePaymentStatus = async (id, currentPaymentStatus) => {
    const newPaymentStatus = currentPaymentStatus === "Paid" ? "Unpaid" : "Paid";
    try {
      const response = await fetch(`/members/${id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });

      if (response.ok) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === id ? { ...member, paymentStatus: newPaymentStatus } : member
          )
        );
        alert(
          `El estado de pago del usuario con ID: ${id} se actualizó a "${newPaymentStatus}".`
        );
      } else {
        alert("No se pudo actualizar el estado de pago.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div >
      <table >
        <thead>
          <tr >
            <th >Nombre</th>
            <th >Apellido</th>
            <th >Edad</th>
            <th >Status</th>
            <th >Rol</th>
            <th >Estado de Pago</th>
            {mode === "admin" && (
              <th >Cambiar Rol</th>
            )}
            {mode === "employee" && (
              <th >Actualizar Pago</th>
            )}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td >{member.name}</td>
              <td >
                {member.lastName}
              </td>
              <td >{member.age}</td>
              <td >{member.status}</td>
              <td >
                {member.paymentStatus || "Unpaid"}
              </td>
              {mode === "admin" && (
                <td>
                  <button
                    onClick={() => handleChangeRole(member.id, member.role)}
                    
                  >
                    Cambiar a {member.role === "employee" ? "Socio" : "Empleado"}
                  </button>
                </td>
              )}
              {mode === "employee" && (
                <td >
                  <button
                    onClick={() =>
                      handleUpdatePaymentStatus(
                        member.id,
                        member.paymentStatus || "Unpaid"
                      )
                    }
                    
                  >
                    {member.paymentStatus === "Paid"
                      ? "Marcar como No Pagado"
                      : "Marcar como Pagado"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
