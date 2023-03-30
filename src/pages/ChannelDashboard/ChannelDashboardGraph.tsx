import { Card, CardHeader, Grid } from '@mui/material'
import { StyledTooltip } from '../dashboard/overall'
import DailyMessageGraph from './DailyMessageGraph'

import ChannelComparison from './ChannelComparison'
import {
  GetChannelBy,
  GetDailyBy,
  GetEngagementBy,
  GetSentimentBy
} from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import ChannelBySentiment from './ChannelBySentiment'
import QuickView from './QuickView'
import { Information } from 'mdi-material-ui'
import DailyMessagePieChart from './DailyMessagePieChart'
import EngagementRate from './EngagementRate'
import SentimentScore from './SenitmentScore'
import SentimentLevelChart from './SentimentLevelChart'
import { ChannelColorCode, GraphicColors } from 'src/utils/const'
import QuickViewModal from './QuickViewModal'
import ChannelByDay from './ChannelBy/ChannelByDay'
import ChannelByTime from './ChannelBy/ChannelByTime'
import ChannelByDevice from './ChannelBy/ChannelByDevice'
import ChannelByAccount from './ChannelBy/ChannelByAccount'
import ChannelBySentimentComparison from './ChannelBy/ChannelBySentimentComparison'
import ChannelByBullyLevel from './ChannelBy/ChannelByBullyLevel'
import ChannelByBullyType from './ChannelBy/ChannelByBullyType'
import Translations from 'src/layouts/components/Translations'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'

interface Props {
  params: any
  resultReportPermission: any
}

