type Transaction = {   
    id: number,
    transaction_name: string,
    amount: string,
    category: string,
    transaction_vendor: string
}

type Header = {   
    id: string,    
    numeric: boolean,
    label: string
}

type IFilterData = {
    categories: Array<String>,
    vendors: Array<String>,
    searchText: ''
}

type Favourite = {
    id: Array<number>,
    name: Array<String>
}