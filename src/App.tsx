
import { useEmployees } from './hooks/useEmployees'
import EmployeeList from './components/EmployeeList'
import type { Employee } from './types/Employee'
import {useState} from 'react'
import './App.css'
import EmployeeForm from './components/EmployeeForm'

function App() {

  const {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployees()

const emptyForm = {
  name: "",
  department:"",
  position:"",
  email:""
}

const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

const [search, setSearch] = useState("");
const [formData, setFormData] = useState({
  name: "",
  department:"",
  position:"",
  email:""
})

const [errors, setErrors] = useState({
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

  const handleInputChange = (
    field: string, value: string
  ) => {
    setFormData({
      ...formData,
        [field]: value
  });
  setErrors((prevErrors) => ({
        ...prevErrors,
      [field] : ""
    })
  )}

  const handleSubmit = async () => {
    const result = validateForm()

    if (Object.values(result).some(e => e !== "")){
      setErrors(result)
      return
    }
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData)
      setEditingEmployee(null)
      setFormData(emptyForm)
    }
    else {
      addEmployee(formData)
      setEditingEmployee(null)
      setFormData(emptyForm)
    }
  }

  const validateForm = () => {

    const newErrors = {
      name: "",
      department:"",
      position:"",
      email:""
    }

    if (formData.name.trim() === ""){
      newErrors.name = "Name is required"
    }
    if (formData.department.trim() === ""){
      newErrors.department = "Department is required"
    }
    if (formData.position.trim() === ""){
      newErrors.position = "Position is required"
    }
    if (formData.email.trim() === ""){
      newErrors.email = "Email is not valid"
      
    }
    if (!formData.email.includes("@")){
        newErrors.email = "Email is not valid"
      }
    return newErrors 
  }

  if (loading) {
    <p>Loading...</p>
  }

  return (
    <div>
      <h1>Employee Management System</h1>
      <input 
      value={search}
      onChange={(event) => {
        setSearch(event.target.value)
      }}/>

      <EmployeeForm 
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        editingEmployee={editingEmployee}
        onCancel={cancelEdit}
        onSubmit={handleSubmit}
      />
      
      <EmployeeList 
        loading={loading}
        error={error}
        filteredEmployee={filteredEmployee}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
  </div>
  );

}

export default App
