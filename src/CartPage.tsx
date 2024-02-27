import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from './CartContext'; 
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <Container>
      <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="back">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Warenkorb
      </Typography>
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.title}
                  secondary={`Preis: ${item.price} € | Menge: ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography variant="subtitle1">Ihr Warenkorb ist leer.</Typography>
          )}
        </List>
        {cartItems.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => console.log('Checkout')}
          >
            Zur Kasse gehen
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default CartPage;

