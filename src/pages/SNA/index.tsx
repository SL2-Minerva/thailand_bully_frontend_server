import { forwardRef, useCallback, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  Box,
  LinearProgress,
  Typography
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { GetNetworkGraph } from 'src/services/api/dashboards/overall/overallDashboardApi'

// ** Third Party Styles Imports
// import addDays from 'date-fns/addDays'
import { CampaignList } from 'src/services/api/campaign/CampaignAPI'
import SourceService from 'src/services/api/source/SourceApi'
import Translations from 'src/layouts/components/Translations'
import { useRouter } from 'next/router'
import { calculateDate, get1stAndLastDayOfMonth, PickerProps } from '../dashboard/overall'
import { UserPermission } from 'src/services/api/users/role'
import Graph from 'react-graph-vis'
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css'

const SNA = () => {
  const [date, setDate] = useState<DateType>(calculateDate(6))
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [campaign, setCampaign] = useState<string>('1')
  const [platformId, setPlatformId] = useState<string>('all')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')
  const [period, setPeriod] = useState<string>('last7days')
  const [showPreviousDatepicker, setShowPreviousDatepicker] = useState<boolean>(false)

  // const [selectedValue, setSelectedValue] = useState('bySentiment')

  const router = useRouter()

  const { errorUserPermission } = UserPermission()
  const { resultCampaiganList } = CampaignList()
  const { result_source_list } = SourceService()
  const {
    resultNetworkGraph,
    resultSentimentNetwork,
    loadingNetworkGraph
  } = GetNetworkGraph(campaign, platformId, date, endDate, period, previousDate, previousEndDate, '', '', 'sna')

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'dd/MM/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <FormControl fullWidth>
        <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
      </FormControl>
    )
  })

  const handleSelectList = useCallback((e: SelectChangeEvent, type: string) => {
    if (type === 'campaign') {
      setCampaign(e.target.value)
    } else {
      setPlatformId(e.target.value)
    }
  }, [])
  const handleDateSelect = useCallback((e: any) => {
    const value = e.target?.value ? e.target?.value : e
    setDateSelect(value)
    setShowPreviousDatepicker(false)
    localStorage.setItem('dateSelect', value)
    periodSet(value)
  }, [])

  const handleOnChangeDate = (dates: any) => {
    handleDateSelect('7')
    const [start, end] = dates
    setDate(start)
    setEndDate(end)
  }

  const handleOnChangePreviousDate = (dates: any) => {
    const [start, end] = dates
    setPreviousDate(start)
    setPreviousEndDate(end)
  }

  const periodSet = (value: any) => {
    if (value === '1') {
      setPeriod('daily')
      setDate(new Date())
      setEndDate(new Date())
    } else if (value === '2') {
      // const yesterday = moment().add(-1, 'days');
      setPeriod('yesterday')
      const yesterday = calculateDate(1)
      setDate(yesterday)
      setEndDate(yesterday)
    } else if (value === '3') {
      setPeriod('last7days')
      const lastSevenDays = calculateDate(6)
      setDate(lastSevenDays)
      setEndDate(new Date())
    } else if (value === '4') {
      setPeriod('last30days')
      const last30Days = calculateDate(29)
      setDate(last30Days)
      setEndDate(new Date())
    } else if (value === '5') {
      setPeriod('thismonth')
      const date = new Date()
      const firstDayofMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth(), 1)
      setDate(firstDayofMonth)
      setEndDate(date)
    } else if (value === '6') {
      setPeriod('lastmonth')
      const date = new Date()
      const lastDayofMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth() - 1, date.getDate())

      const firstDayofLastMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth() - 1, 1)

      setDate(firstDayofLastMonth)
      setEndDate(lastDayofMonth)
    } else {
      setPeriod('customrange')
      setShowPreviousDatepicker(true)
    }
  }

  const initialGraph = {
    nodes: [],
    edges: []
  }

  // const [ graph, setGraph ] = useState(initialGraph);

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000',
      dashes: false
    },
    height: '700px',
    autoResize: false
  }

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value)
  // }

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      localStorage.clear()
      router.push('/login')
    }
  }, [errorUserPermission])

  useEffect(() => {
    if (resultCampaiganList?.length > 0) {
      setCampaign(resultCampaiganList[0]?.id)
    }
  }, [resultCampaiganList])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter' />
          <CardContent>
            <Grid container spacing={6} mt={2}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Period of time' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={dateSelect}
                    id='select-date'
                    label={<Translations text='Period of time' />}
                    labelId='date-select'
                    onChange={(e: SelectChangeEvent) => {
                      handleDateSelect(e)
                    }}
                    inputProps={{ placeholder: 'Select Period' }}
                  >
                    <MenuItem value='1'>
                      <Translations text='Today' />
                    </MenuItem>
                    <MenuItem value='2'>
                      <Translations text='Yesterday' />
                    </MenuItem>
                    <MenuItem value='3'>
                      <Translations text='Last 7 Days' />
                    </MenuItem>
                    <MenuItem value='4'>
                      <Translations text='Last 30 Days' />
                    </MenuItem>
                    <MenuItem value='5'>
                      <Translations text='This Month' />
                    </MenuItem>
                    <MenuItem value='6'>
                      <Translations text='Last Month' />
                    </MenuItem>
                    <MenuItem value='7'>Custom Date Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Campaign Name' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={campaign}
                    id='select-campaign'
                    label='Select campaign'
                    labelId='campaign-select'
                    onChange={e => {
                      handleSelectList(e, 'campaign')
                    }}
                    inputProps={{ placeholder: 'Select Campaign' }}
                  >
                    {resultCampaiganList &&
                      resultCampaiganList.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Channel' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={platformId}
                    id='select-platform'
                    label='Select Paltform'
                    labelId='platform-select'
                    onChange={e => {
                      handleSelectList(e, 'platform')
                    }}
                    inputProps={{ placeholder: 'Select Platform' }}
                  >
                    <MenuItem value='all'>ALL</MenuItem>
                    {result_source_list &&
                      result_source_list.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box>
                  <DatePickerWrapper>
                    <DatePicker
                      selectsRange
                      monthsShown={2}
                      endDate={endDate}
                      selected={date}
                      startDate={date}
                      shouldCloseOnSelect={false}
                      id='date-range-picker-months'
                      onChange={handleOnChangeDate}
                      customInput={
                        <CustomInput
                          label='Current Period'
                          end={endDate as Date | number}
                          start={date as Date | number}
                        />
                      }
                    />
                  </DatePickerWrapper>
                </Box>
              </Grid>
              {showPreviousDatepicker ? (
                <Grid item sm={4} xs={12}>
                  <Box>
                    <DatePickerWrapper>
                      <DatePicker
                        selectsRange
                        monthsShown={2}
                        endDate={previousEndDate}
                        selected={previousDate}
                        startDate={previousDate}
                        shouldCloseOnSelect={false}
                        id='date-range-picker-months'
                        onChange={handleOnChangePreviousDate}
                        customInput={
                          <CustomInput
                            label='Previous Period'
                            end={previousEndDate as Date | number}
                            start={previousDate as Date | number}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </Box>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {loadingNetworkGraph && <LinearProgress style={{ width: '100%' }} />}

          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mt: 4, mb: 3, lineHeight: '2rem' }}>
              <Translations text='Social Network Analysis' /> By Sentiment
            </Typography>
          </Box>

          {/* <Grid container spacing={1}>
            <FormControl sx={{ mt: 3, ml: 5 }}>
              <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                <FormControlLabel
                  value='bySentiment'
                  control={
                    <Radio value='bySentiment' checked={selectedValue === 'bySentiment'} onChange={handleChange} />
                  }
                  label='By Sentiment'
                />
                <FormControlLabel
                  value='byBullyLevel'
                  control={
                    <Radio value='byBullyLevel' checked={selectedValue === 'byBullyLevel'} onChange={handleChange} />
                  }
                  label='By Bully Level'
                />
                <FormControlLabel
                  value='ByBullyType'
                  control={
                    <Radio value='byBullyType' checked={selectedValue === 'byBullyType'} onChange={handleChange} />
                  }
                  label='By Bully Type'
                />
              </RadioGroup>
            </FormControl>
          </Grid> */}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {resultNetworkGraph ? (
                <>
                  <Graph graph={resultSentimentNetwork ? resultSentimentNetwork : initialGraph} options={options} />
                </>
              ) : (
                <div
                  style={{
                    height: 400,
                    padding: '70px 0',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    color: '#80808059'
                  }}
                >
                  There is no data
                </div>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SNA
