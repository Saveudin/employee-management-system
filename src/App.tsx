
import {initialEmployees} from './data/employees'
import EmployeeCard from './components/EmployeeCard'
import type { Employee } from './types/Employee'
import {useState} from 'react'
import './App.css'

function App() {
  

const emptyForm = {
  name: "",
  department:"",
  position:"",
  email:""
}
const [employees, setEmployees] = useState(initialEmployees);
const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
const [search, setSearch] = useState("");
const [formData, setFormData] = useState({
  name: "",
  department:"",
  position:"",
  email:""
})
const keyword = search.toLowerCase()
const filteredEmployee = employees.filter((employee) => {
  return (
    employee.name.toLowerCase().includes(keyword)
    ||
    employee.department.toLowerCase().includes(keyword)
    ||
    employee.position.toLowerCase().includes(keyword)
    ||
    employee.email.toLowerCase().includes(keyword)
  )
})

  const saveEmployee = () => {
      if(!editingEmployee) return

      const updatedEmployee = employees.map((employee) => {
        if(employee.id === editingEmployee.id) {
          return {...employee, ...formData}
        }
        return employee
      })

      setEmployees(updatedEmployee)
      setEditingEmployee(null)
      setFormData(emptyForm)
  }

  function deleteEmployee(id: number) {
      setEmployees(employees.filter((employee) => employee.id !== id));
  }

  const editEmployee = (id:number) => {
    const employee = employees.find((employee) => employee.id === id);

    if(employee){
      setEditingEmployee(employee)

      setFormData(employee)
    }
  }

  const cancelEdit = () => {
    setFormData(emptyForm)

    setEditingEmployee(null)
  }

  const addEmployee = () => {

    const lastEmployee = employees[employees.length -1];

    const newEmployee = {
     id: lastEmployee.id + 1,
     ...formData
    };

    setEmployees([...employees, newEmployee] )
    cancelEdit()
     }

  const handleSubmit = () => {
    if (editingEmployee) {
      saveEmployee()
    }
    else {
      addEmployee()
    }
  }

  return (
    <div>
      <h1>Employee Management System</h1>
      <input 
      value={search}
      onChange={(event) => {
        setSearch(event.target.value)
      }}/>
      <p>Search: {search}</p>
      <p>Editing ID : {editingEmployee?.id}</p>

      Name :
      <input value={formData.name}
      onChange={(event) => {
        setFormData({...formData, name : event.target.value})
        console.log(formData)
      }}
      /><br />

      Department :
      <input value={formData.department} 
      onChange={(event) => {
        setFormData({...formData, department : event.target.value})
        console.log(formData)
      }}
      /><br />

      Position :
      <input value={formData.position} 
      onChange={(event) => {
        setFormData({...formData, position : event.target.value})
        console.log(formData)
      }}
      /><br />
      
      Email :
      <input value={formData.email} 
      onChange={(event) => {
        setFormData({...formData, email : event.target.value})
        console.log(formData)
      }}
      />
      <br />

      {editingEmployee && (
        
          <button onClick={cancelEdit}>Cancel Edit</button>
        
      )}

        <button onClick={handleSubmit}>{editingEmployee ? 'Save Employee' : 'Add Employee'}</button>
      

      {filteredEmployee.map((employee) => (
        <EmployeeCard 
        key={employee.id}
        employee={employee}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
    ))}

  </div>
  );
}

export default App
