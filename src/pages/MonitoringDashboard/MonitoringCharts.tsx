import { useEffect, useState } from 'react'
import { Backdrop, Button, CircularProgress, Grid, useTheme } from '@mui/material'
import {
  GetDailyMonitoring,

  // GetTopEngagementMonitoring
} from 'src/services/api/dashboards/monitoring/MonitoringDashboard'
import DailyPercentage from './DailyPercentage'
import DailyMessagesChart from './DailyMessagesChart'

// import TopEngagement from './TopEngagement'

import EngagementMonitoring from './EngagementMonitoring'

interface Props {
  params: any
  keywordGraphColors: any
}

const MonitoringCharts = (data: Props) => {
  const { params, keywordGraphColors } = data
  const theme = useTheme()
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [topKeyword, setTopKeyword] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>(1)

  //   const [showQuickView, setShowQuickView] = useState<boolean>(false)

  //   const [highlight, setHighlight] = useState<string>('')
  const [highlight] = useState<string>('')

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  

  // const { resultTopEngagement, loadingTopEngagement } = GetTopEngagementMonitoring(apiParams)
  const { resultDailyMonitoring, loadingDailyMonitoring } = GetDailyMonitoring(apiParams)

  //   const quickViewData = {
  //     resultFilterData: resultFilterData,
  //     loadingFilterData: loadingFilterData,
  //     resultBullyByAccount: resultBullyByAccount,
  //     resultBullyByChannel: resultBullyByChannel,
  //     resultBullyByDay: resultBullyByDay,
  //     resultBullyByDevice: resultBullyByDevice,
  //     resultBullyBySentiment: resultBullyBySentiment,
  //     resultBullyByTime: resultBullyByTime,
  //     loadingBullyBy: loadingBullyBy,
  //     resultBullyTypeByAccount: resultBullyTypeByAccount,
  //     resultBullyTypeByChannel: resultBullyTypeByChannel,
  //     resultBullyTypeByDay: resultBullyTypeByDay,
  //     resultBullyTypeByDevice: resultBullyTypeByDevice,
  //     resultBullyTypeBySenitment: resultBullyTypeBySenitment,
  //     resultBullyTypeByTime: resultBullyTypeByTime,
  //     resultBullyTypeByDaily: resultBullyTypeByDaily,
  //     loadingBullyTypeBy: loadingBullyTypeBy
  //   }

  const handleTopKeywords = (data: string) => {
    setTopKeyword(data)
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
      <Grid container spacing={3} pt={2} pl={2}>
        <Grid id='chart1' item xs={12} md={4} mt={2}>
          <DailyPercentage
            resultDailyMonitoring={resultDailyMonitoring}
            loadindDailyMonitoring={loadingDailyMonitoring}
            params={params}
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
            keywordGraphColors={keywordGraphColors}
          />
        </Grid>
        <Grid id='chart2' item xs={12} md={8} mt={2}>
          <DailyMessagesChart
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            loadingFilterData={loadingDailyMonitoring}
            resultFilterData={resultDailyMonitoring}
            keywordsColor={keywordGraphColors}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>

        {/* <Grid id='chart3' item xs={12} md={12} mt={2}>
          <TopEngagement
            params={apiParams}
            highlight={highlight === 'chart3' ? true : false}
            chartId='chart 3'
            resultTopEngagement={resultTopEngagement}
            loadingTopEngagement={loadingTopEngagement}
          />
        </Grid> */}

        <>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', overflowX: 'auto' }}>
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
                  <span style={{ color: topKeyword === 'top10' ? 'white' : '#626376' }}>Top 10</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top20' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top20')
                  }}
                >
                  <span style={{ color: topKeyword === 'top20' ? 'white' : '#626376' }}>Top 20</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top50' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top50')
                  }}
                >
                  <span style={{ color: topKeyword === 'top50' ? 'white' : '#626376' }}>Top 50</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top100' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top100')
                  }}
                >
                  <span style={{ color: topKeyword === 'top100' ? 'white' : '#626376' }}>Top 100</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'all' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('all')
                  }}
                >
                  <span style={{ color: topKeyword === 'all' ? 'white' : '#626376' }}>ALL</span>{' '}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} id='chart4'>
              {apiParams ? (
                <EngagementMonitoring
                  topKeyword={topKeyword}
                  params={params}
                  chartId='Chart 4'
                  highlight={highlight === 'chart4' ? true : false}
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                  apiParams={apiParams}
                />
              ) : (
                ''
              )}
            </Grid>
          </>

        {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} />
        <QuickViewModal
          show={showQuickView}
          setShow={setShowQuickView}
          params={params}
          chartId={highlight}
          quickViewData={quickViewData}
          apiParams={apiParams}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        /> */}
      </Grid>
    </>
  )
}

export default MonitoringCharts
