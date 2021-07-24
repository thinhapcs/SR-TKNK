import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  GridList,
  Card,
  CardContent,
  Box,
  Button,
  CardMedia,
} from "@material-ui/core";
// import axios from "axios";
import auth from "../auth/auth";
// import io from "socket.io-client"
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket("ws://localhost:8000");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  rootTotal: {
    // display: "flex",
    // flexWrap: "wrap",
    height: 120,
    backgroundColor: "#F5F5F5",
  },
  gridList: {
    width: 744,
    height: 650,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ListOrder({ current, setCurrent, order, setOrder }) {
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const [hasErrors, setErrors] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    const url = "ws://localhost:8000/add-item";
    socketRef.current = new WebSocket(url);
    return() => {
      socketRef.current.close();
    }
  },[]);
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.onmessage = (message) => {
      const data =  JSON.parse(message.data);
      console.log(data);
      setCurrent(data);
      setOrder((order) => [...order, data]);
    }
  }, [])
  
  const handlePurchase = async () => {
    try {
      const data = await auth.sendOrder(order);
      if (data) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickItem = (item) => {
    console.log(item);
    setCurrent(item);
    console.log(current);
  };

  return (
    <div>
      <div className={classes.root}>
        {hasErrors && (
          <Paper className={classes.paper}>
            <Typography component="p">
              An error has occurred, please try reloading the page.
            </Typography>
          </Paper>
        )}
        {!hasErrors && (
          <GridList
            onChange={`handleChange`}
            className={classes.gridList}
            cols={1}
          >
            <Table className={classes.table}>
              {/* <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead> */}
              <TableBody>
                {order.map((item) => (
                  <TableRow
                    hover
                    className={classes.tableRow}
                    key={item.code}
                    onClick={() => handleClickItem(item)}
                  >
                    <TableCell component="th" scope="row">
                      {item.code}
                    </TableCell>
                    <TableCell width="5%">
                      <CardMedia
                        className={classes.image}
                        image={require(`../images/${item.code}.jpg`).default}
                        title={item.name}
                      />
                    </TableCell>
                    <TableCell width="50%">{item.name}</TableCell>
                    {/* <TableCell>{(item.items && item.items.length) || 0}</TableCell> */}
                    <TableCell>{/*item.items*/}1</TableCell>
                    <TableCell>{item.price} VNĐ</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GridList>
        )}
      </div>
      <Card className={classes.rootTotal}>
        <CardContent>
          <Typography component="div" variant="h5" gutterBottom>
            <Box textAlign="left" m={1}>
              <strong>Total</strong>
            </Box>
          </Typography>
          <Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handlePurchase}
            >
              Purchase
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addItem}
            >
              Reload
            </Button> */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default ListOrder;