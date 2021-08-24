import { CircularProgress, Container, FormControl, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Slider, TextField, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
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
  const history = useHistory();
  const location = useLocation();

  const params = location.search ? location.search : null;
  // Component state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);

  const [filter, setFilter] = useState("");
  // side effects
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        let query;

        if(params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        const { data } = await axios({
          method: "GET",
          url: `/api/v1/edumy${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params]);

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  }

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&[lte]=${newValue[1]}`;
    setFilter(urlFilter);
    history.push(urlFilter);
  }

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
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
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