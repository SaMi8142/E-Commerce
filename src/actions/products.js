import { productsConstants } from '../reducers/constants'
import * as API from '../api'

export const fetchAllProducts = async () => {
    const { data } = await API.fetchProducts();
    return { type: productsConstants.FETCH_ALL, payload: data }
}

export const postProduct = async (product) => {
    const { data } = await API.createProduct(product) //CALLING THE CONTROLLER -> response
    return { type: productsConstants.ADD_PRODUCT, payload: data }
}

export const getOneProduct = async (id) => {
    const { data } = await API.getProduct(id);
    return data.product
}

export const editProduct = async (product, id) => {
    const { data } = await API.updateProduct(product, id)
    console.log('edit', data)
    return { type: productsConstants.UPDATE_PRODUCT, payload: data.product }
}

export const deleteProduct = async (id) => {
    const { data } = await API.deleteProduct(id)
    console.log('DELETED', data)
    return { type: productsConstants.DELETE_PRODUCT, payload: id }
}