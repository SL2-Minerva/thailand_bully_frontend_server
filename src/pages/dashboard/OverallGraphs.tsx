import { Grid } from '@mui/material'
import DonutChart from './donutChart'
import StackedChart from './stackedChart'
import { useTheme } from '@mui/material/styles'
import MessageText from 'mdi-material-ui/MessageText'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Person from 'mdi-material-ui/Account'
import KeyStatusReport from './keyStatusReport'
import KeywordTable from './keywordTable'
import MainKeyWordTable from './MainKeywordTable'

import TopHashtagList from './TopHastagList'
import TopSiteList from './TopSiteList'

import SentimentGaugeChart from './SentimentGaugeChart'
import {
  FilterByCampaignId,
  GetTopKeywords,
  TotalKeyStats
} from 'src/services/api/dashboards/overall/overallDashboardApi'

import CommentSentiment from './CommentSentiment'
import ShareOfVoices from './ShareofVoices'
import { useEffect, useState } from 'react'

// import ShareOfVoice from './ShareOfVoice'

interface Props {
  params: any
  setTopKeyword: any
  resultReportPermission: any
  keywordGraphColors: any
  topKeyword: any
}

const OverallGraphs = (data: Props) => {
  const { params, resultReportPermission, keywordGraphColors } = data
  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [apiParams, setApiParams] = useState<any>()

  const { resultTotalMessagePerDay, resultTotalEngagement, resultTotalAccount, loadingTotalKeystats } = TotalKeyStats(
    apiParams
  )

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(apiParams)

  const { resultTopKeywords, loadingTopKeywords } = GetTopKeywords(
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
      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('1') ? (
          <Grid id='chart1' item xs={12} md={4}>
            <DonutChart
              keywordsColor={keywordGraphColors}
              params={params}
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('2') ? (
          <Grid id='chart2' item xs={12} md={8}>
            <StackedChart
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              loadingFilterData={loadingFilterData}
              resultFilterData={resultFilterData}
              keywordsColor={keywordGraphColors}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('3') ? (
          <Grid id='chart3' item xs={12} md={4}>
            <KeyStatusReport
              stats={resultTotalMessagePerDay?.comparison || '0'}
              type={resultTotalMessagePerDay?.type}
              color='primary'
              trendNumber={resultTotalMessagePerDay?.percentage || '0'}
              icon={<MessageText />}
              title='Period over Period Comparison'
              chipText='Last 1 Month'
              totalText='Total Messages'
              totalValue={resultTotalMessagePerDay?.total_message?.toString() || '0'}
              averageText='Average Message per Day'
              averageValue={resultTotalMessagePerDay?.average_message?.toString() || '0'}
              chartId='Chart 3'
              reportNo='1.1.005'
              loading={loadingTotalKeystats}
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('4') ? (
          <Grid id='chart4' item xs={12} md={4}>
            <KeyStatusReport
              stats={resultTotalEngagement?.comparison || '0'}
              type={resultTotalEngagement?.type}
              color='primary'
              trendNumber={resultTotalEngagement?.percentage || '0'}
              icon={<ThumbUp />}
              title='Period over Period Comparison'
              chipText='Last 1 Month'
              totalText='Total Engagements'
              totalValue={resultTotalEngagement?.total_engagement?.toString() || '0'}
              averageText='Avg. Engagement per Day'
              averageValue={resultTotalEngagement?.average_engagement?.toString() || '0'}
              chartId='Chart 4'
              reportNo='1.1.006'
              loading={loadingTotalKeystats}
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('5') ? (
          <Grid id='chart5' item xs={12} md={4}>
            <KeyStatusReport
              stats={resultTotalAccount?.comparison || '0'}
              type={resultTotalAccount?.type}
              color='primary'
              trendNumber={resultTotalAccount?.percentage || '0'}
              icon={<Person />}
              title='Period over Period Comparison'
              chipText='Last 1 Month'
              totalText='Total Accounts'
              totalValue={resultTotalAccount?.total_account?.toString() || '0'}
              averageText='Average Account per Day'
              averageValue={resultTotalAccount?.average_account?.toString() || '0'}
              chartId='Chart 5'
              reportNo='1.1.007'
              loading={loadingTotalKeystats}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('6') ? (
          <Grid id='chart6' item xs={12}>
            <KeywordTable params={params} chartId='Chart 6' />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('7') ? (
          <Grid id='chart7' item xs={12} md={4}>
            <MainKeyWordTable
              params={params}
              loadingTopKeywords={loadingTopKeywords}
              resultTopKeywords={resultTopKeywords}
              chartId='Chart 7'
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('8') ? (
          <Grid id='chart8' item xs={12} md={4}>
            <TopSiteList
              params={params}
              loadingTopKeywords={loadingTopKeywords}
              resultTopKeywords={resultTopKeywords}
              chartId='Chart 8'
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('9') ? (
          <Grid id='chart9' item xs={12} md={4}>
            <TopHashtagList
              params={params}
              loadingTopKeywords={loadingTopKeywords}
              resultTopKeywords={resultTopKeywords}
              chartId='Chart 9'
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('10') ? (
          <Grid id='chart10' item xs={12} md={6}>
            <SentimentGaugeChart params={params} chartId='Chart 10' />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('11') ? (
          <Grid id='chart11' item xs={12} md={6}>
            <CommentSentiment params={params} chartId='Chart 11' />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      {/* <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('12') ? (
          <>
            <Grid id='chart12' item xs={12}>
              <ShareOfVoice params={params} chartId='Chart 12' keywordsColor={keywordGraphColors} />
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid> */}

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('12') ? (
          <>
            <Grid id='chart12' item xs={12}>
              <ShareOfVoices params={params} chartId='Chart 12' keywordsColor={keywordGraphColors} />
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>
    </>
  )
}

export default OverallGraphs
