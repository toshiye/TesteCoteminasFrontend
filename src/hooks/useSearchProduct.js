import { useContext } from "react"
import ProductSearchContext from "../context/productSearchContext"

const useSearchProduct = () => {
    const searchProduct = useContext(ProductSearchContext);
    return searchProduct;
};

export default useSearchProduct