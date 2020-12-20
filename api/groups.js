import api from './api';

const groupsAPI = {
	getAll: () => api.get('/groups'),
	getGoodsByGroup: (groupId) => api.get(`/groups/goods?group=${groupId}&position=0`)
}

export default groupsAPI;