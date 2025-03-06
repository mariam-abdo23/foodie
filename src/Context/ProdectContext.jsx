import { createContext, useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance"; 

export const Products = createContext([]);

export function ProductsProvider(props) {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    AxiosInstance.get('category') 
      .then((resp) => resp.data)
      .then(({ data }) => {
        setProductsList(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <Products.Provider value={productsList}>
      {props.children}
    </Products.Provider>
  );
}