import { Button, Card, CardContent, CardHeader, Grid, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  GetBullyDailyBy,
  GetBullyBy,
  GetDailyTypeBy,
  GetBullyTypeBy
} from 'src/services/api/dashboards/bully/BullyDashboardAPI'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { UserPermission } from 'src/services/api/users/role'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { calculateDate, wordBreaks } from '../dashboard/overall'
import Filter from '../VoiceDashboard/Filter'
import BullyLevelByAccount from './BullyLevelByAccount'
import BullyLevelByChannel from './BullyLevelByChannel'
import BullyLevelByDay from './BullyLevelByDay'
import BullyLevelByDevice from './BullyLevelByDevice'
import BullyLevelBySentiment from './BullyLevelBySentiment'
import BullyLevelByTime from './BullyLevelByTime'
import BullyTypeByAccount from './BullyTypeByAccount'
import BullyTypeByChannel from './BullyTypeByChannel'
import BullyTypeByDay from './BullyTypeByDay'
import BullyTypeByDevice from './BullyTypeByDevice'
import BullyTypeBySentiment from './BullyTypeBySentiment'
import BullyTypeByTime from './BullyTypeByTime'
import DailyMessgeByBully from './DailyMessageByBully'
import DailyMessgesByBullyType from './DailyMessageByBullyType'
import PercentageOfBully from './PercentageOfBully'
import PercentageOfBullyType from './PercentageOfBullyType'
import QuickView from './QuickView'
import QuickViewModal from './QuickViewModal'
import ShareOfChannel from './ShareOfChannel'

