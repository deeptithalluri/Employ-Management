import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "../axios";

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
export const AssignEmployee = () => {
  const [status, setStatus] = React.useState();
  const [companies, setCompanies] = React.useState([]);
  const [persons, setPersons] = React.useState([]);
  const [company, setCompany] = React.useState({});
  const [person, setPerson] = React.useState({});

  const assignEmployee = async () => {
    try {
      await axios.patch(`/persons/${person.id}/assignCompany`, {
        companyId: company.id,
      });
      setStatus(SUCCESS);
    } catch {
      setStatus(FAILED);
    }
  };

  React.useState(async () => {
    const companies = await axios.get("/company");
    setCompanies(companies.data);
    const persons = await axios.get("/persons/unAssigned");
    setPersons(persons.data);
  }, []);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          style={{ fontSize: 32, fontFamily: "courir", textAlign: "center" }}
        >
          Assign Company
        </Box>
      </Grid>
      <Grid item xs={12}>
        {status === SUCCESS && (
          <Box style={{ textAlign: "center", color: "green" }}>
            Employee assigned successfully
          </Box>
        )}
        {status === FAILED && (
          <Box style={{ textAlign: "center", color: "red" }}>
            Failed to assign employee
          </Box>
        )}
      </Grid>

      <Grid m={3} item xs={12}>
        <Autocomplete
          id="combo-box-demo"
          options={companies}
          getOptionLabel={(company) => company.name}
          fullWidth
          onChange={(event, company) => {
            setCompany(company);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select company" variant="outlined" />
          )}
        />
      </Grid>

      <Grid m={3} item xs={12}>
        <Autocomplete
          id="combo-box-demo"
          options={persons}
          getOptionLabel={(person) => person.name}
          fullWidth
          onChange={(event, company) => {
            setPerson(company);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Person" variant="outlined" />
          )}
        />
      </Grid>

      <Grid m={3} item xs={12}>
        <Button
          color="primary"
          fullWidth
          onClick={assignEmployee}
          disabled={isEmpty(company) || isEmpty(person)}
          variant="contained"
        >
          Assign
        </Button>
      </Grid>
    </Grid>
  );
};
