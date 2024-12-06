"use client";

// TODO:Code refactor, clean up,Tests,CodeSmells, use AI tools

import { useActionState, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecursiveSelectOptions } from "../Utils/RecursiveSelect";
import {
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  Modal,
  NativeSelect,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import {
  CategoryType,
  CreateCategoryAction,
} from "@/app/actions/categories.action";
import { FileType } from "@/app/actions/files.action";
import { RootState } from "@/redux-toolkit/Store";
import { ImageGallery } from "../Image/ImageGallery";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import Tiptap from "../Utils/Tiptap";
import { LoadingButton } from "@mui/lab";
import {
  setGalleryOpenState,
  setImage,
} from "../../../redux-toolkit/ImageGallerySlice";

const CreateCategory = ({
  categories,
  images,
}: {
  categories: CategoryType[];
  images: FileType[];
}) => {
  const image = useSelector((state: RootState) => state.ImageGallery.image);
  const galleryOpen = useSelector(
    (state: RootState) => state.ImageGallery.open,
  );
  const [text, setText] = useState("");
  const [status, setStatus] = useState(true);
  const dispatch = useDispatch();
  const [state, action, loading] = useActionState(
    CreateCategoryAction.bind(null, text, status, image),
    null,
  );
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <>
      <Modal
        open={galleryOpen}
        onClose={() => {
          dispatch(setGalleryOpenState(false));
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
            <ImageGallery images={images} />
          </Box>
        </Fade>
      </Modal>
      <Box
        component={"form"}
        action={action}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
        }}
      >
        <Typography variant="h5">ایجاد دسته بندی جدید</Typography>
        <TextField
          name="title"
          variant="filled"
          label="عنوان"
          helperText={state?.error?.fieldErrors["title"]}
          error={!!state?.error?.fieldErrors["title"]}
        />
        <FormControl fullWidth>
          <InputLabel>دسته بندی</InputLabel>
          <NativeSelect
            name="parent"
            defaultValue={0}
            label="دسته بندی"
            variant="filled"
          >
            <option style={{ fontFamily: "VazirMatn" }} value={0}>
              بخش اصلی
            </option>
            <RecursiveSelectOptions
              textField="title"
              valueField="uuid"
              keyField="uuid"
              items={categories}
            />
          </NativeSelect>
          {/* </Select> */}
        </FormControl>
        {image ? (
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => {
                dispatch(setImage(null));
              }}
              size="small"
              color="error"
              sx={{
                position: "absolute",
                top: 1,
                left: 0,
                backgroundColor: "white",
                zIndex: 2,
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.5,
                width: "7.5rem",
                height: "2.5rem",
                backgroundColor: "gray",
              }}
            ></Box>
            <Image alt="" src={image?.file} width={120} height={120} />
          </Box>
        ) : (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<ImageIcon />}
            onClick={() => {
              dispatch(setGalleryOpenState(true));
            }}
          >
            انتخاب تصویر
          </Button>
        )}
        <Typography component={"p"}>توضیحات</Typography>
        <Tiptap text={text} setText={setText} />
        <FormControlLabel
          sx={{ width: "100%", textAlign: "left" }}
          dir="rtl"
          label="وضعیت نمایش"
          control={
            <Switch
              checked={status}
              onChange={(e) => setStatus(e.target.checked ? true : false)}
            />
          }
        />
        <LoadingButton type="submit" variant="contained" loading={loading}>
          ثبت
        </LoadingButton>
      </Box>
    </>
  );
};
export { CreateCategory };
