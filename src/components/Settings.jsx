import { IoMdSettings } from "react-icons/io"
import Button from "./shared/Button";
import { useContext } from "react";
import DashboardContext from "../context/DashboardContext";

function Settings() {
  	
    const {showElementEditmode} = useContext(DashboardContext);
	
	return (
  		<div>
			<Button version="edit" onClick={() => showElementEditmode()}>
				<IoMdSettings></IoMdSettings>
			</Button>
  		</div>
  	);
}

export default Settings;
