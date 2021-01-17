import api from './api';

const goodsAPI = {
	getAll: (page) => api.get(`goods/?page=${page}`),
	getGoodContent: (goodId) => api.get(`goods/content/${goodId}`),
}

export default goodsAPI;