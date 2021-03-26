import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import { HomePage } from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectLoadingUserState } from "./store/ducks/user/selectors";
import { AuthPage } from "./pages/AuthPage";
import {checkUserData} from "./store/ducks/user/actionCreators"

export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS" 
};

const useAppStyles = makeStyles({
  appWrapper: {
    backgroundColor: "#bfbfbf",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  appContainer: {
    flex: "1 1 auto",
    margin: "0 auto",
    maxWidth: 1200,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "5px 3px 13px 1px rgba(0,0,0,0.63)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  preloader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});



function App() {
  const classes = useAppStyles();
  const dispatch = useDispatch();

  const userLoadingStatus = useSelector(selectLoadingUserState)
  const isAuth = useSelector(selectIsAuth);

  const isReady =
    userLoadingStatus !== LOADING_STATUSES.LOADING &&
    userLoadingStatus !== LOADING_STATUSES.NEVER;


  useEffect(() => {
    dispatch(checkUserData())
  }, [dispatch]);

  if (!isReady) {
    return (
      <div className={classes.preloader} >
        <CircularProgress color="secondary" />
      </div>
    )
  }

  return (
    <div className={classes.appWrapper}>
      <Grid container className={classes.appContainer}>
        {isAuth ? <HomePage /> : <AuthPage />}
      </Grid>
    </div>
  );
}

export default App;
