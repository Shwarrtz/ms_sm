import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

//export const RangeSlider = ({ onHandleChange, amountRange} : { onHandleChange : (updateRange: Array<number>) => void }) => {

interface RangeSliderProps {
    onHandleChange: (updatedList: Array<number>) => void
    amountRange: Array<number>
}

export const RangeSlider: React.FC<RangeSliderProps> = ( {onHandleChange, amountRange} ) => {

    const [value, setValue] = useState<number []>([amountRange[0], amountRange[1]]); 

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }

    const handleOnDragStop = () => {
        onHandleChange(value as number[]);
    }

    return(
        <Box sx={{ 
            width: 300,
            height: '70px',
            paddingTop: '30px',
            paddingLeft: '20px',
            paddingRight: '20px', 
            float: 'left'
        }}>
            <Slider
                getAriaLabel={() => 'slider'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay='on'
                onChangeCommitted={handleOnDragStop}
                min={amountRange[0]}
                max={amountRange[1]}
            />
        </Box>
    )
}