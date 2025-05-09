"use client";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AppThemeContext = createContext(null);
// const AppThemeProvider = (props) => {
//   // State to store the current theme mode (light or dark)
//   // const [mode, setMode] = useState("light");

//   // Set the mode based on system preference after client-side mounting
//   // useEffect(() => {
//   //   const preferredMode = window.matchMedia("(prefers-color-scheme: dark)")
//   //     .matches
//   //     ? "dark"
//   //     : "light";
//   //   setMode(preferredMode);
//   // }, []);

//   const theme = useMemo(() => {
//     return responsiveFontSizes(
//       createTheme({
//         cssVariables: {
//           colorSchemeSelector: "class",
//           disableCssColorScheme: true,
//         },
//         shape: {
//           borderRadius: 5,
//         },
//         components: {
//           MuiAppBar: {
//             defaultProps: {
//               enableColorOnDark: true,
//             },
//           },
//           MuiPaper: {
//             styleOverrides: {
//               root: {
//                 // color: "#003125",
//                 color: (theme) => theme.colorSchemes.dark.palette.text.dark,
//               },
//             },
//           },
//           MuiTableHead: {
//             styleOverrides: {
//               root: {
//                 color: "rgb(255, 255, 255)",
//                 "& th": {
//                   color: "rgb(255, 255, 255)",
//                 },
//               },
//               // tr: {
//               //   "& th": {
//               //     color: "rgb(255, 255, 255)",
//               //   },
//               // },
//             },
//           },
//           MuiTableCell: {
//             styleOverrides: {
//               root: {
//                 color: "#003125",
//               },
//             },
//           },
//           MuiSelect: {
//             styleOverrides: {
//               root: {
//                 variants: [
//                   {
//                     props: { variant: "outlined" },
//                     style: {
//                       border: "solid #003125",
//                       borderWidth: 1,
//                     },
//                   },
//                 ],
//                 color: "#003125",
//                 "& svg": {
//                   color: "#003125",
//                 },
//               },
//             },
//           },
//         },
//         // palette: {
//         //   primary: {
//         //     main: `rgb(10, 18, 42)`,
//         //     contrastText: "rgb(255, 255, 255)",
//         //   },
//         //   secondary: {
//         //     main: `rgb(27, 59, 111)`,
//         //     contrastText: "rgb(255, 255, 255)",
//         //   },
//         // },
//         colorSchemes: {
//           light: {
//             palette: {
//               primary: {
//                 light: "#9efcd1",
//                 main: "#5ff6ba",
//                 dark: "#23e79f",
//                 contrastText: "#fff",
//               },
//               secondary: {
//                 main: "#5d4037",
//                 light: "rgb(125, 102, 95)",
//                 dark: "rgb(65, 44, 38)",
//                 contrastText: "#fff",
//               },
//               background: {
//                 // default: "#fafafa",
//                 default: "rgba(250,250,250,0.89)",
//                 paper: "#FFFFFF",
//               },
//               text: {
//                 primary: "#000",
//               },
//             },
//             // components: {
//             //   MuiAppBar: {
//             //     styleOverrides: {
//             //       root: {
//             //         backgroundColor: "rgb(255, 255, 255)",
//             //       },
//             //     },
//             //   },
//             // },
//           },
//           dark: {
//             palette: {
//               primary: {
//                 main: "#00573f",
//                 light: "#006a4b",
//                 dark: "#003125",
//                 // contrastText: "#fff",
//                 contrastText: "#003125",
//               },
//               secondary: {
//                 main: `rgb(27, 59, 111)`,
//               },
//               background: {
//                 default: "#303030",
//                 // paper: "#424242",
//                 paper: "#9efcd1",
//               },
//               text: {
//                 // primary: "#003125",
//                 primary: "rgb(255, 255, 255)",
//                 secondary: "rgba(255, 255, 255, 0.7)",
//                 disabled: "rgba(255, 255, 255, 0.5)",
//                 hint: "rgba(255, 255, 255, 0.5)",
//               },
//             },
//           },
//         },
//       })
//     );
//   }, []);

//   // console.log(theme);

//   return (
//     <AppThemeContext.Provider value={null}>
//       <ThemeProvider
//         defaultMode="system"
//         theme={theme}
//         disableTransitionOnChange
//       >
//         <CssBaseline enableColorScheme />
//         {props.children}
//       </ThemeProvider>
//     </AppThemeContext.Provider>
//   );
// };

