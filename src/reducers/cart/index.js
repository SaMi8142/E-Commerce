import { cartConstants } from '../constants'

export const cartReducer = (cart, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART: //YOU SHOULD PARSE IT (PAYLOAD'S A STRING)
        case cartConstants.DELETE_ITEM:
        case cartConstants.DROP_ITEMS:
            return { ...action.payload }
    }
} 