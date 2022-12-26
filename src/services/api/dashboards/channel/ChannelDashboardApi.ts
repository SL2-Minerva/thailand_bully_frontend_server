import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetPercentageChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

    // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/key-stats`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     source: platformId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })
  
    const response = {
        data: {
            previous_period: {
              labels: ["Facebook", "Twitter", "Instagram", "Youtube", "Pantip"],
              data: [395,285,484,128,90],
              total: 57392
            },
            current_period: {
                labels: ["Facebook", "Twitter", "Instagram", "Youtube", "Pantip"],
              data: [623,384,282,238,199],
              total: 38273
            }
        }
    }
  
    return {
      resultPercentageChannel: response?.data || null,
  
    //   loadingTotalKeystats: loading,
    //   errorTotalKeystats: error
    }
  }

export const GetDailyChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/overall`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })

    const res = {
        data: [
            {
                name: 'Facebook',
                data: [44, 55, 41, 67, 22, 43, 21, 49], 
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Twitter',
                data: [13, 23, 20, 8, 13, 27, 33, 12],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Instagram',
                data: [11, 17, 15, 15, 21, 14, 15, 13],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Youtube',
                data: [44, 55, 41, 67, 22, 43, 21, 49],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Pantip',
                data: [30, 23, 20, 8, 13, 27, 33, 12],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }
        ]
    }

    return {
      resultDailyChannel: res?.data || null,

    //   loadingDailyMessage: loading,
    //   errorDailyMessage: error
    }
}

export const GetChannelByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/overall`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })
    const res = {
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            value: [
                {
                    id: 1, 
                    keyword_name : "keyword1",
                    data: [20, 39, 19, 38, 47, 16, 30]
                },
                {
                    id: 2, 
                    keyword_name : "keyword2",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 3, 
                    keyword_name : "keyword3",
                    data: [15, 67, 23, 45, 65, 23, 53]
                },
                {
                    id: 4, 
                    keyword_name : "keyword4",
                    data: [67, 23, 16, 38, 89, 21, 45]
                },
                {
                    id: 5, 
                    keyword_name : "keyword5",
                    data: [45, 23, 56, 22, 35, 67, 21]
                }
            ]
        }
            
    } 

    return {
      resultChannelByDay: res?.data || null,
    
      //   loadingChannelByDay : loading,
    //   errorChannelByDay: error
    }
}


