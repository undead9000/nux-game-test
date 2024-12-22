export interface UserAddressGeo {
    lat: string
    lng: string
}

export interface UserAddress {
    city: string
    geo: UserAddressGeo
    street: string
    suite: string
    zipcode: string
}

export interface UserCompany {
    bs: string
    catchPhrase: string
    name: string
}

export interface User {
    id: number
    name: string
    phone: string
    username: string
    email: string
    website: string
    address: UserAddress
    company: UserCompany
}

export interface TodoItem {
    userId: number
    id?: number
    title: string
    completed: boolean
}

export interface FilterOption {
    label: string | number
    value: string | number
}

export enum StatusOptionsEnum {
    'All' = 1,
    'Completed' = 2,
    'Uncompleted' = 3,
    'Favorites' = 4,
}

export enum LocalStorageKeysEnum {
    Favorites = 'favorites',
    CurrentUser = 'currentUser',
}
