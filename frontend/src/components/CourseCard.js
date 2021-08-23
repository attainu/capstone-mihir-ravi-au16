import { Avatar, Card, Button, CardContent, CardHeader, Typography } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
});

const CourseCard = ({ course }) => {
    return (
        <Card>
            <CardHeader 
                avatar={<Avatar/>}
                title={<Typography vairant="h6">{course.name}</Typography>}
            />

            <CardContent>
                <Typography variant="caption">{course.description}</Typography>

                <Typography variant="h6" gutterBottom>{formatter.format(course.price)}</Typography>

                <Rating
                    value={course.rating}
                    readOnly
                    name={course.name}
                    size="small"
                    precision={0.5}
                />
            </CardContent>

            <CardActions>
                <Button variant="contained" size="small" color="primary">Book Now</Button>
                <Button size="small" color="primary">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default CourseCard
