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
        "bully_level": [
          {
              "id": 1,
              "bully_level": "Level 1",
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
              "id": 2,
              "bully_level": "Level 1",
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
            "id": 3,
            "bully_level": "Level 2",
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
          },{
            "id": 4,
            "bully_level": "Level 3",
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
        }
      ],
        "percentage_of_bully_current": [
          {
             "id": 1,
              "bully_level": "Level 0",
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
              "id": 2,
              "bully_level": "Level 1",
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
            "id": 3,
            "bully_level": "Level 2",
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
            "id": 4,
            "bully_level": "Level 3",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
            "organization_id": 1,
            "organizations_name": "test",
            "value": [
                {
                    "date": "17/12/2022 - 23/12/2022",
                    "percentage": "33.53"
                }
            ]
        }
      ],
          "percentage_of_bully_previous": [
            {
                "id": 1,
                "bully_level": "Level 0",
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
                "id": 1,
                "bully_level": "Level 0",
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
              "id": 3,
              "bully_level": "Level 2",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "date": "17/12/2022 - 23/12/2022",
                      "percentage": "21.53"
                  }
              ]
            },
            {
                "id": 4,
                "bully_level": "Level 3",
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

export const GetBullyByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                    keyword_name : "Level 0",
                    data: [20, 39, 19, 38, 47, 16, 30]
                },
                {
                    id: 2, 
                    keyword_name : "Level 1",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 3, 
                    keyword_name : "Level 2",
                    data: [15, 67, 23, 45, 65, 23, 53]
                },
                {
                    id: 4, 
                    keyword_name : "Level 3",
                    data: [12, 16, 23, 56, 32, 15, 78]
                }
            ]
        }
            
    } 

    return {
      resultBullyByDay: res?.data || null,
    
      //   loadingBullyByDay : loading,
    //   errorBullyByDay: error
    }
}

export const GetBullyByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Level 0",
                  data: [20, 39, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Level 1",
                  data: [12, 16, 23, 56]
              },
              {
                  id: 3, 
                  keyword_name : "Level 2",
                  data: [45, 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Level 3",
                  data: [29, 35, 63, 33]
              }
          ]
      }
          
  } 

  return {
    resultBullyByTime: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Level 0",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Level 1",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Level 2",
                  data: [ 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Level 3",
                  data: [ 10, 33, 46]
              }
          ]
      }
          
  } 

  return {
    resultBullyByDevice: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "Level 0",
                  data: [19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Level 1",
                  data: [16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Level 2",
                  data: [ 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Level 3",
                  data: [ 35, 15]
              }
          ]
      }
          
  } 

  return {
    resultBullyByAccount: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                keyword_name : "Level 0",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "Level 1",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "Level 2",
                data: [15, 45, 65, 23, 53]
            },
            {
                id: 4, 
                keyword_name : "Level 3",
                data: [25, 65, 25, 28, 23]
            }
        ]
    }      
  } 

  return {
    resultBullyByChannel: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            labels: ["Positive", "Neutral", "Negative"],
            value: [
                {
                    id: 1, 
                    keyword_name : "Level 0",
                    data: [20, 19, 38]
                },
                {
                    id: 2, 
                    keyword_name : "Level 1",
                    data: [12, 16, 23]
                },
                {
                    id: 3, 
                    keyword_name : "Level 2",
                    data: [ 65, 23, 53]
                },
                {
                    id: 4, 
                    keyword_name : "Level 3",
                    data: [ 23, 17, 34 ]
                }
            ]
        }
            
    } 
  
    return {
      resultBullyBySentiment: res?.data || null,
    
      //   loadingBullyByDay : loading,
    //   errorBullyByDay: error
    }
  }

  export const FilterBullyTypeByCampaignId = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
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
        "bully_type": [
          {
              "id": 1,
              "bully_type": "Level 1",
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
              "id": 2,
              "bully_type": "Level 1",
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
            "id": 3,
            "bully_type": "Level 2",
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
          },{
            "id": 4,
            "bully_type": "Level 3",
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
        }
      ],
        "percentage_of_bully_current": [
          {
             "id": 1,
              "bully_type": "Level 0",
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
              "id": 2,
              "bully_type": "Level 1",
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
            "id": 3,
            "bully_type": "Level 2",
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
            "id": 4,
            "bully_type": "Level 3",
            "campaign_id": 2,
            "campaign_name": "ข่าวบันเทิง",
            "organization_id": 1,
            "organizations_name": "test",
            "value": [
                {
                    "date": "17/12/2022 - 23/12/2022",
                    "percentage": "33.53"
                }
            ]
        }
      ],
          "percentage_of_bully_previous": [
            {
                "id": 1,
                "bully_type": "Level 0",
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
                "id": 1,
                "bully_type": "Level 0",
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
              "id": 3,
              "bully_type": "Level 2",
              "campaign_id": 2,
              "campaign_name": "ข่าวบันเทิง",
              "organization_id": 1,
              "organizations_name": "test",
              "value": [
                  {
                      "date": "17/12/2022 - 23/12/2022",
                      "percentage": "21.53"
                  }
              ]
            },
            {
                "id": 4,
                "bully_type": "Level 3",
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
      resultBullyTypeFilterData: res?.data || null,

      // loadingFilterData: loading,
      // errorFilterData: error
    }
}

