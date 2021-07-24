import React, { useState } from "react";
import {
  Paper,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import picture from "../images/SR.TKNK.png";
const useStyles = makeStyles((theme) => ({
  root: {
    height: 765,
  },
  gridList: {
    width: 700,
    height: 510,
  },
  image: {
    width: 450,
    height: 450,
  },
  div: {
    display: "flex",
    justifyContent: "center",
    padding: 30,
  },
}));

function Product({ current }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  return (
    <div>
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Card className={classes.root}>
          {current && (
            <CardContent>
              <div className={classes.div}>
                <CardMedia
                  className={classes.image}
                  image={require(`../images/${current.code}.jpg`).default}
                  title={current.name}
                />
              </div>
              <Typography gutterBottom variant="h5" component="h2">
                Name: {current.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Price: {current.price}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Weight: {current.weight}g
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Detail: This is detail of the product, use can modify this line
                of code to 'Detail: current.detail'
              </Typography>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
export default Product;
