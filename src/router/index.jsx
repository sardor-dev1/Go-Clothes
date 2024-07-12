import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, Main, Category, Workers, Products, ProductSingle} from "@pages";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/products/:id" element={<ProductSingle />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
