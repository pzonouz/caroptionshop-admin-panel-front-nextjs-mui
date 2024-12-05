import { Box, MenuItem } from "@mui/material";

const RecursiveSelectOptions = ({
  items,
  valueField,
  textField,
}: {
  items: any[];
  valueField: string;
  textField: string;
}) => {
  return (
    <>
      {items?.map((item) => {
        return (
          <Box key={item}>
            <MenuItem key={item?.name} value={item?.[valueField]}>
              {!item?.parent && `${item?.[textField]}`}
              {item?.parent && `${item?.parent} >> ${item?.title}`}
            </MenuItem>
            {item?.children?.length > 0 && (
              <RecursiveSelectOptions
                textField={textField}
                valueField={valueField}
                items={item?.children}
              />
            )}
          </Box>
        );
      })}
    </>
  );
};

export { RecursiveSelectOptions };
