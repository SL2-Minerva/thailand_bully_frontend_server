import { Backdrop, CircularProgress, Grid } from '@mui/material'

import DailyMessageGraph from './DailyMessageGraph'
import InfluencerGraph from './InfluencerGraph'
import InfluencerComparison from './InfluencerComparison'
import MessageText from 'mdi-material-ui/MessageText'
import { AccountGroup } from 'mdi-material-ui'
import DailyMessagePieChart from './DailyMessagesPieChart'

import {
  GetDailyMessages,
  GetMessagesByAll,
  GetNumbersOfAccountComparison
} from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

import QuickViewModal from './QuickViewModal'
import KeywordBy from './KeywordBy'
import DayTimeBy from './DayTimeBy'
import MessageByAll from './MessageByAll'
import Comparison from './Comparision'

import QuickView from './QuickView'
import { useEffect, useState } from 'react'

interface Props {
  params: any
  resultReportPermission: any
  keywordGraphColors: any
}

const VoiceDashboardGraphs = (data: Props) => {
  const { params, resultReportPermission, keywordGraphColors } = data
  const [highlight, setHighlight] = useState<string>('')
  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const { resultNumbersOfAccounts, resultTotalAccounts, resultTotalMessages, loadingNumbersOfAccountsComparison } =
    GetNumbersOfAccountComparison(apiParams)

  const { resultMessagesByAll, loadingMessagesByAll } = GetMessagesByAll(apiParams)

  const { resultDailyMessage, loadingDailyMessage } = GetDailyMessages(apiParams)

  const quickViewData = {
    resultDailyMessage: resultDailyMessage,
    resultMessagesByAll: resultMessagesByAll,
    loadingMessagesByAll: loadingMessagesByAll,
    loadingDailyMessage: loadingDailyMessage
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
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {resultReportPermission?.includes('20') ? (
        <Grid item xs={12} md={4} id='chart1'>
          <DailyMessagePieChart
            keywordsColor={keywordGraphColors}
            params={params}
            type='message'
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('21') ? (
        <Grid item xs={12} md={8} id='chart2'>
          <DailyMessageGraph
            keywordsColor={keywordGraphColors}
            type='message'
            params={params}
            chartId='Chart 2'
            highlight={highlight === 'chart2' ? true : false}
            resultDailyMessage={resultDailyMessage}
            loadingDailyMessage={loadingDailyMessage}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      <MessageByAll
        keywordsColor={keywordGraphColors}
        resultReportPermission={resultReportPermission}
        highlight={highlight}
        params={params}
        resultMessagesByAll={resultMessagesByAll}
        loadingMessagesByAll={loadingMessagesByAll}
      />

      {resultReportPermission?.includes('30') ? (
        <Grid item xs={12} md={8} id='chart11'>
          <InfluencerGraph
            chartId='Chart 11'
            params={params}
            highlight={highlight === 'chart11' ? true : false}
            resultNumbersOfAccounts={resultNumbersOfAccounts}
            loadingNumbersOfAccounts={loadingNumbersOfAccountsComparison}
            keywordsColor={keywordGraphColors}
          />
        </Grid>
      ) : (
        ''
      )}

      <Grid item xs={12} md={4}>
        {resultReportPermission?.includes('31') ? (
          <Grid item xs={12} id='chart12'>
            <InfluencerComparison
              color='primary'
              trendNumber={resultTotalMessages?.percentage}
              trend={resultTotalMessages?.type}
              icon={<MessageText />}
              totalText='Messages'
              totalValue={resultTotalMessages?.total_message}
              chartId='Chart 12'
              highlight={highlight === 'chart12' ? true : false}
              reportNo='2.2.014'
              loading={loadingNumbersOfAccountsComparison}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('32') ? (
          <Grid item xs={12} mt={5} id='chart13'>
            <InfluencerComparison
              color='primary'
              trendNumber={resultTotalAccounts?.percentage || ''}
              trend={resultTotalAccounts?.type}
              icon={<AccountGroup />}
              totalText='Accounts'
              totalValue={resultTotalAccounts?.total_account || resultTotalAccounts?.total_message}
              chartId='Chart 13'
              highlight={highlight === 'chart13' ? true : false}
              reportNo='2.2.015'
              loading={loadingNumbersOfAccountsComparison}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <DayTimeBy resultReportPermission={resultReportPermission} params={params} highlight={highlight} />

      <Comparison resultReportPermission={resultReportPermission} params={params} highlight={highlight} />

      <KeywordBy
        highlight={highlight}
        resultReportPermission={resultReportPermission}
        params={params}
        keywordsColor={keywordGraphColors}
      />

      <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} />
      <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        keywordsColor={keywordGraphColors}
        quickViewData={quickViewData}
      />
    </>
  )
}

export default VoiceDashboardGraphs
