import { NavLink } from "react-router-dom"

function Navbar () {
    return (
        <nav>
            <NavLink to="/"
                className={({ isActive }) => 
                    isActive ? "active" : ""
            }
            >
                Dashboard
            </NavLink>
            {" | "}
            <NavLink to="employees"
                className={({ isActive }) => 
                    isActive ? "active" : ""
                }
            >
                Employees
            </NavLink>
        </nav>
    )
}
export default Navbar