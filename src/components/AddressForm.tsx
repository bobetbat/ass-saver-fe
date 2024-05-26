import React, { useState, useEffect } from 'react';
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
  Typography,
  Stack,
  Autocomplete
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { StyledConnect } from './StyledConnect';

interface IFormInput {
  address: string;
  severityLevels: string[];
}

const severityOptions = ['Low', 'Medium', 'High', 'Critical'];

const isValidEthereumAddress = (value: string) => {
  return ethers.isAddress(value) || 'Invalid Ethereum address';
};

export const AddressForm: React.FC = () => {
  const { address } = useAccount();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (address) {
      setValue('address', address);
    } else {
      setValue('address', '');
    }
  }, [address, setValue]);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      await axios.post('https://assaver.crolux.online/submit', { address: data.address, severityLevels: data.severityLevels });
      setLoading(false);
      setSuccessModalOpen(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Ups something went wrong');
      setErrorModalOpen(true);
    }
  };

  return (
    <Stack alignItems="stretch" >
      <Typography variant='h5' sx={{ py: 2 }}>Add address to subscribe</Typography>
      {!address ? <StyledConnect /> : null}
      {!address ? <Typography variant='h5' textAlign='center' sx={{ pt: 2 }} >OR</Typography> : null}

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
              // size='small'
              required
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ''}
              margin="normal"
              value={address ?? field.value}
              disabled={!!address || field.disabled}
            />
          )}
        />
        <Controller
          name="severityLevels"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              // size='small'
              options={severityOptions}
              getOptionLabel={(option) => option}
              onChange={(event, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Severity Levels"
                  variant="outlined"
                  placeholder="Select severity levels"
                  margin="normal"
                />
              )}
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
    </Stack>
  );
};
