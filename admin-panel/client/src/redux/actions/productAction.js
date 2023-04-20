const addAllProduct = (products) => {
  return {
    type: "ADD_ALL_PRODUCTS",
    payload: products,
  };
};

const exportDefault = {
  addAllProduct,
};

export default exportDefault;
