import { CallAPI } from '../../CallAPI'

export const role_list = (paged?: boolean, filter?: string, org_id?: number, reload?: boolean) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/role/list`,
    method: 'GET',
    data: { paged, filter, org_id, reload }
  })
  return {
    resultRoleList: res?.data || null,
    loadingRoleList: loading,
    errorRoleList: error
  }
}

const RolesService = () => {
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

export default RolesService
