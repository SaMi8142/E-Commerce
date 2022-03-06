import * as API from '../api'

export const createOrder = async (orders) => {
    const { data } = await API.createOrder(orders)
    localStorage.removeItem("cart")
    return data
}

export const getAllMyOrders = async (userId) => {
    const { data } = await API.getAllMyOrders(userId)
    return data
}