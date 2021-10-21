import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StoreContext from "components/Store/Context";
import {
  Checkbox,
  Box,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  FormControlLabel,
  Container,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";
import Copyright from "components/General/Copyright";
import errorTexts from "constants/errorTexts";
import common from "constants/common";
import login from "Authentication/login";

const UserLogin = () => {
  const { setToken } = useContext(StoreContext);
  const history = useHistory();
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { token } = login(data);
    // TO REVIEWS
    if (token) {
      setToken(token);
      history.push("/");
    } else {
      if (data.email === "" || data.password === "") {
        toast.warn(errorTexts.form.emptyField);
      } else {
        toast.error(errorTexts.person.emptyFieldOrFields);
      }
    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          {common.user.login}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Endereço de e-mail"
            autoComplete="email"
            autoFocus
            type="text"
            defaultValue={""}
            {...register("email", { required: true })}
            error={errors.email}
            helperText={errors.email && errorTexts.person.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Senha"
            autoComplete="current-password"
            type="password"
            defaultValue={""}
            {...register("password", { required: true })}
            error={errors.password}
            helperText={errors.password && errorTexts.person.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            classes={{ root: classes.button }}
            className={classes.submit}
          >
            {common.user.enter}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
};

export default UserLogin;
