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
import { useAccount, useDisconnect } from 'wagmi';
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
  const { disconnect } = useDisconnect()

  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<IFormInput>({
    defaultValues: {
      address: '',
      severityLevels: []
    }
  });
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

  useEffect(() => {
    return () => {
      disconnect();
      console.log('hello');
    }
  }, [disconnect]);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      //await axios.post('https://1a6f-185-199-104-14.ngrok-free.app/submit', { address: data.address, severityLevels: data.severityLevels });
      //await axios.post('http://localhost:4000/submit', { address: data.address, severityLevels: data.severityLevels });
      await axios.post('https://assaver.crolux.online/submit', { address: data.address, severityLevels: data.severityLevels });
      await subscribeUserToPush();
      setLoading(false);
      reset()
      disconnect()
      setSuccessModalOpen(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage(JSON.stringify(error));
      setErrorModalOpen(true);
    }
  };

  const subscribeUserToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array('BAXeqIBWzcNGqkgsRyztAi98ssWc97xz6d5TQj9dSywqLH8Snv1zy3OMxUjgbyhxYGV-gWoFFX8N8CYgKa5r-Ok')
      });
      //await axios.post('https://1a6f-185-199-104-14.ngrok-free.app/subscribe', subscription);
      //await axios.post('http://localhost:4000/subscribe', subscription);
      await axios.post('https://assaver.crolux.online/subscribe', subscription);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  };

  const urlB64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  
  return (
    <Stack alignItems="stretch">
      <Typography variant='h6' sx={{ py: 2 }}>Submit your address to receive push notifications if any transactions or tokens are sent from a blacklisted address</Typography>
      {!address ? <StyledConnect /> : null}
      {!address ? <Typography variant='h5' textAlign='center' sx={{ pt: 2 }}>OR</Typography> : null}

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
              required
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ''}
              margin="normal"
              value={field.value}
              onChange={field.onChange}
              disabled={!!address}
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
