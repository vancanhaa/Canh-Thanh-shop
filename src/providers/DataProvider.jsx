import { useEffect, useState } from "react";
import { localStorageUlti } from "../utils/localStorage";
import { CustomerContext } from "./CustomerContext";

function DataProvider({ children }) {
  const [allProductList, setAllProductList] = useState([]);
  useEffect(() => {
    setAllProductList(localStorageUlti("all_product_list", []).get());
  }, []);
  const [listItem, setListItem] = useState(localStorageUlti("list_item", []).get());

  const dataContextValue = {
    allProductList,
    listItem,
    setListItem,
  };

  return (
    <CustomerContext.Provider value={dataContextValue}>
      {children}
    </CustomerContext.Provider>
  );
}

export default DataProvider;
