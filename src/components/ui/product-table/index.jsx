import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";

import products from "../../../service/products";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData(1, "nimadir", "white", "XL", 4.0)];

export default function index({ data }) {
  const deleteItem = async (id) => {
    try {
      const response = await products.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="center">Product name</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell align="center">Cost</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{item.product_name}</TableCell>
              <TableCell align="center">{item.color}</TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="center">{item.count}</TableCell>
              <TableCell align="center">{item.cost}</TableCell>
              <TableCell align="center">
                <div className="flex items-center gap-x-5 justify-center">
                  <button
                    className="text-gray-500 mr-2"
                    onClick={() => deleteItem(item.product_id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button className="text-gray-500">
                    <AddPhotoAlternateIcon />
                  </button>
                  <button className="text-gray-500">
                    <VisibilityIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
