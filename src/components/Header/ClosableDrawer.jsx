import React, { useState, useCallback, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { TextInput } from "../UI";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase/index";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: "center",
    display: "flex,",
    marginLeft: 32,
  },
}));

const ClosableDrawer = props => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    event => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "All",
      id: "all",
      value: "/",
    },
    {
      func: selectMenu,
      label: "Mens",
      id: "male",
      value: "/?gender=male",
    },
    {
      func: selectMenu,
      label: "Womens",
      id: "female",
      value: "/?gender=female",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "Register Products",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit",
    },
    {
      func: selectMenu,
      label: "Order History",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "Profile",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage",
    },
  ];

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data();
          list.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`,
          });
        });
        setFilters(prevState => [...prevState, ...list]);
      });
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={e => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onClose={e => props.onClose(e)} onKeyDown={e => props.onClose(e)}>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"Input Keywords"}
              multiline={false}
              required={false}
              rows={1}
              value={keyword}
              type={"text"}
              onChange={inputKeyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem
                button
                key={menu.id}
                onClick={e => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider light />
          <List>
            {filters.map(filter => (
              <ListItem
                button
                key={filter.id}
                onClick={e => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
