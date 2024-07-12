import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';  
import { workerUpdateValidationSchema } from '@validation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import {workers} from "@service"
import EditIcon from "@mui/icons-material/Edit";
import Notification from "@notification"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 1.3,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function BasicModal({item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initialValues = {
    age: item.age || "",
    email: item.email || "",
    first_name: item.first_name || "",
    last_name: item.last_name || "",
    gender: item.gender || "",
    phone_number: item.phone_number || "",
  };
  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      id: item.id
    }
    try {
      await workers.update(payload);
      setOpen(false);
      Notification()
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={handleOpen} className="text-gray-500">
        <EditIcon />
      </button>
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
          >
            Add user
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={workerUpdateValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="age"
                  type="number"
                  as={TextField}
                  label="Age"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="age"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="first_name"
                  type="text"
                  as={TextField}
                  label="First name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="last_name"
                  type="text"
                  as={TextField}
                  label="Last name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="last_name"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="text"
                  as={TextField}
                  label="Phone number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  as={RadioGroup}
                  aria-label="gender"
                  name="gender"
                  className="flex items-center mb-3"
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
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="mb-3 text-red-500 text-center"
                />
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