export const GetBullyTypeByDay = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                    keyword_name : "No Bully",
                    data: [20, 39, 19, 38, 47, 16, 30]
                },
                {
                    id: 2, 
                    keyword_name : "Gossip",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 3, 
                    keyword_name : "Harassment",
                    data: [15, 67, 23, 45, 65, 23, 53]
                },
                {
                    id: 4, 
                    keyword_name : "Exclusion",
                    data: [12, 16, 23, 56, 32, 15, 78]
                },
                {
                    id: 5, 
                    keyword_name : "Hate Speech",
                    data: [12, 16, 23, 56, 32, 15, 78]
                }
            ]
        }
            
    } 

    return {
      resultBullyTypeByDay: res?.data || null,
    
      //   loadingBullyByDay : loading,
    //   errorBullyByDay: error
    }
}

export const GetBullyTypeByTime = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "No Bully",
                  data: [20, 39, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Gossip",
                  data: [12, 16, 23, 56]
              },
              {
                  id: 3, 
                  keyword_name : "Harassment",
                  data: [45, 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Exclusion",
                  data: [29, 35, 63, 33]
              },
              {
                  id: 5, 
                  keyword_name : "Hate Speech",
                  data: [12, 16, 23, 56]
              }
          ]
      }
          
  } 

  return {
    resultBullyTypeByTime: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyTypeByDevice = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "No Bully",
                  data: [20, 19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Gossip",
                  data: [12, 16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Harassment",
                  data: [ 65, 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Exclusion",
                  data: [ 10, 33, 46]
              },
              {
                  id: 5, 
                  keyword_name : "Hate Speech",
                  data: [12, 16, 23]
              }
          ]
      }
          
  } 

  return {
    resultBullyTypeByDevice: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyTypeByAccount = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                  keyword_name : "No Bully",
                  data: [19, 38]
              },
              {
                  id: 2, 
                  keyword_name : "Gossip",
                  data: [16, 23]
              },
              {
                  id: 3, 
                  keyword_name : "Harassement",
                  data: [ 23, 53]
              },
              {
                  id: 4, 
                  keyword_name : "Exclusion",
                  data: [ 35, 15]
              },
              {
                  id: 5, 
                  keyword_name : "Hate Speech",
                  data: [ 35, 15]
              }
          ]
      }
          
  } 

  return {
    resultBullyTypeByAccount: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyTypeByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                keyword_name : "No Bully",
                data: [19, 38, 47, 16, 30]
            },
            {
                id: 2, 
                keyword_name : "Gossip",
                data: [12, 16, 32, 15, 78]
            },
            {
                id: 3, 
                keyword_name : "Harassement",
                data: [15, 45, 65, 23, 53]
            },
            {
                id: 4, 
                keyword_name : "Exclusion",
                data: [25, 65, 25, 28, 23]
            },
            {
                id: 5, 
                keyword_name : "Hate Speech",
                data: [15, 45, 65, 23, 53]
            }
        ]
    }      
  } 

  return {
    resultBullyTypeByChannel: res?.data || null,
  
    //   loadingBullyByDay : loading,
  //   errorBullyByDay: error
  }
}

