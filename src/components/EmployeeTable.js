import React, { useState, useEffect } from "react";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => alert("Failed to fetch data"));
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1 style={{marginTop:'40px'}}>Employee Data Table</h1>
      <table
        border="1"
        width="100%"
        style={{
          alignItems: "center",

          border: "3px solid #26A69A ",
          borderBottomColor: "#26A69A",
        }}>
        <thead
          style={{
            backgroundColor: "#26A69A",
            color: "white",
            height: "40px",
            textAlign: "start ",
          }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "start " }}>
          {currentRows.map((employee) => (
            <tr key={employee.id} style={{ height: "40px" }}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          style={{ backgroundColor: "#26A69A", color: "white", borderRadius: "5px" }}
          onClick={prevPage}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span
          style={{
            height: "30px",
            width: "30px",
            backgroundColor: "#26A69A",
            color: "white",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}>
          {currentPage}
        </span>
        <button
          style={{ backgroundColor: "#26A69A", color: "white", borderRadius: "5px" }}
          onClick={nextPage}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
