import api from "./api.service"

const ENDPOINT = "/users"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${+id}`)
  return response.data
}

const create = async (user) => {
  const response = await api.post(ENDPOINT, user)
  return response.data
}

const update = async (id, user) => {
  const response = await api.put(`${ENDPOINT}/${id}`, user)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const UserService = {
  getAll,
  getOneById,
  create,
  update,
  remove
}

export default UserService