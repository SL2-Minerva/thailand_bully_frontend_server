import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetPercentageMessage = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
            labels: ["keyword1", "keyword2", "keyword3"],
            data: [395,285,484],
            total: 57392
          },
          current_period: {
            labels: ["keyword1", "keyword2", "keyword3"],
            data: [623,384,282],
            total: 38273
          }
      }
  }

  return {
    resultPercentageMessage: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetDailyMessages = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
                name: 'Keyword 1',
                data: [44, 55, 41, 67, 22, 43, 21, 49], 
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Keyword 2',
                data: [13, 23, 20, 8, 13, 27, 33, 12],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Keyword 3',
                data: [11, 17, 15, 15, 21, 14, 15, 13],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Keyword 4',
                data: [44, 55, 41, 67, 22, 43, 21, 49],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }, {
                name: 'Keyword 5',
                data: [30, 23, 20, 8, 13, 27, 33, 12],
                date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10']
              }
        ]
    }

    return {
      resultDailyMessage: res?.data || null,

    //   loadingDailyMessage: loading,
    //   errorDailyMessage: error
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
          labels: ["Post Owner", "Follower"],
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

export const GetMessagesByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByBullyLevel: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetMessagesByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
    resultMessagesByBullyType: res?.data || null,
  
    //   loadingMessagesByDay : loading,
  //   errorMessagesByDay: error
  }
}

export const GetNumbersOfAccounts = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean ) => {

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
              name: 'Keyword 1',
              data: [44, 55, 41, 67, 22, 43, 21, 49, 29, 36], 
              date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10', '09/10', '10/10']
            }, {
              name: 'Keyword 2',
              data: [13, 23, 20, 8, 13, 27, 33, 12,29, 34],
              date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10','09/10', '10/10']
            }, {
              name: 'Keyword 3',
              data: [11, 17, 15, 15, 21, 14, 15, 13, 65, 29],
              date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10','09/10', '10/10']
            }, {
              name: 'Keyword 4',
              data: [44, 55, 41, 67, 22, 43, 21, 49, 58, 37],
              date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10','09/10', '10/10']
            }, {
              name: 'Keyword 5',
              data: [30, 23, 20, 8, 13, 27, 33, 12,62, 43],
              date: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10','07/10', '08/10','09/10', '10/10']
            }
      ]
  }

  return {
    resultNumbersOfAccounts: res?.data || null,

  //   loadingDailyMessage: loading,
  //   errorDailyMessage: error
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
        "total_messages": {
            "total_message": 40000,
            "percentage": "10",
            "type": "minus"
        },
        "total_accounts": {
            "total_account": 200,
            "percentage": "20",
            "type": "plus"
        }}
    }
  
    return {
      resultTotalMessages: response?.data?.total_messages || null,
      resultTotalAccount: response?.data?.total_accounts || null,

    //   loadingTotalKeystats: loading,
    //   errorTotalKeystats: error
    }
}

export const GetDayTimeComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
        data: [{
            name: 'Mon.',
            data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
          },
          {
            name: 'Tue.',
            data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
          },
          {
            name: 'Wed.',
            data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
          },
          {
            name: 'Thu.',
            data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
          },
          {
            name: 'Fri.',
            data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
          },
          {
            name: 'Sat.',
            data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
          },
          {
            name: 'Sun.',
            data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
          }
        ]
    }
  
    return {
      resultDayTimeComparison: response?.data || null,

    //   loadingTotalKeystats: loading,
    //   errorTotalKeystats: error
    }
}

export const GetDayTimeBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
            day_value: [{
                name: 'Negative',
                data: [10,20,30,40,50,60,70]
              },
              {
                name: 'Neutral',
                data: [10,20,30,20,60,100,70]
              },
              {
                name: 'Positive',
                data: [10,20,20,20,60,100,20]
              }
            ],
            time_value: [{
                name: 'Negative',
                data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
              },
              {
                name: 'Neutral',
                data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
              },
              {
                name: 'Positive',
                data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
              }
            ],
        }
    }
  
    return {
      resultDayBySentiment: response?.data?.day_value || null,
      resultTimeBySentiment: response?.data?.time_value || null,


    //   loadingTotalKeystats: loading,
    //   errorTotalKeystats: error
    }
}

