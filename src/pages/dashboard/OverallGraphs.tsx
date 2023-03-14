import { Button, Grid } from '@mui/material'
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
    TotalKeyStats
  } from 'src/services/api/dashboards/overall/overallDashboardApi'

// import SentimentLevelChart from './SentimentLevelChart'
import WordCloud from './WordCloud'
import TotalMessageLists from './TotalMessageLists'
import WordCloudChannel from './WordCloudChannel'
import WordCloudSentiment from './WordCloudSentiment'

import CommentSentiment from './CommentSentiment'
import ShareOfVoice from './ShareOfVoice'

interface Props {
    params : any
    setTopKeyword: any
    resultReportPermission: any
    keywordGraphColors: any
    topKeyword: any
}

const OverallGraphs = (data: Props) => {
    const {params, setTopKeyword, resultReportPermission, keywordGraphColors, topKeyword } = data
  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const { resultTotalMessagePerDay, resultTotalEngagement, resultTotalAccount, loadingTotalKeystats } = TotalKeyStats(
    params?.campaign,
    params?.reload,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )

  const handleTopKeywords = (data: string) => {
    setTopKeyword(data)
  }

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
            <MainKeyWordTable params={params} chartId='Chart 7' />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('8') ? (
          <Grid id='chart8' item xs={12} md={4}>
            <TopSiteList params={params} chartId='Chart 8' />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('9') ? (
          <Grid id='chart9' item xs={12} md={4}>
            <TopHashtagList params={params} chartId='Chart 9' />
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

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('12') ? (
          <>
            <Grid id='chart12' item xs={12}>
              <ShareOfVoice params={params} chartId='Chart 12' keywordsColor={keywordGraphColors} />
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>

      {resultReportPermission?.includes('13') ||
      resultReportPermission?.includes('15') ||
      resultReportPermission?.includes('18') ? (
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topKeyword === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top10')
              }}
            >
              {' '}
              Top 10
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top20')
              }}
            >
              {' '}
              Top 20
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top50')
              }}
            >
              {' '}
              Top 50
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top100')
              }}
            >
              {' '}
              Top 100
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('all')
              }}
            >
              {' '}
              ALL{' '}
            </Button>
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('13') ? (
        <>
          <Grid container spacing={3} mt={2}>
            <Grid id='chart13' item xs={12} md={6}>
              <WordCloud params={params} chartId='Chart 13' />
            </Grid>
            <Grid id='chart14' item xs={12} md={6}>
              <TotalMessageLists params={params} chartId='Chart 14' />
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('15') ? (
        <Grid container spacing={3} mt={2}>
          <Grid id='chart15' item xs={12}>
            <WordCloudChannel params={params} chartId='Chart 15' />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('18') ? (
        <Grid container spacing={3} mt={2}>
          <Grid id='chart17' item xs={12} md={12}>
            <WordCloudSentiment params={params} chartId='Chart 18' />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default OverallGraphs
