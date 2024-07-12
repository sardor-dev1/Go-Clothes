import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ImageGallery from "react-image-gallery";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.scss";
import { Button } from "@mui/material";
import "react-image-gallery/styles/css/image-gallery.css";
import UpdateModal from "../../components/modal/product-update" 
import products from "../../service/products"
function index() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const [productId, setProductId] = useState([])

  const response = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getImg = async (id) => {
    try {
      const response = await getMedia(id);
      setImg(response?.images?.map((item) => item.image_url));
    } catch (err) {
      console.error(err);
    }
  };
  const getProductId = async () => {
    try {
      const response = await products.getId(id);
      console.log(response);
      setProductId(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(productId);

  useEffect(() => {
    getImg(id);
    response();
    getProductId();
  }, []);

  const images = img?.map((item) => {
    return {
      original: item,
      thumbnail: item,
    };
  });
  return (
    <>
      <Button variant="contained" onClick={() => navigate("/admin-panel")}>
        <ArrowBackIcon/>
      </Button>
      {img && <ImageGallery items={images} />}
      <div className="flex justify-center mt-[170px] items-center gap-6">
        <div className="card flex flex-col items-start">
          <h2 className="text-[24px] text-slate-900 py-2 mb-4">
            {productId?.product_name}
          </h2>
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="text-[20px] text-slate-600">
                Made in: {productId?.made_in}
              </p>
              <p className="text-[20px] text-slate-600">
                Color: {productId?.color}
              </p>
              <p className="text-[20px] text-slate-600">
                Size: {productId?.size}
              </p>
              <p className="text-[20px] text-slate-600">
                Count: {productId?.count}
              </p>
            </div>
            <div>
              <p className="text-[20px] text-slate-600">
                Cost: {productId?.cost}$
              </p>
              <p className="text-[20px] text-slate-600">
                Discount: {productId?.discount}%
              </p>
              <p className="text-[20px] text-slate-600">
                Age Range: {productId?.age_min} - {productId?.age_max}
              </p>
              <p className="text-[20px] text-slate-600">
                For Gender: {productId?.for_gender}
              </p>
            </div>
          </div>
          <p className="text-[20px] text-slate-600 py-2 mb-4">
            Description: {productId?.description}
          </p>
          <div className="flex items-center gap-3">
            {/* <DeleteModal data={id} /> */}
            <UpdateModal item={productId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
