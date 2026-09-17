import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Employee } from "../types/Employee";
import { useEmployees } from "../hooks/useEmployees";

function EmployeeDetail () {
    const {getEmployeeById} = useEmployees()

    const {id} = useParams()

    const [employee, setEmployee] = useState<Employee | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEmployee = async () => {
            setLoading(true)
            setError(null)

            try {
                const selectedEmployee = await getEmployeeById(id)
                setEmployee(selectedEmployee)
            } catch {
                setError("Failed to load employee")
            } finally {
                setLoading(false)
            }
        }

        loadEmployee()
    }, [id, getEmployeeById])

    console.log("EmployeeDetail")
    return (
        <div>
            <h1>Employee Detail</h1>
            <p>ID: {employee?.id}</p>
            <p>Name: {employee?.name}</p>
            <p>Department: {employee?.department}</p>
            <p>Position: {employee?.position}</p>
            <p>Email: {employee?.email}</p>
        </div>
    )
}

export default EmployeeDetail