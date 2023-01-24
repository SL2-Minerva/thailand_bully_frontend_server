import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetPercentageChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string) => {
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/percentage-of-channel`,
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
      resultPercentageChannel: response?.data || null,
      loadingPercentageChannel: loading,
      errorPercentageChannel: error
    }
  }

export const GetDailyChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/daily-channel`,
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
      resultDailyChannel: res?.data || null,
      loadingDailyChannel: loading,
      errorDailyChannel: error
    }
}

export const GetChannelByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {
    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/channel-day`,
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
      resultChannelByDay: res?.data || null,
      loadingChannelByDay : loading,
      errorChannelByDay: error
    }
}


export const GetChannelByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-time`,
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
    resultChannelByTime: res?.data || null,
    loadingChannelByDay : loading,
    errorChannelByDay: error
  }
}

export const GetChannelByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-device`,
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
    resultChannelByDevice: res?.data || null,
    loadingChannelByDevice : loading,
    errorChannelByDevice: error
  }
}

export const GetChannelBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-sentiment`,
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
    resultChannelBySentiment: res?.data || null,
    loadingChannelBySentiment : loading,
    errorChannelBySentiment : error
  }
}

export const GetChannelByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-account`,
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
    resultChannelByAccount: res?.data || null,
    loadingChannelByAccount : loading,
    errorChannelByAccount: error
  }
}


export const GetChannelByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-level`,
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
    resultChannelByBullyLevel: res?.data || null,
    loadingChannelByBullyLevel: loading,
    errorChannelByBullyLevel: error
  }
}

export const GetChannelByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-type`,
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
    resultChannelByBullyType: res?.data || null,
    loadingChannelByBullyType : loading,
    errorChannelByBullyType: error
  }
}

export const GetComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string) => {

    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/period-over-period`,
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
      resultFacebookComparison: response?.data?.facebook || null,
      resultInstagramComparison: response?.data?.instagram || null,
      resultTwitterComparison: response?.data?.twitter || null,
      resultYoutubeComparison: response?.data?.youtube || null,
      resultPantipComparison: response?.data?.pantip || null,
      loadingTotalComparison: loading,
      errorTotalComparison: error
    }
}

export const GetEngagementRate = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/engagement-rate`,
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
      resultEngagementRate: res?.data || null,
      loadingEngagementRate: loading,
      errorEngagementRate: error
    }
}

export const GetEngagementRatePrevious = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/engagement-rate-previous`,
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
    resultEngagementRatePrevious: res?.data || null,
    loadingEngagementRatePrevious: loading,
    errorEngagementRatePrevious: error
  }
}

export const GetSentimentScore = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/sentiment-score`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords
      }
    }) 

  //   const data = {
  //     "status": 200,
  //     "msg": "success",
  //     "data": {
  //         "labels": [
  //             "facebook",
  //             "twitter",
  //             "youtube",
  //             "instagram",
  //             "google",
  //             "pantip"
  //         ],
  //         "value": {
  //             "current_period": {
  //                 "id": 5,
  //                 "keyword_name": "current period",
  //                 "data": [
  //                     0,
  //                     16,
  //                     83,
  //                     0,
  //                     0,
  //                     0
  //                 ]
  //             }
  //         }
  //     }
  // }

    return {
      resultSentimentScore : res?.data || null,
      loadingSentimentScore: loading,
      errorSentimentScore: error
    }
}

export const GetSentimentScorePrevious = (campaignId?: string, start_date?: any, end_date?: any, period?: any, fillter_keywords?: string ) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/sentiment-score-previous`,
    method: 'GET',
    params :{
      campaign_id: campaignId || "",
      start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
      period: period,
      fillter_keywords: fillter_keywords
    }
  }) 

//    const data = {
//     "status": 200,
//     "msg": "success",
//     "data": {
//         "labels": [
//             "facebook",
//             "twitter",
//             "youtube",
//             "instagram",
//             "google",
//             "pantip"
//         ],
//         "value": {
//             "previous_period": {
//                 "id": 5,
//                 "keyword_name": "previous period",
//                 "data": [
//                     0,
//                     26,
//                     112,
//                     0,
//                     0,
//                     0
//                 ]
//             }
//         }
//     }
// }

  return {
    resultSentimentScorePrevious : res?.data || null,
    loadingSentimentScorePrevious : loading,
    errorSentimentScorePrevious : error
  }
}

export const GetChannelSentimentLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any,fillter_keywords?: string, previousDate?: any, previousEndDate?: any ) => {

    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/channel-by-sentiment`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords,
        start_date_period : previousDate ? moment(previousDate).format('YYYY-MM-DD') : "",
        end_date_period : previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : "",
      }
    })
  
    return {
      resultChannelSentimentLevel: response?.data || null,
      loadingChannelSentimentLevel: loading,
      errorChannelSentimentLevel: error
    }
  }
  
  export const GetSentimentLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any,fillter_keywords?: string, previousDate?:any, previousEndDate?:any ) => {
  
    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard-channel/sentiment-level`,
      method: 'GET',
      params :{
        campaign_id: campaignId || "",
        start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
        end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
        period: period,
        fillter_keywords: fillter_keywords,
        start_date_period : previousDate ? moment(previousDate).format('YYYY-MM-DD') : "",
        end_date_period : previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : "",
      }
    })
  
    return {
      resultSentimentLevel: response?.data || null,
      loadingSentimentLevel: loading,
      errorSentimentLevel: error
    }
  }