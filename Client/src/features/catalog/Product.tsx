import { AddShoppingCart } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { CurrencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {

  const { status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  
  return (
    <Card>
        <CardMedia sx={{ height: 160, backgroundSize:"contain" }} image={`http://localhost:5159/images/${product.imageUrl}`}/>
        <CardContent>
            <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                {product.name}
            </Typography>
            <Typography variant="body2" color="secondary">
               {CurrencyTRY.format(product.price)}
            </Typography>
        </CardContent>
        <CardActions>
            <LoadingButton variant="outlined" size="small" loadingPosition="start" startIcon={<AddShoppingCart />} loading={status === "pendingAddItem" + product.id } onClick={()=> dispatch(addItemToCart({productId: product.id}))}>Sepete Ekle</LoadingButton>
            <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
        </CardActions>
    </Card>
 
  );
}