export const GetDayTimeByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
            day_value: [{
              name: 'level 3',
              data: [10,20,30,40,50,60,70]
            },
            {
              name: 'level 2',
              data: [10,20,30,20,60,100,70]
            },
            {
              name: 'level 1',
              data: [10,20,20,20,60,100,20]
            },
            {
              name: 'level 0',
              data: [10,20,30,20,60,100,74]
            }
          ],
          time_value: [{
            name: 'level 3',
            data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
          },
          {
            name: 'level 2',
            data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
          },
          {
            name: 'level 1',
            data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
          },
          {
            name: 'level 0',
            data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
          }
        ],
      }
  }

  return {
    resultDayByBullyLevel: response?.data?.day_value || null,
    resultTimeByBullyLevel: response?.data?.time_value || null,


  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetDayTimeByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          day_value: [{
            name: 'Hate Speech',
            data: [10,20,30,40,50,60,70]
          },
          {
            name: 'Exclusion',
            data: [10,20,30,20,60,100,70]
          },
          {
            name: 'Harassment',
            data: [10,20,20,20,60,100,20]
          },
          {
            name: 'Gossip',
            data: [10,20,30,20,60,100,74]
          },
          {
            name: 'No Bully',
            data: [10,20,30,20,60,100,70]
          },
        ],
          time_value: [{
              name: 'Hate Speech',
              data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
            },
            {
              name: 'Exclusion',
              data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
            },
            {
              name: 'Harassment',
              data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
            },
            {
              name: 'Gossip',
              data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
            },
            {
              name: 'No Bully',
              data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
            },
          ]
      }
  }

  return {
    resultDayByBullyType: response?.data?.day_value || null,
    resultTimeByBullyType: response?.data?.time_value || null,


  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetPlatformsComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
            labels: ["Facebook", "Instagram", "Pantip", "Twitter", "Youtube"],
            data: [395,285,484, 291, 499],
            total: 57392
          },
          current_period: {
            labels: ["Facebook", "Instagram", "Pantip", "Twitter", "Youtube"],
            data: [623,384,282, 483,823],
            total: 38273
          }
      }
  }

  return {
    resultPlatformComparison: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetDevicesComparison = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
            labels: ["Andriod", "Iphone", "Web App"],
            data: [395, 291, 499],
            total: 7392
          },
          current_period: {
            labels: ["Andriod", "Iphone", "Web App"],
            data: [623, 483,823],
            total: 3273
          }
      }
  }

  return {
    resultDevicesComparison: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetDeviceVsChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          labels: [
            ['Andriod', 'Facebook'],
            ['iPhone', 'Twitter'],
            ['Web', 'Youtube']
          ],
          data: [ 44, 50, 6 ]
      }
  }

  return {
    resultDeviceVsChannel: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetKeywordComparisonByChannel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          labels: ['Facebook', 'Pantip', 'Twitter', 'Youtube', 'Instagram' ],
          data: [{
            name: 'All',
            data : [45,28,45,98,73]
          }
          ,{
            name: 'Keyword 1',
            data: [80, 50, 30, 40, 100],
          }, {
            name: 'Keyword 2',
            data: [20, 30, 40, 80, 20],
          }, {
            name: 'Keyword 3',
            data: [44, 76, 78, 13, 43],
          }, {
            name: 'Keyword 4',
            data: [20, 30, 48, 23, 53],
          }, {
            name: 'Keyword 5',
            data: [45, 26, 38, 53, 13],
        }]
      }
  }

  return {
    resultKeywordComparisonByChannel: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetKeywordComparisonBySentiment = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          labels: ['Positive', 'Negative', 'Neutral' ],
          data: [{
            name: 'All',
            data: [100, 150, 200],
          },{
            name: 'Keyword 1',
            data: [80, 50, 100],
          }, {
            name: 'Keyword 2',
            data: [20, 40, 10]
          }, {
            name: 'Keyword 3',
            data: [44, 76, 45],
          }, {
            name: 'Keyword 4',
            data: [20, 30, 12],
          }, {
            name: 'Keyword 5',
            data: [45, 26, 30],
        }]
      }
  }

  return {
    resultKeywordComparisonBySentiment: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetKeywordComparisonByBullyLevel = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          labels: ['Level 0', 'Level 1', 'Level 2', 'Level 3'],
          data: [{
            name: 'All',
            data: [100, 150, 200, 150],
          },{
            name: 'Keyword 1',
            data: [80, 50, 100, 49],
          }, {
            name: 'Keyword 2',
            data: [20, 40, 10, 19]
          }, {
            name: 'Keyword 3',
            data: [44, 76, 45, 100],
          }, {
            name: 'Keyword 4',
            data: [20, 30, 12, 30],
          }, {
            name: 'Keyword 5',
            data: [45, 26, 30, 80]
        }]
      }
  }

  return {
    resultKeywordComparisonByBullyLevel: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}

export const GetKeywordComparisonByBullyType = (campaignId?: string, start_date?: any, end_date?: any, period?: any, reload?: boolean) => {

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
          labels: ['No Bully', 'Gossip', 'Harassment', 'Exclusion', 'Hate Speech'],
          data: [{
            name: 'All',
            data : [45,28,45,98,73]
          },{
            name: 'Keyword 1',
            data: [80, 50, 100, 49, 60],
          }, {
            name: 'Keyword 2',
            data: [20, 40, 10, 19, 100]
          }, {
            name: 'Keyword 3',
            data: [44, 76, 45, 100, 30],
          }, {
            name: 'Keyword 4',
            data: [20, 30, 12, 30, 80],
          }, {
            name: 'Keyword 5',
            data: [45, 26, 30, 80, 100 ]
        }]
      }
  }

  return {
    resultKeywordComparisonByBullyType: response?.data || null,

  //   loadingTotalKeystats: loading,
  //   errorTotalKeystats: error
  }
}