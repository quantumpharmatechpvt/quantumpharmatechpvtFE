import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setEditCostCenterModalOpen } from  '@/components/slices/usersSlice';

export const EditCostCenterModal = (props: any) => {
  const { open, updateData, updateCostCenter } = props;
  let [code, setCode] = useState<string>('');
  const dispatch = useDispatch();
  let [description, setDescription] = useState<string>('');
  let [name1, setName] = useState<string>('');

  const handleClose = () => {
    setCode('');
    setDescription('');
    setName('');
    dispatch(setEditCostCenterModalOpen(false));
  };
  const handleSaveDisputeReason = () => {
    const name = name1 || updateData?.name;
    const addr = description || updateData?.address;
    const phno = code || updateData?.phoneNo;
    const id = updateData?.id;
    const psw = updateData.password;
    const age = updateData.age;
    const email = updateData.email;
    if (name && addr && phno) {
      updateCostCenter({ name, addr, phno, email, psw, age, id });
    }
    dispatch(setEditCostCenterModalOpen(false));
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
          <Typography variant="h6">Update User</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container direction={'column'}>
          <Grid item>
            <TextField
              required
              label="Name"
              id="outlined-error-helper-text"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              defaultValue={updateData?.name}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Address"
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              defaultValue={updateData?.address}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Phone No"
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              margin="normal"
              defaultValue={updateData?.phoneNo}
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
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
