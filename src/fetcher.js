const Base_URL = "http://localhost:3001";

export const fetcher = async (url) => {
    let responseObject = { errorMessage: '', data: [] };
    
    try {
        const request = await fetch(Base_URL + url);
        if (!request.ok) {
            throw new Error(`HTTP Error: ${request.status}`);
        }
        const data = await request.json();
        responseObject.errorMessage = '';
        responseObject.data = data;
    }
    catch (err) {
        responseObject.errorMessage = err.message;
    }
    return responseObject;
}

export const getCategories =()=> {
  return fetcher("/categories");
}

export const getProducts = (id) => {
  return fetcher(`/products/?catId=${id}`);
}

export const getProductsById = (id) => {
  return fetcher(`/products/${id}`);
}

export const getProductsByQuery = () => {
  return fetcher(`/products`);
}