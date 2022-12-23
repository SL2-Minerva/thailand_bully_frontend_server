import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string ) => {
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
          "engagement": [
            {
                "keyword_id": 4,
                "keyword_name": "บันเทิง",
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
                "keyword_name": "แต่งงาน",
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
          "prcentage_of_engagement_current": [
            {
                "keyword_id": 4,
                "keyword_name": "บันเทิง",
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
                "keyword_name": "แต่งงาน",
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
            }
        ],
            "prcentage_of_engagement_previous": [
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

  export const GetMessagesByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
      resultMessagesByDay: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
}

export const GetMessagesByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByTime: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetMessagesByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByDevice: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetMessagesBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesBySentiment: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesBylabels error
  }
}

export const GetMessagesByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByAccount: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetMessagesByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByChannel: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const EngagementTypePercetage = (campaignId?: string, start_date?: any, end_date?: any, period?: any) => {
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
        "engagement": [
          {
              "keyword_id": 1,
              "keyword_name": "Share",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
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
            "keyword_id": 2,
            "keyword_name": "Comment",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
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
            "keyword_id": 3,
            "keyword_name": "Reaction",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
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
        "prcentage_of_engagement_current": [
          {
            "keyword_id": 1,
            "keyword_name": "Share",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
              "value": [
                  {
                      "date": "17/12/2022 - 23/12/2022",
                      "percentage": "35"
                  }
              ]
          },
          {
            "keyword_id": 2,
            "keyword_name": "Comment",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
            "value": [
                {
                    "date": "16/12/2022 - 22/12/2022",
                    "percentage": "45"
                }
            ]
            },
            {
                "keyword_id": 3,
                "keyword_name": "Reaction",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "value": [
                    {
                        "date": "16/12/2022 - 22/12/2022",
                        "percentage": "20"
                    }
                ]
            },
      ],
          "prcentage_of_engagement_previous": [
            {
                "keyword_id": 1,
                "keyword_name": "Share",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                  "value": [
                      {
                          "date": "17/12/2022 - 23/12/2022",
                          "percentage": "30"
                      }
                  ]
              },
              {
                "keyword_id": 2,
                "keyword_name": "Comment",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "value": [
                    {
                        "date": "16/12/2022 - 22/12/2022",
                        "percentage": "30"
                    }
                ]
                },
                {
                    "keyword_id": 3,
                    "keyword_name": "Reaction",
                    "campaign_id": 2,
                    "campaign_name": "ข่าวบันเทิง",
                    "value": [
                        {
                            "date": "16/12/2022 - 22/12/2022",
                            "percentage": "40"
                        }
                    ]
                },
        ]
      }
    }

    return {
      resultEngagementType: res?.data || null,

      // loadingFilterData: loading,
      // errorFilterData: error
    }
}

export const GetEngagementTypeByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                    keyword_name : "Share",
                    data: [20, 39, 19, 38, 47, 16, 30]
                },
                {
                    id: 2, 
                    keyword_name : "Comment",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 3, 
                    keyword_name : "Reaction",
                    data: [15, 67, 23, 45, 65, 23, 53]
                }
            ]
        }
            
    } 

    return {
      resultEngagementTypeByDay: res?.data || null,
    
      //   loadingMessagesByDay : loading,
    //   errorMessagesByDay: error
    }
}

export const GetEngagementTypeByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Share",
                  data: [20, 39, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Comment",
                  data: [12, 16, 23, 56]
              },
              {
                  id: 3, 
                  keyword_name : "Reaction",
                  data: [45, 65, 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultEngagementTypeByTime: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetEngagementTypeByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Share",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Comment",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Reaction",
                  data: [ 65, 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultEngagementTypeByDevice: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetEngagementTypeByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Share",
                  data: [19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Comment",
                  data: [16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Reaction",
                  data: [ 23, 53]
              }
          ]
      }
          
  } 

  return {
    resultEngagementTypeByAccount: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetEngagementTypeByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                keyword_name : "Share",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "Comment",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "Reaction",
                data: [15, 45, 65, 23, 53]
            }
        ]
    }      
  } 

  return {
    resultEngagementTypeByChannel: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}