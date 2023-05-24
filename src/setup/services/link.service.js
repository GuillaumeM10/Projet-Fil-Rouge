const ENDPOINT = "/links"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (link) => {
  const response = await api.post(ENDPOINT, link)
  return response.data
}

const update = async (id, link) => {
  const response = await api.put(`${ENDPOINT}/${id}`, link)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const LinkService = {
  getAll,
  getOneById,
  create,
  update,
  remove
}

export default LinkService