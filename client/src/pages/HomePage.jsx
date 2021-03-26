import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { SideMenu } from './../components/SideMenu';
import EnhancedTable from './../components/TerminalTable';

const useHomeStyles = makeStyles({
    homePageWrapper: {
       display: "flex",
       flexDirection: "column",
    },
    homePageContainer: {
        flex: "1 1 auto"
    },
    homeMain: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    homeContent: {
        border: "none",
        padding: 10,
        position: "relative",
        width: "100%",
    },
});

export const HomePage = () => {
  const classes = useHomeStyles();
  return (
    <Grid className={classes.homePageWrapper} md={12} item>
      <Grid container className={classes.homePageContainer}>
        <SideMenu />
        <Grid md={10} className={classes.homeMain} item>
          <Paper className={classes.homeContent}  elevation={0} variant="outlined" square>
              <EnhancedTable />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
