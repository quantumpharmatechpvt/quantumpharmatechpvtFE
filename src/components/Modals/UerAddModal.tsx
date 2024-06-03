import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setCreateCostCenterModalOpen } from "@/components/slices/usersSlice";
import { v4 as uuid } from "uuid";

export const CreateCostCenterModal = (props: any) => {
  const { open, createCostCenter } = props;
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const [phno, setPhNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addr, setAddr] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const handleClose = () => {
    setName("");
    setPhNo("");
    setAddr("");
    setAge("");
    setPsw("");
    setEmail("");
    dispatch(setCreateCostCenterModalOpen(false));
  };
  const handleSaveDisputeReason = () => {
    const id= Math.floor(Math.random() * 90 + 10);
    createCostCenter({ name, addr, phno, email, psw, age, id });
    setName("");
    setPhNo("");
    setAddr("");
    setAge("");
    setPsw("");
    setEmail("");
    dispatch(setCreateCostCenterModalOpen(false));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { p: 3 } }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid rgba(0, 0, 0, 0.12)"
        >
          <Typography variant="h6">Add User</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
              required
              label="Name"
              id="outlined-error-helper-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Address"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Phone No"
              value={phno}
              onChange={(e) => setPhNo(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>{" "}
          <Grid item>
            <TextField
              required
              label="Password"
              name="password"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginRight: 10 }}
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveDisputeReason}
          disabled={!name || !email || !psw}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
