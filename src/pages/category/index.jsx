import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import category from "../../service/category";
import CategoryModal from "../../components/modal/category";
import { CategoryTable } from "@ui";
import Notification from "@notification";

const index = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  
  const getData = async () => {
    try {
      const response = await category.get();
      setData(response?.data.categories);
    } catch (error) {
      console.log(error);
      Notification({ title: "Nimadir xato", type: "error" });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
     <CategoryModal open={open} handleClose={handleClose}/>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            type="primary"
            onClick={() => setOpen(true)}
          >
            ADD
          </Button>
        </div>
        <CategoryTable data={data} />
      </div>
    </>
  );
};

export default index;
