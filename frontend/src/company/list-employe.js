import * as React from "react";
import { Grid, TextField, ListItem, Box, List } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Avatar from "react-avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 8,
    fontFamily: "courir",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 8,
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

export const ListEmployee = () => {
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState();
  const [employees, setEmployees] = React.useState();

  const classes = useStyles();

  React.useState(async () => {
    const companies = await axios.get("/company");
    setCompanies(companies.data);
  }, []);

  const fetchEmployees = async () => {
    if (company) {
      const employees = await axios.get(`/persons?companyId=${company.id}`);
      setEmployees(employees.data || []);
    }
  };

  React.useEffect(fetchEmployees, [company]);

  const unAssignCompany = async (employee) => {
    await axios.patch(`/persons/${employee.id}/unAssignCompany`);
    await fetchEmployees();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          style={{ fontSize: 32, fontFamily: "courir", textAlign: "center" }}
        >
          List Employees
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="combo-box-demo"
          options={companies}
          getOptionLabel={(company) => company.name}
          fullWidth
          onChange={(event, company) => setCompany(company)}
          renderInput={(params) => (
            <TextField {...params} label="Select company" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        {employees && !employees.length && (
          <Box className={classes.title}>No Employees Assigned</Box>
        )}
        <List>
          {employees &&
            employees.map((employee) => {
              return (
                <ListItem className={classes.listView} fullWidth>
                  <Box display="flex">
                    <Box display="flex" width={430}>
                      <Avatar
                        className={classes.avatar}
                        name={employee.name}
                        size="50"
                        textSizeRatio={1.75}
                      />
                      <Box pt={1} className={classes.name}>
                        {employee.name}
                      </Box>
                    </Box>
                    <Box onClick={() => unAssignCompany(employee)} pt={1}>
                      <CloseIcon />
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </Grid>
  );
};
