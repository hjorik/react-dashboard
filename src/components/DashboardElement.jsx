import {FaEdit} from "react-icons/fa"
import {FaTimes} from "react-icons/fa"
import PropTypes from "prop-types";
import { useContext } from "react";
import DashboardContext from "../context/DashboardContext";

function DashboardElement({element}) {

	const {deleteElement, editElement} = useContext(DashboardContext);

  	return (
		
		<div className="dashboard-element">
			<a className="dashboard-link" target="_blank" href={element.url}>{element.title}</a>
			<div className="">
				<button onClick={() => editElement(element)} className="edit-button">
					<FaEdit color="black"/>
				</button>
				<button  onClick={() => deleteElement(element.id)} className="rmv-button">
					<FaTimes color="#F95F5A"/>
				</button>
			</div>
		</div>
	);
}

DashboardElement.propTypes = {
	element: PropTypes.object.isRequired
};

export default DashboardElement;

