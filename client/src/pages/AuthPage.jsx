import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectLoadingUserState } from "../store/ducks/user/selectors";
import { fetchSignIn } from "../store/ducks/user/actionCreators";

export const LOADING_STATUSES = {
    NEVER: "NEVER",
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS" 
  };


const signinSchema = yup.object().shape({
  username: yup
    .string()
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле")
});

export const AuthPage= () => {
  const {
    handleSubmit,
    control,
    register,
    errors,
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const loadingStatus = useSelector(selectLoadingUserState);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(fetchSignIn(data))
  };


  return (
    <DialogContent style={{flex: "0 0 500px"}}>
    <DialogTitle style={{textAlign: "center"}}>Введите ваш логин и пароль</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Логин"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              name="username"
              helperText={errors.username?.message}
              error={!!errors.username}
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Пароль"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              name="password"
              helperText={errors.password?.message}
              error={!!errors.password}
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loadingStatus === LOADING_STATUSES.LOADING}
          style={{marginTop: 20}}
        >
          Войти
        </Button>
      </form>
    </DialogContent>
  );
};