const ChannelDashboardGraphs = (data: Props) => {
  const { params, resultReportPermission } = data

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [highlight, setHighlight] = useState<string>('')
  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const { resultDailyChannel, resultPercentageChannelCurrent, resultPercentageChannelPrevious, loadingDailyChannel } =
    GetDailyBy(apiParams)
  const {
    resultChannelByDay,
    resultChannelByAccount,
    resultChannelByBullyLevel,
    resultChannelByBullyType,
    resultChannelByDevice,
    resultChannelBySentiment,
    resultChannelByTime,
    loadingChannelBy
  } = GetChannelBy(apiParams)

  const {
    resultEngagementRate,
    resultEngagementRatePrevious,
    resultFacebookComparison,
    resultInstagramComparison,
    resultTwitterComparison,
    resultPantipComparison,
    resultYoutubeComparison,
    resultGoogleComparison,
    loadingEngagementBy
  } = GetEngagementBy(apiParams)

  const {
    resultChannelSentimentLevel,
    resultSentimentLevel,
    resultSentimentScore,
    resultSentimentScorePrevious,
    loadingSentimentBy
  } = GetSentimentBy(apiParams)

  const quickViewData = {
    resultDailyChannel: resultDailyChannel,
    resultChannelByDay: resultChannelByDay,
    resultChannelByTime: resultChannelByTime,
    resultChannelByDevice: resultChannelByDevice,
    resultChannelByAccount: resultChannelByAccount,
    resultChannelBySentiment: resultChannelBySentiment,
    resultChannelByBullyLevel: resultChannelByBullyLevel,
    resultChannelByBullyType: resultChannelByBullyType,
    loadingChannelBy: loadingChannelBy,
    loadingDailyChannel: loadingDailyChannel
  }

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
      params?.date !== params?.endDate &&
      params?.previousDate !== params?.previousEndDate
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
      {resultReportPermission?.includes('44') ? (
        <Grid item xs={12} md={4} id='chart1'>
          <DailyMessagePieChart
            params={params}
            type='channel'
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
            resultPercentageChannelCurrent={resultPercentageChannelCurrent}
            resultPercentageChannelPrevious={resultPercentageChannelPrevious}
            loadingPercentageChannel={loadingDailyChannel}
            keywordsColor={ChannelColorCode}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('45') ? (
        <Grid item xs={12} md={8} id='chart2'>
          <DailyMessageGraph
            params={params}
            type='channel'
            chartId='Chart 2'
            highlight={highlight === 'chart2' ? true : false}
            resultDailyChannel={resultDailyChannel}
            loadingDailyChannel={loadingDailyChannel}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('46') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <ChannelByDay
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 3'
            highlight={highlight === 'chart3' ? true : false}
            resultBy={resultChannelByDay}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('47') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <ChannelByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 4'
            highlight={highlight === 'chart4' ? true : false}
            resultBy={resultChannelByTime}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('48') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <ChannelByDevice
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 5'
            highlight={highlight === 'chart5' ? true : false}
            resultBy={resultChannelByDevice}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('49') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <ChannelByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 6'
            highlight={highlight === 'chart6' ? true : false}
            resultBy={resultChannelByAccount}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('50') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <ChannelBySentimentComparison
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 7'
            highlight={highlight === 'chart7' ? true : false}
            resultBy={resultChannelBySentiment}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('51') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <ChannelByBullyLevel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 8'
            highlight={highlight === 'chart8' ? true : false}
            resultBy={resultChannelByBullyLevel}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('52') ? (
        <Grid item xs={12} md={12} id='chart9'>
          <ChannelByBullyType
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 9'
            highlight={highlight === 'chart9' ? true : false}
            resultBy={resultChannelByBullyType}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('53') ? (
        <>
          <Grid item xs={12} id='chart10'>
            <Card>
              <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                  title={<Translations text='Channel Comparison: Period over Period' />}
                  titleTypographyProps={{ variant: 'h6', color: highlight === 'chart10' ? 'green' : '#4c4e64de' }}
                />
                <StyledTooltip
                  arrow
                  title={
                    <span>
                      Chart 10
                      <br /> Report Level 2(3.3.012)
                    </span>
                  }
                >
                  <Information
                    style={{
                      marginTop: '22px',
                      fontSize: '29px',
                      color: highlight === 'chart10' ? 'green' : '#4c4e64de'
                    }}
                  />
                </StyledTooltip>
              </span>
            </Card>
          </Grid>

          <Grid container spacing={4} ml={3} mt={2}>
            <Grid item xs={6} md={2}>
              {resultFacebookComparison ? (
                <ChannelComparison
                  color='#3b5998'
                  trendNumber={resultFacebookComparison?.percentage}
                  trend={resultFacebookComparison?.type}
                  totalText='Facebook'
                  totalValue={resultFacebookComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={2}>
              {resultTwitterComparison ? (
                <ChannelComparison
                  color='#00aced'
                  trendNumber={resultTwitterComparison?.percentage}
                  trend={resultTwitterComparison?.type}
                  totalText='Twitter'
                  totalValue={resultTwitterComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={2}>
              {resultYoutubeComparison ? (
                <ChannelComparison
                  color='#e31010'
                  trendNumber={resultYoutubeComparison?.percentage}
                  trend={resultYoutubeComparison?.type}
                  totalText='Youtube'
                  totalValue={resultYoutubeComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={2}>
              {resultInstagramComparison ? (
                <ChannelComparison
                  color='#d62976'
                  trendNumber={resultInstagramComparison?.percentage}
                  trend={resultInstagramComparison?.type}
                  totalText='Instagram'
                  totalValue={resultInstagramComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={2}>
              {resultGoogleComparison ? (
                <ChannelComparison
                  color='#F4B400'
                  trendNumber={resultGoogleComparison?.percentage}
                  trend={resultGoogleComparison?.type}
                  totalText='Google'
                  totalValue={resultGoogleComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={6} md={2}>
              {resultPantipComparison ? (
                <ChannelComparison
                  color='#642c8c'
                  trendNumber={resultPantipComparison?.percentage}
                  trend={resultPantipComparison?.type}
                  totalText='Pantip'
                  totalValue={resultPantipComparison?.comparison_value}
                  loading={loadingEngagementBy}
                />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('54') ? (
        <Grid item xs={12} md={6} id='chart11'>
          <EngagementRate
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 11'
            highlight={highlight === 'chart11' ? true : false}
            resultBy={resultEngagementRate}
            loading={loadingEngagementBy}
            resultByPrevious={resultEngagementRatePrevious}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('55') ? (
        <Grid item xs={12} md={6} id='chart12'>
          <SentimentScore
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 12'
            highlight={highlight === 'chart12' ? true : false}
            resultBy={resultSentimentScore}
            resultByPrevious={resultSentimentScorePrevious}
            loading={loadingSentimentBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('56') ? (
        <Grid container spacing={4} ml={3} mt={2} id='chart13'>
          <Grid item xs={12} md={6}>
            <ChannelBySentiment
              params={params}
              chartId='Chart 13'
              highlight={highlight === 'chart13' ? true : false}
              resultBy={resultChannelSentimentLevel}
              loading={loadingSentimentBy}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SentimentLevelChart
              params={params}
              chartId='Chart 13'
              highlight={highlight === 'chart13' ? true : false}
              resultSentimentLevel={resultSentimentLevel}
              loading={loadingSentimentBy}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} />
      <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        quickViewData={quickViewData}
        keywordsColor={GraphicColors}
        apiParams={apiParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default ChannelDashboardGraphs
