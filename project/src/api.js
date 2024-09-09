import axios from "axios"

const BASE_URL = "http://localhost:3000/users"

export const getUsers = () => {
  return axios.get(BASE_URL)
}

export const addUser = (user) => {
  return axios.post(BASE_URL, user)
}

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/${id}`)
}

export const updateUser = (id, updatedUser) => {
  return axios.put(`${BASE_URL}/${id}`, updatedUser)
}
