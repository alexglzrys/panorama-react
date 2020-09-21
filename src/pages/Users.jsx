import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const API_URL = "https://jsonplaceholder.typicode.com";
  const fetchData = async () => {
    try {
      const responseUsers = await fetch(`${API_URL}/users`);
      const dataUsers = await responseUsers.json();
      setUsers(dataUsers);
    } catch (error) {
      console.log("Ha sucedido un error: " + error.message);
    }
  };

  const columns = [
    {
      title: "User Id",
      field: "id",
      type: "numeric",
      align: "left",
      width: 150,
    },
    {
      title: "Name",
      field: "name",
      align: "left",
      width: 300,
    },
    {
      title: "Email",
      field: "email",
      align: "left",
      width: "auto",
    },
    {
      title: "WebSite",
      field: "website",
      width: "auto",
    },
  ];

  const options = {
    exportButton: true,
  };

  return (
    <div className="Users">
      <MaterialTable
        columns={columns}
        data={users}
        options={options}
        title="Users"
      />
    </div>
  );
};
export default Users;
