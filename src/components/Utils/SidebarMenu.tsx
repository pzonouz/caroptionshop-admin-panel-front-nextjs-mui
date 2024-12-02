"use client";

// WARN:ChatGpt
// Add Font and customise menu looks
import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RecursiveMenuItem = ({
  menu,
  openMenus,
  toggleMenu,
  parentId,
  path,
}: {
  menu: any;
  openMenus: Record<string, string | null>;
  toggleMenu: (parentId: string | null, id: string) => void;
  parentId: string | null;
  path: string | null;
}) => {
  if (!menu) return null;

  const isOpen = openMenus[parentId || "root"] === menu.id;

  const handleClick = () => {
    toggleMenu(parentId, menu.id);
  };

  if (menu.type === "group") {
    return (
      <Box
        sx={[
          {
            fontFamily: "vazirmatn",
            alignItems: "center",
            overflow: "visible",
            maxWidth: { xs: 50, sm: 50, md: 400, lg: 400 },
          },
        ]}
        key={menu.id}
      >
        <ListItemButton onClick={handleClick}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {menu?.icon && <ListItemIcon>{<menu.icon />}</ListItemIcon>}
            <ListItemText
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
                "&:hover": {
                  display: "block",
                },
              }}
              primary={menu.title}
            />
          </Box>
          {isOpen ? (
            <ExpandLess
              sx={[
                {
                  display: { xs: "none", sm: "none", md: "block", lg: "block" },
                },
              ]}
            />
          ) : (
            <ExpandMore
              sx={[
                {
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  },
                },
              ]}
            />
          )}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List sx={{ pl: 2 }}>
            {menu.children?.map((child: any) => (
              <RecursiveMenuItem
                key={child.id}
                menu={child}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                parentId={menu.id}
                path={path}
              />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  if (menu.type === "item") {
    return (
      <ListItemButton
        component={Link}
        href={menu.id}
        sx={[
          menu?.id == path && { backgroundColor: "#f0f0f0" },
          {
            display: "flex",
            flexDirection: "row",
            maxWidth: { xs: 50, sm: 50, md: 400, lg: 400 },
          },
        ]}
        key={menu.id}
      >
        {menu?.icon && <ListItemIcon>{<menu.icon />}</ListItemIcon>}
        <ListItemText
          sx={[
            {
              flex: 1,
            },
            {
              display: { xs: "none", sm: "none", md: "block", lg: "block" },
              "&:hover": {
                display: { xs: "block", sm: "block", md: "block", lg: "block" },
              },
            },
          ]}
          primary={menu.title}
        />
      </ListItemButton>
    );
  }

  return null;
};

const SideCollapsingMenu = ({ menuList }: { menuList: any }) => {
  const path = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, string | null>>({
    root: null,
  });

  const toggleMenu = (parentId: string | null, id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [parentId || "root"]: prev[parentId || "root"] === id ? null : id,
    }));
  };

  return (
    <List
      sx={{
        position: "fixed",
        borderRight: "1px solid #ccc",
        height: "100%",
        backgroundColor: "#f7f7f7",
      }}
    >
      {menuList.map((menu: any) => (
        <RecursiveMenuItem
          key={menu.id}
          menu={menu}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          parentId={null} // Top-level menus have no parent
          path={path}
        />
      ))}
    </List>
  );
};

export default SideCollapsingMenu;
