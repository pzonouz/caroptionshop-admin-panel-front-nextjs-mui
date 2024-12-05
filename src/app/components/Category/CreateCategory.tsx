"use client";

import {
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import { useState } from "react";
import { Category } from "@/app/actions/categories.action";
import { ImageGallery } from "../Image/ImageGallery";

const CreateCategory = ({
  categories,
  images,
}: {
  categories: Category[];
  images: any;
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  return (
    <>
      <Modal
        open={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
        }}
        closeAfterTransition
      >
        <Fade in={galleryOpen}>
          <Box
            sx={{
              marginX: "auto",
              marginY: "auto",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <ImageGallery
              open={galleryOpen}
              setOpen={setGalleryOpen}
              images={images}
            />
          </Box>
        </Fade>
      </Modal>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
        }}
      >
        <TextField variant="filled" label="عنوان" />
        <FormControl fullWidth>
          <InputLabel>دسته بندی</InputLabel>
          <Select
            name="parent"
            defaultValue={0}
            label="دسته بندی"
            variant="filled"
          >
            <MenuItem value={0}>بخش اصلی</MenuItem>
            <RecursiveSelectOptions
              textField="title"
              valueField="title"
              items={categories}
            />
          </Select>
        </FormControl>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<ImageIcon />}
          onClick={() => setGalleryOpen(true)}
        >
          انتخاب تصویر
        </Button>
        <TextField variant="standard" label="برچسب ها" />
        <TextField variant="standard" label="توضیحات سیو" />
        <TextField variant="standard" label="لینک" />
        <TextField variant="standard" label="توضیحات" />
        <TextField variant="standard" label="وضعیت نمایش" />
      </Box>
    </>
  );
};
export { CreateCategory };
