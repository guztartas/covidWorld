import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from "@material-ui/core";
import useStyles from "./style";

const PizzaChart = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.generalBlock}>
      <div className={classes.subTitle}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom className={classes.secondSubtitle}>
          {props.subTitleTotal}
        </Typography>
      </div>
      <div className={classes.graphich}>
        <Doughnut data={props.data} />
      </div>
    </div>
  )
};

export default PizzaChart;