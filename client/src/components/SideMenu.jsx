import React from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { makeStyles } from "@material-ui/core/styles";
import { AddTerminalModal } from "./AddTerminalModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from './../store/ducks/user/actionCreators';
import { selectIsAdmin, selectCanEdit } from './../store/ducks/user/selectors';
import { AddUserModal } from './addUserModal';

export const useSideMenuStyles = makeStyles({
  sideMenuWrapper: {},
  sideMenuContent: {
    height: "100%",
    padding: 10,
    border: "none",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  notification: {
    textAlign: "center",
    color: "#a6e22e"
  },
  redColor: {
    color: "rgb(220, 0, 78);"
  }
});

export const SideMenu = () => {
  const classes = useSideMenuStyles();
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);
  const canEdit = useSelector(selectCanEdit)


  const [addTerminalOpen, setAddTerminalOpen] = React.useState(false);
  const [addUserOpen, setAddUserOpen] = React.useState(false)

  const handleToggleAddTerminal = () => {
    setAddTerminalOpen(!addTerminalOpen);
  };

  const handleCloseAddTerminal = () => {
    setAddTerminalOpen(false);
  };

  const handleToggleAddUser = () => {
    setAddUserOpen(!addUserOpen)
  }

  const handleLogout = () => {
    dispatch(fetchLogout())
  }

  return (
    <Grid md={2} className={classes.sideMenuWrapper} item>
      <Paper
        className={classes.sideMenuContent}
        elevation={0}
        variant="outlined"
        square
      >
        <List>
          {isAdmin && <ListItem button onClick={handleToggleAddUser}>Создать нового пользователя</ListItem>}
          {(canEdit || isAdmin) && <ListItem button onClick={handleToggleAddTerminal}>Добавить новый терминал</ListItem>}
          <ListItem button onClick={handleLogout}>Выйти</ListItem>
        </List>
      </Paper>
      <AddTerminalModal handleClose={handleCloseAddTerminal} open={addTerminalOpen} />
      <AddUserModal handleClose={handleToggleAddUser} open={addUserOpen} />
    </Grid>
  );
};
