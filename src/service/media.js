import request from "./config";

const media = {
  post_media: (id) => post(`/media/upload-photo?id=${id}`),
  get_media: (id) => get(`/media/${id}`),
};

export default media;