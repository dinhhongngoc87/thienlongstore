const getAllProductService = async () => {
  return await fetch(`/api/get-all-products`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export { getAllProductService };
