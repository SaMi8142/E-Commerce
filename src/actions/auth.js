import * as API from '../api'


export const signup = async (user) => {
    const { data } = await API.signup(user)
    localStorage.setItem("auth", JSON.stringify(data))
    return data
}

export const login = async (user) => {
    const { data } = await API.login(user)
    localStorage.setItem("auth", JSON.stringify(data))
    return data
}

export const logout = async () => {
    const { data } = await API.logout()
    localStorage.removeItem('auth')
    console.log(data)
    return data
}