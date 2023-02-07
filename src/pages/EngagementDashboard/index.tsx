import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  EngagementTypeBy,
  FilterByCampaignId,
  GetEngagementBy,
  GetEngagementComparisonBy
} from 'src/services/api/dashboards/engagement/EngagementApi'
import DailyEngagement from './DailyEngagement'
import PercentageOfEngangement from './PercentageOfEngagement'
import { useTheme } from '@mui/material/styles'
import Filter from '../VoiceDashboard/Filter'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import TotalEngagement from './TotalEngagement'
import PeriodComparisonChart from './PeriodComparisonChart'
import EngagementTypeComparison from './EngagementTypeComparison'
import EngagmentComparisonChart from './EngagmentComparisonChart'
import EngagementSummary from './EngagementSummary'
import QuickView from './QuickView'
import { UserPermission } from 'src/services/api/users/role'
import DailyEngagementType from './DailyEngagementType'
import EngagementByDay from './EngagementByDay'
import EngagementByTime from './EngagementByTime'
import EngagementByDevice from './EngagementByDevice'
import EngagementByAccounts from './EngagementByAccount'
import EngagementByChannel from './EngagementByChannel'
import PercentageOfEngangementType from './PercentageEngagementType'
import EngagementTypeByDay from './EngagementTypeByDay'
import EngagementTypeByTime from './EngagementTypeByTime'
import EngagementTypeByDevice from './EngagementTypeByDevice'
import EngagementTypeByAccount from './EngagementTypeByAccount'
import EngagementTypeByChannel from './EngagementTypeByChannel'
import PeriodComparisonChartSentiment from './PeriodComparisonChartSentiment'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { EngagementTransChartColor } from 'src/utils/const'
import EngagementByType from './EngagementByType'
import QuickViewModal from './QuickViewModal'
import { useRouter } from 'next/router'

