import { StyledTooltip } from '../dashboard/overall'
import { Card, CardHeader, Grid } from '@mui/material'
import {
  FilterByCampaignId,
  GetPeriodComparison,
  GetSenitmemntBy,
  GetSummaryBy
} from 'src/services/api/dashboards/sentiment/sentimentDashboard'
import DailySenitment from './DailySentiment'
import TotalMessage from './TotalMessage'
import PeriodComparisonChart from '../EngagementDashboard/PeriodComparisonChart'
import SentimentScore from './SentimentScore'
import SentimentScorePercentage from './SentimentScorePercentage'
import SummaryByAccount from './SummaryByAccount'
import SummaryByChannel from './SummaryByChannel'
import SummaryByKeywords from './SummaryByKeywords'
import QuickView from './QuickView'
import { Information } from 'mdi-material-ui'
import { useTheme } from '@mui/material/styles'

import SentimentByDay from './SentimentByDay'
import PeriodComparisonChannelChart from './PeriodComparisonChannel'
import SentimentByTime from './SentimentByTime'
import SentimentByDevice from './SentimentByDevice'
import SentimentByBullyType from './SentimentByBullyType'
import SentimentByBullyLevel from './SentimentByBullyLevel'
import SentimentByChannel from './SentitmentByChannel'
import SentimentByAccount from './SentimentByAccount'
import SentimentComparisonTable from './SentimentComparison'
import QuickViewModal from './QuickViewModal'
import PercentageOfSentiments from './PercentageOfSentiment'
import Translations from 'src/layouts/components/Translations'
import { useState } from 'react'

interface Props {
  params: any
  resultReportPermission: any
}

