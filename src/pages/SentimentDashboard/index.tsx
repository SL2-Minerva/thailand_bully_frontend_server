import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Filter from '../VoiceDashboard/Filter'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { calculateDate } from '../dashboard/overall'

import { UserPermission } from 'src/services/api/users/role'
import { useRouter } from 'next/router'
import KeywordFilters from '../dashboard/KeywordFilters'
import SentimentGraph from './SentimentGraphs'

const SentimentDashboard = () => {
  const router = useRouter()

  const [date, setDate] = useState<DateType>(calculateDate(6))
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [period, setPeriod] = useState<string>('last7days')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')
  const [campaign, setCampaign] = useState<string>('')
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [loadingKeyword, setLoadingKeyword] = useState<boolean>(true)

  const { resultReportPermission, errorUserPermission } = UserPermission()

  const params = {
    campaign: campaign,
    date: date,
    endDate: endDate,
    period: period,
    keywordIds: keyword,
    page: 'sentimentDashboard',
    label: '',
    filterKeyword: filterKeyword
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
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      localStorage.clear()
      router.push('/login')
    }
  }, [errorUserPermission])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Filter
          tilte='Sentiment Dashboard'
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

      {campaign ? (
        <Grid container ml={2}>
          <KeywordFilters
            campaign={campaign}
            keyword={keyword}
            setKeyword={setKeyword}
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            checkKeywordId={checkKeywordId}
            setKeywordLoading={setLoadingKeyword}
          />
        </Grid>
      ) : (
        ''
      )}

      <Grid container ml={2}>
        {!loadingKeyword ? <SentimentGraph params={params} resultReportPermission={resultReportPermission} /> : ''}
      </Grid>
    </Grid>
  )
}

export default SentimentDashboard
