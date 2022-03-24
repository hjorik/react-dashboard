import { createContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {

	/******************************************************** 
	 * SidebarContext
	 ********************************************************/ 
	 
	const [showNavForm, setShowNavForm] = useState(true)

	const showSidebarForm = function() {
		if(showNavForm === false) {
			setShowNavForm(true);
		} else {
			setShowNavForm(false);
		}
	}

	const [nav, setNav] = useState([]);
	const [navEdit, setNavEdit] = useState({
		nav: {},
		edit: false
	});

	useEffect(() => {
		fetchNav();
	}, []);

	const fetchNav = async function() {
		const response = await fetch(`/nav?_sort=id&_order=asc`);
		const data = await response.json();

		setNav(data);
	}

	const addNav = async function(newNav) {
		const response = await fetch("/nav", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newNav)
		});
		const data = await response.json();

		setNav([data, ...nav]);
	}

	const deleteNav = async function(id) {
		if(window.confirm("Sind Sie sicher, dass sie dieses Nav entfernen wollen?")) {
			await fetch(`/nav/${id}`, {
				method: "DELETE"
			});
			setNav(nav.filter((nav) => nav.id !== id));
		}
	}

	const updateNav = async function(id, updatedNav) {
		const response = await fetch(`/nav/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedNav)
		});

		const data = await response.json();

		setNav(nav.map(nav => (nav.id === id ? data : nav)));

		setNavEdit({
			nav,
			edit: false
		});
	}

	const editNav = function(nav) {
		setNavEdit({
			nav,
			edit: true
		});
	}
	
	const [filter, setFilter] = useState("main");
	const setFilterTag = function(tag) {
		setFilter(tag);
	}

	/* useEffect(() => {
		setFilterTag();
	}, []); */

	/******************************************************** 
	 * Globaler Editierungsmodus
	 ********************************************************/

	const [showEditmode, setEditmode] = useState(false);
	const showElementEditmode = function() {
		if(showEditmode === false) {
			setEditmode(true);
		} else {
			setEditmode(false);
		}
		console.log(showEditmode);
		console.log("showElementEditmode");
	}

	/********************************************************/


	/**@todo die Hidden StateHook eventuell komplett in Context verschieben*/
	const [showForm, setShowForm] = useState(true);
	const showDashboardForm = function() {
		if(showForm === false) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	}
	
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
			showEditmode,
			showForm,
			showNavForm,
			nav,
			navEdit,
			filter,
			deleteElement,
			addElement,
			editElement,
			updateElement,
			showElementEditmode,
			showDashboardForm,
			showSidebarForm,
			deleteNav,
			addNav,
			editNav,
			updateNav,
			setFilterTag
			}}>
			{children}
	</DashboardContext.Provider>
}

export default DashboardContext;
