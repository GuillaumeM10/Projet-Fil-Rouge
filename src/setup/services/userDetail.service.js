import api from "./api.service";

const ENDPOINT = "/users-details"

const update = async (id, userDetail) => {
  console.log(userDetail);
  console.log(id);

  let response

  if(
    userDetail.cv
    || userDetail.banner
    || userDetail.profile
    || userDetail.files
  ) {
    const formData = new FormData();

    const files = Array.from(userDetail.files)
    files.forEach((file, index) => {
      // console.log(file);
      formData.append('files', file)
    })
    formData.append('cv', userDetail.cv)
    formData.append('banner', userDetail.banner)
    formData.append('personalPicture', userDetail.profile)


    response = await api.put(`${ENDPOINT}/${id}`, formData, { formData: true })
  }else{
    response = await api.put(`${ENDPOINT}/${id}`, userDetail)
  }
  return response.data
}

const UserDetailService = {
  update
}

export default UserDetailService