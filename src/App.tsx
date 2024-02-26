import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import { CartProvider } from './CartContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232f3e', 
    },
    secondary: {
      main: '#ff9900', 
    },
    background: {
      default: '#ffffff', 
      paper: '#f6f6f6',
    },
    text: {
      primary: '#131921',
      secondary: '#767676',
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 700, 
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
