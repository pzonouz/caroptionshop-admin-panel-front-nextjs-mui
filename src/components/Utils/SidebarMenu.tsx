"use client";

// import React, { useState } from "react";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
//
// const RecursiveMenuItem = ({ menu }: { menu: any }) => {
//   if (!menu) return null;
//   const [open, setOpen] = useState(false);
//   const handleClick = (id: any) => {
//     open ? setOpen(false) : setOpen(id);
//   };
//
//   if (menu.type === "group") {
//     return (
//       <React.Fragment key={menu?.id}>
//         <ListItemButton onClick={() => handleClick(menu.id)}>
//           <ListItemIcon>{<menu.icon />}</ListItemIcon>
//           <ListItemText primary={menu.title} />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse
//           in={open}
//           timeout="auto"
//           unmountOnExit
//           // timeout={1000}
//           // style={{
//           //   transition: "height 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//           // }}
//         >
//           <List sx={{ pl: 2 }}>
//             {menu?.children?.map((child: any) => (
//               <RecursiveMenuItem key={child?.id!} menu={child} />
//             ))}
//           </List>
//         </Collapse>
//       </React.Fragment>
//     );
//   } else if (menu.type === "item") {
//     return (
//       <ListItemButton key={menu.id} sx={{ pl: 2 }}>
//         <ListItemIcon>{<menu.icon />}</ListItemIcon>
//         <ListItemText primary={menu.title} />
//       </ListItemButton>
//     );
//   }
//
//   return null;
// };
//
// const SidebarMenu = ({ menuList }: { menuList: any }) => {
//   return (
//     <List>
//       {menuList.map((menu: any) => (
//         <RecursiveMenuItem key={menu.id} menu={menu} />
//       ))}
//     </List>
//   );
// };
//
// export { SidebarMenu };
// WARN:ChatGpt
// Add Font and customise menu looks
import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const RecursiveMenuItem = ({
  menu,
  openMenus,
  toggleMenu,
  parentId,
}: {
  menu: any;
  openMenus: Record<string, string | null>;
  toggleMenu: (parentId: string | null, id: string) => void;
  parentId: string | null;
}) => {
  if (!menu) return null;

  const isOpen = openMenus[parentId || "root"] === menu.id;

  const handleClick = () => {
    toggleMenu(parentId, menu.id);
  };

  if (menu.type === "group") {
    return (
      <React.Fragment key={menu.id}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{<menu.icon />}</ListItemIcon>
          <ListItemText primary={menu.title} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List sx={{ pl: 2 }}>
            {menu.children?.map((child: any) => (
              <RecursiveMenuItem
                key={child.id}
                menu={child}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                parentId={menu.id} // Pass the current menu ID as the parent ID for children
              />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }

  if (menu.type === "item") {
    return (
      <ListItemButton key={menu.id} sx={{ pl: 2 }}>
        <ListItemIcon>{<menu.icon />}</ListItemIcon>
        <ListItemText primary={menu.title} />
      </ListItemButton>
    );
  }

  return null;
};

const SidebarMenu = ({ menuList }: { menuList: any }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, string | null>>({
    root: null,
  });

  const toggleMenu = (parentId: string | null, id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [parentId || "root"]: prev[parentId || "root"] === id ? null : id, // Toggle the current menu
    }));
  };

  return (
    <List>
      {menuList.map((menu: any) => (
        <RecursiveMenuItem
          key={menu.id}
          menu={menu}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          parentId={null} // Top-level menus have no parent
        />
      ))}
    </List>
  );
};

export { SidebarMenu };
