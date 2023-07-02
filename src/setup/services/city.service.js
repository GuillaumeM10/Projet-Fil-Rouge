import api from "./api.service"

const ENDPOINT = "/cities"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (city) => {
  const response = await api.post(ENDPOINT, city)
  return response.data
}

const update = async (id, city) => {
  const response = await api.put(`${ENDPOINT}/${id}`, city)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const CityService = {
  getAll,
  getOneById,
  create,
  update,
  remove
}

export default CityService