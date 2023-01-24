import moment from "moment"
import { CallAPI } from "src/services/CallAPI"

export const FilterByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-bully/bully-daily`,
        method: 'GET',
        params :{
            campaign_id: campaignId || "",
            start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
            end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
            period: period,
            fillter_keywords: fillter_keywords
        }
    })

    return {
      resultFilterData: res?.data || null,
      loadingFilterData: loading,
      errorFilterData: error
    }
}

export const BullyLevelPercentage = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-percentage`,
      method: 'GET',
      params :{
          campaign_id: campaignId || "",
          start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
          end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
          period: period,
          fillter_keywords: fillter_keywords
      }
  })

  return {
    resultBullyLevelPercentage: res?.data || null,
    loadingBullyLevelPercentage: loading,
    errorBullyLevelPercentage: error
  }
}

export const GetBullyByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-day`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    })

    return {
      resultBullyByDay: res?.data || null,
      loadingBullyByDay : loading,
      errorBullyByDay: error
    }
}

export const GetBullyByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-time`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyByTime: res?.data || null,
    loadingBullyByTime : loading,
    errorBullyByTime : error
  }
}

export const GetBullyByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-device`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyByDevice: res?.data || null,
    loadingBullyByDevice : loading,
    errorBullyByDevice : error
  }
}

export const GetBullyByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-account`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyByAccount: res?.data || null,
    loadingBullyByAccount : loading,
    errorBullyByAccount: error
  }
}

export const GetBullyByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-channel`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyByChannel: res?.data || null,
    loadingBullyByChannel : loading,
    errorBullyByChannel : error
  }
}

export const GetBullyBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-sentiment`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    })
  
    return {
      resultBullyBySentiment: res?.data || null,
      loadingBullyBySentiment : loading,
      errorBullyBySentiment : error
    }
  }

  export const FilterBullyTypeByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-type-daily`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    })

    return {
      resultBullyTypeFilterData: res?.data || null,
      loadingBullyTypeFilterData: loading,
      errorBullyTypeFilterData: error
    }
}

export const BullyTypePercentage = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-percentage-daily`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyTypePercentage: res?.data || null,
    loadingBullyTypePercentage: loading,
    errorBullyTypePercentage: error
  }
}

export const GetBullyTypeByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-type-day`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    })

    return {
      resultBullyTypeByDay: res?.data || null,
      loadingBullyTypeByDay : loading,
      errorBullyTypeByDay: error
    }
}

export const GetBullyTypeByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-time`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyTypeByTime: res?.data || null,
    loadingBullyTypeByTime : loading,
    errorBullyTypeByTime : error
  }
}

export const GetBullyTypeByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-device`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyTypeByDevice: res?.data || null,
    loadingBullyTypeByDevice : loading,
    errorBullyTypeByDevice : error
  }
}

export const GetBullyTypeByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-account`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyTypeByAccount: res?.data || null,
    loadingBullyTypeByAccount : loading,
    errorBullyTypeByAccount : error
  }
}

export const GetBullyTypeByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-channel`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultBullyTypeByChannel: res?.data || null,
    loadingBullyTypeByChannel : loading,
    errorBullyTypeByChannel: error
  }
}

export const GetBullyTypeBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-bully/bully-type-sentiment`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    })
  
    return {
      resultBullyTypeBySentiment: res?.data || null,
      loadingBullyTypeBySentiment : loading,
      errorBullyTypeBySentiment: error
    }
  }

export const GetShareOfChannelChart = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-bully/bully-chart-level`,
        method: 'GET',
        params :{
          campaign_id: campaignId || "",
          start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
          end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
          period: period,
          fillter_keywords: fillter_keywords
        }
      })

    return {
        resultShareOfChannelChart: res?.data || null,
        loadingShareOfChannelChart : loading,
        errorShareOfChannelChart : error
      }
}

export const GetShareOfChannelPlatforms = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-bully/bully-table-level`,
        method: 'GET',
        params :{
          campaign_id: campaignId || "",
          start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
          end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
          period: period,
          fillter_keywords: fillter_keywords
        }
    })

    return {
        resultShareOfChannelPlatform: res?.data || null,
        loadingShareOfChannelPlatform : loading,
        errorShareOfChannelPlatform : error
      }
}

export const GetShareOfChannelChartBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-bully/bully-chart-type`,
        method: 'GET',
        params :{
          campaign_id: campaignId || "",
          start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
          end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
          period: period,
          fillter_keywords: fillter_keywords
        }
      })

    return {
        resultShareOfChannelChartBullyLevel: res?.data || null,
        loadingShareOfChannelChartBullyLevel : loading,
        errorShareOfChannelChartBullyLevel: error
      }
}

export const GetShareOfChannelBullyLevels = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-bully/bully-table-type`,
        method: 'GET',
        params :{
          campaign_id: campaignId || "",
          start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
          end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
          period: period,
          fillter_keywords: fillter_keywords
        }
    })

    return {
        resultShareOfChannelBullyLevels: res?.data || null,
        loadingShareOfChannelBullyLevel : loading,
        errorShareOfChannelBullyLevel : error
      }
}