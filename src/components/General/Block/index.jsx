import React from "react";
import useStyles from "./style";

const Block = (props) => {
    const classes = useStyles();

  return (
    <div className={classes.data}>
        {props.children}
    </div> 
  );
};

export default Block;
