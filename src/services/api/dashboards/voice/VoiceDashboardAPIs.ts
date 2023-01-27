import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

export const GetPercentageMessage = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  keywordIds?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/percentage-of-message`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: keywordIds
    }
  })

  return {
    resultPercentageMessage: response?.data || null,
    loadingPercentageMessage: loading,
    errorPercentageMessage: error
  }
}

export const GetDailyMessages = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  keywordIds?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/daily-message`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: keywordIds
    }
  })

  return {
    resultDailyMessage: res?.data || null,
    loadingDailyMessage: loading,
    errorDailyMessage: error
  }
}

export const GetMessagesByDay = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-day`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      fillter_keywords: fillter_keywords
    }
  })

  return {
    resultMessagesByDay: res?.data || null,
    loadingMessagesByDay: loading,
    errorMessagesByDay: error
  }
}

export const GetMessagesByTime = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-time`,
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
    resultMessagesByTime: res?.data || null,
    loadingMessagesByTime: loading,
    errorMessagesByTime: error
  }
}

export const GetMessagesByDevice = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-device`,
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
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice: loading,
    errorMessagesByDevice: error
  }
}

export const GetMessagesBySentiment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-sentiment`,
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
    resultMessagesBySentiment: res?.data || null,
    loadingMessagesBySentiment: loading,
    errorMessagesBySentiment: error
  }
}

export const GetMessagesByAccount = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-account`,
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
    resultMessagesByAccount: res?.data || null,
    loadingMessagesByAccount: loading,
    errorMessagesByAccount: error
  }
}

export const GetMessagesByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-channel`,
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
    resultMessagesByChannel: res?.data || null,
    loadingMessagesByChannel: loading,
    errorMessagesByChannel: error
  }
}

export const GetMessagesByBullyLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-level`,
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
    resultMessagesByBullyLevel: res?.data || null,
    loadingMessagesByBullyLevel: loading,
    errorMessagesByBullyLevel: error
  }
}

export const GetMessagesByBullyType = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by-type`,
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
    resultMessagesByBullyType: res?.data || null,
    loadingMessagesByBullyType: loading,
    errorMessagesByBullyType: error
  }
}

export const GetMessagesByAll = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/message-by`,
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
    resultMessagesByAll: res?.data || null,
    loadingMessagesByAll: loading,
    errorMessagesByAll: error
  }
}

export const GetNumbersOfAccountsComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/number-of-account-period-over-period`,
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
    resultNumbersOfAccounts: res?.data?.numberOfAccount || null,
    resultTotalAccounts: res?.data?.PeriodOverPeriod?.total_account || null,
    resultTotalMessages: res?.data?.PeriodOverPeriod?.total_messages || null,
    loadingNumbersOfAccountsComparison: loading,
    errorNumbersOfAccountsComparison: error
  }
}

export const GetNumbersOfAccounts = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/number-of-account`,
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
    resultNumbersOfAccounts: res?.data || null,
    loadingNumbersOfAccounts: loading,
    errorNumbersOfAccounts: error
  }
}

export const GetComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  keywodIds?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/period-over-period`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: keywodIds
    }
  })

  return {
    resultTotalMessages: response?.data?.total_messages || null,
    resultTotalAccount: response?.data?.total_account || null,
    loadingTotalComparison: loading,
    errorTotalComparison: error
  }
}

export const GetDayTimeComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/day-time-comparison`,
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
    resultDayTimeComparison: response?.data || null,
    loadingDayTimeComparison: loading,
    errorDayTimeComparison: error
  }
}

export const GetDayTimeBySentiment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/day-time-sentiment`,
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
    resultDayBySentiment: response?.data?.day_value || null,
    resultTimeBySentiment: response?.data?.time_value || null,
    loadingBySentiment: loading,
    errorBySentiment: error
  }
}

export const GetDayTimeByBullyLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/day-time-level`,
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
    resultDayByBullyLevel: response?.data?.day_value || null,
    resultTimeByBullyLevel: response?.data?.time_value || null,
    loadingByBullyLevel: loading,
    errorByBullyLevel: error
  }
}

export const GetDayTimeByBullyType = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/day-time-type`,
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
    resultDayByBullyType: response?.data?.day_value || null,
    resultTimeByBullyType: response?.data?.time_value || null,
    loadingDayByBullyType: loading,
    errorDayByBullyType: error
  }
}

export const GetDayTimeByAll = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/daytime-by`,
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
    resultDayByAll: response?.data?.day_value || null,
    resultTimeByAll: response?.data?.time_value || null,
    loadingDayByAll: loading,
    errorDayByAll: error
  }
}

export const GetPlatformsComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/channel-platform`,
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
    resultPlatformComparison: response?.data || null,
    loadingPlatformComparison: loading,
    errorPlatformComparison: error
  }
}

export const GetDevicesComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/device`,
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
    resultDevicesComparison: response?.data || null,
    loadingDevicesComparison: loading,
    errorDevicesComparison: error
  }
}

// export const GetDeviceVsChannel = (
//   campaignId?: string,
//   start_date?: any,
//   end_date?: any,
//   period?: any,
//   fillter_keywords?: string
// ) => {
//   const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
//     url: `/dashboard-voice/channel-device`,
//     method: 'GET',
//     params: {
//       campaign_id: campaignId || '',
//       start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
//       end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
//       period: period,
//       fillter_keywords: fillter_keywords
//     }
//   })

//   return {
//     resultDeviceVsChannel: response?.data || [],
//     loadingDeviceVsChannel: loading,
//     errorDeviceVsChannel: error
//   }
// }

export const GetChannelDeviceAll = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/channel-platform-channel-device`,
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
    result: response?.data || [],
    loading: loading,
    error: error
  }
}

export const GetKeywordComparisonByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/keyword-channel`,
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
    resultKeywordComparisonByChannel: response?.data || null,
    loadingKeywordComparisonByChannel: loading,
    errorKeywordComparisonByChannel: error
  }
}

export const GetKeywordComparisonBySentiment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/keyword-sentiment`,
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
    resultKeywordComparisonBySentiment: response?.data || null,
    loadingKeywordComparisonBySentiment: loading,
    errorKeywordComparisonBySentiment: error
  }
}

export const GetKeywordComparisonByBullyLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/keyword-bully-level`,
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
    resultKeywordComparisonByBullyLevel: response?.data || null,
    loadingKeywordComparisonByBullyLevel: loading,
    errorKeywordComparisonByBullyLevel: error
  }
}

export const GetKeywordComparisonByBullyType = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/keyword-bully-type`,
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
    resultKeywordComparisonByBullyType: response?.data || null,
    loadingKeywordComparisonByBullyType: loading,
    errorKeywordComparisonByBullyType: error
  }
}

export const GetKeywordComparisonByAll = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-voice/keyword-by`,
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
    resultKeywordComparisonByBullyType: response?.data?.keywordBullyType || null,
    resultKeywordComparisonByBullyLevel: response?.data?.keywordBullyLevel || null,
    resultKeywordComparisonBySentiment: response?.data?.keywordChannel || null,
    resultKeywordComparisonByChannel: response?.data?.keywordSentiment || null,
    loadingKeywordComparisonByAll: loading,
    errorKeywordComparisonByAll: error
  }
}