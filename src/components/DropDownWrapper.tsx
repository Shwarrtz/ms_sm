import * as React from "react";
import Button from "@mui/material/Button";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown"
import { alpha, styled } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import { borderRadius } from "@mui/system";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { relative } from "path";


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right"
        }}
        {...props}
        />
))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "rgba(0, 0, 0, 0.6)",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0"
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          )
        }
      }
    }
  }));

interface DropdownWrapperProps {
    title: string,
    children: JSX.Element[] | JSX.Element
}

const useStyles = makeStyles(() => ({
    wrapIcon: {
      marginTop: "-9px",
      position: "absolute",
    }
  }));

export const DropdownWrapperProps: React.FC<DropdownWrapperProps> = ({ title, children }) => {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    //const classes = useStyles();
    //<ArrowDropDown className={classes.wrapIcon}/>
    
    return (
        <div >
            <Button
                id="dropdown-button"
                aria-haspopup="true"
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<ArrowDropDown />}
                style={{
                    width: '90px',
                    height: "57px",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                    color: "rgba(0, 0, 0, 0.6)",
                    textTransform: "none",
                    fontWeight: 400,
                    padding: "14.5px",
                    marginLeft: "145px",
                    marginTop: "-96px",
                    minHeight: "1.4375em",
                    fontSize: "16px",
                }}
            >
                {title}
            </Button>
            <StyledMenu
                id="demo-menu"
                MenuListProps={{
                    "aria-labelledby": "dropdown-menu"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box>{children}</Box>
            </StyledMenu>
        </div>
    )
}
