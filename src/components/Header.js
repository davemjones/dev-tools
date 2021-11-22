import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { onDrawerToggle, onTabChange, selectedTab, onLaunch, onHeartbeat } =
    props;
  const [url, setUrl] = React.useState();
  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };
  const handleLaunch = () => onLaunch(url);

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="flex-end" spacing={1}>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <TextField
                size="small"
                fullWidth
                hiddenLabel
                placeholder="Enter URL"
                id="fullWidth"
                variant="standard"
                onChange={handleURLChange}
              />
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleLaunch}
              >
                Launch
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{
          zIndex: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={selectedTab}
          textColor="inherit"
          onChange={(e, value) => onTabChange(value)}
        >
          <Tab label="Console" value="console" />
          {/* Future feature */}
          {/* <Tab label="Network Timing" value="network" /> */}
        </Tabs>
        <Button
          size="small"
          color="inherit"
          sx={{ marginRight: "20px" }}
          onClick={onHeartbeat}
        >
          Check Connection
        </Button>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onHeartbeat: PropTypes.func,
};

export default Header;
