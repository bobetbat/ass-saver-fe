import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ethers } from 'ethers';
import {
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';

interface IFormInput {
  address: string;
}

const isValidEthereumAddress = (value: string) => {
  return ethers.isAddress(value) || 'Invalid Ethereum address';
};

export const AddressForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      await axios.post('/api/address', { address: data.address });
      setLoading(false);
      setSuccessModalOpen(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Ups something is wrong');
      setErrorModalOpen(true);
    }
  };

  return (
    <div>
      <Typography variant='h5'>Add address to subscribe</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="address"
          control={control}
          rules={{ validate: isValidEthereumAddress }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ethereum Address"
              variant="outlined"
              fullWidth
              size='small'
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ''}
              margin="normal"
            />
          )}
        />
        <Button size='medium' type="submit" variant="contained" fullWidth color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>

      <Dialog fullWidth open={loading}>
        <DialogContent>
          <CircularProgress />
          <Typography variant="body2" align="center">
            Submitting...
          </Typography>
        </DialogContent>
      </Dialog>

      <Dialog fullWidth open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            The address was successfully submitted!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth open={errorModalOpen} onClose={() => setErrorModalOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

