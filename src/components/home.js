import React from "react";

import { useParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";

import CategoryProduct from "./categoryProduct";

const Home = () => {
  const [products, setProducts] = React.useState({
    errorMessage: "",
    data: [],
  });
  const { categoryId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByQuery();
      setProducts(responseObject);
    };
    fetchData();
  }, [categoryId]);

  function shuffleProducts(product) {
    for (let i = product.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [product[i], product[j]] = [product[j], product[i]]; // Swap elements
    }
    return product;
  }

  const renderProducts = () => {
    const shuffledProducts = shuffleProducts([...products.data]);
    console.log(shuffledProducts);
    return shuffledProducts.map((product) => (
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
  )
}

export default Home