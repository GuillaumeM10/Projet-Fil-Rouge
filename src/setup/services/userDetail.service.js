const ENDPOINT = "/users-details"

const update = async (id, userDetail) => {
  const formData = new FormData();

  const files = Array.from(userDetail.files)
  files.forEach((file, index) => {
    // console.log(file);
    formData.append('files', file)
  })
  formData.append('cv', userDetail.cv)
  formData.append('banner', userDetail.banner)
  formData.append('personalPicture', userDetail.profile)


  const response = await api.put(`${ENDPOINT}/${id}`, formData, { formData: true })
  return response.data
}

const UserDetailService = {
  update
}

export default UserDetailService