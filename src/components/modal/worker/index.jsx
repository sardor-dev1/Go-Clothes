import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { workerValidationSchema } from '@validation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {workers} from "@service"

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [params] = React.useState({
    page: 1,
    limit: 10,
  });
  const initialValues = {
    age: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
  };
  const handleSubmit = async (data) => {
    try {
      await workers.create(data);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add user
      </Button>
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
            validationSchema={workerValidationSchema}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
