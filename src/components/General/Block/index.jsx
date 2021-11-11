import React from "react";
import useStyles from "./style";
import { Typography } from "@material-ui/core";

const Block = (props) => {
    const classes = useStyles();

  return (
    
    <div className={classes.data}>
        <Typography className={classes.titleBlock} variant="subtitle1" component="h1" gutterBottom>
          {props.title}
        </Typography>
        <Typography className={classes.subTitle} variant="subtitle1" component="p" gutterBottom>
          {props.subTitle}
        </Typography>
        {props.children}
    </div> 
  );
};

export default Block;
