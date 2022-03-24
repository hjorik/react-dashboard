import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
// import {useState} from "react";
import DashboardList from './components/DashboardList';
// import DashboardData from './data/DashboardData';s
import DashboardForm from './components/DashboardForm';
import { DashboardProvider } from "./context/DashboardContext";
import Settings from "./components/Settings";
import SidebarList from "./components/SidebarList";
import SidebarForm from "./components/SidebarForm"

function App() {
    /* const [dashboardelement, setDashboardElement] = useState(DashboardData);
    const deleteDashboardElement = function(id) {
        console.log("App", id);
            if(window.confirm("Are you sure you want to remove this Dashboardelement?")) {
              setDashboardElement(dashboardelement.filter((element) => element.id !== id))
            }
    } */

    return (
        <DashboardProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={
                            <>
                            <SidebarForm/>
                            <SidebarList/>
                            <Settings/>
                            <DashboardForm/>
                            <DashboardList>
                            </DashboardList>
                            </>
                        }>
                        </Route>
                        <Route>

                        </Route>
                    </Routes>
                </div>
            </Router>
        </DashboardProvider>
    );
}

export default App;
