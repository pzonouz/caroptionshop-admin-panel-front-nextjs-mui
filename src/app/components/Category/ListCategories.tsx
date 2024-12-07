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

const ListCategories = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <TableContainer component={Paper}>
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
          {categories?.map((row) => (
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
  );
};

export { ListCategories };
