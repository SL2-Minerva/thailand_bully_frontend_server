import { init } from 'i18next'
import { CallAPI } from 'src/services/CallAPI'
import { number } from 'yup'

const CreateCampaign = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/campaign/create`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    result_campaign_create: data?.data,
    loading_campaign_create: loading,
    error_campaign_create: error,
    create_campaign: (userInput: any) => {
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

export const CampaignList = (reload?: boolean, is_fillter?: boolean, fillter?: any, page?: number) => {
  let query = ''
  
  if (is_fillter) {
    query = `?${Object.keys(fillter)
      .map(key => `${key}=${fillter[key]}`)
      .join('&')}`
  }
  let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 10
      }
    }

  const [{ data: res, loading, error }, refetch] = CallAPI<{ data?: any }>({
    url: `/campaign/list/${query}`,
    method: 'GET',
    params: params,
    data: {
      reload: reload
    }
  })
  
  return {
    resultCampaiganList: res?.data || null,
    total: res?.data?.total || 0,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}

export default CreateCampaign
