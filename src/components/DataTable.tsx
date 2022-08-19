import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { transactions } from "../data/mock_transactions";
import { addToFavourites, removeFromFavourites } from "../actions/actions";
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Button  from "@mui/material/Button";

interface DataTableProps {
    columns: Array<Header>,
    data: Array<Transaction>
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    //base
    const dispatch = useDispatch();
    const favourites = useSelector((state: RootStateOrAny) => state.favourites);
    const filters = useSelector((state: RootStateOrAny) => state.filters);
    
    //favourite
    const handleClick = (rowId: number, vendorName: string) => {
        const index = favourites.findIndex((favourite: { id: number; }) => favourite.id === rowId);
        if (index < 0){
            dispatch(addToFavourites({id: rowId, name: vendorName}));
        } else {
            dispatch(removeFromFavourites({id: rowId, name: vendorName}));
        }
    }

    //filtering
    const shouldDisplay = (transaction: Transaction) => {
        let price = parseInt(transaction.amount.replace('$', ''));
        let matchesSearchText = filters.searchText === '' ? true : transaction.transaction_name.toLocaleLowerCase().includes(filters.searchText);
        let matchesCategory = filters.categories.length > 0 ? filters.categories.some((category: string) => category == transaction.category) : true;
        let matchesVendor = filters.vendors.length > 0 ? filters.vendors.some((vendor: string) => vendor == transaction.transaction_vendor) : true;
        let matchesPrice = (filters.price && filters.price.length == 2) ? (price >= filters.price[0] && price <= filters.price[1]) : true;
        let somethingFilled = (filters.searchText !== '' || filters.categories.length > 0 || filters.vendors.length > 0);

        return matchesSearchText && matchesCategory && matchesVendor && matchesPrice && somethingFilled;
    }

    const  filteredData = data.filter((transaction: Transaction) => shouldDisplay(transaction));
    
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    return (
        <TableContainer component={Paper}>
            <Table 
            sx= {{ minWidth: 650}} 
            aria-label="table"
        >
                <TableHead sx={{ backgroundColor: "#A9A9A9" }}>
                    <TableRow>
                    {
                        columns.map((column: Header) => {
                            return(
                                <TableCell
                                    key={column.id}
                                    align={( column.id != 'favourite' ? (column.numeric  ? "right" : "left") : "center")}
                                >{column.label}</TableCell>
                            )
                        })
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filteredData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: Transaction) => {
                            return (
                                <TableRow
                                    key={row.transaction_name + row.transaction_vendor}
                                    sx={{ '&:last-child td, &:last-child th': {border: 0} }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.transaction_name}
                                    </TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.category}</TableCell>
                                    <TableCell align="left">{row.transaction_vendor}</TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            onClick={() => handleClick(row.id, row.transaction_name)}>
                                                {favourites.findIndex((favourite: { id: number; }) => favourite.id === row.id) < 0 ? <FavoriteBorder /> : <Favorite />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                        )})
                    }
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </TableContainer>
    )
}