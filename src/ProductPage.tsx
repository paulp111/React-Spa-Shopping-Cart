import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartContext'; 
import { Product } from './types';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { cartCount } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data: Product) => setProduct(data));
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Back
          </Typography>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 2 : 4, mb: 4, bgcolor: theme.palette.background.paper }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} lg={5}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ width: '100%', height: 'auto', maxWidth: 360, mx: 'auto', p: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h5" color="primary" paragraph sx={{ fontWeight: 'bold' }}>
                  ${product.price}
                </Typography>
                <Button variant="contained" sx={{ bgcolor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.dark } }} size="large">
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
