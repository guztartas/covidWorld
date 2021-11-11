import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  data: {
    flexDirection: "row",
    overflow: "hidden",
  },
  titleBlock: {
    margin: '10px auto !important',
    width: 'max-content',
    fontSize: '32px !important;',
    color: 'white',
    fontWeight: '500'
  },
  subTitle: {
    margin: '10px auto !important',
    width: 'max-content',
    fontSize: '20px !important;',
    color: 'white',
  }
}));

export default useStyles;
