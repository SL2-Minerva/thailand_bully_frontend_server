import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const FilterByCampaignId = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-daily`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultFilterData: res?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSenitmemntBy = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-by`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByDay: res?.data?.SentimentByDay || null,
    resultSentimentByTime: res?.data?.SentimentByTime || null,
    resultSentimentByDevice: res?.data?.SentimentByDevice || null,
    resultSentimentByAccount: res?.data?.SentimentByAccount || null,
    resultSentimentByChannel: res?.data?.SentimentByChannel || null,
    resultSentimentByBullyLevel: res?.data?.SentimentBullyLevel || null,
    resultSentimentByBullyType: res?.data?.SentimentBullyType || null,
    resultSenitmentScore: res?.data?.SentimentScore || null,
    resultSentimentComparison: res?.data?.sentimentComparison || null,
    loadingSentimentByDay: loading,
    errorSentimentByDay: error
  }
}

export const GetSenitmemntByDay = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-day`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByDay: res?.data || null,
    loadingSentimentByDay: loading,
    errorSentimentByDay: error
  }
}

export const GetSentimentByTime = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-time`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByTime: res?.data || null,
    loadingSentimentByTime: loading,
    errorSentimentByTime: error
  }
}

export const GetSentimentByDevice = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-device`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByDevice: res?.data || null,
    loadingSentimentByDevice: loading,
    errorSentimentByDevice: error
  }
}

export const GetSentimentByAccount = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-account`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByAccount: res?.data || null,
    loadingSentimentByAccount: loading,
    errorSentimentByAccount: error
  }
}

export const GetSentimentByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-channel`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByChannel: res?.data || null,
    loadingSentimentByChannel: loading,
    errorSentimentByChannel: error
  }
}

export const GetSentimentByBullyLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-bully-level`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByBullyLevel: res?.data || null,
    loadingSentimentByBullyLevel: loading,
    errorSentimentByBullyLevel: error
  }
}

export const GetSentimentByBullyType = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-bully-type`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSentimentByBullyType: res?.data || null,
    loadingSentimentByBullyType: loading,
    errorSentimentByBullyType: error
  }
}

export const GetTotalSentiment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/period-over-period`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultTotalSentiment: res?.data || null,
    loadingTotalSentiment: loading,
    errorTotalSentiment: error
  }
}

export const GetSenitmentComparisonByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/comparison-channel`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultSenitmentComparisonByChannel: res?.data || null,
    loadingSenitmentComparisonByChannel: loading,
    errorSenitmentComparisonByChannel: error
  }
}

export const GetSenitmentComparisonByEngagement = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  keywordIds?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/comparison-engagement-type`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      page: page,
      limit: 10,
      fillter_keywords: keywordIds
    }
  })

  return {
    resultSentimentComparisonByEngagement: res?.data || null,
    total: res?.data?.total || null,
    loadingSenitmentComparisonByEngagement: loading,
    errorSenitmentComparisonByEngagement: error
  }
}

export const GetSentimentScore = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-score`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10
    }
  })

  return {
    resultSenitmentScore: res?.data?.senitment_score_data || null,
    total: res?.data?.senitment_score_data?.total || 0,
    resultSentimentScorePercentage: res?.data?.senitment_score_percentage || null,
    loadingSentimentScore: loading,
    errorSentimentScore: error
  }
}

export const GetPeriodComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  page?: number
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/period-and-comparison`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10
    }
  })

  return {
    resultTotalSentiment: res?.data?.PeriodOverPeriod || null,
    resultSentimentComparisonByEngagement: res?.data?.ComparisonByEngagementType || null,
    resultSenitmentComparisonByChannel: res?.data?.ComparisonByChannel || null,
    total: res?.data?.total || 0,
    loadingSentimentComparison: loading,
    errorSenitmentComparison: error
  }
}

