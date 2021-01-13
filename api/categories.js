import api from './api';

const categoriesAPI = {
	getFirstLevel: () => api.get(`categories/firstLevel`),
	getByParent: (parentId) => api.get(`categories/byParent/${parentId}`)
}

export default categoriesAPI;