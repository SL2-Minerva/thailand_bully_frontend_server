import { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import DailyMessageGraph from './DailyMessageGraph'
import InfluencerGraph from './InfluencerGraph'
import InfluencerComparison from './InfluencerComparison'
import MessageText from 'mdi-material-ui/MessageText'
import { AccountGroup } from 'mdi-material-ui'
import DailyMessagePieChart from './DailyMessagesPieChart'
import {
  GetNumbersOfAccountComparison
} from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import Filter from './Filter'
import QuickView from './QuickView'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { UserPermission } from 'src/services/api/users/role'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { GraphicColors } from 'src/utils/const'
import QuickViewModal from './QuickViewModal'
import KeywordBy from './KeywordBy'
import DayTimeBy from './DayTimeBy'
import MessageByAll from './MessageByAll'
import Comparison from './Comparision'
import { useRouter } from 'next/router'
import { calculateDate, wordBreaks } from '../dashboard/overall'

const VoiceDashboard = () => {
  const router = useRouter()
  const [date, setDate] = useState<DateType>(calculateDate(6))
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [period, setPeriod] = useState<string>('last7days')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || "3")
  const [campaign, setCampaign] = useState<string>('1')
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [highlight, setHighlight] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [keywordGraphColors, setKeywordGraphColor] = useState<any>(null)
  const [filterColors, setFilterColor] = useState<any>([])

  const params = {
    campaign: campaign,
    date: date,
    endDate: endDate,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    keywordIds: keyword, 
    page : 'voiceDashboard',
    label: '',
    ylabel: ''
  }

  const { resultReportPermission, errorUserPermission } = UserPermission()
  const { resultNumbersOfAccounts, resultTotalAccounts, resultTotalMessages, loadingNumbersOfAccountsComparison } =
    GetNumbersOfAccountComparison(campaign, date, endDate, period, keyword, previousDate, previousEndDate)

  // const { resultTotalAccount,resultTotalMessages, loadingTotalComparison } = GetComparison(campaign, date, endDate, period, keyword);
  const { resultKeywordList, loadingKeywordList, keywordsColor } = GetKeyWordsList(campaign)

  const checkKeywordId = (data: any, keywordId: string | number, keywordColor: any, color: any) => {
    const index = data.indexOf(keywordId)
    const colorIndex = keywordColor?.indexOf(color)
    if (index > -1) {
      data.splice(index, 1)
    } else {
      data.push(keywordId)
    }
    if (colorIndex > -1) {
      keywordColor?.splice(colorIndex, 1)
    } else {
      keywordColor?.push(color)
    }

    setFilterKeyword(data)
    setFilterColor(keywordColor)
    if (data.length === 0) {
      setKeyword('all')
      setKeywordGraphColor(keywordsColor || GraphicColors)
    } else {
      setKeyword(data.join(','))
      setKeywordGraphColor(keywordColor)
    }
    console.log("keywordColor", keywordColor)

    return data
  }

  useEffect(()=> {
    if(errorUserPermission) {
      window.localStorage.removeItem('userData')
      localStorage.clear()
      router.push('/login')
    }
  }, [errorUserPermission])

  useEffect(() => {
    if (keywordsColor) {
      setKeywordGraphColor(keywordsColor)
    } else {
      setKeywordGraphColor(GraphicColors)
    }
  }, [loadingKeywordList])

  useEffect(() => {
    if (filterKeyword?.length>0) {
      setKeywordGraphColor(filterKeyword)
      console.log("hello")
    } 
  },[filterKeyword])

  return (
    <Grid container spacing={6}>
      <Filter
        tilte='Voice Dashboard'
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
      <Grid container spacing={2} mt={2} ml={3}>
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
                        setKeywordGraphColor(keywordsColor || GraphicColors)
                      } else {
                        setKeyword('all')
                        setFilterKeyword([])
                        setFilterColor([])
                        setKeywordGraphColor(keywordsColor || GraphicColors)
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
                                ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                : keyword === 'all'
                                ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                : 'grey',
                            ':hover': {
                              bgcolor:
                                filterKeyword?.indexOf(keywords?.id) > -1
                                  ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                  : keyword === 'all'
                                  ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                  : 'grey'
                            }
                          }}
                          onClick={() => {
                            checkKeywordId(
                              filterKeyword,
                              keywords?.id,
                              filterColors,
                              (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                            )
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
      {resultReportPermission?.includes('20') ? (
        <Grid item xs={12} md={4} id='chart1'>
          <DailyMessagePieChart
           keywordsColor={keywordGraphColors ?? GraphicColors}
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
            keywordsColor={!loadingKeywordList ? keywordGraphColors : GraphicColors}
            type='message'
            params={params}
            chartId='Chart 2'
            highlight={highlight === 'chart2' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      
      <MessageByAll keywordsColor={!loadingKeywordList ? keywordGraphColors : GraphicColors} resultReportPermission={resultReportPermission} highlight={highlight} params={params} />
      
      {resultReportPermission?.includes('30') ? (
        <Grid item xs={12} md={8} id='chart11'>
          <InfluencerGraph
            chartId='Chart 11'
            params={params}
            highlight={highlight === 'chart11' ? true : false}
            resultNumbersOfAccounts={resultNumbersOfAccounts}
            loadingNumbersOfAccounts={loadingNumbersOfAccountsComparison}
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
      
      <KeywordBy highlight={highlight} resultReportPermission={resultReportPermission} params={params} keywordsColor={keywordGraphColors ?? GraphicColors} />

      <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} />
      <QuickViewModal show={showQuickView} setShow={setShowQuickView} params={params} chartId={highlight} keywordsColor={keywordGraphColors ?? GraphicColors} />
    </Grid>
  )
}

export default VoiceDashboard
