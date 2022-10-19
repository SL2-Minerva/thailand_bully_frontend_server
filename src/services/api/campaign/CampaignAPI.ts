import { CallAPI } from 'src/services/CallAPI'

export const CreateCampaign = () => {
  const [{ data, loading, error }, store] = CallAPI<{ code: 0 | 1; message: string; data: any }>(
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

export const CampaignList = () => {
  const [{ data: res, loading, error }, refetch] = CallAPI<{ data?: any }>({
    url: `/campaign/list`,
    method: 'GET'
  })
  return {
    resultCampaiganList: res?.data || null,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}

// export default CreateCampaign
