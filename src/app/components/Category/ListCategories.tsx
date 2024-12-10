"use client";
import { CategoryType } from "@/app/actions/categories.action";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Fab,
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
import { ModalComponenet } from "../Utils/ModalComponent";
import { CreateCategory } from "./CreateCategory";
import { FileType } from "@/app/actions/files.action";
import { UpdateCategory } from "./UpdateCategory";
import { DeleteCategory } from "./DeleteCategory";

const ListCategories = ({
  categories,
  images,
}: {
  categories: CategoryType[];
  images: FileType[];
}) => {
  const parentCategories: any[] = [];
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
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

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | number
  >(0);

  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCategories((selectedCategory as CategoryType)?.children || []);
    } else {
      setFilteredCategories(
        categories.filter((category) => category.parent === null),
      );
    }
  }, [selectedCategory, categories]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Fab
        onClick={() => setCreateCategoryOpen(true)}
        color="primary"
        sx={{ position: "fixed", left: "1rem", bottom: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet
        open={createCategoryOpen}
        setOpen={setCreateCategoryOpen}
      >
        <CreateCategory categories={categories} images={images} />
      </ModalComponenet>
      <ModalComponenet open={updateCategory} setOpen={setUpdateCategory}>
        <UpdateCategory
          categories={categories}
          images={images}
          category={updateCategory!}
        />
      </ModalComponenet>
      <ModalComponenet open={deleteCategory} setOpen={setDeleteCategory}>
        <DeleteCategory
          category={deleteCategory!}
          setOpen={setDeleteCategory}
        />
      </ModalComponenet>

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
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setUpdateCategory(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteCategory(row)}>
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
