export const getRefreshToken = () => {
  // Get the refresh token from localStorage
  return localStorage.getItem("refreshToken");
};
