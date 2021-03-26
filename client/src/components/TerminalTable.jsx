import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useDispatch, useSelector } from "react-redux";
import { selectTerminalsItem } from "../store/ducks/terminals/selectors";
import {
  fetchTerminals,
  fetchRemoveTerminals,
} from "../store/ducks/terminals/actionCreators";
import { selectTerminalsIsLoading } from "./../store/ducks/terminals/selectors";
import { useForm } from "react-hook-form";
import { selectIsAdmin } from "../store/ducks/user/selectors";
import { selectCanEdit } from './../store/ducks/user/selectors';


function descendingComparator(a, b, orderBy) {
  // сортировщик
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  // выбор сортировщика
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  // конечная функция которая выбирает сортировщика
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // заголовки таблицы
  {
    id: "model",
    numeric: false,
    disablePadding: false,
    label: "Название модели",
  },
  { id: "city", numeric: true, disablePadding: false, label: "Город" },
  {
    id: "organization",
    numeric: true,
    disablePadding: false,
    label: "Организация",
  },
  { id: "address", numeric: true, disablePadding: false, label: "Адрес" },
  {
    id: "yearOfIssue",
    numeric: true,
    disablePadding: false,
    label: "Год выпуска",
  },
  {
    id: "isOnline",
    numeric: true,
    disablePadding: false,
    label: "Статус",
  },
];

function EnhancedTableHead(props) {
  // шапка таблицы
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    isAdmin,
    canEdit
  } = props;
  const createSortHandler = (property) => (event) => {
    // cоздает функцию обраточика события
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        { (isAdmin || canEdit) && <TableCell padding="checkbox">
          <Checkbox // чекбокс в шапке
            indeterminate={numSelected > 0 && numSelected < rowCount} // выбрано больше 1 но меньше количества строк
            checked={rowCount > 0 && numSelected === rowCount} // выбраны все строки
            onChange={onSelectAllClick} // обработчик клика по чекбоксу
            inputProps={{ "aria-label": "Выбрать все терминалы" }}
          />
        </TableCell>}
        {headCells.map((
          headCell // мапинг по заголовкам таблицы
        ) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false} // направление сортировки
          >
            <TableSortLabel
              active={orderBy === headCell.id} // провеяет активна ли ячейка
              direction={orderBy === headCell.id ? order : "asc"} // model === city???
              onClick={createSortHandler(headCell.id)} // (event) => { onRequestSort(name) }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // типизация пропсов
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  canEdit: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  // стили панели инструментов
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  searchForm: {
    display: "flex",
  },
  searchInput: {
    width: 300,
    margin: "0 20px",
  },
  searchSelect: {
    "& select": {
      width: 150
    }
  }
}));

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleRemoveItems } = props; // количество выбранных строк
  const classes = useToolbarStyles();
  const dispatch = useDispatch();

  const [visibleSearchField, setVisibleSearchField] = useState(false);

  const { handleSubmit, register } = useForm();
  const onSubmit = (searchFromData) => {
    dispatch(fetchTerminals(searchFromData));
  };

  const handlerClickOnFilter = () => {
    setVisibleSearchField(!visibleSearchField);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Выбрано
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Терминалы
        </Typography>
      )}
      {visibleSearchField && (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.searchForm}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="searchSelect">Поле</InputLabel>
            <Select
              name="orderBy"
              className={classes.searchSelect}
              native
              label="field"
              inputProps={{
                name: "orderBy",
                id: "searchSelect",
              }}
              inputRef={register}
            >
              <option aria-label="None" value="" />
              <option value="model">Название модели</option>
              <option value="city">Город</option>
              <option value="organization">Организация</option>
              <option value="address">Адрес</option>
              <option value="yearOfIssue">Год выпуска</option>
              <option value="isOnline">Статус</option>
            </Select>
          </FormControl>
          <TextField
            inputRef={register}
            name="searchValue"
            variant="outlined"
            label="Значение"
            type="search"
            className={classes.searchInput}
            autoComplete="off"
          />
        </form>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Удалить">
          <IconButton aria-label="delete" onClick={handleRemoveItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Поиск" onClick={handlerClickOnFilter}>
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleRemoveItems: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  offline: {
    color: "#d32f2f",
    fontWeight: "bold"
  },
  online: {
    color: "#4caf50",
    fontWeight: "bold"
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc"); // по возрастанию или по убыванию
  const [orderBy, setOrderBy] = React.useState("model"); // полу по которому будет сортировка
  const [selected, setSelected] = React.useState([]); // выбранные строки
  const [page, setPage] = React.useState(0); // страница пагинации
  const [dense, setDense] = React.useState(false); // управление паддингами
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // количество строк в таблице

  const terminals = useSelector(selectTerminalsItem);
  const terminalsIsLoading = useSelector(selectTerminalsIsLoading);
  const isAdmin = useSelector(selectIsAdmin);
  const canEdit = useSelector(selectCanEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTerminals());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    // обработчик клика на выбор всех строк
    if (event.target.checked) {
      const newSelecteds = terminals.map((n) => n._id); // данные
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleRemoveSelectedTerminals = () => {
    dispatch(fetchRemoveTerminals(selected));
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1; // выбрана ли страница

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, terminals.length - page * rowsPerPage); // количество пустых строк затем умнож-ся на высоту строки

  if (terminalsIsLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleRemoveItems={handleRemoveSelectedTerminals}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={terminals.length}
              isAdmin={isAdmin}
              canEdit={canEdit}
            />
            <TableBody>
              {stableSort(terminals, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // участок массива
                .map((terminal, index) => {
                  const isItemSelected = isSelected(terminal._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={terminal._id}
                      selected={isItemSelected}
                    >
                      {(isAdmin || canEdit) && <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, terminal._id)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default"
                      >
                        {terminal.model}
                      </TableCell>
                      <TableCell align="right">{terminal.city}</TableCell>
                      <TableCell align="right">
                        {terminal.organization}
                      </TableCell>
                      <TableCell align="right">{terminal.address}</TableCell>
                      <TableCell align="right">
                        {terminal.yearOfIssue}
                      </TableCell>
                      <TableCell align="right" className={terminal.isOnline ? classes.online : classes.offline}>
                        {terminal.isOnline ? "online" : "offline"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={terminals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Уменьшить отступы"
      />
    </div>
  );
}
