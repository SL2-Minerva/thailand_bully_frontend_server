import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetParams = (data : any) => {
  if(!data) return null;
  let params = {};
  const todayDate = new Date();

  if (data?.period === 'customrange' && data?.previousDate !== todayDate && data?.previousEndDate !== todayDate) {
    params = {
      campaign_id : data?.campaignId || "",
      source: data?.platformId || "",
      start_date : data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : "",
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : "",
      period: data?.period,
      start_date_period : data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : "",
      end_date_period : data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : "",
    } 
  }else {
      params = {
        campaign_id : data?.campaignId || "",
        source: data?.platformId || "",
        start_date : data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : "",
        end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : "",
        period: data?.period
      }
    }

  return params;
}

export const FilterByCampaignId = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate,
    };

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-overall`,
      method: 'GET',
      params : GetParams(params),
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
export const TotalKeyStats = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/key-stats`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultTotalMessagePerDay: response?.data?.total_messages || null,
    resultTotalEngagement: response?.data?.total_engagement || null,
    resultTotalAccount: response?.data?.total_accounts || null,
    loadingTotalKeystats: loading,
    errorTotalKeystats: error
  }
}

export const GetKeyWords = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };
  const [{ data: response, loading, error }] = CallAPI<{ data: any }>({
    url: `/dashboard-overall/keyword-summary`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultKeywords: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetTopKeywords = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/keyword-summary-top`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultTopKeywords: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSentimentScore = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-score`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultSentimentScore: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSentimentType = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-type`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultSentimentType: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetShareOfVoice = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/share-of-voice`,
    method: 'GET',
    params : GetParams(params),
    data: {
      reload: reload
    }
  })

  return {
    resultShareOfVoice: response?.data || null,
    loadingShareOfVoice: loading,
    errorShareOfVoice: error
  }
}

export const GetSentimentLevel = (campaignId?: string, reload?: boolean, platformId?: string, 
  start_date?: any, end_date?: any, period?: any, previousDate?: any, previousEndDate?: any ) => {
    const params = {
      campaignId: campaignId,
      platformId: platformId, 
      start_date: start_date,
      end_date: end_date, 
      period: period, 
      previousDate: previousDate, 
      previousEndDate: previousEndDate
    };

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-level`,
    method: 'GET',
    params : GetParams(params),
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

export const GetWordClouds = (campaignId?: string, reload?: boolean, platformId?: string, start_date?: any,
   end_date?: any, period?: any, select?: string, previousDate?: any, previousEndDate?: any ) => {
    let params = {};
    const todayDate = new Date();
    if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate ) {
      params = {
        campaign_id: campaignId || "",
        source: platformId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        select: select || "top10",
        start_date_period : previousDate ? moment(previousDate).format('YYYY-MM-DD') : "",
        end_date_period : previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : "",
      }
    } else  {
      params = {
        campaign_id: campaignId || "",
        source: platformId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        select: select || "top10"
      }
    }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds`,
    method: 'GET',
    params : params,
    data: {
      reload: reload
    }
  })

  return {
    resultWordClouds: response?.data || null,
    loadingWordClouds: loading,
    errorWordClouds: error
  }
}

export const GetDetailMessage = (campaignId?: string, platformId?: string, start_date?: any,
  end_date?: any, period?: any, previousDate?: any, previousEndDate?: any, keywordId?: any ) => {
   let params = {};
   const todayDate = new Date();
   if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate ) {
     params = {
       campaign_id: campaignId || "",
       source: platformId || "",
       start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
       end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
       period: period,
       keyword_id: keywordId || "",
       start_date_period : previousDate ? moment(previousDate).format('YYYY-MM-DD') : "",
       end_date_period : previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : "",
     }
   } else  {
     params = {
       campaign_id: campaignId || "",
       source: platformId || "",
       start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
       end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
       period: period,
       keyword_id: keywordId || ""
     }
   }
 const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
   url: `/dashboard-overall/daily-message/level-three/`,
   method: 'GET',
   params : params
 })

 return {
   resultMessageDetail: response?.data || null,
   loadingMessageDetail: loading,
   errorMessageDetail: error
 }
}

export const GetNetworkGraph = (campaignId?: string, platformId?: string, start_date?: any,
  end_date?: any, period?: any, previousDate?: any, previousEndDate?: any, keywordId?: any, messageId?: any ) => {
   let params = {};
   const todayDate = new Date();
   if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate ) {
     params = {
       campaign_id: campaignId || "",
       source: platformId || "",
       start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
       end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
       period: period,
       keyword_id: keywordId || "",
       message_id: messageId || "",
       start_date_period : previousDate ? moment(previousDate).format('YYYY-MM-DD') : "",
       end_date_period : previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : "",
     }
   } else  {
     params = {
       campaign_id: campaignId || "",
       source: platformId || "",
       start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
       end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
       period: period,
       message_id: messageId || "",
       keyword_id: keywordId || ""
     }
   }
 const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
   url: `/dashboard-overall/daily-message/level-four/`,
   method: 'GET',
   params : params
 })

 return {
   resultNetworkGraph: response?.data || null,
   loadingNetworkGraph: loading,
   errorNetworkGraph: error
 }
}