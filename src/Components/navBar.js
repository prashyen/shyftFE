import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { useNavigate, useLocation } from "react-router-dom";

export function NavBar(){

    const navigate = useNavigate();
    const location = useLocation();
    
    return (        
    <Drawer
    variant="permanent"
    sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
    }}
    open
  >
    <List>
        <ListItem key={"Home"} disablePadding>
            <ListItemButton selected={location.pathname === "/"} onClick={()=>{navigate("/")}}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        {['Students', 'Courses', 'Results'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected={location.pathname === "/"+text.toLowerCase()} onClick={()=>{navigate("/"+text.toLowerCase())}}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  </Drawer>)
}