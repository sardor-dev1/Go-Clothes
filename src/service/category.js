// import http from "./config";

// const category = {
//   create: (data) => http.post("/category", data),
//   get: () => http.get("/categories", { params: { page: 1, limit: 10 } }),
//   delete: (id) => http.delete(`/category/${id}`),
//   update: (data) => http.put("/category", data),
// };

// export default category;

import http from "./config";

const category = {
  create: (data) => http.post("/category", data),
  get: (page = 1, limit = 8) =>
    http.get("/categories", { params: { page, limit } }),
  delete: (id) => http.delete(`/category/${id}`),
  update: (data) => http.put("/category", data),
};

export default category;
