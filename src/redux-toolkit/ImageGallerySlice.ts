import { FileType } from "@/app/actions/files.action";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageGalleryState {
  image: FileType | null | undefined;
  open: boolean;
}

const initialState: ImageGalleryState = {
  image: null,
  open: false,
};

export const ImageGallery = createSlice({
  name: "ImageGalley",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<FileType | null | undefined>) => {
      state.image = action.payload;
      state.open = false;
    },
    setGalleryOpenState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setImage, setGalleryOpenState } = ImageGallery.actions;

export default ImageGallery.reducer;
