import { useState, useContext, useEffect } from "react";
import DashboardContext from "../context/DashboardContext";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { IconPicker } from "react-fa-icon-picker";

function SidebarForm() {

    const {showNavForm, showSidebarForm, navEdit, updateNav, addNav} = useContext(DashboardContext);

    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [icon, setIcon] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    const handleTitleChange = function(event) {
        if(title === "") {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
        setTitle(event.target.value);
    }

    const handleTagChange = function(event) {
        if(tag === "") {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
        setTag(event.target.value);
    }

    const handleSubmit = function(event) {
        event.preventDefault();
        if(title.trim().length !== 0) {
            const newNav = {
                title,
                tag,
                icon
            };
            if(navEdit.edit === true) {
                updateNav(navEdit.nav.id, newNav);
            } else {
                addNav(newNav);
            }
            setTitle("");
            setTag("");
            showSidebarForm();
        }
    }

    return (
		<Card reverse={showNavForm}>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Titel</label>
					<input
						onChange={handleTitleChange}
						type="text"
						placeholder=""
						value={title}
					/>
					<label>Tag</label>
					<input
						onChange={handleTagChange}
						type="text"
						placeholder=""
						value={tag}
					/>
					<label>Icon</label>
					<IconPicker
						onChange={(icon) => setIcon(icon)}
						type="text"
						placeholder=""
						value={icon}
					/>
					<span>
						<Button type="submit" isDisabled={btnDisabled}>Speichern</Button>
						{/* <Button version="cancel" onClick={handleCancel}>Abbrechen</Button> */}
					</span>
				</div>
			</form>
		</Card>
	);
}

export default SidebarForm;