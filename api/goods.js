import api from './api';

const goodsAPI = {
	getGoodContent: (goodId) => api.get(`goods/content/${goodId}`),
}

export default goodsAPI;