import React, { createContext, useState } from "react";

const ProductSearchContext = createContext({});

export const ProductSearchProvider = ({children}) => {

    const [searchProduct, setSearchProduct] = useState('')

    const setSearch = (value) => {
        setSearchProduct(value)
    };

    return (
        <ProductSearchContext.Provider
            value={{
                searchProduct,
                setSearch,
            }}
        >
            {children} 
        </ProductSearchContext.Provider>
    );

}

export default ProductSearchContext;