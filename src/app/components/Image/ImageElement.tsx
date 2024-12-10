import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import TickIcon from "@mui/icons-material/Check";
import { useActionState } from "react";
import { DeleteFileAction, FileType } from "@/app/actions/files.action";
import { useDispatch } from "react-redux";
import { setImage } from "@/redux-toolkit/ImageGallerySlice";

const ImageElement = ({
  image,
  select,
  setSelect,
}: {
  image: FileType;
  select: string;
  setSelect: Function;
}) => {
  const dispatch = useDispatch();
  const [_state, action, deleteLoading] = useActionState(
    DeleteFileAction.bind(null, image?.uuid),
    null,
  );
  return (
    <Box
      sx={[
        {
          position: "relative",
          display: "inline-flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
          width: "100%",
          marginY: "0.5rem",
          gap: "1rem",
        },
        select === image?.title && { border: "2px solid blue" },
      ]}
      onClick={() => {
        setSelect(image?.title);
      }}
    >
      <Image
        style={{ display: "block" }}
        width={100}
        height={100}
        src={image?.file || "/images/placeholder.jpg"}
        alt="image"
      />
      <Typography sx={{ textAlign: "right" }}>{image?.title}</Typography>
      {select === image?.title && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton
            onClick={() => {
              dispatch(setImage(image));
            }}
            sx={{ position: "relative" }}
          >
            <TickIcon color="success" />
          </IconButton>
          <Box component="form" action={action}>
            <IconButton
              type="submit"
              disabled={deleteLoading}
              sx={{ position: "relative" }}
            >
              {deleteLoading && (
                <CircularProgress color="error" sx={{ position: "absolute" }} />
              )}
              <DeleteIcon
                color="error"
                sx={[deleteLoading && { color: "gray" }]}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export { ImageElement };
