const ENDPOINT = "/replies"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

// const getAllByAuthor = async (author) => {
//   const response = await api.get(`${ENDPOINT}?author=${author}`)
//   return response.data
// }

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (reply) => {
  const response = await api.post(ENDPOINT, reply)
  return response.data
}

const update = async (id, reply) => {
  const response = await api.put(`${ENDPOINT}/${id}`, reply)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const ReplyService = {
  getAll,
  // getAllByAuthor,
  getOneById,
  create,
  update,
  remove
}

export default ReplyService