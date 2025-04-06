import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/messageSlide";
import { beURL } from "../../services/config.js";

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      verifyAccount(token);
    } else {
      navigate("/"); // Navigate to home if no token is found
    }
  }, [location.search]);

  const verifyAccount = async (token) => {
    try {
      const response = await fetch(
        `${beURL}auth/verify-account?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        handleResponse(data);
      } else {
        const data = await response.text();
        handleResponse({ message: data });
      }
    } catch (error) {
      console.error("Error verifying account:", error.message);
      dispatch(setMessage("Failed to verify account."));
      navigate("/"); // Navigate to home on error
    }
  };

  const handleResponse = (data) => {
    if (data && data.message) {
      dispatch(setMessage(data.message));
      navigate("/"); // Navigate to home on success
    } else {
      console.error("Invalid response format from server");
      dispatch(setMessage("Failed to verify account."));
      navigate("/"); // Navigate to home on invalid response
    }
  };

  return null; // Render nothing
};

export default VerifyAccount;
