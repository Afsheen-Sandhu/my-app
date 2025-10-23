// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;

// Theme constants
export const THEME = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;
