import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    width: '100%',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: "40vw",
  },
  input: {
    width: '100%',
    marginBottom: '2em'
  },
  button: {
    width: "40vw",
    marginBottom: '20px',
    border: "1px solid blue"
  }
});