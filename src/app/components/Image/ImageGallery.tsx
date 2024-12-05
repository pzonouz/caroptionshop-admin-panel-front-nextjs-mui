import { Box } from "@mui/material";
import { ImageUploader } from "./ImageUploader";
import { ImageCollection } from "./ImageCollection";

const ImageGallery = ({
  images,
  open,
  setOpen,
}: {
  images: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Box>
      <ImageUploader open={open} setOpen={setOpen} />
      <ImageCollection images={images} />
    </Box>
  );
};
export { ImageGallery };
