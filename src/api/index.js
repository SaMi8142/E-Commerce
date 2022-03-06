import axios from 'axios'
import { message } from 'antd'

const API_URL = 'https://siddayao-ecommerce.herokuapp.com/' || 'http://localhost:8000' //ENV NOT WORKING


const API = axios.create({ baseURL: API_URL, headers: { Accept: 'application/json' } })

API.interceptors.request.use((req) => {
    const authInfo = JSON.parse(localStorage.getItem('auth'))
    if (authInfo) req.headers.Authorization = `Bearer ${authInfo.token}`
    return req
}, function (error) {
    // Do something with request error
    console.log('INTERCEPTOR: ' + error);

})

API.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    console.log(err.response.data.message, 'RESPONSE')
    if (err.response.data.message === 'Unauthenticated.') localStorage.removeItem('auth')
    message.error(err.response.data.message)
});

//AUTH
export const signup = (user) => API.post('/api/register', user);
export const login = (user) => API.post('/api/login', user);
export const logout = () => API.post('/api/logout');

//PRODUCTS
export const fetchProducts = () => API.get(`/api/products`)
export const createProduct = (product) => API.post(`/api/products`, product)
export const getProduct = (id) => API.get(`/api/products/${id}`)
export const updateProduct = (product, id) => API.put(`/api/products/${id}`, product)
export const deleteProduct = (id) => API.delete(`/api/products/${id}`)

//CREATE ORDERS
export const fetchOrders = () => API.get('/api/orders',) //ADMIN

export const createOrder = (order) => API.post('/api/orders', order)
export const getAllMyOrders = (userId) => API.get(`/api/orders/${userId}`, userId)
