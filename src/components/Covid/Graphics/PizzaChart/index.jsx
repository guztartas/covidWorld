import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from "@material-ui/core";
import useStyles from "./style";

const PizzaChart = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.graphich}>
      <div>
        <Typography variant="subtitle1" component="p" gutterBottom>
          {props.title}
        </Typography>
      </div>
      <Doughnut data={props.data} />
    </div>
  )
};

export default PizzaChart;