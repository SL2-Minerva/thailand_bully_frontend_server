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


const UserService = (userId: number) => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/user/update/${userId}`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    result_user_create: data?.data,
    loading_user_create: loading,
    error_user_create: error,
    update_user: (userInput: any) => {
      const inputData = {
        status: userInput
      }

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

export const ForgetPassword = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/user/forget_password`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    result_forgotPassword: data?.data,
    loading_forgotPassword: loading,
    error_forgotPassword: error,
    call_forgotPassword: (email: string) => {
      const formData = new FormData()
      
      formData.append('email', email)

      return new Promise((resolve, reject) => {
        store({
          data: formData
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
