import { createContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [element, setElement] = useState([]);
	const [elementEdit, setElementEdit] = useState({
		element: {},
		edit: false
	});

	useEffect(() => {
		fetchElement();
	}, []);

	const fetchElement = async function() {
		const response = await fetch(`/element?_sort=id&_order=asc`);
		const data = await response.json();

		setElement(data);
		setIsLoading(false);
	}

	const addElement = async function(newElement) {
		const response = await fetch("/element", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newElement)
		});
		const data = await response.json();

		setElement([data, ...element]);
	}

	const deleteElement = async function(id) {
		if(window.confirm("Sind Sie sicher, dass sie dieses Element entfernen wollen?")) {
			await fetch(`/element/${id}`, {
				method: "DELETE"
			});
			setElement(element.filter((element) => element.id !== id));
		}
	}

	const updateElement = async function(id, updatedElement) {
		const response = await fetch(`/element/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedElement)
		});

		const data = await response.json();

		setElement(element.map(element => (element.id === id ? data : element)));

		setElementEdit({
			element,
			edit: false
		});
	}

	const editElement = function(element) {
		setElementEdit({
			element,
			edit: true
		});
	}

	return <DashboardContext.Provider value={{
			element,
			elementEdit,
			isLoading,
			deleteElement,
			addElement,
			editElement,
			updateElement
			}}>
			{children}
	</DashboardContext.Provider>
}

export default DashboardContext;
