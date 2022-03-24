import {FaPen} from "react-icons/fa"
import {FaTimes} from "react-icons/fa"
import PropTypes from "prop-types";
import { useContext } from "react";
import DashboardContext from "../context/DashboardContext";
import { IconPickerItem } from "react-fa-icon-picker";

function DashboardElement({element}) {

	const {deleteElement, editElement, showEditmode} = useContext(DashboardContext);

  	return (
		
		<div className="dashboard-element">
			
			<a className="dashboard-link" target="_blank" href={element.url} style={{height: showEditmode === true ? "66%" : "100%"}}>
				<IconPickerItem icon={element.icon} size={showEditmode === true ? 28 : 40} color={"#E8E8EE"}/>
				<h6 style={{textAlign: "center", justifyContent: "center"}}>{element.title}</h6>
			</a>
			
			<div style={{display: showEditmode === true ? "flex" : "none"}}>
				<button onClick={() => editElement(element)} className="edit-button">
					<FaPen/>
				</button>
				<button  onClick={() => deleteElement(element.id)} className="rmv-button">
					<FaTimes/>
				</button>
			</div>
			
		</div>
	);
}

DashboardElement.propTypes = {
	element: PropTypes.object.isRequired
};

export default DashboardElement;

