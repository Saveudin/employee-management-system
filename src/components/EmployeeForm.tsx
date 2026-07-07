import type { Employee } from "../types/Employee";

interface EmployeeFormProps {
    formData : {
        name: string;
        department: string;
        position: string;
        email: string;
    },
    onInputChange : (field:string, value:string) => void,
    editingEmployee : Employee | null,
    onCancel : () => void,
    onSubmit : () => void
}


function EmployeeForm({formData, onInputChange, editingEmployee, onCancel, onSubmit} : EmployeeFormProps) {
    return (
        <div>
            Name :
            <input value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            /><br />

            Department :
            <input value={formData.department} 
            onChange={(e) => {                onInputChange("department", e.target.value)
            }}
            /><br />

            Position :
            <input value={formData.position} 
            onChange={(e) => {
                onInputChange("position", e.target.value)
            }}
            /><br />
            
            Email :
            <input value={formData.email} 
            onChange={(e) => 
                onInputChange("email", e.target.value)
            }
            />
            <br />

            {editingEmployee && (
                
                <button onClick={onCancel}>Cancel Edit</button>
                
            )}

                <button onClick={onSubmit}>{editingEmployee ? 'Save Employee' : 'Add Employee'}</button>
        </div>
    )
}

export default EmployeeForm