import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Product } from './types';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data: Product) => setProduct(data));
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ py: 8 }}>
      <IconButton
        onClick={() => navigate(-1)}
        aria-label="back"
        sx={{ mb: 2, color: theme.palette.primary.main}}
        size="large"
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: theme.palette.grey[100] }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} lg={5} sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
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
              <Button variant="contained" color="secondary" size="large" sx={{ alignSelf: 'start', py: 1.5, px: 3 }}>
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
