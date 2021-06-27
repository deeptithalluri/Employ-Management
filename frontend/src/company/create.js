import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import axios from "../axios";

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
export const Create = () => {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState();

  const createCompany = async () => {
    try {
      await axios.post("/company", { name });
      setStatus(SUCCESS);
    } catch {
      setStatus(FAILED);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          style={{ fontSize: 32, fontFamily: "courir", textAlign: "center" }}
        >
          Create Company
        </Box>
      </Grid>
      <Grid item xs={12}>
        {status === SUCCESS && (
          <Box style={{ textAlign: "center", color: "green" }}>
            Company created successfully
          </Box>
        )}
        {status === FAILED && (
          <Box style={{ textAlign: "center", color: "red" }}>
            Failed to create company
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={name}
          fullWidth
          label="Name"
          onChange={(e) => {
            setStatus();
            setName(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid m={3} item xs={12}>
        <Button
          color="primary"
          fullWidth
          disabled={!name}
          onClick={createCompany}
          variant="contained"
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
