import * as React from "react";
import { ListItem, List, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Avatar from "react-avatar";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: "auto",
    paddingTop: 20,
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    paddingTop: 8,
    fontFamily: "courir",
  },
  title: {
    fontSize: 32.8,
    fontFamily: "courir",
  },
  listView: {
    cursor: "pointer",
    padding: 10,
    boxShadow: "0px 0px 10px 1px grey",
    borderRadius: 5,
    marginBottom: 10,
  },
}));

// This will list all  people who are not linked to companies,
export const UnAssignedPersonList = () => {
  const classes = useStyles();
  const [persons, setPersons] = React.useState([]);

  React.useEffect(async () => {
    const response = await axios.get("/persons/unAssigned");
    setPersons(response.data);
  }, []);

  return (
    <Box className={classes.root} container spacing={2}>
      {!persons.length && (
        <Box className={classes.title}>No Persons Available</Box>
      )}
      <List>
        <Box
          style={{
            fontSize: 32,
            fontFamily: "courir",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          UnAssigned Persons List
        </Box>
        {persons.map((person) => {
          return (
            <>
              <ListItem className={classes.listView} fullWidth>
                <Box display="flex">
                  <Avatar
                    className={classes.avatar}
                    name={person.name}
                    size="50"
                    textSizeRatio={1.75}
                  />
                  <Box className={classes.name}>{person.name}</Box>
                </Box>
              </ListItem>
            </>
          );
        })}
      </List>
    </Box>
  );
};
