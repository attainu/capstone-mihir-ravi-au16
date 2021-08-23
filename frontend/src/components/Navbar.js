import { AppBar, Toolbar, Typography } from "@material-ui/core";

const navbar = () => {
  return (
    <AppBar position = "static">
      <Toolbar>
        <Typography vairant="h5">Courses</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default navbar;
