import api from "./api.service"

const ENDPOINT = "/skills"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (skill) => {
  const response = await api.post(ENDPOINT, skill)
  return response.data
}

const update = async (id, skill) => {
  const response = await api.put(`${ENDPOINT}/${id}`, skill)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const SkillService = {
  getAll,
  getOneById,
  create,
  update,
  remove
}

export default SkillService