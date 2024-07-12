import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ProductTable } from "@ui";
import products from "../../service/products.js";
import ProductModal from "../../components/modal/product"

const index = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await products.get();
      setData(response?.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <ProductModal/>
        </div>
        <ProductTable data={data} />
      </div>
    </>
  );
};

export default index;
