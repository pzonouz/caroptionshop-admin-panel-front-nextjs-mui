import { Box } from "@mui/material";
import { ImageUploader } from "./ImageUploader";
import { ImageCollection } from "./ImageCollection";

const ImageGallery = ({ images }: { images: any }) => {
  return (
    <Box>
      <ImageUploader />
      <ImageCollection images={images} />
    </Box>
  );
};
export { ImageGallery };
