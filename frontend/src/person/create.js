import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "../axios";

// These two variable represents for request success & failure.
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

// This component being used for creating a Person
export const Create = () => {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState();
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState({});

  const createPerson = async () => {
    try {
      await axios.post("/persons", {
        name,
        companyId: company.id,
      });
      setStatus(SUCCESS);
    } catch {
      setStatus(FAILED);
    }
  };

  // Get all the companies on component mounted.
  React.useEffect(async () => {
    const companies = await axios.get("/company");
    setCompanies(companies.data);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          style={{ fontSize: 32, fontFamily: "courir", textAlign: "center" }}
        >
          Create Person
        </Box>
      </Grid>
      <Grid item xs={12}>
        {status === SUCCESS && (
          <Box style={{ textAlign: "center", color: "green" }}>
            Person created successfully
          </Box>
        )}
        {status === FAILED && (
          <Box style={{ textAlign: "center", color: "red" }}>
            Failed to create person
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={name}
          fullWidth
          label="Name"
          required={true}
          onChange={(e) => {
            setStatus();
            setName(e.target.value);
          }}
          variant="outlined"
        />
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
        <Button
          color="primary"
          fullWidth
          disabled={!name}
          onClick={createPerson}
          variant="contained"
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
