import { productsConstants } from '../constants'

export const productsReducer = (products, action) => {
    switch (action.type) {
        case productsConstants.FETCH_ALL:
            return action.payload
        case productsConstants.ADD_PRODUCT:
            return [action.payload, ...products]
    }
}