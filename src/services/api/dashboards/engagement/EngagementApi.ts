import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
      const params = {
        campaign_id: campaignId,
        start_date: start_date? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      };
  
      const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-engagement/engagement-trnsaction`,
        method: 'GET',
        params : params
      })

      return {
        resultFilterData: res?.data || null,
        loadingFilterData: loading,
        errorFilterData: error
      }
  }

  export const GetEngagementBy = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-by`,
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
      resultEngagementByDay: res?.data?.EngagementByDay || null,
      resultEngagementByTime: res?.data?.EngagementByTime || null,
      resultEngagementByDevice: res?.data?.EngagementByDevice || null,
      resultEngagementByAccount: res?.data?.EngagementByAccount || null,
      resultEngagementChannel: res?.data?.EngagementChannel || null,
      resultKeywordByEngagementType: res?.data?.keywordByEngagementType || null,
      loadingEngagementBy : loading,
      errorEngagementBy: error
    }
}

export const GetMessagesByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-day`,
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
      resultMessagesByDay: res?.data || null,
      loadingMessagesByDay : loading,
      errorMessagesByDay: error
    }
}

export const GetMessagesByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-time`,
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
    resultMessagesByTime: res?.data || null,
    loadingMessagesByTime : loading,
    errorMessagesByTime : error
  }
}

export const GetMessagesByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-device`,
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
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice : loading,
    errorMessagesByDevice : error
  }
}

export const GetMessagesByEngagementType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/keyword-by-engagement-type`,
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
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice : loading,
    errorMessagesByDevice : error
  }
}

export const GetMessagesByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-account`,
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
    resultMessagesByAccount: res?.data || null,
    loadingMessagesByAccount : loading,
     errorMessagesByAccount : error
  }
}

export const GetMessagesByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-channel`,
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
    resultMessagesByChannel: res?.data || null,
    loadingMessagesByChannel : loading,
    errorMessagesByChannel: error
  }
}

export const EngagementTypePercetage = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string) => {
    const params = {
      campaign_id: campaignId,
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "", 
      period: period,
      fillter_keywords: fillter_keywords
    };

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-type`,
      method: 'GET',
      params : params
    })

    return {
      resultEngagementType: res?.data || null,
      loadingEngagementType: loading,
      errorEngagementType: error
    }
}

export const GetEngagementTypeByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-type-by-day`,
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
      resultEngagementTypeByDay: res?.data || null,
      loadingEngagementTypeByDay : loading,
      errorEngagementTypeByDay : error
    }
}

export const GetEngagementTypeByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-time`,
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
    resultEngagementTypeByTime: res?.data || null,
    loadingEngagementTypeByTime : loading,
    errorEngagementTypeByTime: error
  }
}

export const GetEngagementTypeByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-device`,
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
    resultEngagementTypeByDevice: res?.data || null,
    loadingEngagementTypeByDevice : loading,
    errorEngagementTypeByDevice : error
  }
}

export const GetEngagementTypeByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-account`,
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
    resultEngagementTypeByAccount: res?.data || null,
    loadingEngagementTypeByAccount : loading,
    errorEngagementTypeByAccount : error
  }
}

export const GetEngagementTypeByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-channel`,
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
    resultEngagementTypeByChannel: res?.data || null,
    loadingEngagementTypeByChannel : loading,
    errorEngagementTypeByChannel: error
  }
}

export const GetTotalEngagment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-comparison`,
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
      resultTotalEngagement: res?.data || null,
      loadingTotalEngagement : loading,
      errorTotalEngagement : error
    }
  }

  export const GetPeriodComparisonByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-period-platform`,
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
      resultPeriodComparisonByChannel: res?.data || null,
      loadingPeriodComparisonByChannel : loading,
      errorPeriodComparisonByChannel: error
    }
  }

  export const GetPeriodComparisonBySenitment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-period-sentiment`,
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
      resultPeriodComparisonBySenitment: res?.data || null,
      loadingPeriodComparisonBySenitment : loading,
      errorPeriodComparisonBySenitment: error
    }
  }

  export const GetEngagementComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-type-comparison`,
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
      resultEngagementComparison: res?.data || null,
      loadingEngagementComparison : loading,
      errorEngagementComparison : error
    }
  }

  export const GetComparisonEngagement = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
      const params = {
        campaign_id: campaignId,
        start_date: moment(start_date).format('YYYY-MM-DD'),
        end_date: moment(end_date).format('YYYY-MM-DD'), 
        period: period,
        fillter_keywords: fillter_keywords
      };
  
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-action-comparison`,
      method: 'GET',
      params : params
    })

    return {
      resultComparison: response?.data || null,
      loadingComparison: loading,
      errorComparison : error
    }
  }

  export const GetSummary = (topKeyword: string, campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-infulencer`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords,
        page: page, 
        limit: 10, 
        select: topKeyword
      }
    })
  
    return {
      resultSummary: res?.data || null,
      totalSummary: res?.data?.total || 0, 
      loadingSummary : loading,
      errorSummary: error
    }
  }