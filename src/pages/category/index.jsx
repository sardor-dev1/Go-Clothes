// import { useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import category from "../../service/category";
// import CategoryModal from "../../components/modal/category";
// import { CategoryTable } from "@ui";
// import Notification from "@notification";

// const index = () => {
//   const [data, setData] = useState();
//   const [open, setOpen] = useState(false);

//   const getData = async () => {
//     try {
//       const response = await category.get();
//       setData(response?.data.categories);
//     } catch (error) {
//       console.log(error);
//       Notification({ title: "Nimadir xato", type: "error" });
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//      <CategoryModal open={open} handleClose={handleClose}/>
//       <div className="flex flex-col gap-3">
//         <div className="flex justify-end">
//           <Button
//             variant="contained"
//             type="primary"
//             onClick={() => setOpen(true)}
//           >
//             ADD
//           </Button>
//         </div>
//         <CategoryTable data={data} />
//       </div>
//     </>
//   );
// };

// export default index;



import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import category from "../../service/category";
import CategoryModal from "../../components/modal/category";
import CategoryTable from "../../components/ui/category-table";
import Notification from "@notification";

const index = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);

  const getData = async (page, limit) => {
    try {
      const response = await category.get(page + 1, limit);
      setData(response?.data.categories);
      setTotal(response?.data.total);
    } catch (error) {
      console.log(error);
      Notification({ title: "Nimadir xato", type: "error" });
    }
  };

  useEffect(() => {
    getData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CategoryModal open={open} handleClose={handleClose} />
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
        <CategoryTable
          data={data}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </>
  );
};

export default index;
