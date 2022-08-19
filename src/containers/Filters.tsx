import React, { useEffect, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Button  from "@mui/material/Button";
import { MultiSelectChip } from "../components/MultiSelect";
import { DropdownWrapperProps } from "../components/DropDownWrapper";
import { RangeSlider } from "../components/RangeSlider";
import styles from "../../styles/Filters.module.css";
import { AutoCompleteCheckboxes } from "../components/AutoCompleteCheckboxes";
import { clearFilters, updateFilters} from "../actions/actions";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

export const Filters = ({
  categories,
  names,
  amountRange,
  vendorNames
}: {
categories: Array<string>,
names: Array<string>,
amountRange: Array<number>,
vendorNames: Array<string>
}) => {
  const dispatch = useDispatch();
  const delay = 1000;


  // update categories
  const updateCategories = (categories: Array<string>) => {
    setTimeout(() => {
      dispatch(updateFilters('categories', categories));
    }, delay)
    clearTimeout()
  }

  // update range
  const updateRange = (price: Array<number>) => {
    setTimeout(() => {
      dispatch(updateFilters('price', price));
    }, delay)
  }

  // update vendors
  const updateVendors = (vendors: Array<string>) => {
    setTimeout(() => {
      dispatch(updateFilters('vendors', vendors));
    }, delay)
    clearTimeout()
  }

  // clear filters
  const clearAll = () => {
    dispatch(updateFilters('categories', []));
    dispatch(updateFilters('vendors', []));
    dispatch(clearFilters());
    
  }

  //display: 'flex',
  //flexDirection: 'row',
  return (
    <Box display="flex" justifyContent="space-between"
      sx={{
        width: '780px',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: '1px',
        justifyContent: 'space-between',
        paddingTop: '15px',
        paddingBottom: '5px',
        marginTop: '-60px',
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
      }}
    >
      <div className={styles.filesContainer}>
        <MultiSelectChip 
          title="Categories"
          list={categories}
          onHandleChange={updateCategories}
        />
        <DropdownWrapperProps
          title="Price"
          >
            <RangeSlider onHandleChange={updateRange} amountRange={amountRange}/>
        </DropdownWrapperProps>
        <AutoCompleteCheckboxes
          label="Vendors"
          options={vendorNames}
          onHandleChange={updateVendors}
          />
      </div>
      <Button onClick={clearAll}>Clear Filters</Button>
    </Box>
  )
}
