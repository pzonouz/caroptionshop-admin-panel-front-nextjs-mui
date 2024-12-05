import { Box, Grid2 } from "@mui/material";
import { ImageElement } from "./ImageElement";
import { useState } from "react";

const ImageCollection = ({ images }) => {
  const [select, setSelect] = useState("");
  return (
    <Box
      sx={{
        width: "95%",
        maxHeight: "80vh",
        marginX: "auto",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      {/* <Grid2 */}
      {/*   container */}
      {/*   sx={{ */}
      {/*     width: "95%", */}
      {/*     maxHeight: "80vh", */}
      {/*     marginX: "auto", */}
      {/*     overflow: "hidden", */}
      {/*     overflowY: "auto", */}
      {/*   }} */}
      {/* > */}
      {images?.map((image: any) => (
        <ImageElement
          select={select}
          setSelect={setSelect}
          key={image.title}
          image={image}
        />
      ))}
      {/* </Grid2> */}
    </Box>
  );
};

export { ImageCollection };