// context for color mode
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });
// color design tokens export
export const tokens = (mode) => ({
  //shared colors in both light and dark mode
  white: "rgb(255, 255, 255)",
  black: "#000",
  lightGrey: "rgb(243 244 246)",
  // lightGrey: "red",

  ...(mode === "light"
    ? {
        primary: {
          light: "#9efcd1", //light,
          main: "#5ff6ba", //main
          dark: "#23e79f", //dark
        },
        secondary: {
          main: "#5d4037",
          // light: "rgb(125, 102, 95)",
          light: "rgb(255 237 213)",
          dark: "rgb(65, 44, 38)",
        },
        background: {
          // default: "#fafafa",
          default: "rgba(250,250,250,0.89)",
        },
      }
    : {
        primary: {
          light: "#006a4b", //light,
          main: "#00573f", //main
          dark: "#003125", //dark
        },
        background: {
          default: "#303030",
          // paper: "#424242",
          paper: "#9efcd1",
        },
      }),
});
const generateTheme = (mode) => {
  // console.log(mode);
  const colors = tokens(mode);
  return responsiveFontSizes(
    createTheme({
      cssVariables: {
        colorSchemeSelector: "class",
        disableCssColorScheme: true,
      },
      shape: {
        borderRadius: 5,
      },
      palette: {
        mode: mode,
        ...(mode === "light"
          ? {
              primary: {
                light: colors.primary.light,
                main: colors.primary.main,
                dark: colors.primary.dark,
                contrastText: colors.white,
              },
              secondary: {
                main: colors.secondary.main,
                light: colors.secondary.light,
                dark: colors.secondary.dark,
                contrastText: colors.white,
              },
              background: {
                // default: "#fafafa",
                default: colors.background.default,
                paper: colors.white,
              },
              text: {
                primary: colors.black,
              },
            }
          : {
              primary: {
                light: colors.primary.light,
                main: colors.primary.main,
                dark: colors.primary.dark,
                // contrastText: "#fff",
                contrastText: colors.primary.dark,
              },
              secondary: {
                main: `rgb(27, 59, 111)`,
              },
              background: {
                default: colors.background.default,
                // paper: "#424242",
                paper: colors.background.paper,
              },
              text: {
                primary: colors.white,
                dark: colors.black,
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
                hint: "rgba(255, 255, 255, 0.5)",
              },
            }),
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
              color: mode === "dark" && colors.primary.dark,
              // color: (theme) => theme.colorSchemes.dark.palette.text.dark,
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
              color: mode === "dark" && colors.primary.dark,
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
                    border: mode === "dark" && `solid ${colors.primary.dark}`,
                    borderWidth: 1,
                  },
                },
              ],
              color: mode === "dark" && colors.primary.dark,
              "& svg": {
                color: mode === "dark" && colors.primary.dark,
              },
            },
          },
        },
      },
    })
  );
};
export const AppThemeProvider = (props) => {
  const savedMode = localStorage.getItem("themeMode") || "dark";

  const [mode, setMode] = useState(savedMode);
  const colors = tokens(mode);

  const colorMode = useMemo(
    () => () => {
      const newMode = mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      // return setMode((prev) => (prev === "light" ? "dark" : "light"));
      return setMode(newMode);
    },
    [mode]
  );
  // Listen for changes in localStorage across other tabs
  useEffect(() => {
    const clearEvent = new AbortController();

    const handleStorageChange = (e) => {
      if (e.key === "themeMode") {
        setMode(e.newValue); // Update mode if the localStorage changes from another tab
      }
    };

    // Set up event listener for changes in localStorage
    window.addEventListener("storage", handleStorageChange, {
      signal: clearEvent.signal,
    });

    // Clean up event listener when the component unmounts
    return () => {
      // window.removeEventListener("storage", handleStorageChange);
      clearEvent.abort();
    };
  }, []);

  const theme = useMemo(() => generateTheme(mode), [mode]);
  // return [theme, colorMode];

  return (
    <AppThemeContext.Provider value={{ mode, colorMode, colors }}>
      <ThemeProvider
        // defaultMode="system"
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
