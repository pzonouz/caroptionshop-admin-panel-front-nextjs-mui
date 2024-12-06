import { MenuItem } from "@mui/material";

const RecursiveSelectOptions = ({
  items,
  valueField,
  textField,
  keyField,
}: {
  items: any[];
  valueField: string;
  textField: string;
  keyField: string;
}) => {
  return (
    <>
      {items?.map((item) => {
        return item?.children?.length > 0 ? (
          <RecursiveSelectOptions
            textField={textField}
            valueField={valueField}
            keyField={keyField}
            items={item?.children}
          />
        ) : (
          <option
            role="option"
            tabIndex={0}
            aria-selected={true}
            data-value={item?.[valueField]}
            key={item?.[keyField]}
            value={item?.[valueField]}
          >
            {!item?.parent && `${item?.[textField]}`}
            {item?.parent && `${item?.parent} >> ${item?.title}`}
          </option>
        );
      })}
    </>
  );
};

export { RecursiveSelectOptions };
