import * as React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, useLocation } from "react-router-dom";
import { ADMIN_MENU_ITEMS, USER_MENU_ITEMS } from "../utils/constants.ts";
import { blue, grey } from "@mui/material/colors";
import { useStore } from "../stores/store.ts";

const SideBar = React.memo(() => {
  const location = useLocation();
  const { userStore } = useStore();
  const menuItems =
    userStore.user?.role === "Admin" ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((text, index) => {
          const to = `${text.toLowerCase()}`;

          return (
            <NavLink
              to={to}
              key={text}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  backgroundColor: location.pathname.includes(to)
                    ? blue[500]
                    : "inherit",
                  color: location.pathname.includes(to) ? "#fff" : "inherit",
                  ":hover": {
                    backgroundColor: grey[300],
                    color: "black",
                  },
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
});

export default SideBar;