const BullyDashboard = () => {
  const theme = useTheme()
  const router = useRouter()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [date, setDate] = useState<DateType>(calculateDate(6))
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [period, setPeriod] = useState<string>('last7days')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || "3")
  const [campaign, setCampaign] = useState<string>('1')
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [bullyType, setBullyType] = useState<string>('level')
  const [highlight, setHighlight] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [showQuickView, setShowQuickView] = useState<boolean>(false)

  const { resultReportPermission, errorUserPermission } = UserPermission()
  const { resultBullyLevelPercentage, resultFilterData, loadingFilterData } = GetBullyDailyBy(
    campaign,
    date,
    endDate,
    period,
    keyword,
    previousDate, 
    previousEndDate
  )
  const {
    resultBullyByAccount,
    resultBullyByChannel,
    resultBullyByDay,
    resultBullyByDevice,
    resultBullyBySentiment,
    resultBullyByTime,
    loadingBullyBy
  } = GetBullyBy(campaign, date, endDate, period, keyword, previousDate, previousEndDate)

  const {
    resultBullyTypeByAccount,
    resultBullyTypeByChannel,
    resultBullyTypeByDay,
    resultBullyTypeByDevice,
    resultBullyTypeBySenitment,
    resultBullyTypeByTime,
    loadingBullyTypeBy
  } = GetDailyTypeBy(campaign, date, endDate, period, keyword, previousDate, previousEndDate)

  const {
    resultShareOfChannelBullyLevels,
    resultShareOfChannelChart,
    resultShareOfChannelChartBullyLevel,
    resultShareOfChannelPlatform,
    loadingShareOfChannelChart
  } = GetBullyTypeBy(campaign, date, endDate, period, keyword, previousDate, previousEndDate)
  const { resultKeywordList, keywordsColor } = GetKeyWordsList(campaign)
  const params = {
    campaign: campaign,
    date: date,
    endDate: endDate,
    period: period,
    keywordIds: keyword, 
    page: 'bullyDasboard',
    label: '',
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const quickViewData = {
    resultFilterData: resultFilterData,
    loadingFilterData: loadingFilterData,
    resultBullyByAccount: resultBullyByAccount,
    resultBullyByChannel: resultBullyByChannel,
    resultBullyByDay: resultBullyByDay,
    resultBullyByDevice: resultBullyByDevice,
    resultBullyBySentiment: resultBullyBySentiment,
    resultBullyByTime: resultBullyByTime,
    loadingBullyBy: loadingBullyBy,
    resultBullyTypeByAccount: resultBullyTypeByAccount,
    resultBullyTypeByChannel: resultBullyTypeByChannel,
    resultBullyTypeByDay: resultBullyTypeByDay,
    resultBullyTypeByDevice: resultBullyTypeByDevice,
    resultBullyTypeBySenitment: resultBullyTypeBySenitment,
    resultBullyTypeByTime: resultBullyTypeByTime,
    loadingBullyTypeBy: loadingBullyTypeBy
  }

  const handleBullyType = (data: string) => {
    setBullyType(data)
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

  useEffect(() => {
    setBullyType('level')
  }, [resultShareOfChannelChart, resultShareOfChannelPlatform])

  useEffect(()=> {
    if(errorUserPermission) {
      window.localStorage.removeItem('userData')
      localStorage.clear();
      router.push('/login')
    }
  }, [errorUserPermission])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Filter
          tilte='Bully Dashboard'
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
          campaign={campaign}
          setCampaign={setCampaign}
        />
      </Grid>
      <Grid container spacing={2} mt={2} ml={1}>
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
                                ? keywordsColor && keywordsColor[index]
                                : keyword === 'all'
                                ? keywordsColor && keywordsColor[index]
                                : 'grey',
                            ':hover': {
                              bgcolor:
                                filterKeyword?.indexOf(keywords?.id) > -1
                                  ? keywordsColor && keywordsColor[index]
                                  : keyword === 'all'
                                  ? keywordsColor && keywordsColor[index]
                                  : 'grey'
                            }
                          }}
                          onClick={() => {
                            checkKeywordId(filterKeyword, keywords?.id)
                          }}
                          variant='contained'
                        >
                          <span style={{ wordWrap: 'break-word' }}>{wordBreaks(keywords.name)}</span>
                        </Button>
                      </Grid>
                    )
                  })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {resultReportPermission?.includes('93') ? (
        <Grid id='chart1' item xs={12} md={4}>
          <PercentageOfBully
            resultBullyLevelPercentage={resultBullyLevelPercentage}
            loadingBullyLevelPercentage={loadingFilterData}
            params={params}
            type='level'
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('94') ? (
        <Grid id='chart2' item xs={12} md={8}>
          <DailyMessgeByBully
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            type='level'
            chartId='Chart 2'
            highlight={highlight === 'chart2' ? true : false}
            resultFilterData={resultFilterData}
            loadingFilterData={loadingFilterData}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('95') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <BullyLevelByDay
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 3'
            colorType='bullyDashboard'
            highlight={highlight === 'chart3' ? true : false}
            resultBy={resultBullyByDay}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('96') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <BullyLevelByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 4'
            colorType='bullyDashboard'
            highlight={highlight === 'chart4' ? true : false}
            resultBy={resultBullyByTime}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('97') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <BullyLevelByDevice
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 5'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart5' ? true : false}
            resultBy={resultBullyByDevice}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('98') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <BullyLevelByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 6'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart6' ? true : false}
            resultBy={resultBullyByAccount}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('99') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <BullyLevelByChannel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 7'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart7' ? true : false}
            resultBy={resultBullyByChannel}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('100') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <BullyLevelBySentiment
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 8'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart8' ? true : false}
            resultBy={resultBullyBySentiment}
            loading={loadingBullyBy}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('101') ? (
        <Grid id='chart9' item xs={12} md={4}>
          <PercentageOfBullyType
            params={params}
            type='type'
            chartId='Chart 9'
            highlight={highlight === 'chart9' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('102') ? (
        <Grid id='chart10' item xs={12} md={8}>
          <DailyMessgesByBullyType
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
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('103') ? (
        <Grid item xs={12} md={12} id='chart11'>
          <BullyTypeByDay
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 11'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart11' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeByDay}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('104') ? (
        <Grid item xs={12} md={12} id='chart12'>
          <BullyTypeByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 12'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart12' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeByTime}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('105') ? (
        <Grid item xs={12} md={12} id='chart13'>
          <BullyTypeByDevice
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 13'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart13' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeByDevice}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('106') ? (
        <Grid item xs={12} md={12} id='chart14'>
          <BullyTypeByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 14'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart14' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeByAccount}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('107') ? (
        <Grid item xs={12} md={12} id='chart15'>
          <BullyTypeByChannel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 15'
            colorType='bullyDashboard'
            params={params}
            highlight={highlight === 'chart15' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeByChannel}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('108') ? (
        <Grid item xs={12} md={12} id='chart16'>
          <BullyTypeBySentiment
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 16'
            colorType='bullyDashboard'
            highlight={highlight === 'chart16' ? true : false}
            loading={loadingBullyTypeBy}
            resultBy={resultBullyTypeBySenitment}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('109') ? (
        <>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant='contained'
                color={bullyType === 'level' ? 'warning' : 'inherit'}
                size='medium'
                sx={{ marginRight: '20px' }}
                onClick={() => {
                  handleBullyType('level')
                }}
              >
                {' '}
                Bully Level
              </Button>
              <Button
                variant='contained'
                color={bullyType === 'type' ? 'warning' : 'inherit'}
                size='medium'
                sx={{ marginRight: '20px' }}
                onClick={() => {
                  handleBullyType('type')
                }}
              >
                {' '}
                Bully Type{' '}
              </Button>
            </Grid>
          </Grid>
          <Grid id='chart17' item xs={12} mt={3}>
            {bullyType === 'level' ? (
              <ShareOfChannel
                resultShareOfChannel={resultShareOfChannelPlatform}
                resultShareofChannelPlatform={resultShareOfChannelChart}
                loading={loadingShareOfChannelChart}
                loadingChannel={loadingShareOfChannelChart}
                type={bullyType}
                chartId={'Chart 17, Report Level 2(6.2.021)'}
                highlight={highlight === 'chart17' ? true : false}
                title="Bully Level: Share of Channel"
              />
            ) : (
              <ShareOfChannel
                resultShareOfChannel={resultShareOfChannelChartBullyLevel}
                resultShareofChannelPlatform={resultShareOfChannelBullyLevels}
                loading={loadingShareOfChannelChart}
                loadingChannel={loadingShareOfChannelChart}
                type={bullyType}
                chartId={'Chart 18, Report Level 2(6.2.022)'}
                highlight={highlight === 'chart17' ? true : false}
                title = "Bully Type: Share of Channel"
              />
            )}
          </Grid>
        </>
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
      />
    </Grid>
  )
}

export default BullyDashboard
