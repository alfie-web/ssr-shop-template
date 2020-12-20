class LocalStorage {
	static set = (prop, value) => {
		localStorage.setItem(prop, JSON.stringify(value));
	}

	static get = (prop) => {
		return JSON.parse(localStorage.getItem(prop));
	}

	static remove = (prop) => {
		localStorage.removeItem(prop);
	}
}

export default LocalStorage;