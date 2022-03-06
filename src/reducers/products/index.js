import { productsConstants } from '../constants'

export const productsReducer = (products, action) => {
    switch (action.type) {
        case productsConstants.FETCH_ALL:
            return action.payload
        case productsConstants.ADD_PRODUCT:
            return [...products, action.payload]
        case productsConstants.UPDATE_PRODUCT:
            return products.map(product => product.id === action.payload.id ? action.payload : product)
        case productsConstants.DELETE_PRODUCT:
            return products.filter(product => product.id !== action.payload)
    }
}