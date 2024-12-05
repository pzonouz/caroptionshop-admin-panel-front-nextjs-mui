import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import TickIcon from "@mui/icons-material/Check";

const ImageElement = ({ image, select, setSelect }) => {
  return (
    <Box
      onClick={() => {
        setSelect(image?.title);
      }}
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
    >
      <Image
        style={{ display: "block" }}
        width={100}
        height={100}
        src={image?.file}
        alt="image"
      />
      <Typography
        sx={{ textAlign: "right" }}
        // sx={{
        //   whiteSpace: "nowrap",
        //   overflow: "hidden",
        //   textOverflow: "ellipsis",
        // }}
      >
        {image?.title}
      </Typography>
      {select === image?.title && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton>
            <TickIcon color="success" />
          </IconButton>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
export { ImageElement };
