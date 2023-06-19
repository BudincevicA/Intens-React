import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "./Menu";
import Cart from "./Cart";

const ToolBar = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Button
        variant="contained"
        style={{ marginBottom: "50px", marginRight: "50px" }}
        startIcon={<MenuIcon />}
        onClick={() => handleButtonClick("Menu")}
      >
        Menu
      </Button>
      <Button
        variant="contained"
        style={{ marginBottom: "50px", marginLeft: "50px" }}
        startIcon={<ShoppingCartIcon />}
        onClick={() => handleButtonClick("Cart")}
      >
        Cart
      </Button>

      {activeComponent === "Menu" && <Menu />}
      {activeComponent === "Cart" && <Cart />}
    </div>
  );
};

export default ToolBar;
