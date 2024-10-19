export const handleLoginWithGoogle = () => {
  window.location.href = "/api/auth/google"; // Redirect to your Google OAuth route
};

export const toggleTheme = (setTheme) => {
  setTheme((prev) => (prev === "light" ? "dark" : "light")); // Toggle between light and dark
};

export const handleLoginWithGithub = () => {
  window.open("/api/auth/github", "_self");
};
