import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  useScrollTrigger,
  Slide,
  CssBaseline,
  Badge,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'; 
import { useCart } from './CartContext'; 
import { Product } from './types';

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartCount } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, color: 'black' }}>
              My Shop
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Suchen..."
              size="small"
              onChange={handleSearch}
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 2 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Top Produkte
          </Typography>
          <Grid container spacing={2}>
            {filteredProducts.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1" noWrap>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(product)}>
                      In den Warenkorb
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;

