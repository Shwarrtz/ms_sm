import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import Divider from "material-ui/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button  from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function CustomizedInputBase({ onInputUpdate } : {
    onInputUpdate: (text: string) => void
}) {
    const [searchValue, setSearchValue] = useState({text: '', timeout: false, search: false});
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [wordEntered, setWordEntered] = useState("");
    //console.log('searchbox');
    useEffect(() => {
        setWordEntered(searchValue.text);
        let start = (searchValue.search === true || searchValue.text.length >= 3);

        if (searchValue.text === '' && !buttonDisabled){
            setButtonDisabled(true);
        } else if (searchValue.text !== '' && buttonDisabled){
            setButtonDisabled(false);
        }
        
        const delayedDebounceFn = setTimeout(() => {
            if (start === true){
                onInputUpdate(searchValue.text);
            }
            
        }, (searchValue.timeout === true ? 1000 : 0))
        
        return () => clearTimeout(delayedDebounceFn)
        
    }, [searchValue])

    const clearInput = () => {
        setButtonDisabled(true);
        setWordEntered("");
        setSearchValue({text:"", timeout:false, search: true});
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (event.type === 'submit') {
          setSearchValue({text:event.target[0].value, timeout:true, search: true});
        }
      }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
                p: '2px 0px', 
                display: 'flex', 
                alignItems: 'center',
                width: 780,
                height: 'fit-content',
                marginTop: '20px;',
                marginBottom: '10px'
            }}
            >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search'}}
                value={wordEntered}
                onChange={(e) => setSearchValue({text: e.target.value, timeout: true, search: false})}
                />
            <Button disabled={buttonDisabled} onClick={clearInput}>Clear</Button>
            <IconButton 
                type="submit" 
                sx={{ p: '10px'}}
                aria-label="search"
                >
                <SearchIcon />
            </IconButton>
        </Paper>
    )

}