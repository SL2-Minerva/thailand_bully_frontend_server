export const FilterByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    // const params = {
    //   campaignId: campaignId,
    //   platformId: platformId, 
    //   start_date: start_date,
    //   end_date: end_date, 
    //   period: period, 
    //   previousDate: previousDate, 
    //   previousEndDate: previousEndDate,
    // };

    // const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    //   url: `/dashboard-overall`,
    //   method: 'GET',
    //   params : GetParams(params),
    // })

    const res = {
      data : {
        "sentiment": [
          {
              "keyword_id": 4,
              "keyword_name": "positive",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-17",
                      "total_at_date": 2
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-18",
                      "total_at_date": 3
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-19",
                      "total_at_date": 10
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-20",
                      "total_at_date": 9
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-21",
                      "total_at_date": 1
                  }
              ]
          },
          {
              "keyword_id": 9,
              "keyword_name": "neutral",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-17",
                      "total_at_date": 2
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-18",
                      "total_at_date": 1
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-19",
                      "total_at_date": 2
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-20",
                      "total_at_date": 2
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-21",
                      "total_at_date": 1
                  },
                  {
                      "source_id": 2,
                      "source_name": "twitter",
                      "date_m": "2022-12-22",
                      "total_at_date": 1
                  }
              ]
          },
          {
            "keyword_id": 9,
            "keyword_name": "negative",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
            "organization_id": 1,
            "organizations_name": "test",
            "value": [
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-17",
                    "total_at_date": 2
                },
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-18",
                    "total_at_date": 1
                },
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-19",
                    "total_at_date": 2
                },
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-20",
                    "total_at_date": 2
                },
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-21",
                    "total_at_date": 1
                },
                {
                    "source_id": 2,
                    "source_name": "twitter",
                    "date_m": "2022-12-22",
                    "total_at_date": 1
                }
            ]
        }
      ],
        "percentage_of_sentitment_current": [
          {
              "keyword_id": 4,
              "keyword_name": "positive",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "date": "17/12/2022 - 23/12/2022",
                      "percentage": "73.53"
                  }
              ]
          },
          {
              "keyword_id": 9,
              "keyword_name": "neutral",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "date": "17/12/2022 - 23/12/2022",
                      "percentage": "26.47"
                  }
              ]
          },
          {
            "keyword_id": 4,
            "keyword_name": "negative",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
            "organization_id": 1,
            "organizations_name": "test",
            "value": [
                {
                    "date": "17/12/2022 - 23/12/2022",
                    "percentage": "73.53"
                }
            ]
        }
      ],
          "percentage_of_sentitment_previous": [
            {
                "keyword_id": 4,
                "keyword_name": "บันเทิง",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "date": "16/12/2022 - 22/12/2022",
                        "percentage": "65.85"
                    }
                ]
            },
            {
                "keyword_id": 9,
                "keyword_name": "แต่งงาน",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "date": "16/12/2022 - 22/12/2022",
                        "percentage": "34.15"
                    }
                ]
            },
            {
                "keyword_id": 4,
                "keyword_name": "negative",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "date": "16/12/2022 - 22/12/2022",
                        "percentage": "73.53"
                    }
                ]
            }
        ]
      }
    }

    return {
      resultFilterData: res?.data || null,

      // loadingFilterData: loading,
      // errorFilterData: error
    }
}

export const GetSenitmemntByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                    keyword_name : "Negative",
                    data: [20, 39, 19, 38, 47, 16, 30]
                },
                {
                    id: 2, 
                    keyword_name : "Neutral",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 3, 
                    keyword_name : "Positive",
                    data: [15, 67, 23, 45, 65, 23, 53]
                }
            ]
        }
            
    } 

    return {
      resultSentimentByDay: res?.data || null,
    
      //   loadingSentimentByDay : loading,
    //   errorSentimentByDay: error
    }
}

export const GetSentimentByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Negative",
                  data: [20, 39, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Neutral",
                  data: [12, 16, 23, 56]
              },
              {
                  id: 3, 
                  keyword_name : "Positive",
                  data: [45, 65, 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultSentimentByTime: res?.data || null,
  
    //   loadingSentimentByDay : loading,
  //   errorSentimentByDay: error
  }
}

export const GetSentimentByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Negative",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Neutral",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Positive",
                  data: [ 65, 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultSentimentByDevice: res?.data || null,
  
    //   loadingSentimentByDay : loading,
  //   errorSentimentByDay: error
  }
}

export const GetSentimentByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Negative",
                  data: [19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Neutral",
                  data: [16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Negative",
                  data: [ 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultSentimentByAccount: res?.data || null,
  
    //   loadingSentimentByDay : loading,
  //   errorSentimentByDay: error
  }
}

export const GetSentimentByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                keyword_name : "Negative",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "Neutral",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "Positive",
                data: [15, 45, 65, 23, 53]
            }
        ]
    }      
  } 

  return {
    resultSentimentByChannel: res?.data || null,
  
    //   loadingSentimentByDay : loading,
  //   errorSentimentByDay: error
  }
}

