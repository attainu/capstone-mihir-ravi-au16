import { CircularProgress, Container, FormControl, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Slider, TextField, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        marginTop: 20
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
      marginBottom: "1rem",
      padding: "13px"
    },
    filters: {
      padding: "0 1.5 rem"
    },
    priceRangeInputs: {
      display: "flex",
      justifyContent: "space-between"
    }
})

const coursesPages = () => {
  // material ui styles
  const classes = useStyles();
  // Component state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // side effects
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios({
          method: "GET",
          url: `/api/v1/edumy`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);
  return (
    <Container className={classes.root}>
      {/* Filtering & Sorting */}
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>

            <div className={classes.filters}>
              <Slider
                min={0}
                max={100}
              />

              <div className={classes.priceRangeInputs}>
                <TextField
                  size="small"
                  id="lower"
                  label="Min price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={0}
                />
                <TextField
                  size="small"
                  id="upper"
                  label="Max price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={75}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort by</Typography>

            <FormControl component="fieldset" className={classes.filers}>
              <RadioGroup aria-label="price-order" name="price-order">
                <FormControlLabel
                  disabled={loading}
                  control={<Radio/>}
                  label="Price: Highest to Lowest"
                />
                <FormControlLabel
                  disabled={loading}
                  control={<Radio/>}
                  label="Price: Lowest to Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Courses listing */}
      <Grid container spacing={2}>
        { loading ? (
            <div className={classes.loader}>
                <CircularProgress size="3rem" thickness={5} />
            </div>
        ) : (
            courses.map(course => (
                <Grid item key={bootcamp._id} xs={12} sm={6} md={4} ls={3}>
                    <CourseCard course={course} />
                <Grid/>
            ))
        )}
      </Grid>
    </Container>
  );
};

export default coursesPages;