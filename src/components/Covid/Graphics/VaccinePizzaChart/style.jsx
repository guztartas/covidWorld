import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  generalBlock: {
    display: 'flex',
    margin: '50px auto',
    width: 'max-content',
  }, 
  subTitle: {
    height: 'min-content',
    margin: 'auto 50px auto 0',
    color: 'white',
    display: 'flex',
  },
  secondSubtitle: {
    margin: 'auto 0 auto 30px !important',
    fontSize: '36px',
  }
}));

export default useStyles;
