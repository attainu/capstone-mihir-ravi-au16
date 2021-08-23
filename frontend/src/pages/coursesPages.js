import { CircularProgress, Container, Grid, makeStyles } from "@material-ui/core";
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