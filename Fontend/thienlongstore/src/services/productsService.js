import axios from 'axios';
const getAllProductsByCategory = async (catId) => {
    return await axios.get(`/api/get-products-bycategory?id=${catId}`);
};
const productServices = {
    getAllProductsByCategory,
};
export default productServices;
