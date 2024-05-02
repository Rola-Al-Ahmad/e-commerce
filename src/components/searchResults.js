import React, { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";

import CategoryProduct from "./categoryProduct";



const SearchResults = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
    });

    let [searchParams ] = useSearchParams();
    let query = searchParams.get("s");

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductsByQuery(query);
            console.log("response object from search result ", responseObject);
            const filteredProducts = responseObject.data.filter((product) =>
              product.title.toLowerCase().includes(query.toLowerCase())
            );
            console.log("filteredProducts", filteredProducts);
            setProducts(filteredProducts);
        };
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if (products.length > 0) {
            return products.map((p) => (
                <CategoryProduct key={p.id} {...p}>
                    {p.title}
                </CategoryProduct>
            ));
        }
        else {
            return <div>No results found</div>
        }
    };
    return <div className="product-container">
        {products.errorMessage && <div>Error: {products.errorMessage}</div>}

        {renderProducts()}
    </div>;
};

export default SearchResults;
