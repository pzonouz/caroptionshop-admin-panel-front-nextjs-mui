import React from "react";
const RecursiveSelectOptions = ({
  items,
  valueField,
  textField,
  keyField,
  parentText = "", // Initialize default parent text
}: {
  items: any[];
  valueField: string;
  textField: string;
  keyField: string;
  parentText?: string; // Optional prop to track parent text for indentation
}) => {
  return items?.map((item) => {
    // Determine the current text to display based on the parentText
    const currentText = parentText
      ? `${parentText} >> ${item?.[textField]}`
      : item?.[textField];

    // First, create the current option
    const option = (
      <option
        role="option"
        tabIndex={0}
        aria-selected={true}
        data-value={item?.[valueField]}
        key={item?.[keyField]}
        value={item?.[valueField]}
      >
        {currentText}
      </option>
    );

    // Next, recursively create options for any children
    const childOptions =
      item?.children?.length > 0 ? (
        <RecursiveSelectOptions
          items={item.children}
          valueField={valueField}
          textField={textField}
          keyField={keyField}
          parentText={currentText} // Pass the current text as the new parent
        />
      ) : null;

    // Return an array that includes the current option and any child options
    return (
      <React.Fragment key={item[valueField]}>
        {option}
        {childOptions}
      </React.Fragment>
    );
  });
};

export { RecursiveSelectOptions };
