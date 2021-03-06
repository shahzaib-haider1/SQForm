import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import {
  SQFieldArray,
  SQFormCheckboxGroupItem,
  useSQFormContext
} from '../../../src';

export default function SQFormCheckboxGroup({
  name,
  children,
  useSelectAll = false,
  selectAllData = null,
  selectAllContainerProps = {},
  selectAllProps = {}
}) {
  const {values, setFieldValue} = useSQFormContext();

  const handleSelectAllChange = event => {
    if (event.target.checked) {
      setFieldValue(name, selectAllData);
    } else {
      setFieldValue(name, []);
    }
    setFieldValue('selectAll', !values.selectAll);
  };

  if (!useSelectAll) {
    return <SQFieldArray name={name}>{children}</SQFieldArray>;
  }

  return (
    <>
      <Grid container {...selectAllContainerProps}>
        <SQFormCheckboxGroupItem
          name="selectAll"
          label="Select All"
          isChecked={values.selectAll}
          onChange={handleSelectAllChange}
          {...selectAllProps}
        />
      </Grid>
      <SQFieldArray name={name}>{children}</SQFieldArray>
    </>
  );
}

SQFormCheckboxGroup.propTypes = {
  /** the `name` must match the name of the desired array in `initialValues` */
  name: PropTypes.string.isRequired,
  /** boolean flag to trigger usage of Select All functionality */
  useSelectAll: PropTypes.bool,
  /** array of items to put in the `name` array on 'select all' click */
  selectAllData: PropTypes.array,
  /** props for the Grid container wrapping the select all checkbox */
  selectAllContainerProps: PropTypes.object,
  /** props for the 'select all' SQFormCheckboxGroupItem component */
  selectAllProps: PropTypes.object,
  /** the `children` must be a single SQFormCheckboxGroupItem or an array of them */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.arrayOf([PropTypes.element, PropTypes.elementType])
  ]).isRequired
};
