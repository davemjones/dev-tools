import React, { useState, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Console from "./components/Console";
import { consoleReducer } from "./store/console";
import "./App.scss";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

// prevent React rendering from adding multiple listeners
let windowListenerInitialized = false;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState("console");
  const [consoleLogState, consoleDispatch] = useReducer(consoleReducer, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (value) => setTabValue(value);
  const handleLaunch = (url) => {
    const target = window.open(url);

    const waitForTarget = setInterval(() => {
      if (target && target.window)
        target.window.postMessage({ init: true }, "*");
    }, 1000);

    if (!windowListenerInitialized) {
      window.addEventListener("message", (event) => {
        const { data } = event;

        if (data.type === "init" && data.message === "SUCCESS") {
          clearInterval(waitForTarget);
          console.log("Target Window Initialized");
          // tell the target to log FETCH API traffic - configurable in future version
          if (target.window)
            target.window.postMessage({ options: ["payload"] }, "*");
        } else if (data.type) {
          console.log("Message Type", data.type);
          console.log("Message", data.message);
          const payload = {
            id: `${data.timestamp}-${Math.floor(Math.random() * 1000)}`,
            timestamp: data.timestamp,
            data: data.message,
          };
          switch (data.type) {
            case "console":
              consoleDispatch({ type: "ADD_LOG", payload });
              break;

            default:
              break;
          }
        }
      });
      windowListenerInitialized = true;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            onTabChange={handleTabChange}
            onLaunch={handleLaunch}
            selectedTab={tabValue}
          />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            {tabValue === "console" && (
              <Console
                data={consoleLogState}
                handleClearData={() => consoleDispatch({ type: "RESET_LOG" })}
              />
            )}
            {tabValue === "network" && <div> network placeholder </div>}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
