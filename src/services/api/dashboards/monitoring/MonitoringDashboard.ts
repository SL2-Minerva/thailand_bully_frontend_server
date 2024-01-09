import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

const getParams = (data: any) => {
  if (!data) return null

  let params = {}
  const todayDate = moment(new Date()).format('YYYY-MM-DD')

  const previousDate = data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : ''
  const previousEndDate = data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : ''

  if (data?.period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: data?.campaign_id || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      start_date_period: previousDate,
      end_date_period: previousEndDate,
      fillter_keywords: data?.fillter_keywords
    }
  } else {
    params = {
      campaign_id: data?.campaign_id || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      fillter_keywords: data?.fillter_keywords
    }
  }

  return params
}

export const GetDailyMonitoring = (
    params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/daily-by`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultDailyMonitoring: res?.data || null,
    loadingDailyMonitoring: loading,
    errorDailyMonitoring: error
  }
}

export const GetTopEngagementMonitoring = (
    params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/top-engagement`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultTopEngagement: res?.data || null,
    loadingTopEngagement: loading,
    errorDailyMonitoring: error
  }
}

export const GetEngagementPostMonitoring = (params: any, select?: any, page?: number) => {
  if (select) {
    params.select = select
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/engagement-post`,
    method: 'GET',
    params: {
      ...params,
      page: page,
      limit: 10
    }
  })

  return {
    resultSummary: res?.data || null,
    loadingSummary: loading,
    errorSummary: error
  }
}

