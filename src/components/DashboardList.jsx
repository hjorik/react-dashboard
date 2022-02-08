import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react"; 

import PropTypes from "prop-types";
import DashboardElement from "./DashboardElement";
import DashboardContext from "../context/DashboardContext";

function DashboardList() {

	const {element, isLoading} = useContext(DashboardContext);

	if(!isLoading && (!element || element.length === 0)) {
		return <p>Keine Dashboardelemente vorhanden!</p>
	} else {
		return isLoading ? <h2>Lädt</h2> : (
			<div className="dashboard-list">
			<AnimatePresence>
				{element.map((element) => (
					<motion.div
						key={element.id}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						>
						<DashboardElement
							key={element.id}
							element={element}
						/>
					</motion.div>
				))}
			</AnimatePresence>
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