export const GetSentimentComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/sentiment-comparison`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10
    }
  })

  return {
    resultSentimentComparison: res?.data || null,
    total: res?.data?.total || 0,
    loadingSentimentComparison: loading,
    errorSenitmentComparison: error
  }
}

// "SummaryScoreAccount" => $this->SummaryScoreAccount($request, true),
//           "SummaryScoreChannel" => $this->SummaryScoreChannel($request, true),
//           "SummaryKeyword" => $this->SummaryKeyword($request, true),

export const GetSummaryBy = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  selectAccount?: string,
  selectChannel?: string,
  selectKeyword?: string,
  page?: number,
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/summary-by`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10,
      select_account: selectAccount,
      select_channel: selectChannel,
      select_keyword: selectKeyword
    }
  })

  const returnDataSummaryScoreAccount: any = []
  if (res?.data?.SummaryScoreAccount) {
    const data = res?.data?.SummaryScoreAccount
    for (let i = 0; i < data?.length; i++) {
      returnDataSummaryScoreAccount.push({
        infulencer: data[i].infulencer,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        sentiment_score: data[i].sentiment_score,
        positive: data[i].positive,
        total: data[i].total,
        id: i + 1
      })
    }
  }

  const returnData: any = []
  if (res?.data) {
    const data = res?.data?.SummaryKeyword
    for (let i = 0; i < data?.length; i++) {
      returnData.push({
        keyword_id: data[i].keyword_id,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        percentage: data[i].percentage,
        positive: data[i].positive,
        total_messages: data[i].total_messages,
        id: i + 1
      })
    }
  }

  const returnDataSummaryScoreChannel: any = []
  if (res?.data) {
    const data = res?.data?.SummaryScoreChannel
    for (let i = 0; i < data?.length; i++) {
      returnDataSummaryScoreChannel.push({
        channel: data[i].channel,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        sentiment_score: data[i].sentiment_score,
        positive: data[i].positive,
        total: data[i].total,
        id: i + 1
      })
    }
  }

  return {
    resultSummaryByAccount: returnDataSummaryScoreAccount || null,
    resultSummaryByChannel: returnDataSummaryScoreChannel || null,
    resultSummaryByKeywords: returnData || null,
    total: res?.data?.total || 0,
    loadingSummaryByAccount: loading,
    errorSummaryAccount: error
  }
}

export const GetSummaryByAccount = (
  topAccount: string,
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/summary-score-account`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10,
      select: topAccount
    }
  })

  const returnData: any = []
  if (res?.data) {
    const data = res?.data
    for (let i = 0; i < data?.length; i++) {
      returnData.push({
        infulencer: data[i].infulencer,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        sentiment_score: data[i].sentiment_score,
        positive: data[i].positive,
        total: data[i].total,
        id: i + 1
      })
    }
  }

  return {
    resultSummaryByAccount: returnData || null,
    total: res?.data?.total || 0,
    loadingSummaryByAccount: loading,
    errorSummaryAccount: error
  }
}

export const GetSummaryByChannel = (
  topChannel: string,
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/summary-score-channel`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 0,
      select: topChannel
    }
  })

  const returnData: any = []
  if (res?.data) {
    const data = res?.data
    for (let i = 0; i < data?.length; i++) {
      returnData.push({
        channel: data[i].channel,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        sentiment_score: data[i].sentiment_score,
        positive: data[i].positive,
        total: data[i].total,
        id: i + 1
      })
    }
  }

  return {
    resultSummaryByChannel: returnData || null,
    total: res?.data?.total || 0,
    loadingSummaryByChannel: loading,
    errorSummaryByChannel: error
  }
}

export const GetSummaryByKeywords = (
  topKeyword: string,
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: number,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-sentiment/summary-keyword`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10,
      select: topKeyword
    }
  })

  const returnData: any = []
  if (res?.data) {
    const data = res?.data
    for (let i = 0; i < data?.length; i++) {
      returnData.push({
        keyword_id: data[i].keyword_id,
        keyword_name: data[i].keyword_name,
        negative: data[i].negative,
        neutral: data[i].neutral,
        percentage: data[i].percentage,
        positive: data[i].positive,
        total_messages: data[i].total_messages,
        id: i + 1
      })
    }
  }

  return {
    resultSummaryByKeywords: returnData || null,
    total: res?.data?.total || 0,
    loadingSummaryByKeywords: loading,
    errorSummaryByKeywords: error
  }
}
