import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react"; 

import PropTypes from "prop-types";
import DashboardElement from "./DashboardElement";
import DashboardContext from "../context/DashboardContext";
import Button from "./shared/Button";

function DashboardList() {

	const {element, isLoading, showEditmode, showDashboardForm, filter} = useContext(DashboardContext);

	if(!isLoading && (!element || element.length === 0)) {
		return <p>Keine Dashboardelemente vorhanden!</p>
	} else if(filter === "main") {
		return isLoading ? <h2>Lädt</h2> : (
			<div className="dashboard-list">
			
				{element.map((element) => (
					
					<DashboardElement
						key={element.id}
						element={element}
					>
					</DashboardElement>
					
				))}			
			
			<Button version="add" style={{display: showEditmode === true ? "flex" : "none"}} onClick={() => showDashboardForm()}>+</Button>
		</div>
		);
	} else if(filter !== "main") {
		return isLoading ? <h2>Lädt</h2> : (
			<div className="dashboard-list">
			
				{element.filter(element => element.tag === filter).map(filteredElements => (
					
					<DashboardElement
						key={filteredElements.id}
						element={filteredElements}
					>
					</DashboardElement>
					
				))}
		
			<Button version="add" style={{display: showEditmode === true ? "flex" : "none"}} onClick={() => showDashboardForm()}>+</Button>
		</div>
		);
	}
}
/* function DashboardList({dashboardelement, handleDelete}) {
	if(!dashboardelement || dashboardelement.length === 0) {
		return <p>No Dashboardelement yet</p>;
	} else {
		console.log(dashboardelement);
		return (
		<div className="dashboard-list">
			{dashboardelement.map((element) => (
				<DashboardElement
					key={element.id}
					element={element}
					handleDelete={handleDelete}
				/>
			))}
		</div>
		);
	}
} */

/* DashboardList.propTypes = {
	element: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			titel: PropTypes.string.isRequired
		})
	)
} */

export default DashboardList;
