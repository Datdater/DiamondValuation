import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      white: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
    status: {
      color: "#eff3f5",
      pending: "#33595e",
      processing: "#30cb83",
      received: "#2133a1",
      cancelled: "#e74c3c",
      sealing: "#f39c12",
      completed: "#9b59b6",
      finished: "#f1c40f",
      valuating: "#54a0ff",
      valuated: "#b33771",
      assessing: "#30cb83",
      assessed: "#2133a1",
      approved: "#3FA2F6",
    },
    highlight: { white: "#ffffff" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId="1018955619519-49lihbrucq4ramkj04p49r3csp73bdok.apps.googleusercontent.com">
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <App />
              <ToastContainer />
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
);
