import { Box, FormControl, InputLabel, OutlinedInput, Select, Chip, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}

interface MultiSelectChipProps {
    title: string,
    list: Array<string>
    onHandleChange: ( updateFilters: Array<string>) => void
}

var funcValue = 0;
var onClickValue = 0;

export const MultiSelectChip: React.FC<MultiSelectChipProps> = ( {title, list, onHandleChange} ) => {
    const [filterName, setFilteName] = useState<string[]>([]);
    const categories = useSelector((state: RootStateOrAny) => state.filters.categories);
    funcValue++;

    useEffect(() => {
        onHandleChange(filterName);
    }, [filterName])

    const handleChange = (event: SelectChangeEvent<typeof filterName>) => {
        onClickValue = funcValue + 2
        const { target: { value }} = event;
        setFilteName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    if (JSON.stringify(filterName) != JSON.stringify(categories) && categories.length == 0 && onClickValue + 2 < funcValue){
        setFilteName([]);
    }

    return (
        <div>
            <FormControl sx={{m: 1, width: 130}}>
                <InputLabel id="demo-label">{title}</InputLabel>    
                <Select
                    labelId="demo-label"
                    id="demo-multi-select"
                    multiple
                    autoWidth
                    value={filterName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple" label="chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, float: 'left'}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    { 
                        list.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                >
                                    {name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}