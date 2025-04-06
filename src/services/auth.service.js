import { http } from "./config.js";

const register = async (
  username,
  password,
  email,
  firstName,
  lastName,
  phone,
  address,
  identityDocument,
) => {
  const response = await http.post("/auth/register", {
    username,
    password,
    email,
    firstName,
    lastName,
    phone,
    address,
    identityDocument,
  });
  console.log("Register API call response:", response);
  if (response.status !== 201) {
    throw new Error("Error registering");
  }
  return response.data;
};

const registerByGoogle = async (
  email,
  firstName,
  lastName,
  phone,
  address,
  identityDocument,
) => {
  const response = await http.post("/auth/google-register", {
    email,
    firstName,
    lastName,
    phone,
    address,
    identityDocument,
  });
  console.log("Register API call response:", response);
  if (response.status !== 201) {
    throw new Error("Error registering");
  }
  return response.data;
};

const login = async (usernameOrEmail, password) => {
  const response = await http.post("/auth/login", {
    usernameOrEmail,
    password,
  });
  // check the response status code oke or not
  // If not, throw an error
  if (response.status !== 200) {
    throw new Error("Error logging in");
  }
  console.log("Login API call response:", response.data);

  // If oke
  // Check if the role is customer
  if (response.data?.userInformation?.account.role !== "CUSTOMER") {
    throw new Error("You are not authorized to log in");
  }
  // Store user data in local storage
  localStorage.setItem("auth", JSON.stringify(response.data));

  return response.data;
};

const googleLogin = async (googleData) => {
  const response = await http.post("/auth/google-login", {
    token: googleData.accessToken,
  });

  // Check the response status code
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Error logging in with Google");
  }

  // Store user data in local storage
  localStorage.setItem("auth", JSON.stringify(response.data));

  return response.data;
};

const logout = () => {
  localStorage.removeItem("auth");
};

export const updateCustomerPassword = async (authID, body) => {
  const response = await http.put(`auth/${authID}`, body);
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("auth"))?.userInformation;
};

const getCurrentToken = () => {
  return JSON.parse(localStorage.getItem("auth"))?.userToken;
};

const AuthService = {
  login,
  googleLogin,
  logout,
  register,
  registerByGoogle,
  getCurrentUser,
  getCurrentToken,
};

export default AuthService;
