import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetParams = (data: any) => {
  if (!data) return null
  let params = {}
  const todayDate = moment(new Date()).format('YYYY-MM-DD')

  const previousDate = data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : ''
  const previousEndDate = data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : ''

  if (data?.period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: data?.campaignId || '',
      source: data?.platformId || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      start_date_period: previousDate,
      end_date_period: previousEndDate,
      fillter_keywords: data?.fillter_keywords
    }
  } else {
    params = {
      campaign_id: data?.campaignId || '',
      source: data?.platformId || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      fillter_keywords: data?.fillter_keywords
    }
  }

  return params
}

export const FilterByCampaignId = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordIds?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: keywordIds
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultFilterData: res?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}
export const TotalKeyStats = (
  campaignId?: string,
  reload?: boolean,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordIds?: any
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: keywordIds
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/key-stats`,
    method: 'GET',
    params: GetParams(params),
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

export const GetKeyWords = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordIds?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: keywordIds
  }
  const [{ data: response, loading, error }] = CallAPI<{ data: any }>({
    url: `/dashboard-overall/keyword-summary`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultKeywords: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetTopKeywords = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/keyword-summary-top`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultTopKeywords: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSentimentScore = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-score`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultSentimentScore: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSentimentType = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-type`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultSentimentType: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetShareOfVoiceChart = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/share-of-voice-number`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultShareOfVoiceChart: response?.data || null,
    loadingShareOfVoiceChart: loading,
    errorShareOfVoiceChart: error
  }
}

export const GetShareOfVoice = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/share-of-voice`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultShareOfVoice: response?.data || null,
    loadingShareOfVoice: loading,
    errorShareOfVoice: error
  }
}

export const GetSentimentLevel = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-level`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultSentimentLevel: response?.data || null,
    loadingSentimentLevel: loading,
    errorSentimentLevel: error
  }
}

export const GetWordClouds = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  select?: string,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string,
  page?: number
) => {
  let params = {}
  const todayDate = new Date()
  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 7
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 7
    }
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds`,
    method: 'GET',
    params: params
  })

  return {
    resultWordClouds: response?.data || null,
    total: response?.data?.total || 0,
    loadingWordClouds: loading,
    errorWordClouds: error
  }
}

export const GetWordCloudsPlatform = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  select?: string,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string,
  wordCloudPlatform?: string
) => {
  let params = {}
  const todayDate = new Date()
  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      fillter_keywords: fillter_keywords,
      platform_id: wordCloudPlatform
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      fillter_keywords: fillter_keywords,
      platform_id: wordCloudPlatform
    }
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds-platform`,
    method: 'GET',
    params: params
  })

  return {
    resultWordCloudsPlatform: response?.data || null,
    loadingWordCloudsPlatform: loading,
    errorWordCloudsPlatform: error
  }
}

export const GetWordCloudsSentiment = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  select?: string,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string,
  sentiment_select?: string
) => {
  let params = {}
  const todayDate = new Date()
  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      fillter_keywords: fillter_keywords,
      sentiment_type: sentiment_select
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      select: select || 'top10',
      fillter_keywords: fillter_keywords,
      sentiment_type: sentiment_select
    }
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds-position`,
    method: 'GET',
    params: params
  })

  return {
    resultWordCloudsSentiment: response?.data || null,
    loadingWordCloudsSentiment: loading,
    errorWordCloudsSentiment: error
  }
}

export const GetDetailMessage = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  page?: number,
  limit?: number,
  reportNo?: string,
  pageName?: string,
  label?: string,
  ylabel?: string,
  wordCloud?: string,
  authorName?: string
) => {
  let params: any = {}
  const todayDate = new Date()

  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString()
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString()
    }
  }

  if (ylabel) {
    params.ylabel = encodeURI(ylabel)
  }
  if(wordCloud) {
    params.wordColud = wordCloud
  }
  if(authorName) {
    params.author_name = authorName
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/daily-message/level-three/`,
    method: 'GET',
    params: params
  })

  return {
    resultMessageDetail: response?.data?.message || null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetNetworkGraph = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  messageId?: any,
  reportNo?: string
) => {
  let params: any = {}
  params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    message_id: messageId || '',
    keyword_id: keywordId || '',
    report_number: reportNo || ''
  }

  if (platformId) {
    params.source_id = platformId
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/daily-message/level-four`,
    method: 'GET',
    params: params
  })

  const sentiment = {
    nodes: response?.data?.sentiment?.nodes ?? [],
    edges: response?.data?.sentiment?.edges ?? []
  }

  const bullyLevel = {
    nodes: response?.data?.bullyLevel?.nodes ?? [],
    edges: response?.data?.bullyLevel?.edges ?? []
  }

  const bullyType = {
    nodes: response?.data?.bullyType?.nodes ?? [],
    edges: response?.data?.bullyType?.edges ?? []
  }

  return {
    resultNetworkGraph: response?.data || null,
    resultSentimentNetwork: sentiment || null,
    resultBullyLevelNetwork: bullyLevel || null,
    resultBullyTypeNetwork: bullyType || null,
    loadingNetworkGraph: loading,
    errorNetworkGraph: error
  }
}

export const GetMessageDetail = (paramData: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/daily-message/level-three/`,
    method: 'GET',
    params: paramData
  })

  return {
    resultMessageDetail: response?.data?.message || null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetKeyWordsList = (campaignId: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/keywords`,
    method: 'GET',
    params: {
      campaing_id: campaignId
    }
  })

  const resultData = response?.data
  const keywordsColor = []
  if (resultData && resultData?.length > 0) {
    for (let i = 0; i < resultData?.length; i++) {
      if (resultData[i]?.color) {
        keywordsColor.push(resultData[i]?.color)
      }

      // keywordsColor.push(SentimentAllColors[i])
    }
  }

  return {
    resultKeywordList: response?.data || [],
    keywordsColor: keywordsColor?.length > 0 ? keywordsColor : null,
    loadingKeywordList: loading,
    errorKeywordList: error
  }
}
