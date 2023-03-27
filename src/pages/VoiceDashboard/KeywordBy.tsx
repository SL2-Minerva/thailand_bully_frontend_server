import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { GetKeywordComparisonByAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import KeywordComparisonByChannel from './KeywordComparison'
import KeywordComparisonByBullyLevel from './KeywordComparisonByBullyLevel'
import KeywordComparisonByBullyType from './KeywordComparisonByBullyType'
import KeywordComparisonBySentiment from './KeywordComparisonBySentiment'

const KeywordBy = ({
  params,
  highlight,
  resultReportPermission,
  keywordsColor
}: {
  params: any
  highlight: string
  resultReportPermission: any
  keywordsColor : any
}) => {
  const [apiParams, setApiParams] = useState<any>()

  const {
    resultKeywordComparisonByBullyLevel,
    resultKeywordComparisonByBullyType,
    resultKeywordComparisonBySentiment,
    resultKeywordComparisonByChannel,
    loadingKeywordComparisonByAll
  } = GetKeywordComparisonByAll(
    apiParams
  )

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    } 
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate
      && params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
    <>
      {resultReportPermission?.includes('40') ? (
        <Grid item xs={12} md={6} id='chart21'>
          <KeywordComparisonByChannel
            params={params}
            chartId='Chart 21'
            highlight={highlight === 'chart21' ? true : false}
            resultKeywordComparisonByChannel={resultKeywordComparisonByChannel}
            loadingKeywordComparisonByChannel={loadingKeywordComparisonByAll}
            keywordColors ={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('41') ? (
        <Grid item xs={12} md={6} id='chart22'>
          <KeywordComparisonBySentiment
            params={params}
            chartId='Chart 22'
            highlight={highlight === 'chart23' ? true : false}
            resultKeywordComparisonBySentiment={resultKeywordComparisonBySentiment}
            loadingKeywordComparisonBySentiment={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('42') ? (
        <Grid item xs={12} md={6} id='chart23'>
          <KeywordComparisonByBullyLevel
            params={params}
            chartId='Chart 23'
            highlight={highlight === 'chart23' ? true : false}
            resultKeywordComparisonByBullyLevel={resultKeywordComparisonByBullyLevel}
            loadingKeywordComparisonByBullyLevel={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('43') ? (
        <Grid item xs={12} md={6} id='chart24'>
          <KeywordComparisonByBullyType
            params={params}
            chartId='Chart 24'
            highlight={highlight === 'chart24' ? true : false}
            resultKeywordComparisonByBullyType={resultKeywordComparisonByBullyType}
            loadingKeywordComparisonByBullyType={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default KeywordBy