export const GetBullyTypeBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
            labels: ["Positive", "Neutral", "Negative"],
            value: [
                {
                    id: 1, 
                    keyword_name : "No Bully",
                    data: [20, 19, 38]
                },
                {
                    id: 2, 
                    keyword_name : "Gossip",
                    data: [12, 16, 23]
                },
                {
                    id: 3, 
                    keyword_name : "Harassment",
                    data: [ 65, 23, 53]
                },
                {
                    id: 4, 
                    keyword_name : "Exclusion",
                    data: [ 23, 17, 34 ]
                },
                {
                    id: 5, 
                    keyword_name : "Hate Speech",
                    data: [12, 16, 23]
                }
            ]
        }
            
    } 
  
    return {
      resultBullyTypeBySentiment: res?.data || null,
    
      //   loadingBullyByDay : loading,
    //   errorBullyByDay: error
    }
  }

export const GetShareOfChannelChart = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const response = {
        "status": 200,
        "msg": "success",
        "data": [
            {
                "keyword_name": "all",
                "number_of_massage": "92"
            },
            {
                "keyword_name": "No Bully",
                "number_of_massage": "23"
            },
            {
                "keyword_name": "Gossip",
                "number_of_massage": "23"
            },
            {
                "keyword_name": "Harassment",
                "number_of_massage": "60"
            },
            {
                "keyword_name": "Exclusion",
                "number_of_massage": "45"
            },
            {
                "keyword_name": "Hate Speech",
                "number_of_massage": "39"
            }
        ]
    }

    return {
        resultShareOfChannelChart: response?.data || null,
      
        //   loadingBullyByDay : loading,
      //   errorBullyByDay: error
      }
}

export const GetShareOfChannelPlatform = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const response = {
        "status": 200,
        "msg": "success",
        "data": [
            {
                "id": 1,
                "keyword_name": "all",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "No Bully",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Gossip",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Harassment",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Exclusion",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Hate Speech",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
        ]
    }

    return {
        resultShareOfChannelPlatform: response?.data || null,
      
        //   loadingBullyByDay : loading,
      //   errorBullyByDay: error
      }
}

export const GetShareOfChannelChartBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const response = {
        "status": 200,
        "msg": "success",
        "data": [
            {
                "keyword_name": "all",
                "number_of_massage": "92"
            },
            {
                "keyword_name": "Level 0",
                "number_of_massage": "23"
            },
            {
                "keyword_name": "Level 1",
                "number_of_massage": "23"
            },
            {
                "keyword_name": "Level 2",
                "number_of_massage": "60"
            },
            {
                "keyword_name": "Level 3",
                "number_of_massage": "45"
            }
        ]
    }

    return {
        resultShareOfChannelChartBullyLevel: response?.data || null,
      
        //   loadingBullyByDay : loading,
      //   errorBullyByDay: error
      }
}

export const GetShareOfChannelBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {
    const response = {
        "status": 200,
        "msg": "success",
        "data": [
            {
                "id": 1,
                "keyword_name": "all",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Level 0",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Level 1",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Level 2",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            },
            {
                "id": 1,
                "keyword_name": "Level 3",
                "campaign_id": 2,
                "campaign_name": "ข่าวบันเทิง",
                "organization_id": 1,
                "organizations_name": "test",
                "value": [
                    {
                        "channel": "facebook",
                        "percentage": "30"
                    },
                    {
                        "channel": "twitter",
                        "percentage": "30"
                    },
                    {
                        "channel": "youtube",
                        "percentage": "10"
                    },
                    {
                        "channel": "instagram",
                        "percentage": "20"
                    },
                    {
                        "channel": "pantip",
                        "percentage": "15"
                    }
                ]
            }
        ]
    }

    return {
        resultShareOfChannelBullyLevel: response?.data || null,
      
        //   loadingBullyByDay : loading,
      //   errorBullyByDay: error
      }
}