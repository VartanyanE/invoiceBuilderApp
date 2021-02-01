import axios from "axios";

export const getInvoice = function () {
  return axios.get("/api/data");
};

export const getLogo = function () {
  return axios.get("/api/data/logo");
};

// export const getLikes = function (id) {
//   return axios.get("/api/data/" + id);
// };

export const createInvoice = function (data) {
  return axios.post("/api/data", data);
};

// export const createPDF = function (data) {
//   return axios.post("/create-pdf");
// }

// export const fetchPDF = function (data) {
//     return axios.get('fetch-pdf', {responseType: 'blob'})
//   }
// export const upDateData = function (id, data) {
//   return axios.put("/api/data/" + id, data);
// };

export const isPastDue = function (id) {
  return axios.patch("/api/data/" + id);
};

export const dueInSeven = function (id) {
  return axios.patch("/api/data/" + id);
};

export const searchInvoice = function (common_invoice_number) {
  return axios.get("/api/data/search/" + common_invoice_number);
};

export const searchByName = function (name) {
  return axios.get("/api/data/search/byName/" + name);
};

// export const deleteData = function (id) {
//   return axios.delete("/api/data/" + id);
// };
