import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { removeFromCart, clearCart } from "../actions/cartActions";
import "../css/Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice =
      item.price +
      item.sideDishes.reduce((acc, sideDish) => acc + sideDish.price, 0);
    return total + itemPrice;
  }, 0);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handlePurchase = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <TableContainer component={Paper} className="cart-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell className="action-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <strong>{item.name}</strong>
                  {item.sideDishes.map((sideDish, index) => (
                    <p key={index}>{sideDish.name}</p>
                  ))}
                </TableCell>
                <TableCell>
                  ${item.price}
                  {item.sideDishes.map((sideDish, index) => (
                    <p key={index}>${sideDish.price}</p>
                  ))}
                </TableCell>
                <TableCell className="action-cell">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove from Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Total price: ${totalAmount}
      </Typography>
      {cartItems.length > 0 && (
        <Button variant="contained" color="primary" onClick={handlePurchase}>
          Purchase
        </Button>
      )}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Thank you for your purchase!</DialogTitle>
        <DialogContent>
          <Typography>
            Your order has been processed and will be delivered soon.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
