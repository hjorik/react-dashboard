import { useState, useContext } from "react";
import Button from "./shared/Button";
import SidebarElement from "./SidebarElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import DashboardContext from "../context/DashboardContext";


function SidebarList() {

	const {nav, showEditmode, showSidebarForm} = useContext(DashboardContext);

	const [isExpanded, setIsExpanded] = useState(false);

	const expandSidebar = function() {
		if(isExpanded === false) {
			setIsExpanded(true);
		} else {
			setIsExpanded(false);
		}
	}



  	return (
		<div className={`sidebar-list ${isExpanded ? "active" : ""}`}>
		<Button version={`sidebar`} onClick={() => expandSidebar()}>
		<FontAwesomeIcon icon={faBars} />
		</Button>
	  	<ul>
			{nav.map((nav) => (
			<SidebarElement
			key={nav.id}
			nav={nav}
			/>
			))}
			
	  	</ul>
		<Button version={`sidebar-add`} style={{position: "relative", display: showEditmode === true ? "flex" : "none", }} onClick={() => showSidebarForm()}>
			<FontAwesomeIcon icon={faPlus} />
		</Button>
		</div>
	);
}

export default SidebarList;
