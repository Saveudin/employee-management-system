import EmployeeCard from "./EmployeeCard"
import type { Employee } from "../types/Employee"

interface EmployeeListProps {
    loading : boolean,
    error : string | null,
    filteredEmployee : Employee[],
    deleteEmployee : (id:number) => void,
    editEmployee : (id :number) => void
}

function EmployeeList ({loading, error, filteredEmployee, deleteEmployee, editEmployee} : EmployeeListProps) {
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>

        {
            filteredEmployee.map((employee) => (
                <EmployeeCard 
                key={employee.id}
                employee={employee}
                deleteEmployee={deleteEmployee}
                editEmployee={editEmployee}
                />
            ))}
        </div>
    )
}

export default EmployeeList