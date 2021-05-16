import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

    media: {
        height: 140,
    },
});

export default function BookCardComponent({bookName, authorName, image, rate, bookID}){
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {bookName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h5">
                        {authorName}
                    </Typography>
                    <div >
                    <RateComponent bookId={bookID} userRating={rate} size="small"></RateComponent>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ShelfComponent bookId={bookID}></ShelfComponent>
            </CardActions>
        </Card>
    );
}
