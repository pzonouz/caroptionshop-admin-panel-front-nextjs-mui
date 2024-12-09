"use client";
import { CategoryType } from "@/app/actions/categories.action";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectCategory } from "./SelectCatgory";
import { useEffect, useState } from "react";

const ListCategories = ({ categories }: { categories: CategoryType[] }) => {
  const parentCategories: any[] = [];
  const getparentCategories = (categories: CategoryType[], temp: any[]) => {
    categories.forEach((category) => {
      if (category?.children?.length! > 0) {
        temp.push(category);
        getparentCategories(category?.children!, temp);
      }
    });
    return temp;
  };
  getparentCategories(categories, parentCategories);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    categories[0],
  );

  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    setFilteredCategories(selectedCategory?.children!);
  }, [selectedCategory]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <SelectCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={parentCategories}
      />
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">انتخاب</TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="left">دسته بندی</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories?.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">
                  {row.parent == null ? "بدون دسته بندی" : row.parent}
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { ListCategories };
