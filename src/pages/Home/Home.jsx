import React from 'react';
import './Home.css';
import PizzaChart from '../../components/Covid/Graphics/PizzaChart/PizzaChart';
import { Typography } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";

const GeneralCity = {
  labels: ['Não contraíram', 'Casos confirmados'],
  datasets: [
    {
      label: 'Casos em erechim',
      data: [92539, 14892],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DeathsCity = {
  labels: ['Mortos', 'Casos confirmados'],
  datasets: [
    {
      label: '# of Votes',
      data: [200, 14892],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Hospitals = {
  labels: ['Capacidade total', 'Usada'],
  datasets: [
    {
      label: '# of Votes',
      data: [80, 6],
      backgroundColor: [
        '#07bc0ca6',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'green',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Actives = {
  labels: ['Casos ativos', 'Novos'],
  datasets: [
    {
      label: '# of Votes',
      data: [51, 11],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PagesHome = () => (
  <div className="pages-home">
    <div className="pages-home-update">
      <UpdateIcon />
      <Typography variant="h6" component="h" gutterBottom>
        Atualizado em: 20/10/2021 14:50:47 
      </Typography>
    </div>
    <div className="pages-home-first-data">

    </div>
    {/* <div className="data">
      <PizzaChart data={GeneralCity} title={'Gerais'}/>
      <PizzaChart data={DeathsCity} title={'Mortes'}/>
      <PizzaChart data={Hospitals} title={'Capacidade de leitos'}/>
      <PizzaChart data={Actives} title={'Casos ativos/novos'}/>
    </div> */}
  </div>
);

export default PagesHome;
