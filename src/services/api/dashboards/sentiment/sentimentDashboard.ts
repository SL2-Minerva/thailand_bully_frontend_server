import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/sentiment-daily`,
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
      resultFilterData: res?.data || null,
      loadingFilterData: loading,
      errorFilterData: error
    }
}

export const GetSenitmemntByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/sentiment-day`,
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
      resultSentimentByDay: res?.data || null,
      loadingSentimentByDay : loading,
      errorSentimentByDay: error
    }
}

export const GetSentimentByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-time`,
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
    resultSentimentByTime: res?.data || null,
    loadingSentimentByTime : loading,
    errorSentimentByTime: error
  }
}

export const GetSentimentByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-device`,
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
    resultSentimentByDevice: res?.data || null,
    loadingSentimentByDevice : loading,
    errorSentimentByDevice : error
  }
}

export const GetSentimentByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-account`,
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
    resultSentimentByAccount: res?.data || null,
    loadingSentimentByAccount : loading,
    errorSentimentByAccount : error
  }
}

export const GetSentimentByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-channel`,
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
    resultSentimentByChannel: res?.data || null,
    loadingSentimentByChannel : loading,
    errorSentimentByChannel : error
  }
}

export const GetSentimentByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/sentiment-bully-level`,
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
      resultSentimentByBullyLevel: res?.data || null,
      loadingSentimentByBullyLevel : loading,
      errorSentimentByBullyLevel : error
    }
  }
  
export const GetSentimentByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-bully-type`,
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
        resultSentimentByBullyType: res?.data || null,
        loadingSentimentByBullyType : loading,
        errorSentimentByBullyType : error
    }
}

export const GetTotalSentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
        url: `/dashboard-sentiment/period-over-period`,
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
      resultTotalSentiment: res?.data || null,
      loadingTotalSentiment : loading,
      errorTotalSentiment: error
    }
  }

  export const GetSenitmentComparisonByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/comparison-channel`,
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
      resultSenitmentComparisonByChannel: res?.data || null,
      loadingSenitmentComparisonByChannel : loading,
      errorSenitmentComparisonByChannel : error
    }
  }

  export const GetSenitmentComparisonByEngagement = (campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/comparison-engagement-type`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        page: page, 
        limit : 10
      }
    })
  
    return {
      resultSentimentComparisonByEngagement: res?.data || null,
      total: res?.data?.total || null, 
      loadingSenitmentComparisonByEngagement : loading,
      errorSenitmentComparisonByEngagement : error
    }
  }

  export const GetSentimentScore = (campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/sentiment-score`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period, 
        page: page, 
        limit: 10
      }
    })
  
    return {
      resultSenitmentScore: res?.data?.senitment_score_data || null,
      total : res?.data?.senitment_score_data?.total || 0,
      resultSentimentScorePercentage : res?.data?.senitment_score_percentage || null,
      loadingSentimentScore : loading,
      errorSentimentScore: error
    }
  }

  export const GetSentimentComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/sentiment-comparison`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period, 
        page: page, 
        limit: 10
      }
    })
  
    return {
      resultSentimentComparison: res?.data || null,
      total : res?.data?.total || 0,
      loadingSentimentComparison : loading,
      errorSenitmentComparison: error
    }
  }

  export const GetSummaryByAccount = (topAccount: string, campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/summary-score-account`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period, 
        page: page, 
        limit: 10, 
        select: topAccount
      }
    })
  
    return {
      resultSummaryByAccount: res?.data || null,
      total : res?.data?.total || 0,
      loadingSummaryByAccount : loading,
      errorSummaryAccount : error
    }
  }

  export const GetSummaryByChannel = (topChannel: string,campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/summary-score-channel`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period, 
        page : page, 
        limit : 0, 
        select: topChannel
      }
    })
  
    return {
        resultSummaryByChannel: res?.data || null,
        total : res?.data?.total || 0 , 
        loadingSummaryByChannel : loading,
        errorSummaryByChannel: error
    }
  }

  export const GetSummaryByKeywords = (topKeyword: string, campaignId?: string, start_date?: any, end_date?: any, period?: any, page?: number ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-sentiment/summary-keyword`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period, 
        page : page, 
        limit : 10, 
        select: topKeyword
      }
    })

    return {
        resultSummaryByKeywords: res?.data || null,
        total : res?.data?.total || 0, 
        loadingSummaryByKeywords : loading,
        errorSummaryByKeywords : error
    }
  }

 