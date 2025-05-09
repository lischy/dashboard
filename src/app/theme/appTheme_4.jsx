"use client";

import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { createContext, useContext, useMemo } from "react";

const AppThemeContext = createContext(null);
const AppThemeProvider = (props) => {
  // State to store the current theme mode (light or dark)
  // const [mode, setMode] = useState("light");

  // Set the mode based on system preference after client-side mounting
  // useEffect(() => {
  //   const preferredMode = window.matchMedia("(prefers-color-scheme: dark)")
  //     .matches
  //     ? "dark"
  //     : "light";
  //   setMode(preferredMode);
  // }, []);

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        cssVariables: {
          colorSchemeSelector: "class",
          disableCssColorScheme: true,
        },
        shape: {
          borderRadius: 5,
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                color: "#003125",
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                color: "rgb(255, 255, 255)",
                "& th": {
                  color: "rgb(255, 255, 255)",
                },
              },
              // tr: {
              //   "& th": {
              //     color: "rgb(255, 255, 255)",
              //   },
              // },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                color: "#003125",
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                variants: [
                  {
                    props: { variant: "outlined" },
                    style: {
                      border: "solid #003125",
                      borderWidth: 1,
                    },
                  },
                ],
                color: "#003125",
                "& svg": {
                  color: "#003125",
                },
              },
            },
          },
        },
        // palette: {
        //   primary: {
        //     main: `rgb(10, 18, 42)`,
        //     contrastText: "rgb(255, 255, 255)",
        //   },
        //   secondary: {
        //     main: `rgb(27, 59, 111)`,
        //     contrastText: "rgb(255, 255, 255)",
        //   },
        // },
        colorSchemes: {
          light: {
            palette: {
              primary: {
                light: "#9efcd1",
                main: "#5ff6ba",
                dark: "#23e79f",
                contrastText: "#fff",
              },
              secondary: {
                main: "#5d4037",
                light: "rgb(125, 102, 95)",
                dark: "rgb(65, 44, 38)",
                contrastText: "#fff",
              },
              background: {
                // default: "#fafafa",
                default: "rgba(250,250,250,0.89)",
                paper: "#FFFFFF",
              },
              text: {
                primary: "#000",
              },
            },
            // components: {
            //   MuiAppBar: {
            //     styleOverrides: {
            //       root: {
            //         backgroundColor: "rgb(255, 255, 255)",
            //       },
            //     },
            //   },
            // },
          },
          dark: {
            palette: {
              primary: {
                main: "#00573f",
                light: "#006a4b",
                dark: "#003125",
                // contrastText: "#fff",
                contrastText: "#003125",
              },
              secondary: {
                main: `rgb(27, 59, 111)`,
              },
              background: {
                default: "#303030",
                // paper: "#424242",
                paper: "#9efcd1",
              },
              text: {
                // primary: "#003125",
                primary: "rgb(255, 255, 255)",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
                hint: "rgba(255, 255, 255, 0.5)",
              },
            },
          },
        },
      })
    );
  }, []);

  // console.log(theme);

  return (
    <AppThemeContext.Provider value={null}>
      <ThemeProvider
        defaultMode="system"
        theme={theme}
        disableTransitionOnChange
      >
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(AppThemeContext);

export default AppThemeProvider;
