import * as Yup from "yup";

// =============  AUTH =============

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});

// =============  SERBVICE ===========
export const serviceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.string().required("Price is required"),
});
