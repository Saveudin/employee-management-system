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
    onSubmit : () => void,
    errors : {
        name: string;
        department: string;
        position: string;
        email: string;
    }
}


function EmployeeForm({formData, onInputChange, editingEmployee, onCancel, onSubmit, errors} : EmployeeFormProps) {
    return (
        <div>
            Name :
            <input value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            /><br />
            <p>{errors.name}</p>

            Department :
            <input value={formData.department} 
            onChange={(e) => {                onInputChange("department", e.target.value)
            }}
            /><br />
            <p>{errors.department}</p>
            

            Position :
            <input value={formData.position} 
            onChange={(e) => {
                onInputChange("position", e.target.value)
            }}
            /><br />
            <p>{errors.position}</p>
            

            Email :
            <input value={formData.email} 
            onChange={(e) => 
                onInputChange("email", e.target.value)
            }
            />
            <br />
            <p>{errors.email}</p>
            


            {editingEmployee && (
                
                <button onClick={onCancel}>Cancel Edit</button>
                
            )}

                <button onClick={onSubmit}>{editingEmployee ? 'Save Employee' : 'Add Employee'}</button>
        </div>
    )
}

export default EmployeeForm