const EngagementDashboard = () => {
  const theme = useTheme()
  const router = useRouter()
  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [date, setDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [period, setPeriod] = useState<string>('daily')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || "3")
  const [campaignType, setCampaignType] = useState<string>('1')
  const [topKeyword, setTopKeyword] = useState<string>('all')
  const [highlight, setHighlight] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [showQuickView, setShowQuickView] = useState<boolean>(false)

  const { resultReportPermission, errorUserPermission } = UserPermission()
  const { resultKeywordList } = GetKeyWordsList(campaignType)

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(campaignType, date, endDate, period, keyword)
  const {
    resultEngagementByTime,
    resultEngagementByAccount,
    resultEngagementByDevice,
    resultEngagementByDay,
    resultEngagementChannel,
    resultKeywordByEngagementType,
    loadingEngagementBy
  } = GetEngagementBy(campaignType, date, endDate, period, keyword)
  
  const {
    resultEngagementPercentage,
    resultEngagementTypeByAccount,
    resultEngagementTypeByChannel,
    resultEngagementTypeByDay,
    resultEngagementTypeByDevice,
    resultEngagementTypeByTime,
    loadingEngagementType
  } = EngagementTypeBy(campaignType, date, endDate, period, keyword)

  const {
    resultTotalEngagement,
    resultComparison,
    resultEngagementComparison,
    resultPeriodComparisonBySenitment,
    resultSummary,
    loadingPeriodComparisonBySenitment,
    resultPeriodComparisonByChannel,
  } = GetEngagementComparisonBy(campaignType, date, endDate, period, keyword, topKeyword)

  const params = {
    campaign: campaignType,
    date: date,
    endDate: endDate,
    period: period,
    keywordIds: keyword,
    page: 'engagementDashboard', 
    label: ''
  }

  const quickViewData = {
    resultFilterData: resultFilterData,
    loadingFilterData: loadingFilterData,
    resultEngagementByTime: resultEngagementByTime,
    resultEngagementByAccount: resultEngagementByAccount,
    resultEngagementByDevice: resultEngagementByDevice,
    resultEngagementByDay: resultEngagementByDay,
    resultEngagementChannel: resultEngagementChannel,
    resultKeywordByEngagementType: resultKeywordByEngagementType,
    loadingEngagementBy: loadingEngagementBy,
    resultEngagementPercentage: resultEngagementPercentage,
    resultEngagementTypeByAccount: resultEngagementTypeByAccount,
    resultEngagementTypeByChannel: resultEngagementTypeByChannel,
    resultEngagementTypeByDay: resultEngagementTypeByDay,
    resultEngagementTypeByDevice: resultEngagementTypeByDevice,
    resultEngagementTypeByTime: resultEngagementTypeByTime,
    loadingEngagementType: loadingEngagementType
  }

  const handleTopKeywords = (data: string) => {
    setTopKeyword(data)
  }

  const checkKeywordId = (data: any, keywordId: string | number) => {
    const index = data.indexOf(keywordId)
    if (index > -1) {
      data.splice(index, 1)
    } else {
      data.push(keywordId)
    }

    setFilterKeyword(data)

    if (data.length === 0) {
      setKeyword('all')
    } else {
      setKeyword(data.join(','))
    }

    return data
  }

  useEffect(()=> {
    if(errorUserPermission) {
      window.localStorage.removeItem('userData')
      localStorage.clear()
      router.push('/login')
    }
  }, [errorUserPermission])

  return (
    <>
      <Grid container spacing={2}>
        <Filter
          tilte='Engagement Dashboard'
          date={date}
          setDate={setDate}
          endDate={endDate}
          setEndDate={setEndDate}
          previousDate={previousDate}
          setPreviousDate={setPreviousDate}
          previousEndDate={previousEndDate}
          setPreviousEndDate={setPreviousEndDate}
          period={period}
          setPeriod={setPeriod}
          dateSelect={dateSelect}
          setDateSelect={setDateSelect}
          campaign={campaignType}
          setCampaign={setCampaignType}
        />
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filter'></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={1}>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => {
                      if (keyword === 'all') {
                        setKeyword('')
                      } else {
                        setKeyword('all')
                        setFilterKeyword([])
                      }
                    }}
                    variant='contained'
                    color={keyword === 'all' ? 'primary' : 'secondary'}
                  >
                    ALL
                  </Button>
                </Grid>

                {resultKeywordList &&
                  (resultKeywordList || []).map((keywords: any, index: number) => {
                    return (
                      <Grid item xs={6} md={1.2} key={index}>
                        <Button
                          sx={{
                            mb: 2,
                            bgcolor:
                              filterKeyword?.indexOf(keywords?.id) > -1
                                ? EngagementTransChartColor[index]
                                : keyword === 'all'
                                ? EngagementTransChartColor[index]
                                : 'grey',
                            ':hover': {
                              bgcolor:
                                filterKeyword?.indexOf(keywords?.id) > -1
                                  ? EngagementTransChartColor[index]
                                  : keyword === 'all'
                                  ? EngagementTransChartColor[index]
                                  : 'grey'
                            }
                          }}
                          onClick={() => {
                            checkKeywordId(filterKeyword, keywords?.id)
                          }}
                          variant='contained'
                        >
                          {keywords.name}
                        </Button>
                      </Grid>
                    )
                  })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        {resultReportPermission?.includes('57') ? (
          <Grid id='chart1' item xs={12} md={4}>
            <PercentageOfEngangement
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
        {resultReportPermission?.includes('58') ? (
          <Grid id='chart2' item xs={12} md={8}>
            <DailyEngagement
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
        {resultReportPermission?.includes('59') ? (
          <Grid item xs={12} md={12} id='chart3'>
            <EngagementByDay
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
              resultBy={resultEngagementByDay}
              loading={loadingEngagementBy}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('60') ? (
          <Grid item xs={12} md={12} id='chart4'>
            <EngagementByTime
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
              resultBy={resultEngagementByTime}
              loading={loadingEngagementBy}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('61') ? (
          <Grid item xs={12} md={12} id='chart5'>
            <EngagementByDevice
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
              resultBy={resultEngagementByDevice}
              loading={loadingEngagementBy}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('62') ? (
          <Grid item xs={12} md={12} id='chart6'>
            <EngagementByAccounts
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
              loading={loadingEngagementBy}
              resultBy={resultEngagementByAccount}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('63') ? (
          <Grid item xs={12} md={12} id='chart7'>
            <EngagementByChannel
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
              loading={loadingEngagementBy}
              resultBy={resultEngagementChannel}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('61') ? (
          <Grid item xs={12} md={12} id='chart8'>
            <EngagementByType
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
              loading={loadingEngagementBy}
              resultBy={resultKeywordByEngagementType}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid container spacing={3} mt={2}>
          {resultReportPermission?.includes('64') ? (
            <Grid id='chart9' item xs={12} md={4}>
              <PercentageOfEngangementType
                params={params}
                type='type'
                chartId='Chart 9'
                highlight={highlight === 'chart9' ? true : false}
                resultEngagementType={resultEngagementPercentage}
                loadingEngagementType={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('65') ? (
            <Grid id='chart10' item xs={12} md={8}>
              <DailyEngagementType
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                type='type'
                chartId='Chart 10'
                highlight={highlight === 'chart10' ? true : false}
                resultBy={resultEngagementPercentage}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('66') ? (
            <Grid item xs={12} md={12} id='chart11'>
              <EngagementTypeByDay
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                colorType='engagementType'
                chartId='Chart 11'
                highlight={highlight === 'chart11' ? true : false}
                resultBy={resultEngagementTypeByDay}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('67') ? (
            <Grid item xs={12} md={12} id='chart10'>
              <EngagementTypeByTime
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                colorType='engagementType'
                chartId='Chart 12'
                highlight={highlight === 'chart12' ? true : false}
                resultBy={resultEngagementByTime}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('68') ? (
            <Grid item xs={12} md={12} id='chart13'>
              <EngagementTypeByDevice
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                colorType='engagementType'
                chartId='Chart 13'
                highlight={highlight === 'chart13' ? true : false}
                resultBy={resultEngagementTypeByDevice}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('69') ? (
            <Grid item xs={12} md={12} id='chart14'>
              <EngagementTypeByAccount
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                chartId='Chart 14'
                highlight={highlight === 'chart14' ? true : false}
                resultBy={resultEngagementTypeByAccount}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}

          {resultReportPermission?.includes('70') ? (
            <Grid item xs={12} md={12} id='chart15'>
              <EngagementTypeByChannel
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                chartId='Chart 15'
                highlight={highlight === 'chart15' ? true : false}
                resultBy={resultEngagementTypeByChannel}
                loading={loadingEngagementType}
              />
            </Grid>
          ) : (
            ''
          )}

          {resultReportPermission?.includes('71') ? (
            <>
              {/* <Grid item xs={12}>
                                <Card id="chart15">
                                    <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <CardHeader 
                                            title='Total Engagement'
                                            titleTypographyProps={{ variant: 'h6', color : highlight === 'chart15' ? 'green' : '#4c4e64de' }}
                                        />
                                        <StyledTooltip arrow title="Chart 15, Report Level 2 (4.2.020)">
                                            <Information style={{marginTop: '22px', fontSize: '29px', color : highlight === 'chart15' ? 'green' : '#4c4e64de'}} />
                                        </StyledTooltip>
                                    </span>
                                </Card>
                            </Grid> */}
              <Grid item xs={12} md={12} id='chart16'>
                <TotalEngagement
                  totalEngagement={resultTotalEngagement}
                  highlight={highlight === 'chart16' ? true : false}
                  loading={loadingPeriodComparisonBySenitment}
                />
              </Grid>
            </>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('72') ? (
            <Grid item xs={12} md={6} id='chart17'>
              <PeriodComparisonChart
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                type='channel'
                chartTitle='Engagement'
                colorType='engagementDefault'
                chartId='Chart 17'
                highlight={highlight === 'chart17' ? true : false}
                reportNo='4.2.021'
                loadingSenitmentComparisonByEngagement={loadingPeriodComparisonBySenitment}
                resultSentimentComparisonByEngagement={resultPeriodComparisonByChannel}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('73') ? (
            <Grid item xs={12} md={6} id='chart18'>
              <PeriodComparisonChartSentiment
                white={whiteColor}
                labelColor={labelColor}
                success={lineChartYellow}
                borderColor={borderColor}
                primary={lineChartPrimary}
                warning={lineChartWarning}
                gridLineColor={gridLineColor}
                params={params}
                type='sentiment'
                chartTitle='Engagement'
                colorType='SentimentComparisonEngagment'
                chartId='Chart 18'
                highlight={highlight === 'chart18' ? true : false}
                resultPeriodComparisonBySenitment={resultPeriodComparisonBySenitment}
                loadingPeriodComparisonBySenitment={loadingPeriodComparisonBySenitment}
              />
            </Grid>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('74') ? (
            <>
              <Grid item xs={12} md={7} id='chart19'>
                <EngagementTypeComparison
                  params={params}
                  chartId='Chart 19'
                  highlight={highlight === 'chart19' ? true : false}
                  resultEngagementComparison={resultEngagementComparison}
                  loadingEngagementComparison={loadingPeriodComparisonBySenitment}
                />
              </Grid>
              <Grid item xs={12} md={5} id='chart20'>
                <EngagmentComparisonChart
                  params={params}
                  chartId='chart 20'
                  highlight={highlight === 'chart20' ? true : false}
                  resultComparison={resultComparison}
                  loadingComparison={loadingPeriodComparisonBySenitment}
                />
              </Grid>
            </>
          ) : (
            ''
          )}
          {resultReportPermission?.includes('75') ? (
            <>
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
              <Grid item xs={12} id='chart21'>
                <EngagementSummary
                  topKeyword={topKeyword}
                  params={params}
                  chartId='Chart 21'
                  highlight={highlight === 'chart21' ? true : false}
                  resultSummary={resultSummary}
                  loadingSummary={loadingPeriodComparisonBySenitment}
                />
              </Grid>
            </>
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
      </Grid>
    </>
  )
}

export default EngagementDashboard
