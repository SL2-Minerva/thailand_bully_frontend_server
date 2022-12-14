import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (campaignId?: string, reload?: boolean, platformId?: string, start_date?: any, end_date?: any, period?: any ) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard/overall?campaign_id=${campaignId}`,
      method: 'GET',
      params :{
        source: platformId || "",
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

export const TotalMessagePerDay = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response = {
    data: {
      total_message : 40000,
      average_message: 5600, 
      comparison : '+5000',
      percentage : '10%'
    }
  }

  return {
    resultTotalMessagePerDay: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetTotalEngagement = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response = {
    data: {
      total_engagement : 35000,
      average_engagement: 5500, 
      comparison : '+3000',
      percentage : '20%'
    }
  }

  return {
    resultTotalEngagement: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetTotalAccount = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response = {
    data: {
      total_account : 35000,
      average_account : 5500, 
      comparison : '+3000',
      percentage : '20%'
    }
  }

  return {
    resultTotalAccount: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetKeyWords = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response : any[] = [];

  for (let i = 0; i<7; i++ ) {
    response.push({
      id: i + 1, 
      keyword: 'keyword name',
      message: 200,
      engagement: 20000,
      accounts: 200,
      average_message: 93.2, 
      average_engagement: 967.3
    })
  }
  
  return {
    resultKeywords: response || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetTopKeywords = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const main_keyword : any[] = [];
  const top_sites : any[] = [];
  const top_hastag : any[] = [];


  for (let i = 0; i<7; i++ ) {
    main_keyword.push({
      id: i+1,
      keyword: 'keywordName',
      no_of_message: 200,
      percentage: 18
    });
    top_sites.push({
      id: i+1,
      site_domain: 'www.google.com',
      no_of_message: 4000,
      percentage: 18
    });
    top_hastag.push({
      id: i+1,
      hashtag: '#hashtag2',
      no_of_message: 400,
      percentage: 8
    })
  };

  const response = {
    data : {
      main_keyword: main_keyword, 
      top_sites: top_sites,
      top_hastag: top_hastag
    }
  }
  
  return {
    resultTopKeywords: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetSentimentScore = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response = {
    data:  {
      neutral_value : 3.50,
      sentiment_percentage : 65, 
      pervious_sentiment: 2.3
    }
  }

  return {
    resultSentimentScore: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}

export const GetSentimentType = () => {

  // const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
  //   url: `/dashboard/totalMessage`,
  //   method: 'GET',
  //   data: {
  //     reload: reload
  //   }
  // })

  const response = {
    data:  {
      positive_percentage : 10,
      neutral_percentage: 50,
      negative_percentage: 40
  }
  }

  return {
    resultSentimentType: response?.data || null,

    // loadingFilterData: loading,
    // errorFilterData: error
  }
}