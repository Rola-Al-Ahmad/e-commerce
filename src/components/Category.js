import React from "react";

import { useParams } from "react-router-dom";
import { getProducts } from "../fetcher";

import CategoryProduct from "./categoryProduct";

const Category = () => {
  const [products, setProducts] = React.useState({
    errorMessage: "",
    data: [],
  });
  const { categoryId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProducts(categoryId);
      setProducts(responseObject);
    };
    fetchData();
  }, [categoryId]);

  const renderProducts = () => {
    return products.data.map((product) => (
      <CategoryProduct key={product.id} {...product}>
        {product.title}
      </CategoryProduct>
    ));
  };

  return (
    <>
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      <div className="product-container">
        {
          products.data && renderProducts()
        }
      </div>
    </>
  );
};

export default Category;
