import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
      const params = {
        campaignId: campaignId,
        start_date: start_date? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      };
  
      const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-engagement/engagement-trnsaction`,
        method: 'GET',
        params : params,
        data: {
          reload: reload
        }
      })

      return {
        resultFilterData: res?.data || null,
        loadingFilterData: loading,
        errorFilterData: error
      }
  }

  export const GetMessagesByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-day`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    })

    return {
      resultMessagesByDay: res?.data || null,
      loadingMessagesByDay : loading,
      errorMessagesByDay: error
    }
}

export const GetMessagesByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-time`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultMessagesByTime: res?.data || null,
    loadingMessagesByTime : loading,
    errorMessagesByTime : error
  }
}

export const GetMessagesByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-device`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice : loading,
    errorMessagesByDevice : error
  }
}

export const GetMessagesByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-account`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultMessagesByAccount: res?.data || null,
    loadingMessagesByAccount : loading,
     errorMessagesByAccount : error
  }
}

export const GetMessagesByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-channel`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultMessagesByChannel: res?.data || null,
    loadingMessagesByChannel : loading,
    errorMessagesByChannel: error
  }
}

export const EngagementTypePercetage = (campaignId?: string, start_date?: any, end_date?: any, period?: any) => {
    const params = {
      campaignId: campaignId,
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "", 
      period: period
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

export const GetEngagementTypeByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-type-by-day`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    }) 

    return {
      resultEngagementTypeByDay: res?.data || null,
      loadingEngagementTypeByDay : loading,
      errorEngagementTypeByDay : error
    }
}

export const GetEngagementTypeByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-time`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultEngagementTypeByTime: res?.data || null,
    loadingEngagementTypeByTime : loading,
    errorEngagementTypeByTime: error
  }
}

export const GetEngagementTypeByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-device`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultEngagementTypeByDevice: res?.data || null,
    loadingEngagementTypeByDevice : loading,
    errorEngagementTypeByDevice : error
  }
}

export const GetEngagementTypeByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-account`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultEngagementTypeByAccount: res?.data || null,
    loadingEngagementTypeByAccount : loading,
    errorEngagementTypeByAccount : error
  }
}

export const GetEngagementTypeByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-channel`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period
    },
    data: {
      reload: reload
    }
  })

  return {
    resultEngagementTypeByChannel: res?.data || null,
    loadingEngagementTypeByChannel : loading,
    errorEngagementTypeByChannel: error
  }
}

export const GetTotalEngagment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-comparison`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    })

    return {
      resultTotalEngagement: res?.data || null,
      loadingTotalEngagement : loading,
      errorTotalEngagement : error
    }
  }

  export const GetPeriodComparisonByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-period-platform`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    }) 
  
    return {
      resultPeriodComparisonByChannel: res?.data || null,
      loadingPeriodComparisonByChannel : loading,
      errorPeriodComparisonByChannel: error
    }
  }

  export const GetPeriodComparisonBySenitment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-period-sentiment`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    })
  
    return {
      resultPeriodComparisonBySenitment: res?.data || null,
      loadingPeriodComparisonBySenitment : loading,
      errorPeriodComparisonBySenitment: error
    }
  }

  export const GetEngagementComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-type-comparison`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    })
  
    return {
      resultEngagementComparison: res?.data || null,
      loadingEngagementComparison : loading,
      errorEngagementComparison : error
    }
  }

  export const GetComparisonEngagement = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
      const params = {
        campaignId: campaignId,
        start_date: moment(start_date).format('YYYY-MM-DD'),
        end_date: moment(end_date).format('YYYY-MM-DD'), 
        period: period
      };
  
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-action-comparison`,
      method: 'GET',
      params : params,
      data: {
        reload: reload
      }
    })

    return {
      resultComparison: response?.data || null,
      loadingComparison: loading,
      errorComparison : error
    }
  }

  export const GetSummary = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-engagement/engagement-infulencer`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period
      },
      data: {
        reload: reload
      }
    })
  
    return {
      resultSummary: res?.data || null,
      loadingSummary : loading,
      errorSummary: error
    }
  }