import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "../css/Menu.css";

const Menu = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSideDishes, setSelectedSideDishes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleSideDishChange = (sideDish) => {
    const updatedSelectedSideDishes = [...selectedSideDishes];
    if (updatedSelectedSideDishes.includes(sideDish)) {
      updatedSelectedSideDishes.splice(
        updatedSelectedSideDishes.indexOf(sideDish),
        1
      );
    } else {
      updatedSelectedSideDishes.push(sideDish);
    }
    setSelectedSideDishes(updatedSelectedSideDishes);
  };

  const handleAddSelectedItemToCart = () => {
    if (selectedItem) {
      const itemWithSideDishes = {
        ...selectedItem,
        sideDishes: selectedSideDishes,
      };
      dispatch(addToCart(itemWithSideDishes));
      setSelectedItem(null);
      setSelectedSideDishes([]);
      setOpenDialog(false);
    }
  };

  const menuItems = [
    {
      name: "Pizza",
      price: 15,
      sideDish: [
        { name: "Pepperoni", price: 2 },
        { name: "Extra Cheese", price: 1 },
        { name: "Olives", price: 1 },
      ],
    },
    {
      name: "Hamburger",
      price: 10,
      sideDish: [
        { name: "Ketchup", price: 1 },
        { name: "Mayonnaise", price: 1 },
        { name: "Lettuce", price: 1 },
        { name: "Tomatoes", price: 2 },
      ],
    },
    {
      name: "Tortilla",
      price: 7,
      sideDish: [
        { name: "Extra Cheese", price: 1 },
        { name: "Chili Peppers", price: 3 },
        { name: "Tomatoes", price: 2 },
      ],
    },
    {
      name: "Carbonara",
      price: 9,
      sideDish: [
        { name: "Garlic Bread", price: 4 },
        { name: "Broccoli", price: 2 },
      ],
    },
  ];

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <List className="menu-list">
        {menuItems.map((item) => (
          <ListItem className="menu-item" key={item.name}>
            <div className="menu-item-info">
              <ListItemText primary={item.name} />
              <span className="menu-item-price">${item.price}</span>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedItem && selectedItem.name} - Side Dishes
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedItem &&
              selectedItem.sideDish.map((sideDish) => (
                <ListItem key={sideDish.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSideDishes.includes(sideDish)}
                        onChange={() => handleSideDishChange(sideDish)}
                      />
                    }
                    label={`${sideDish.name} - $${sideDish.price}`}
                  />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSelectedItemToCart} color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;
