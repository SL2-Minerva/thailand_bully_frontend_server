import { CallAPI } from '../../CallAPI'

export const role_list = (reload?: boolean, paged?: boolean, filter?: string, org_id?: number) => {
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
      const inputData = userInput

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

export const UserPermissionMock = () => {
  const response = {
    "user": {
        "authorized_create": 0,
        "authorized_view": 1,
        "authorized_edit": 1,
        "authorized_delete": 0,
        "authorized_export": 0,
        "id": 17
    },
    "campaign": {
        "authorized_create": 1,
        "authorized_view": 1,
        "authorized_edit": 0,
        "authorized_delete": 1,
        "authorized_export": 0,
        "id": 18
    },
    "dashboard": {
        "authorized_create": 1,
        "authorized_view": 0,
        "authorized_edit": 0,
        "authorized_delete": 1,
        "authorized_export": 1,
        "id": 19
    },
    "report": {
        "authorized_create": 1,
        "authorized_view": 1,
        "authorized_edit": 0,
        "authorized_delete": 1,
        "authorized_export": 1,
        "id": 20
    }
  }

  return {
    resultPermission: response || null,
  }
}

export default RolesService
