import {CallAPI} from "../../CallAPI";

export const userlist = (paged?: number, filter?: string) => {
  const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
    url: `/user/list`,
    method: 'GET',
    data: { paged, filter}
  });
  return{
    resultUserList: res?.data ||  null,
    loadingUserList: loading,
    errorUserlist: error,
  }
}


const UserService = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/user/update`,
      method: 'POST'
    },
    { manual: true }
  )
  return {
    result_user_create: data?.data,
    loading_user_create: loading,
    error_user_create: error,
    update_user: (userInput: any) => {
      let inputData = userInput

      return new Promise((resolve, reject) => {
        store({
          data: inputData
        })
          .then(({ data: { data, code, message } }) => {
            if (code === 0) {
              reject(message)
            } else {
              resolve(data)
            }
          })
          .catch(ex => {
            reject(ex.toString())
          })
      })
    }
  }
}

export default UserService
