import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BookService from "../../API/bookServices";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";

export default function ShelfComponent({
  bookShelf = "0",
  bookId,
  setReload,
  reload
}) {
  const [shelf, setShelf] = React.useState(bookShelf);
  const authentication = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    setShelf(bookShelf);
  }, [bookShelf]);

  const changeShelf = async (event, newValue) => {
    if (authentication.auth.authed) {
      setShelf(newValue.props.value);
      await BookService.shelve(
        mySessionStorage.getCurrentUser()._id,
        bookId,
        newValue.props.value
      );
      setReload(!reload);
    } else history.push("/login");
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      maxWidth: 155,
      backgroundColor: "#E2F9EE",
      borderRadius: "0.2rem",
      paddingLeft: "0.2rem",
      textAlign: "center",
      fontSize: "0.8rem",
    },
    label: {
      color: "#074829",
      zIndex: 1,
    },
  }));
  const classes = useStyles();

  return (
    <FormControl>
      <InputLabel className={classes.label} id="demo-mutiple-name-label">
        Shelf
      </InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-simple-select"
        value={shelf}
        onChange={changeShelf}
        className={classes.formControl}
      >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Want to read</MenuItem>
        <MenuItem value={2}>Currently reading</MenuItem>
        <MenuItem value={3}>Read</MenuItem>
      </Select>
    </FormControl>
  );
}
