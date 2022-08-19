import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import SearchBar from '../src/components/SearchBar';
import Box from "@mui/material/Box";
import { purple } from "@mui/material/colors";
import { Filters } from '../src/containers/Filters';
import { DataTable } from "../src/components/DataTable";
import { transactions } from "../src/data/mock_transactions";
import {  updateFilters } from '../src/actions/actions';
import { Divider } from '../src/components/Divider';
import React, { useEffect, useState, useContext } from "react";
import { Provider, useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { rootReducer } from '../src/reducers/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { FavouriteList } from '../src/components/FavouriteList';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { LoadingContext } from '../src/contexts/loadingContext';
import { QueryClientProvider, QueryClient } from 'react-query';

const HomeWrapper = () => {
  const store = configureStore({ reducer: rootReducer });
  //const [loading, setLoading] = useState(true);
  const loading = useState(false);
  
  /*
  store.subscribe(() => {   
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout()
    
  })
  */
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <LoadingContext.Provider value={loading}>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </LoadingContext.Provider>
    </Provider>
  )
}

interface RangeSliderProps {
  onHandleChange: (updatedList: Array<number>) => void
  amountRange: Array<number>
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  //const {loading, setLoading} = useContext(LoadingContext);
  //const loading = useContext(LoadingContext);
  const [loading, setLoading] = useState(true);
  // Not working as intended
  useEffect(() => {   
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout()
    
  }, [loading])
  
  
  const COLUMNS = [
    { id: "transaction_name", numeric: false, label: "Transaction Name" },
    { id: "amount", numeric: false, label: "Amount" },
    { id: "category", numeric: false, label: "Category" },
    { id: "transaction_vendor", numeric: false, label: "Vendor" },
    { id: "favourite", numeric: false, label: "Favourite" }
  ]

  let categories = Array.from(new Set(transactions.map(transaction => transaction.category)));
  let names = Array.from(new Set(transactions.map(transaction => transaction.transaction_name)));
  let vendors = Array.from(new Set(transactions.map(transaction => transaction.transaction_vendor)));
  let amountRange = [0, 1000];

  const favourites = useSelector((state: RootStateOrAny) => state.favourites);
  const filters = useSelector((state: RootStateOrAny) => state.filters);

  // Search Bar Value Update
  const onSearchTextUpdate = (text: string) => {
    dispatch(updateFilters('searchText', text));
  }

  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          m: 1,
          backgroundColor: purple[500],
          borderRadius: 1,
          width: '100%',
          margin: 'auto',
          marginBottom: '100px',
          height: '400px'
        }}
      >
        <h1 className={styles.searchHeader}>Search Transactions</h1>
        <SearchBar 
          onInputUpdate={onSearchTextUpdate}
        />
        <Divider />
        <Filters 
          categories={categories}
          names={names}
          amountRange={amountRange}
          vendorNames={vendors}
        />
        <FavouriteList favs={favourites}/>
      </Box>
      
       {loading 
      ? (
        <Box
        sx={{
          alignItems: 'center',

          width: '50px',
          margin: 'auto',
          marginBottom: '100px',
          height: '50px'
        }}
      >
        <ClimbingBoxLoader 
            size={30} 
            color={'#F37A24'} 
            loading={loading}/>
        </Box>
        )
      : (
        ''
      )}     
      <DataTable
        columns={COLUMNS}
        data={transactions}
      />
    </div>
  )
}

export default HomeWrapper
