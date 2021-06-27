import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { companyNavigation, personNavigation } from "../router/config";
import { Create as CreateCompany } from "../person/create";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    maxWidth: 500,
    margin: "auto",
  },
}));

// Dashboard represents the main page of the application. It has a drawer followed by routes.
// Dashboard uses the material ui Drawer, Ref: https://codesandbox.io/s/6khtm?file=/demo.js:0-6387
const Dashboard = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Converts navigation map to route.
  // Navigation map should be in the format specified in "../router/config.js"
  const navigationMapToRoute = (m) =>
    Object.keys(m).map((key) => {
      const Component = m[key].component;
      return (
        <Route path={m[key].route}>
          <Component />
        </Route>
      );
    });

  // Converts navigation map to drawer list.
  // Navigation map should be in the format specified in "../router/config.js"
  const navigationMapToDrawer = (m) => (
    <List>
      {Object.keys(m).map((key) => (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={m[key].route}
        >
          <ListItem button key={key}>
            <ListItemIcon>
              <DoubleArrowIcon />{" "}
            </ListItemIcon>
            <ListItemText primary={m[key].text} />
          </ListItem>
        </Link>
      ))}
    </List>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {navigationMapToDrawer(personNavigation)}
      <Divider />
      {navigationMapToDrawer(companyNavigation)}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Employee management
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            <Switch>
              {navigationMapToRoute(personNavigation)}
              {navigationMapToRoute(companyNavigation)}
              <Route path="/">
                <CreateCompany />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
};

export default Dashboard;
