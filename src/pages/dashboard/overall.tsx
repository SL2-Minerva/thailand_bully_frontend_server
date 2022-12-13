import { useCallback, useState } from "react"
import { Grid , Card, CardHeader, CardContent, InputLabel, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import StackedChart from "./stackedChart"
import DonutChart from "./donutChart"
import { useTheme } from '@mui/material/styles'
import MessageText  from 'mdi-material-ui/MessageText'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Person from 'mdi-material-ui/Account'
import KeyStatusReport from "./keyStatusReport"

// ** Third Party Styles Imports

import 'chart.js/auto'
import 'react-datepicker/dist/react-datepicker.css'
import KeywordTable from "./keywordTable"
import MainKeyWordTable from "./MainKeywordTable"

// import SubKeywordList from "./SubKeyWordList"

import TopHashtagList from "./TopHastagList"
import TopSiteList from "./TopSiteList"

import SentimentGaugeChart from "./SentimentGaugeChart"

import CommentSentiment from "./CommentSentiment"
import ShareOfVoice from "./ShareOfVoice"
import SentimentLevelChart from "./SentimentLevelChart"
import { CampaignList } from "src/services/api/campaign/CampaignAPI"
import { FilterByCampaignId, TotalMessagePerDay, GetTotalAccount, GetTotalEngagement, GetTopKeywords } from "src/services/api/dashboards/overall/overallDashboardApi"
import SourceService from "src/services/api/source/SourceApi"

export const calculateDate = (days: number) => {
    const today = new Date()
    const calcuatedDate = new Date(today)
    calcuatedDate.setDate(calcuatedDate.getDate() - days)

    return calcuatedDate;
}

export const get1stAndLastDayOfMonth = (year : number, month : number, type: number) => {
    return new Date(year, month, type);
}

const OverallDashboard = () => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [ campaign, setCampaign ] = useState<string>("1")
    const [ platformId, setPlatformId ] = useState<string>("1")
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ disableSelectDate, setDisableSelectDate ] = useState<boolean>(true);
    const [ reload ] = useState<boolean>(false);
    const theme = useTheme()

    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus

    const { resultCampaiganList } = CampaignList();
    const { resultFilterData } = FilterByCampaignId(campaign, reload);
    const { result_source_list  } = SourceService();
    const { resultTotalMessagePerDay } = TotalMessagePerDay();
    const { resultTotalEngagement } = GetTotalEngagement();
    const { resultTotalAccount } = GetTotalAccount();
    const { resultTopKeywords } = GetTopKeywords();

    const handleSelectList = useCallback((e: SelectChangeEvent, type:string) => {
        if (type === 'campaign') {
            setCampaign(e.target.value)
        } else {
            setPlatformId(e.target.value)
        }
    }, [])

    const handleDateSelect = useCallback((e:SelectChangeEvent) => {
        const value = e.target.value; 
        setDateSelect(value);
        setDisableSelectDate(true);
        if (value === '1') {
            setDate(new Date());
            setEndDate(new Date());
        } else if (value === '2') {

            // const yesterday = moment().add(-1, 'days');

            const yesterday = calculateDate(1);
            setDate(yesterday);
            setEndDate(yesterday);
        } else if (value === '3') {
            const lastSevenDays = calculateDate(6);
            setDate(lastSevenDays);
            setEndDate(new Date());
        } else if (value === '4') {
            const last30Days = calculateDate(29);
            setDate(last30Days);
            setEndDate(new Date());
        } else if (value === '5') {
            const date = new Date();
            const firstDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                1
              );
            setDate(firstDayofMonth);
            setEndDate(date);
        } else if (value === '6') {
            const date = new Date();
            const firstDayofLastMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth()-1,
                1
              );
            const lastDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                0
            );
            setDate(firstDayofLastMonth);
            setEndDate(lastDayofMonth);
        } else {
            setDisableSelectDate(false);
        }
    }, [])

  return (
    <>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Overall Dashboard' />
                    <CardContent>

                    <Grid container spacing={6} mt={2}>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Date</InputLabel>
                            <Select
                                fullWidth
                                value={dateSelect}
                                id='select-date'
                                label='Select Date'
                                labelId='date-select'
                                onChange={handleDateSelect}
                                inputProps={{ placeholder: 'Select Date' }}
                            >
                                <MenuItem value="1">Today</MenuItem>
                                <MenuItem value="2">Yesterday</MenuItem>
                                <MenuItem value="3">Last 7 days</MenuItem>
                                <MenuItem value="4">Last 30 days</MenuItem>
                                <MenuItem value="5">This Month</MenuItem>
                                <MenuItem value="6">Last Month</MenuItem>
                                <MenuItem value="7">Custom Date Range</MenuItem>

                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Campaign</InputLabel>
                            <Select
                                fullWidth
                                value={campaign}
                                id='select-campaign'
                                label='Select campaign'
                                labelId='campaign-select'
                                onChange={(e) => {handleSelectList(e, 'campaign')}}
                                inputProps={{ placeholder: 'Select Campaign' }}
                            >
                                {
                                resultCampaiganList && resultCampaiganList.map((item: any, index: number) => {
                                    return (
                                    <MenuItem key={index} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                    )
                                })
                                }
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Platform</InputLabel>
                            <Select
                                fullWidth
                                value={platformId}
                                id='select-platform'
                                label='Select Paltform'
                                labelId='platform-select'
                                onChange={(e) => {handleSelectList(e, 'platform')}}
                                inputProps={{ placeholder: 'Select Platform' }}
                            >
                                {
                                    result_source_list && result_source_list.map((item: any, index: number) => {
                                        return (
                                        <MenuItem key={index} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                        )
                                })
                                }
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    readOnly = {disableSelectDate}
                                    label='Start Date'
                                    value={date}
                                    onChange={newValue => setDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                    inputFormat="dd/MM/yyyy"
                                />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    readOnly = {disableSelectDate}
                                    label='End Date'
                                    value={endDate}
                                    onChange={newValue => setEndDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                    inputFormat="dd/MM/yyyy"
                                />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={8}>
                <StackedChart
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultFilterData}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <DonutChart filterData = {resultFilterData} />
            </Grid>
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={4}>
                <KeyStatusReport
                    stats= {resultTotalMessagePerDay?.comparison || '0'}
                    color='primary'
                    trendNumber={resultTotalMessagePerDay?.percentage || '0%'}
                    icon={<MessageText />}
                    title='Period over Period Comparison'
                    chipText='Last 1 Month'
                    totalText = 'Total Message'
                    totalValue = {resultTotalMessagePerDay?.total_message?.toString() || '0'}
                    averageText="Average Message per Day"
                    averageValue= {resultTotalMessagePerDay?.average_message?.toString() || '0'}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <KeyStatusReport
                    stats={resultTotalEngagement?.comparison || '0'}
                    color='primary'
                    trendNumber={resultTotalEngagement?.percentage || '0'}
                    icon={<ThumbUp />}
                    title='Period over Period Comparison'
                    chipText='Last 1 Month'
                    totalText = 'Total Engagement'
                    totalValue = {resultTotalEngagement?.total_engagement?.toString() || '0'}
                    averageText="Avg. Engagement per Day"
                    averageValue={resultTotalEngagement?.average_engagement?.toString() || '0'}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <KeyStatusReport
                    stats={resultTotalAccount?.comparison || '0'}
                    color='primary'
                    trendNumber={resultTotalAccount?.percentage || '0'}
                    icon={<Person />}
                    title='Period over Period Comparison'
                    chipText='Last 1 Month'
                    totalText = 'Total Account'
                    totalValue = {resultTotalAccount?.total_account?.toString() || '0'}
                    averageText="Average Account per Day"
                    averageValue={resultTotalAccount?.average_account?.toString() || '0'}
                />
            </Grid>
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
                <KeywordTable />
            </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={4}>
                <MainKeyWordTable mainKeyword={resultTopKeywords?.main_keyword}/>
            </Grid>

            <Grid item xs={12} md={4}>
                <TopSiteList topsites={resultTopKeywords?.top_sites}/>
            </Grid>

            <Grid item xs={12} md={4}>
                <TopHashtagList topHashtags={resultTopKeywords?.top_hastag}/>
            </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md ={6}>
                <SentimentGaugeChart value={resultFilterData?.prcentage_of_messages_current[0]?.data?.percentage}/>
            </Grid>

            <Grid item xs={12} md={6}>
                <CommentSentiment/>
            </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={8}>
                <ShareOfVoice />
            </Grid>

            <Grid item xs={12} md={4}>
                <SentimentLevelChart />
            </Grid>
        </Grid>
    </>
  )
    
}

export default OverallDashboard