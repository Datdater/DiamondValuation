import { http } from "./config.js";
import { useQuery } from "@tanstack/react-query";

//NEW_APPOINTMENT
export const getCustomer = async (customerID) => {
  const response = await http.get(`customers/${customerID}`);
  return response.data;
};

export const getServices = async () => {
  const response = await http.get("services");
  return response.data;
};

export const addValuationRequest = (body) => {
  return http.post("valuation-requests", body);
};

//DIAMOND CHECK
export const getDiamondCheckByCertificateId = async (certificateId) => {
  const response = await http.get(`diamond-valuation-notes/search`, {
    params: { certificateId },
  });
  return response.data;
};

//CALCULATE
export const getDiamondData = async (params) => {
  const response = await http.get(`diamond-market/price-list`, { params });
  return response.data;
};

export const getDiamondMarketData = async (params) => {
  const response = await http.get(`diamond-market/search`, { params });
  return response.data;
};

export const getSupplierByID = async (supplierID) => {
  const response = await http.get(`suppliers/${supplierID}`);
  return response.data;
};

//MANAGE_APPOINTMENT
export const getValuationRequestsByCustomerID = async (customerID) => {
  const response = await http.get(
    `valuation-requests/customer/${customerID}?sortBy=creationDate&sortDir=desc`,
  );
  return response.data;
};

export const getValuationRequestByID = async (requestID) => {
  const response = await http.get(`valuation-requests/${requestID}`);
  return response.data;
};

export const deleteValuationRequestByID = async (requestID) => {
  const response = await http.delete(`valuation-requests/${requestID}`);
  return response.data;
};

export const getDiamondValuationNoteByID = async (diamondID) => {
  const response = await http.get(`diamond-valuation-notes/${diamondID}`);
  return response.data;
};
export const updateValuationRequestFeedback = async (requestID, body) => {
  const response = await http.put(`valuation-requests/${requestID}`, body);
  return response.data;
};

//PROFILE
export const updateCustomerInformation = async (customerID, body) => {
  const response = await http.put(`customers/${customerID}`, body);
  return response.data;
};

export const updateCustomerPassword = async (authID, body) => {
  const response = await http.put(`auth/${authID}`, body);
  return response.data;
};

//POST
export const getAllBlogs = async () => {
  const response = await http.get(`posts?status=PUBLISHED`);
  return response.data;
};

export const getBlogById = async (postId) => {
  const response = await http.get(`posts/${postId}`);
  return response.data;
};

//FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const response = await http.post(`auth/forget-password`, { email });
  return response.data;
};

//PRICE_SERVICES
export const getAllServices = async () => {
  const response = await http.get(`services`);
  return response.data;
};

export const getServiceByID = async (serviceID) => {
  const response = await http.get(`services/${serviceID}/service-price-lists`);
  return response.data;
};

//RECORD
export const getValuationRequest = async (id) => {
  const response = await http.get(`valuation-requests/${id}`);
  return response.data;
};

export const getValuationRequestDetails = async (id) => {
  const response = await http.get(`valuation-request-details/${id}`);
  return response.data;
};

//HOMEPAGE
export const getSupplier = async () => {
  const response = await http.get(`suppliers`);
  return response.data;
};

//NOTIFICATION
export const useNotification = (accountId) => {
  return useQuery({
    queryKey: ["notification", { accountId: accountId }],
    queryFn: async () => {
      const response = await http.get(`notifications?accountId=${accountId}`);
      return response.data;
    },
    enabled: !!accountId,
  });
};