export const GetChannelByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
      data: {
          labels: ["Before 6 AM", "6 AM-12 PM", "12 PM-6 PM", "After 6 PM"],
          value: [
              {
                  id: 1, 
                  keyword_name : "keyword1",
                  data: [20, 39, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "keyword2",
                  data: [12, 16, 23, 56]
              },
              {
                  id: 3, 
                  keyword_name : "keyword3",
                  data: [45, 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "keyword4",
                  data: [67, 89, 21, 45]
              },
              {
                  id: 5, 
                  keyword_name : "keyword5",
                  data: [45, 23, 56, 21]
              }
          ]
      }
          
  } 

  return {
    resultChannelByTime: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetChannelByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
      data: {
          labels: ["Andriod", "Iphone", "Web App"],
          value: [
              {
                  id: 1, 
                  keyword_name : "keyword1",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "keyword2",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "keyword3",
                  data: [ 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "keyword4",
                  data: [67, 89, 45]
              },
              {
                  id: 5, 
                  keyword_name : "keyword5",
                  data: [23, 56, 21]
              }
          ]
      }
          
  } 

  return {
    resultChannelByDevice: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetChannelBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
      data: {
          labels: ["Negative", "Neutral", "Positive"],
          value: [
              {
                  id: 1, 
                  keyword_name : "keyword1",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "keyword2",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "keyword3",
                  data: [ 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "keyword4",
                  data: [67, 89, 45]
              },
              {
                  id: 5, 
                  keyword_name : "keyword5",
                  data: [23, 56, 21]
              }
          ]
      }
          
  } 

  return {
    resultChannelBySentiment: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelBylabels error
  }
}

export const GetChannelByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
      data: {
          labels: ["Infulencer", "Follower"],
          value: [
              {
                  id: 1, 
                  keyword_name : "keyword1",
                  data: [19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "keyword2",
                  data: [16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "keyword3",
                  data: [ 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "keyword4",
                  data: [ 89, 45]
              },
              {
                  id: 5, 
                  keyword_name : "keyword5",
                  data: [ 56, 21]
              }
          ]
      }
          
  } 

  return {
    resultChannelByAccount: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetChannelByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
    data: {
        labels: ["Facebook", "Twitter", "Instagram", "Youtube", "Pantip"],
        value: [
            {
                id: 1, 
                keyword_name : "keyword1",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "keyword2",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "keyword3",
                data: [15, 45, 65, 23, 53]
            },
            {
                id: 4, 
                keyword_name : "keyword4",
                data: [67, 23, 16, 38, 89]
            },
            {
                id: 5, 
                keyword_name : "keyword5",
                data: [45, 23, 56, 67, 21]
            }
        ]
    }      
  } 

  return {
    resultChannelByChannel: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetChannelByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
    data: {
        labels: ["Level 0", "Level 1", "Level 2", "Level 3"],
        value: [
            {
                id: 1, 
                keyword_name : "keyword1",
                data: [19, 38, 47, 16]
            },
            {
                id: 2, 
                keyword_name : "keyword2",
                data: [12, 16, 32, 78]
            },
            {
                id: 3, 
                keyword_name : "keyword3",
                data: [15, 45, 23, 53]
            },
            {
                id: 4, 
                keyword_name : "keyword4",
                data: [67, 16, 38, 89]
            },
            {
                id: 5, 
                keyword_name : "keyword5",
                data: [45, 23, 67, 21]
            }
        ]
    }      
  } 

  return {
    resultChannelByBullyLevel: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetChannelByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

  // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/overall`,
  //   method: 'GET',
  //   params :{
  //     campaign_id: campaignId || "",
  //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
  //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
  //     period: period
  //   },
  //   data: {
  //     reload: reload
  //   }
  // })
  const res = {
    data: {
        labels: ["No Bully", "Gossip", "Harassment", "Exclusion", "Hate Speech"],
        value: [
            {
                id: 1, 
                keyword_name : "keyword1",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "keyword2",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "keyword3",
                data: [15, 45, 65, 23, 53]
            },
            {
                id: 4, 
                keyword_name : "keyword4",
                data: [67, 23, 16, 38, 89]
            },
            {
                id: 5, 
                keyword_name : "keyword5",
                data: [45, 23, 56, 67, 21]
            }
        ]
    }      
  } 

  return {
    resultChannelByBullyType: res?.data || null,
  
    //   loadingChannelByDay : loading,
  //   errorChannelByDay: error
  }
}

export const GetComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

    // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/key-stats`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     source: platformId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })

    const response = {
        data: {
            "facebook": {
                "comparison_value": 40000,
                "percentage": "10",
                "type": "minus"
            },
            "twitter": {
                "comparison_value": 200,
                "percentage": "20",
                "type": "plus"
            },
            "youtube": {
                "comparison_value": 2000,
                "percentage": "10",
                "type": "minus"
            },
            "instagram": {
                "comparison_value": 2000,
                "percentage": "20",
                "type": "plus"
            },
            "pantip": {
                "comparison_value": 100,
                "percentage": "20",
                "type": "plus"
            }
        }
    }
  
    return {
      resultFacebookComparison: response?.data?.facebook || null,
      resultInstagramComparison: response?.data?.instagram || null,
      resultTwitterComparison: response?.data?.twitter || null,
      resultYoutubeComparison: response?.data?.youtube || null,
      resultPantipComparison: response?.data?.pantip || null,

    //   loadingTotalKeystats: loading,
    //   errorTotalKeystats: error
    }
}

export const GetEngagementRate = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/overall`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })
    const res = {
        data: {
            labels: ["facebook", "twitter", "youtube", "instagram", "pantip"],
            value: [
                {
                    id: 1, 
                    keyword_name : "current period",
                    data: [100, 290, 283, 182, 177]
                },
                {
                    id: 2, 
                    keyword_name : "previous period",
                    data: [39,89, 134, 82, 129]
                }
            ]
        }
            
    } 

    return {
      resultEngagementRate: res?.data || null,

    //   loadingDailyMessage: loading,
    //   errorDailyMessage: error
    }
}

export const GetSentimentScore = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard/overall`,
    //   method: 'GET',
    //   params :{
    //     campaign_id: campaignId || "",
    //     start_date : start_date ? moment(start_date).format('YYYY-MM-DD') : "",
    //     end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : "",
    //     period: period
    //   },
    //   data: {
    //     reload: reload
    //   }
    // })
    const res = {
        data: {
            labels: ["facebook", "twitter", "youtube", "instagram", "pantip"],
            value: [
                {
                    id: 1, 
                    keyword_name : "current period",
                    data: [100, 290, 283, 182, 177]
                },
                {
                    id: 2, 
                    keyword_name : "previous period",
                    data: [39,89, 134, 82, 129]
                }
            ]
        }
            
    } 

    return {
      resultSentimentScore : res?.data || null,

    //   loadingDailyMessage: loading,
    //   errorDailyMessage: error
    }
}

export const GetChannelSentimentLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

    const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard/share-of-voice`,
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
      url: `/dashboard/sentiment-level`,
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