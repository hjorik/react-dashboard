import React from 'react';
import { IconPickerItem } from "react-fa-icon-picker";
import { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';

function SidebarElement({nav}) {

	const {filter, setFilterTag} = useContext(DashboardContext);

  	return (
	  	<li 
		className="sidebar-element" 
		onClick={() => {
			setFilterTag(nav.tag);
			console.log(filter);
			// console.log(nav.tag);
		}}>
			<span><IconPickerItem icon={nav.icon} color={"#E8E8EE"}/></span>
			<h2>{nav.title}</h2>
	  	</li>
	  	);
}

export default SidebarElement;
