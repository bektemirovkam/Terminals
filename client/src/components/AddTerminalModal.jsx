import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { fetchAddTerminal } from "../store/ducks/terminals/actionCreators";
import { selectAddTerminalStatus } from "../store/ducks/terminals/selectors";

const terminalSchema = yup.object().shape({
  city: yup
    .string()
    .required("Обязательное поле")
    .min(2, "Минимальное количество символов 2"),
  organization: yup.string().required("Обязательное поле"),
  address: yup.string().required("Обязательное поле"),
  model: yup.string().required("Обязательное поле"),
  yearOfIssue: yup.string().required("Обязательное поле"),
});

export const AddTerminalModal = ({ handleClose, open }) => {
  const { handleSubmit, control, register, errors, reset } = useForm({
    resolver: yupResolver(terminalSchema),
  });

  const loadingStatus = useSelector(selectAddTerminalStatus);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(fetchAddTerminal(data));
    reset();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <DialogTitle>Добавить терминал</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="model"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Модель терминала"
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                name="model"
                helperText={errors.model?.message}
                error={!!errors.model}
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Город"
                variant="outlined"
                margin="normal"
                type="text"
                fullWidth
                name="city"
                helperText={errors.city?.message}
                error={!!errors.city}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Адрес"
                variant="outlined"
                margin="normal"
                type="text"
                fullWidth
                name="address"
                helperText={errors.address?.message}
                error={!!errors.address}
              />
            )}
          />
          <Controller
            name="organization"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Организация"
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                name="organization"
                helperText={errors.organization?.message}
                error={!!errors.organization}
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="yearOfIssue"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <TextField
                inputRef={register}
                label="Год изготовления"
                variant="outlined"
                margin="normal"
                type="text"
                fullWidth
                name="yearOfIssue"
                helperText={errors.yearOfIssue?.message}
                error={!!errors.yearOfIssue}
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
              {loadingStatus === "LOADING" ? "Добавление..." : "Добавить"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
