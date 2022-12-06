import { createContext, useState, useEffect } from "react";

const themes = {
    light: {
        backgroundColor: "#ffffff",
        color: "#000000",
        joinBg: "#000000",
        joinText: "#ffffff",
        cardBg: "#f1f3f4",
        input: "#f3f4f6",
        form: "#fbfbfb"
    },
    dark: {
        backgroundColor: "#1a202c",
        color: "#ffffff",
        joinBg: "#ffffff",
        joinText: "#000000",
        cardBg: "#283342",
        input: "#1a202c",
        form: "#283342"
    },
};

export const ThemeContext = createContext(themes);

export const ThemeContextProvider = ({ children }) => {

    const [isLight, setIsLight] = useState(false);

    const toggleTheme = () => {
        localStorage.setItem("lightMode", JSON.stringify(!isLight));
        setIsLight(!isLight);
    };

    const theme = isLight ? themes.light : themes.dark;

    useEffect(() => {
        const isLight = localStorage.getItem("lightMode") === "true";
        setIsLight(isLight);
    }, []);

    return (
        <ThemeContext.Provider value={[{ theme, isLight }, toggleTheme]}>
            { children }
        </ThemeContext.Provider>
    )
};