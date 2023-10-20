/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
       
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          kanit: ["Kanit", "sans-serif"],
          roboto: ["Roboto", "sans-serif"],
          montserrat: ["Montserrat", "sans-serif"],
        },
        colors: {
          primary: "#EDB702",
          primaryHover:"#9D801A",
          textPrimary: "#4E4E4E",
          textSecondary: "#B6B6B6",
          navbar:"#D9D9D9",
          redPrimary: "#CC2121",
          redHover:"#A21414",
          blackPrimary: "#00040f",
          secondary: "#00f6ff",
          dimWhite: "rgba(255, 255, 255, 0.7)",
          dimBlue: "rgba(9, 151, 124, 0.1)",
          grey: "#4E4E4E",
          dimGrey: "#646464",
          yellow: "#EFB900",
          dimYellow: "#EDB702",
          red: "#FF2E00",
          blueTextHighlight :"#179FD9",
          bgDashboard:"#D9D9D9",
        },
        screens: {
          xs: "375px",
          sm: "744px",
          md: "1024px",
          lg: "1440px",
          xl: "1700px",
        },
        transformOrigin: {
          "0": "0%",
        },
        zIndex: {
          "-1": "-1",
        },
      },
    },
    plugins: [],
  }