const SentimentGraph = (data: Props) => {
  const { resultReportPermission, params } = data
  const theme = useTheme()
  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [topAccount, setTopAccount] = useState<string>('all')
  const [topChannel, setTopChannel] = useState<string>('all')
  const [topKeyword, setTopKeyword] = useState<string>('all')

  const [highlight, setHighlight] = useState<string>('')

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keywordIds,
    params?.previousDate,
    params?.previousEndDate
  )

  const {
    resultSenitmentScore,
    resultSentimentByAccount,
    resultSentimentByBullyLevel,
    resultSentimentByBullyType,
    resultSentimentByChannel,
    resultSentimentByDay,
    resultSentimentByDevice,
    resultSentimentByTime,
    resultSentimentComparison,
    loadingSentimentByDay
  } = GetSenitmemntBy(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keywordIds,
    params?.previousDate,
    params?.previousEndDate
  )

  const {
    resultSenitmentComparisonByChannel,
    resultSentimentComparisonByEngagement,
    resultTotalSentiment,
    loadingSentimentComparison
  } = GetPeriodComparison(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keywordIds,
    params?.previousDate,
    params?.previousEndDate
  )

  const { resultSummaryByAccount, resultSummaryByChannel, resultSummaryByKeywords, total, loadingSummaryByAccount } =
    GetSummaryBy(
      params?.campaign,
      params?.date,
      params?.endDate,
      params?.period,
      params?.keywordIds,
      topAccount,
      topChannel,
      topKeyword,
      params?.previousDate,
      params?.previousEndDate
    )

  const quickViewData = {
    resultSenitmentScore: resultSenitmentScore,
    resultSentimentByAccount: resultSentimentByAccount,
    resultSentimentByBullyLevel: resultSentimentByBullyLevel,
    resultSentimentByBullyType: resultSentimentByBullyType,
    resultSentimentByChannel: resultSentimentByChannel,
    resultSentimentByDay: resultSentimentByDay,
    resultSentimentByDevice: resultSentimentByDevice,
    resultSentimentByTime: resultSentimentByTime,
    resultSentimentComparison: resultSentimentComparison,
    loadingSentimentByDay: loadingSentimentByDay,
    resultFilterData: resultFilterData,
    loadingFilterData: loadingFilterData
  }

  return (
    <>
      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('76') ? (
          <Grid id='chart1' item xs={12} md={4}>
            <PercentageOfSentiments
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
              params={params}
              type='transaction'
              chartId='Chart 1'
              highlight={highlight === 'chart1' ? true : false}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('77') ? (
          <Grid id='chart2' item xs={12} md={8}>
            <DailySenitment
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='transaction'
              chartId='Chart 2'
              highlight={highlight === 'chart2' ? true : false}
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('78') ? (
          <Grid item xs={12} md={12} id='chart3'>
            <SentimentByDay
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
              resultBy={resultSentimentByDay}
              loading={loadingSentimentByDay}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('79') ? (
          <Grid item xs={12} md={12} id='chart4'>
            <SentimentByTime
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
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByTime}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('80') ? (
          <Grid item xs={12} md={12} id='chart5'>
            <SentimentByDevice
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
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByDevice}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('81') ? (
          <Grid item xs={12} md={12} id='chart6'>
            <SentimentByAccount
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 6'
              params={params}
              highlight={highlight === 'chart6' ? true : false}
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByAccount}
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('82') ? (
          <Grid item xs={12} md={12} id='chart7'>
            <SentimentByChannel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 7'
              params={params}
              highlight={highlight === 'chart7' ? true : false}
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByChannel}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('83') ? (
          <Grid item xs={12} md={12} id='chart8'>
            <SentimentByBullyLevel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 8'
              params={params}
              highlight={highlight === 'chart8' ? true : false}
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByBullyLevel}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('84') ? (
          <Grid item xs={12} md={12} id='chart9'>
            <SentimentByBullyType
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
              loading={loadingSentimentByDay}
              resultBy={resultSentimentByBullyType}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('85') ? (
          <>
            <Grid item xs={12}>
              <Card id='chart10'>
                <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <CardHeader
                    title={<Translations text='Total Messages by Engagement Type' />}
                    titleTypographyProps={{ variant: 'h6', color: highlight === 'chart10' ? 'green' : '#4c4e64de' }}
                  />
                  <StyledTooltip arrow title='Chart 10, Report Level 2(5.2.012)'>
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
            <Grid item xs={12} md={12}>
              <TotalMessage totalMessage={resultTotalSentiment} loadingTotalSentiment={loadingSentimentComparison} />
            </Grid>
          </>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('86') ? (
          <Grid item xs={12} md={6} id='chart11'>
            <PeriodComparisonChannelChart
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              type='channel'
              chartTitle='Sentiment Comparison'
              colorType='engagementDefault'
              chartId='Chart 11'
              params={params}
              highlight={highlight === 'chart11' ? true : false}
              resultSenitmentComparisonByChannel={resultSenitmentComparisonByChannel}
              loadingSenitmentComparisonByChannel={loadingSentimentComparison}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('87') ? (
          <Grid item xs={12} md={6} id='chart12'>
            <PeriodComparisonChart
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='engagementType'
              chartTitle='Sentiment Comparison'
              colorType='sentimentComparison'
              chartId='Chart 12'
              highlight={highlight === 'chart12' ? true : false}
              reportNo='5.2.014'
              resultSentimentComparisonByEngagement={resultSentimentComparisonByEngagement}
              loadingSenitmentComparisonByEngagement={loadingSentimentComparison}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('88') ? (
          <>
            <Grid item xs={12} md={6} id='chart13'>
              <SentimentScore
                params={params}
                chartId='Chart 13'
                highlight={highlight === 'chart13' ? true : false}
                resultSenitmentScore={resultSenitmentScore?.senitment_score_data}
                loadingSentimentScore={loadingSentimentByDay}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SentimentScorePercentage
                params={params}
                highlight={highlight === 'chart13' ? true : false}
                resultSentimentScorePercentage={resultSenitmentScore?.senitment_score_percentage || []}
                loadingSentimentScore={loadingSentimentByDay}
              />
            </Grid>
          </>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('89') ? (
          <Grid item xs={12} md={12} id='chart14'>
            <SentimentComparisonTable
              params={params}
              chartId='Chart 14'
              highlight={highlight === 'chart14' ? true : false}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('90') ? (
          <Grid item xs={12} md={12} id='chart15'>
            <SummaryByAccount
              resultSummaryByAccount={resultSummaryByAccount}
              total={total}
              loadingSummaryByAccount={loadingSummaryByAccount}
              params={params}
              chartId='Chart 15'
              highlight={highlight === 'chart15' ? true : false}
              topAccount={topAccount}
              setTopAccount={setTopAccount}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('91') ? (
          <Grid item xs={12} md={12} id='chart16'>
            <SummaryByChannel
              resultSummaryByChannel={resultSummaryByChannel}
              total={total}
              loadingSummaryByChannel={loadingSummaryByAccount}
              params={params}
              chartId='Chart 16'
              highlight={highlight === 'chart16' ? true : false}
              topChannel={topChannel}
              setTopChannel={setTopChannel}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('92') ? (
          <Grid item xs={12} md={12} id='chart17'>
            <SummaryByKeywords
              total={total}
              resultSummaryByKeywords={resultSummaryByKeywords}
              loadingSummaryByKeywords={loadingSummaryByAccount}
              params={params}
              chartId='Chart 17'
              highlight={highlight === 'chart17' ? true : false}
              topKeyword={topKeyword}
              setTopKeyword={setTopKeyword}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} />
      <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        quickViewData={quickViewData}
      />
    </>
  )
}

export default SentimentGraph
