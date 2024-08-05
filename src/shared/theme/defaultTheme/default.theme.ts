import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
    palette: {
        text: {
            primary: "#8F99A6",
            secondary: "#737373"
        }
    },
    typography: {
        fontFamily: "Open Sans",
        allVariants: {
            color: "#333333"
        },
        h1: {
            fontWeight: 300,
            fontSize: "50px",
            lineHeight: "68.09px"
        },
        h2: {
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "27.24px"
        },
        h3: {
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "21.79px"
        },
        h4: {
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "21.79px"
        },
        h5: {
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "19.07px"
        },
        button: {
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "21.79px",
        }
    },
    
})