export const GetSentimentByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Negative",
                  data: [19, 38, 47, 16]
              },
              {
                  id: 2, 
                  keyword_name : "Neutral",
                  data: [12, 16, 32, 78]
              },
              {
                  id: 3, 
                  keyword_name : "Positive",
                  data: [15, 45, 23, 53]
              }
          ]
      }      
    } 
  
    return {
      resultSentimentByBullyLevel: res?.data || null,
    
      //   loadingSentimentByDay : loading,
    //   errorSentimentByDay: error
    }
  }
  
export const GetSentimentByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                keyword_name : "Negative",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "Neutral",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "Positive",
                data: [15, 45, 65, 23, 53]
            }
        ]
    }      
} 

return {
    resultSentimentByBullyType: res?.data || null,

    //   loadingSentimentByDay : loading,
//   errorSentimentByDay: error
}
}

export const GetTotalSentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            totalSentiment : {
                totalValue : "1.2M", 
                comparison: '-1%',
                type: "minus",
            },
            positive : {
                totalValue : "800K", 
                comparison: '3%',
                type: "plus",
            }, 
            neutral : {
                totalValue : "20K", 
                comparison: '-3%',
                type: "minus",
            }, 
            negative : {
                totalValue : "1.45M", 
                comparison: '-1%',
                type: "minus",
            }
        } 
    }
  
    return {
      resultTotalSentiment: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSenitmentComparisonByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                    keyword_name : "Previous",
                    data: [19, 38, 47, 16, 30]
                },
                {
                        id: 2, 
                        keyword_name : "Current",
                        data: [15, 45, 65, 23, 53]
                    },
            ],
          positive: ['-30%','-30%','-30%','-30%','-30%'],
          neutral: ['-23%','-23%','-23%','-23%','-23%'],
          negative: ['-56%','-56%','-56%','-56%','-56%']
      }      
    } 
  
    return {
      resultSenitmentComparisonByChannel: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSenitmentComparisonByEngagement = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
          labels: ["Share", 'Comment', 'Reaction'],
          value: [
              {
                  id: 1, 
                  keyword_name : "Previous",
                  data: [ 47, 16, 30]
              },
              {
                  id: 2, 
                  keyword_name : "Current",
                  data: [12, 16,  78]
              }
          ],
          positive: ['-30%','-30%','-30%'],
          neutral: ['-23%','-23%','-23%'],
          negative: ['-56%','-56%','-56%']
      }      
    } 
  
    return {
      resultSenitmentComparisonByEngagement: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
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
        senitment_score_data : [
            {
                keyword_name: "keyword 1",
                sentimentScore: 3.20,
                previous_period: 2.55,
                type: 'plus',
                hightlightColor: 'neutral'
            },
            {
                keyword_name: "keyword 2",
                sentimentScore: 4.70,
                previous_period: 4.60,
                type: 'plus',
                hightlightColor: 'positive'
            },
            {
                keyword_name: "keyword 3",
                sentimentScore: 1.80,
                previous_period: 2.75,
                type: 'minus',
                hightlightColor: 'negative'
            },
            {
                keyword_name: "keyword 4",
                sentimentScore: 4.90,
                previous_period: 2.60,
                type: 'minus',
                hightlightColor: 'positive'
            },
            {
                keyword_name: "keyword 5",
                sentimentScore: 3.10,
                previous_period: 4.0,
                type: 'minus',
                hightlightColor: 'neutral'
            },
          ],
        senitment_score_percentage : [
            {
                "keyword_id": 1,
                "keyword_name": "keyword_name 1",
                "campaign_id": 1,
                "campaign_name": "campaign_name 1",
                "organization_id": 1,
                "organizations_name": "organizations_name 1",
                "negative": 10,
                "neutral": 60,
                "positive": 40
            },
            {
                "keyword_id": 2,
                "keyword_name": "keyword_name 2",
                "campaign_id": 2,
                "campaign_name": "campaign_name 1",
                "organization_id": 2,
                "organizations_name": "organizations_name 1",
                "negative": 20,
                "neutral": 20,
                "positive": 60
            },
            {
                "keyword_id": 3,
                "keyword_name": "keyword_name 3",
                "campaign_id": 3,
                "campaign_name": "campaign_name 1",
                "organization_id": 3,
                "organizations_name": "organizations_name 1",
                "negative": 60,
                "neutral": 30,
                "positive": 20
            },
            {
                "keyword_id": 4,
                "keyword_name": "keyword_name 4",
                "campaign_id": 4,
                "campaign_name": "campaign_name 1",
                "organization_id": 4,
                "organizations_name": "organizations_name 1",
                "negative": 10,
                "neutral": 30,
                "positive": 60
            },
            {
                "keyword_id": 5,
                "keyword_name": "keyword_name 5",
                "campaign_id": 5,
                "campaign_name": "campaign_name 1",
                "organization_id": 5,
                "organizations_name": "organizations_name 1",
                "negative": 10,
                "neutral": 60,
                "positive": 30
            }
        ]
      }
    }
  
    return {
      resultSenitmentScore: res?.data?.senitment_score_data || null,
      resultSentimentScorePercentage : res?.data?.senitment_score_percentage || null

      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSentimentComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            keyword_name: "keyword 1",
            total : 500,
            comparison: {
                value: '-500',
                percentage : '-20',
                type: 'minus'
            },
            share: {
                value: '80',
                percentage : '5',
                type: 'plus'
            },
            comment: {
                value: '-200',
                percentage : '-10',
                type: 'minus'
            },
            reaction: {
                value: '-380',
                percentage : '-2',
                type: 'minus'
            }
        },
        {
            keyword_name: "keyword 2",
            total : 1000,
            comparison: {
                value: '-500',
                percentage : '-20',
                type: 'minus'
            },
            share: {
                value: '80',
                percentage : '5',
                type: 'plus'
            },
            comment: {
                value: '-200',
                percentage : '-10',
                type: 'minus'
            },
            reaction: {
                value: '-380',
                percentage : '-2',
                type: 'minus'
            }
        },
        {
            keyword_name: "keyword 3",
            total : 2000,
            comparison: {
                value: '-500',
                percentage : '-20',
                type: 'minus'
            },
            share: {
                value: '80',
                percentage : '5',
                type: 'plus'
            },
            comment: {
                value: '-200',
                percentage : '-10',
                type: 'minus'
            },
            reaction: {
                value: '-380',
                percentage : '-2',
                type: 'minus'
            }
        },
        {
            keyword_name: "keyword 4",
            total : 300,
            comparison: {
                value: '-500',
                percentage : '-20',
                type: 'minus'
            },
            share: {
                value: '80',
                percentage : '5',
                type: 'plus'
            },
            comment: {
                value: '-200',
                percentage : '-10',
                type: 'minus'
            },
            reaction: {
                value: '-380',
                percentage : '-2',
                type: 'minus'
            }
        },
        {
            keyword_name: "keyword 5",
            total : 3000,
            comparison: {
                value: '-500',
                percentage : '-20',
                type: 'minus'
            },
            share: {
                value: '80',
                percentage : '5',
                type: 'plus'
            },
            comment: {
                value: '-200',
                percentage : '-10',
                type: 'minus'
            },
            reaction: {
                value: '-380',
                percentage : '-2',
                type: 'minus'
            }
        }
      ]
    }
  
    return {
      resultSentimentComparison: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSummaryByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            infulencer: "User 1",
            sentiment_score : 3.9, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            infulencer: "User 2",
            sentiment_score : 2.7, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            infulencer: "User 3",
            sentiment_score : 2.9, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            infulencer: "User 4",
            sentiment_score : 2.1, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            infulencer: "User 5",
            sentiment_score : 2.4, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            infulencer: "User 6",
            sentiment_score : 3.8, 
            positive : 30,
            neutral: 70,
            negative: 10
        }
      ]
    }
  
    return {
      resultSummaryByAccount: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSummaryByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            channel: "Facebook",
            sentiment_score : 3.9, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            channel: "Twitter",
            sentiment_score : 2.7, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            channel: "Youtube",
            sentiment_score : 2.9, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            channel: "Instagram",
            sentiment_score : 2.1, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            channel: "Pantip",
            sentiment_score : 2.4, 
            positive : 30,
            neutral: 70,
            negative: 10
        }
      ]
    }
  
    return {
        resultSummaryByChannel: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

  export const GetSummaryByKeywords = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            keyword: "Keyword 1",
            total_messages : 212, 
            percentage: 61,
            positive : 30,
            neutral: 45,
            negative: 5
        },
        {
            keyword: "Keyword 2",
            total_messages : 75, 
            percentage: 22, 
            positive : 30,
            neutral: 70,
            negative: 10
        },
        {
            keyword: "Keyword 3",
            total_messages : 29, 
            percentage: 8,
            positive : 25,
            neutral: 25,
            negative: 50
        },
        {
            keyword: "Keyword 4",
            total_messages : 20, 
            percentage: 6, 
            positive : 30,
            neutral: 40,
            negative: 30
        },
        {
            keyword: "Keyword 5",
            total_messages : 10, 
            percentage: 3,
            positive : 15,
            neutral: 50,
            negative: 35
        }
      ]
    }
  
    return {
        resultSummaryByKeywords: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
  }

 