import { createTheme } from '@mui/material/styles';

const primaryColor = '#FF5E5E'; // Example primary color from buttons
const secondaryColor = '#000000'; // Example secondary color
const backgroundColor = '#F5F5F5'; // Example background color
const textColor = '#000000'; // Example text color

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
    },
    text: {
      primary: textColor,
    },
  },
  typography: {
    fontFamily: 'Courier New, monospace', // Example font family
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          padding: '10px 20px',
          backgroundColor: primaryColor,
          color: secondaryColor,
          '&:hover': {
            backgroundColor: secondaryColor,
            color: primaryColor,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px 0',
          '& .MuiInputBase-root': {
            color: textColor,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: primaryColor,
            },
            '&:hover fieldset': {
              borderColor: secondaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: primaryColor,
            },
          },
        },
      },
    },
  },
});

export default theme;
