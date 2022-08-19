import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField'
import AutoComplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelector, RootStateOrAny } from 'react-redux';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface AutoCompleteProps {
    label: string
    options: Array<string>
    onHandleChange: (updatedList: Array<string>) => void
}

var funcValue = 0;
var onClickValue = 0;

export const AutoCompleteCheckboxes: React.FC<AutoCompleteProps> = ({ label, options, onHandleChange }) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const vendors = useSelector((state: RootStateOrAny) => state.filters.vendors);
    funcValue++;

    const handleOnCheckUpdate = (event: any, newValue: any) => {
        onClickValue = funcValue + 4
        setSelectedValues(newValue);
        onHandleChange(newValue);
    }

    if (JSON.stringify(selectedValues) != JSON.stringify(vendors) && vendors.length == 0  && onClickValue + 3 < funcValue){
        setSelectedValues([]);
    }
    
    return (
        <AutoComplete
            multiple
            id="checkboxes-tags-demo"
            options={options}
            disableCloseOnSelect
            value={selectedValues}
            onChange={(event, newValue) => {
                handleOnCheckUpdate(event, newValue);
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8}}
                        checked={selected}
                        value={option}
                    />
                    {option}
                </li>
        )}
        style={{ 
            width: 150, 
            marginLeft: "245px",
            marginTop: "-85px",
            height: "57px"
        }}
        renderInput={(params) => (
            <TextField {...params} label={label} placeholder="Search Option" />
        )}
        />
    )
}