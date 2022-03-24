import { useState, useContext, useEffect } from "react";
import { IconPicker } from "react-fa-icon-picker";
import DashboardContext from "../context/DashboardContext";
import Button from "./shared/Button";
import Card from "./shared/Card";
import TagSelection from "./TagSelection";

function DashboardForm() {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [icon, setIcon] = useState("");
	const [tag, setTag] = useState("");
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState("");
	const [formHidden, setFormHidden] = useState(true);

	const {nav, addElement, elementEdit, updateElement, showDashboardForm, showForm} = useContext(DashboardContext);

	useEffect(() => {
		if(elementEdit.edit === true) {
			setBtnDisabled(false);
			setTitle(elementEdit.element.title);
			setUrl(elementEdit.element.url);
			setIcon(elementEdit.element.icon);
			setTag(elementEdit.element.tag);
			/* setFormHidden(false); */
			showDashboardForm();
		}
	}, [elementEdit]);

	const handleTitleChange = function(event) {
		if(title === "") {
			setBtnDisabled(true);
			setMessage(null);
		} else if (title !== "" && title.trim().length <= 3) {
			setBtnDisabled(true);
			setMessage("Please type at least 3 characters");
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}
		setTitle(event.target.value)
	}

	const handleUrlChange = function(event) {
		if(url === "") {
			setBtnDisabled(true);
			setMessage(null);
		} else if (url !== "" && url.trim().length <= 3) {
			setBtnDisabled(true);
			setMessage("Please type at least 3 characters");
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}
		setUrl(event.target.value);
	}

	const handleIconChange = function(event) {
		setIcon(event.target.value);
	}
	
	const handleTagChange = function(event) {
		setTag(event.target.value);
	}

	const handleSubmit = function(event) {
		event.preventDefault();
		if(title.trim().length > 3) {
			const newElement = {
				title,
				url,
				icon,
				tag
			};
			if(elementEdit.edit === true) {
				updateElement(elementEdit.element.id, newElement);
			} else {
				addElement(newElement);
			}
			setTitle("");
			setUrl("");
			// setFormHidden(true);
			showDashboardForm();
		}
	}

	const handleCancel = function() {
		elementEdit.edit = false;
		setTitle("");
		setUrl("");
		// setFormHidden(true);
		showDashboardForm();
	}

  	return (
		<Card reverse={showForm}>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Titel</label>
					<input
						onChange={handleTitleChange}
						type="text"
						placeholder=""
						value={title}
					/>
					<label>URL</label>
					<input
						onChange={handleUrlChange}
						type="text"
						placeholder=""
						value={url}
					/>
					<label>Tag</label>
					<select name="tags" id="tag-select" onChange={handleTagChange} value={tag}>
						{nav.map((nav) => (
							<TagSelection
								key={nav.id}
								nav={nav}
							/>
						))}
					</select>
					<label>Icon</label>
					<IconPicker
						onChange={(icon) => setIcon(icon)}
						type="text"
						placeholder=""
						value={icon}
					/>
					
					<span>
						<Button type="submit" isDisabled={btnDisabled}>Speichern</Button>
						<Button version="cancel" onClick={handleCancel}>Abbrechen</Button>
					</span>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
}

export default DashboardForm;
