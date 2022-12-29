import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetPercentageChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/percentage-of-channel`,
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
      resultPercentageChannel: response?.data || null,
      loadingPercentageChannel: loading,
      errorPercentageChannel: error
    }
  }

export const GetDailyChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/daily-channel`,
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
      resultDailyChannel: res?.data || null,
      loadingDailyChannel: loading,
      errorDailyChannel: error
    }
}

export const GetChannelByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/channel-day`,
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
      resultChannelByDay: res?.data || null,
      loadingChannelByDay : loading,
      errorChannelByDay: error
    }
}


export const GetChannelByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-time`,
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
    resultChannelByTime: res?.data || null,
    loadingChannelByDay : loading,
    errorChannelByDay: error
  }
}

export const GetChannelByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-device`,
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
    resultChannelByDevice: res?.data || null,
    loadingChannelByDevice : loading,
    errorChannelByDevice: error
  }
}

export const GetChannelBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-sentiment`,
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
    resultChannelBySentiment: res?.data || null,
    loadingChannelBySentiment : loading,
    errorChannelBySentiment : error
  }
}

export const GetChannelByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-account`,
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
    resultChannelByAccount: res?.data || null,
    loadingChannelByAccount : loading,
    errorChannelByAccount: error
  }
}


export const GetChannelByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-level`,
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
    resultChannelByBullyLevel: res?.data || null,
    loadingChannelByBullyLevel: loading,
    errorChannelByBullyLevel: error
  }
}

export const GetChannelByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-type`,
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
    resultChannelByBullyType: res?.data || null,
    loadingChannelByBullyType : loading,
    errorChannelByBullyType: error
  }
}

export const GetComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/period-over-period`,
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
      resultFacebookComparison: response?.data?.facebook || null,
      resultInstagramComparison: response?.data?.instagram || null,
      resultTwitterComparison: response?.data?.twitter || null,
      resultYoutubeComparison: response?.data?.youtube || null,
      resultPantipComparison: response?.data?.pantip || null,
      loadingTotalComparison: loading,
      errorTotalComparison: error
    }
}

export const GetEngagementRate = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/engagement-rate`,
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
      resultEngagementRate: res?.data || null,
      loadingEngagementRate: loading,
      errorEngagementRate: error
    }
}

export const GetSentimentScore = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/sentiment-score`,
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
      resultSentimentScore : res?.data || null,
      loadingSentimentScore: loading,
      errorSentimentScore: error
    }
}

export const GetChannelSentimentLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/channel-by-sentiment`,
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
      resultChannelSentimentLevel: response?.data || null,
      loadingChannelSentimentLevel: loading,
      errorChannelSentimentLevel: error
    }
  }
  
  export const GetSentimentLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
  
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/sentiment-level`,
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
      resultSentimentLevel: response?.data || null,
      loadingSentimentLevel: loading,
      errorSentimentLevel: error
    }
  }