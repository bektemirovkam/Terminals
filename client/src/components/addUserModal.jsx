import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "./../store/ducks/user/actionCreators";
import { selectRegisterLoadingState } from "../store/ducks/user/selectors";

const userSchema = yup.object().shape({
  username: yup
    .string()
    .required("Обязательное поле")
    .min(2, "Минимальное количество символов 2")
    .max(40, "Максимальное количество символов 40"),
  password: yup.string().required("Обязательное поле"),
  confirm: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const AddUserModal = ({ handleClose, open }) => {
  const { handleSubmit, control, register, errors, reset } = useForm({
    resolver: yupResolver(userSchema),
  });

  const loadingStatus = useSelector(selectRegisterLoadingState);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(fetchRegister(data));
    reset();
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <DialogContentText style={{ textAlign: "center" }}>
          {loadingStatus === "ERROR" && (
            <span style={{ color: "rgb(220, 0, 78)" }}>
              Ошибка при регистрации
            </span>
          )}
          {loadingStatus === "SUCCESS" && (
            <span style={{ color: "#a6e22e" }}>Регистрация прошла успешно</span>
          )}
        </DialogContentText>
        <DialogTitle>Создать пользователя</DialogTitle>
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
          <Controller
            name="confirm"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Повторите пароль"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                name="confirm"
                helperText={errors.confirm?.message}
                error={!!errors.confirm}
              />
            )}
          />
          <Controller
            name="canEdit"
            control={control}
            defaultValue={false}
            rules={{ required: true }}
            render={(props) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    name="canEdit"
                    color="primary"
                  />
                }
                label="Разрешить пользователю редактировать данные"
              />
            )}
          />
          <Controller
            name="isAdmin"
            control={control}
            defaultValue={false}
            rules={{ required: true }}
            render={(props) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    name="isAdmin"
                    color="primary"
                  />
                }
                label="Дать права администратора"
              />
            )}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loadingStatus === "LOADING"}
            >
              {loadingStatus === "LOADING" ? "Создание..." : "Создать"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
