import { cartConstants } from '../constants'

export const cartReducer = (cart, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            return [...action.payload] //YOU SHOULD PARSE IT (PAYLOAD'S A STRING)
        case cartConstants.DELETE_ITEM:
            return cart.filter(item => item.productId !== action.payload)
    }
} 