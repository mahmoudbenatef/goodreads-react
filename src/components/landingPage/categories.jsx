import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function Categories() {
  const history = useHistory();

  const categorie = [{ label: "Romance"  },{ label: "Horror"  },{ label: "Comedy"  }]
  useEffect(() => {

  }, []);

  const useStyles = makeStyles((theme) => ({
  }));
  const classes = useStyles();

  return (
    <div className={classes.header}>
    </div>
  );
}
