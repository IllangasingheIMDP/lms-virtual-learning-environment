import api from "../../redux/api";
// Login API call

export const loginAPI = async (credentials) => {
  try {
    const response = await api.post("/admin/login", credentials);
    return response.data; // Return the response data (e.g., JWT token)
  } catch (error) {
    // Handle API errors
    console.error("Error logging in:", error);
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

// Register API call
export const registerAPI = async (userData) => {
  try {
    const response = await api.post("/admin/signup", userData);
    return response.data; // Return the response data (e.g., user details)
  } catch (error) {
    // Handle API errors
    console.error("Error registering:", error);
    throw new Error(error.response?.data?.message || "Failed to register");
  }
};

// Logout API call
export const logoutAPI = async () => {
  try {
    const response = await api.post("/admin/logout");
    return response.data; // Success response from the server (optional)
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error(error.response?.data?.message || "Failed to log out");
  }
};

// Check authentication API call
export const checkAuthAPI = async () => {

  try {
    const response = await api.get("/admin/check-auth");
    return response.data; // Return the response data (e.g., user details)
  } catch (error) {
    console.error("Error checking authentication:", error);
    throw new Error(error.response?.data?.message || "Failed to check authentication");
  }
};
