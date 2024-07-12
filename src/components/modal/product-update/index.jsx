import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import category from "../../../service/category";
import product from "../../../service/products";
import { Field, Form, Formik } from "formik";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { productValidationSchema } from "@validation";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  borderRadius: 1.3,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function BasicModal({item}) {
  const [open, setOpen] = React.useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [params] = React.useState({
    page: 1,
    limit: 10,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams()
  const initialValues = {
    product_name: item?.product_name || "" ,
    color: item?.color ||"",
    size: item?.size ||"",
    made_in: item?.made_in || "",
    category_id: item?.category_id ||"",
    cost: item?.cost ||"",
    discount: item?.discount ||"",
    count: item?.count ||"",
    description: item?.description ||"",
    age_max: item?.age_max || "",
    age_min: item?.age_min || "",
    for_gender: item?.for_gender ||"",
  };
  const handleSubmit = async (data) => {
    const newColor = data.color.split();
    try {
      const response = await product.update(data);
      console.log(response);
        handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  const categories = async () => {
    try {
      const response = await category.get();
      setCategoryData(response?.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categoryData);
  return (
    <div>
      <div onClick={() => categories()}>
        <button onClick={handleOpen} className=" text-gray-500">
          <EditIcon />
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Add product
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-2 gap-y-3 gap-x-5 justify-between items-center">
                  <Field
                    name="product_name"
                    type="text"
                    as={TextField}
                    label="Product name"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="color"
                    type="text"
                    as={TextField}
                    label="Color"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="size"
                    type="text"
                    as={TextField}
                    label="Size"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="made_in"
                    type="text"
                    fullWidth
                    as={TextField}
                    label="Made in"
                    select
                    margin="none"
                    variant="outlined"
                  >
                    <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                    <MenuItem value="Turkey">Turkey</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                  </Field>
                  <Field
                    name="category_id"
                    type="text"
                    as={TextField}
                    label="Category"
                    select
                    className="relative"
                    margin="none"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="">Select category</MenuItem>
                    {categoryData?.map((item, index) => (
                      <MenuItem key={index} value={item.category_id}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="cost"
                    type="number"
                    as={TextField}
                    label="Cost"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="discount"
                    type="number"
                    as={TextField}
                    label="Discount"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="count"
                    type="number"
                    as={TextField}
                    label="Count"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="description"
                    type="text"
                    as={TextField}
                    label="Description"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="age_max"
                    type="number"
                    as={TextField}
                    label="Age max"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    name="age_min"
                    type="number"
                    as={TextField}
                    label="Age min"
                    fullWidth
                    margin="none"
                    variant="outlined"
                  />
                  <Field
                    as={RadioGroup}
                    aria-label="for_gender"
                    name="for_gender"
                    className="flex items-center mb-3"
                    margin="none"
                  >
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <div className="flex items-center justify-between">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                  </Field>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-5"
                >
                  {isSubmitting ? "Adding..." : "Add"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
