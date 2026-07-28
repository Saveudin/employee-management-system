import { useState } from "react";
import { initialEmployees } from "../data/employees";
import type { ApiUser } from "../types/ApiUser";
import axios from "axios";
import { useEffect } from "react";
import type {EmployeeForm} from "../types/EmployeeForm"

export function useEmployees() {
    const [employees, setEmployees] = useState(initialEmployees);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const fetchEmployees = async () => {
        
        try {
          setLoading(true)
          setError(null)
          const response = await axios.get<ApiUser[]>(
            "http://localhost:3001/employees/"
          )
    
          const data = response.data
          const newData = data.map((e) => ({
            id: e.id,
            name: e.name,
            department: e.department,
            position: e.position,
            email: e.email
          }))
          
          setEmployees(newData)
        } catch (error) {
            setError("Failed to fetch employee")
        } finally {
          setLoading(false)
        }
      }

    useEffect(() => {
        const initialize = async () => {
            await fetchEmployees()
        }

        void initialize()
    }, [])

    const addEmployee = async (employeeData: EmployeeForm) => {
      await axios.post(
        "http://localhost:3001/employees/",
        employeeData
      )
      await fetchEmployees()

     }

     const updateEmployee = async (
      id:number,
      employeeData:EmployeeForm
     ) => {
      await axios.put(`http://localhost:3001/employees/${id}`, employeeData)
      await fetchEmployees()
     }

  return {employees, loading, error, addEmployee, updateEmployee}
}


// const result = validateForm()

//       setErrors(result)

//       const errorMessage = Object.values(result)
//       const hasErrors = errorMessage.some(e => e !== "")

//       if (hasErrors) {
//         errorMessage.map(e => console.log(e))
//         return
//       }

//     try{
//       await axios.post(
//         "http://localhost:3001/",
//         employeeData
//       )

//       await fetchEmployees()
//       setFormData(employeeData)
//     }
//     catch (error){
//       console.error(error)
//     }
//     cancelEdit()