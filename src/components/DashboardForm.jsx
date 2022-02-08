import { useState, useContext, useEffect } from "react";
import DashboardContext from "../context/DashboardContext";
import Button from "./shared/Button";
import Card from "./shared/Card";

function DashboardForm() {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState("");

	const {addElement, elementEdit, updateElement} = useContext(DashboardContext);

	useEffect(() => {
		if(elementEdit.edit === true) {
			setBtnDisabled(false);
			setTitle(elementEdit.element.title);
			setUrl(elementEdit.element.url);

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
		setUrl(event.target.value)
	}
	

	const handleSubmit = function(event) {
		event.preventDefault();
		if(title.trim().length > 3) {
			const newElement = {
				title,
				url
			};
			if(elementEdit.edit === true) {
				updateElement(elementEdit.element.id, newElement);
			} else {
				addElement(newElement);
			}
			setTitle("");
			setUrl("");
		}
	}
  	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>Neues Dashboardelement erstellen</h2>
				<div>
					<input
						onChange={handleTitleChange}
						type="text"
						placeholder="Titel"
						value={title}
					/>
					<input
						onChange={handleUrlChange}
						type="text"
						placeholder="URL"
						value={url}
					/>
					<Button type="submit" isDiabled={btnDisabled}>Speichern</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
}

export default DashboardForm;
