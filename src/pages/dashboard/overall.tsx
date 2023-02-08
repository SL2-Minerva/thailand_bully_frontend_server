import { forwardRef, useCallback, useEffect, useState } from "react"
import { Grid , Card, CardHeader, CardContent, InputLabel, MenuItem, Button, Box, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

// import DatePicker from '@mui/lab/DatePicker'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import StackedChart from "./stackedChart"
import DonutChart from "./donutChart"
import { useTheme } from '@mui/material/styles'
import MessageText  from 'mdi-material-ui/MessageText'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Person from 'mdi-material-ui/Account'
import KeyStatusReport from "./keyStatusReport"

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { styled } from '@mui/material/styles';


// ** Third Party Styles Imports
// import addDays from 'date-fns/addDays'

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
import { FilterByCampaignId, GetKeyWordsList, TotalKeyStats } from "src/services/api/dashboards/overall/overallDashboardApi"
import SourceService from "src/services/api/source/SourceApi"
import WordCloud from "./WordCloud"
import TotalMessageLists from "./TotalMessageLists"
import WordCloudChannel from "./WordCloudChannel"
import AccountList from "./AccountList"
import WordCloudSentiment from "./WordCloudSentiment"
import { UserPermission } from "src/services/api/users/role"
import { GraphicColors } from "src/utils/const"
import Translations from 'src/layouts/components/Translations'
import { useRouter } from "next/router"

// import QuickView from "./QuickView"

export const calculateDate = (days: number) => {
    const today = new Date()
    const calcuatedDate = new Date(today)
    calcuatedDate.setDate(calcuatedDate.getDate() - days)

    return calcuatedDate;
}

export const get1stAndLastDayOfMonth = (year : number, month : number, type: number) => {
    return new Date(year, month, type);
}

export interface PickerProps {
    label?: string
    end: Date | number
    start: Date | number
  }

 export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#9e9e9e',
        color: 'white',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(20),
        border: '1px solid #9e9e9e',
        },
  }));

const OverallDashboard = () => {
    const [date, setDate] = useState<DateType>(calculateDate(6))
    const [endDate, setEndDate] = useState<DateType>(new Date())
    const [ previousDate, setPreviousDate] = useState<DateType>(new Date())
    const [ previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
    const [ campaign, setCampaign ] = useState<string>("1")
    const [ platformId, setPlatformId ] = useState<string>("all")
    const [ dateSelect, setDateSelect ] = useState<string>(localStorage.getItem('dateSelect') || "3")
    const [ reload ] = useState<boolean>(false);
    const [ period, setPeriod ] = useState<string>('last7days')
    const [ topKeyword, setTopKeyword ] = useState<string>('all');
    const [ showPreviousDatepicker, setShowPreviousDatepicker ] = useState<boolean>(false);
    const [ keyword, setKeyword ] = useState<string>('all');
    const [ filterKeyword, setFilterKeyword ] = useState<any>([]);

    const theme = useTheme()
    const router = useRouter()

    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus

    const { resultReportPermission, errorUserPermission } = UserPermission();
    const { resultCampaiganList } = CampaignList();
    const { result_source_list  } = SourceService();
    const { resultTotalMessagePerDay, resultTotalEngagement, resultTotalAccount, loadingTotalKeystats } = TotalKeyStats(campaign, reload, platformId, date, endDate, period, previousDate, previousEndDate, keyword);
    const { resultKeywordList } = GetKeyWordsList(campaign);
    const { resultFilterData, loadingFilterData } = FilterByCampaignId(campaign, platformId, date, endDate, period, previousDate, previousEndDate, keyword);
    const checkKeywordId = (data: any, keywordId : string | number) => {
        const index = data.indexOf(keywordId);
        if (index > -1) { 
            data.splice(index, 1); 
        } else {
            data.push(keywordId);
        }

        setFilterKeyword(data);

        if(data.length === 0) {
            setKeyword('all');
        } else {
            setKeyword(data.join(','));
        }

        return data;
    }

    const params = {
        campaign: campaign,
        platformId: platformId, 
        date: date,
        endDate: endDate, 
        period: period, 
        previousDate: previousDate, 
        previousEndDate: previousEndDate,
        topKeyword : topKeyword,
        keywordIds : keyword, 
        label: '',
        page: 'overallDashboard'
      }

    const handleSelectList = useCallback((e: SelectChangeEvent, type:string) => {
        if (type === 'campaign') {
            setCampaign(e.target.value)
        } else {
            setPlatformId(e.target.value)
        }
    }, [])

    const handleTopKeywords = (data: string) => {
        setTopKeyword(data);
    }

    const handleDateSelect = useCallback((e:any) => {
        const value = e.target?.value ? e.target?.value : e; 
        setDateSelect(value);
        setShowPreviousDatepicker(false);
        localStorage.setItem('dateSelect', value);
        periodSet(value)
    }, [])

    const periodSet = (value: any) => {
        if (value === '1') {
            setPeriod('daily');
            setDate(new Date());
            setEndDate(new Date());
        } else if (value === '2') {

            // const yesterday = moment().add(-1, 'days');
            setPeriod('yesterday');
            const yesterday = calculateDate(1);
            setDate(yesterday);
            setEndDate(yesterday);
        } else if (value === '3') {
            setPeriod('last7days');
            const lastSevenDays = calculateDate(6);
            setDate(lastSevenDays);
            setEndDate(new Date());
        } else if (value === '4') {
            setPeriod('last30days');
            const last30Days = calculateDate(29);
            setDate(last30Days);
            setEndDate(new Date());
        } else if (value === '5') {
            setPeriod('thismonth');
            const date = new Date();
            const firstDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth(),
                1
              );
            setDate(firstDayofMonth);
            setEndDate(date);
        } else if (value === '6') {
            setPeriod('lastmonth');
            const date = new Date();
            const lastDayofMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth()-1,
                date.getDate()
            );

            const firstDayofLastMonth = get1stAndLastDayOfMonth(
                date.getFullYear(),
                date.getMonth()-1,
                1
              );
            
            setDate(firstDayofLastMonth);
            setEndDate(lastDayofMonth);
        } else {
            setPeriod('customrange');
            setShowPreviousDatepicker(true);
        }
    }

    const handleOnChangeDate = (dates: any) => {
        handleDateSelect("7")
        const [start, end] = dates
        setDate(start)
        setEndDate(end)
    }

    const handleOnChangePreviousDate = (dates: any) => {
        const [start, end] = dates
        setPreviousDate(start)
        setPreviousEndDate(end)
    }

    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = format(props.start, 'dd/MM/yyyy')
        const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null
    
        const value = `${startDate}${endDate !== null ? endDate : ''}`
    
        return <FormControl fullWidth><TextField inputRef={ref} label={props.label || ''} {...props} value={value} /></FormControl>
    })

    useEffect(()=> {
        if(errorUserPermission) {
          window.localStorage.removeItem('userData')
          localStorage.clear()
          router.push('/login')
        }
      }, [errorUserPermission])

    useEffect(()=> {
        if(localStorage.getItem('dateSelect')) {
            const value = localStorage.getItem('dateSelect') 
            periodSet(value)
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
                            <InputLabel id='plan-select'><Translations text="Period of time" /></InputLabel>
                            <Select
                                fullWidth
                                value={dateSelect}
                                id='select-date'
                                label={<Translations text="Period of time" />}
                                labelId='date-select'
                                onChange={(e:SelectChangeEvent) => {handleDateSelect(e)}}
                                inputProps={{ placeholder: 'Select Period' }}
                            >
                                <MenuItem value="1"><Translations text="Today" /></MenuItem>
                                <MenuItem value="2"><Translations text="Yesterday" /></MenuItem>
                                <MenuItem value="3"><Translations text="Last 7 Days" /></MenuItem>
                                <MenuItem value="4"><Translations text="Last 30 Days" /></MenuItem>
                                <MenuItem value="5"><Translations text="This Month" /></MenuItem>
                                <MenuItem value="6"><Translations text="Last Month" /></MenuItem>
                                <MenuItem value="7">Custom Date Range</MenuItem>

                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'><Translations text="Campaign Name" /></InputLabel>
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
                            <InputLabel id='plan-select'><Translations text="Channel"/></InputLabel>
                            <Select
                                fullWidth
                                value={platformId}
                                id='select-platform'
                                label='Select Paltform'
                                labelId='platform-select'
                                onChange={(e) => {handleSelectList(e, 'platform')}}
                                inputProps={{ placeholder: 'Select Platform' }}
                            >
                                <MenuItem  value="all">
                                    ALL
                                </MenuItem>
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
                        {
                            showPreviousDatepicker ?
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
                            :""
                        }
                        
                    </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Filter"></CardHeader>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={1}> 
                                <Button
                                    sx={{ mb: 2 }}
                                    onClick={() => {
                                        if(keyword === 'all') {
                                            setKeyword('')
                                        } else {
                                            setKeyword('all')
                                            setFilterKeyword([]);
                                        }
                                        
                                    }}
                                    variant='contained'
                                    color ={keyword === 'all' ? 'primary' : 'secondary'}
                                >
                                    ALL
                                </Button>
                            </Grid>

                            {
                                resultKeywordList && (resultKeywordList || []).map((keywords : any, index : number) => {
                                    return(
                                        <Grid item xs={6} md={1.2} key={index}> 
                                            <Button
                                                sx={{ mb: 2, bgcolor: filterKeyword?.indexOf(keywords?.id) > -1 ? GraphicColors[index] : keyword ==='all' ? GraphicColors[index] : 'grey',
                                                ":hover": {bgcolor: filterKeyword?.indexOf(keywords?.id) > -1 ? GraphicColors[index] : keyword ==='all' ? GraphicColors[index] : 'grey'} }}
                                                onClick={() => {
                                                    checkKeywordId(filterKeyword, keywords?.id);
                                                }}
                                                variant='contained'
                                            >
                                                {keywords.name}
                                            </Button>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("1") ?
                <Grid id="chart1" item xs={12} md={4}>
                    <DonutChart params={params} resultFilterData={resultFilterData} loadingFilterData={loadingFilterData} />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("2") ?
                <Grid id="chart2" item xs={12} md={8}>
                    <StackedChart
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params= {params}
                        loadingFilterData={loadingFilterData}
                        resultFilterData={resultFilterData}
                    />
                </Grid> : ''
            }
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("3") ? 
                <Grid id="chart3" item xs={12} md={4}>
                    <KeyStatusReport
                        stats= {resultTotalMessagePerDay?.comparison || '0'}
                        type={resultTotalMessagePerDay?.type}
                        color='primary'
                        trendNumber={resultTotalMessagePerDay?.percentage || '0%'}
                        icon={<MessageText />}
                        title='Period over Period Comparison'
                        chipText='Last 1 Month'
                        totalText = 'Total Messages'
                        totalValue = {resultTotalMessagePerDay?.total_message?.toString() || '0'}
                        averageText="Average Message per Day"
                        averageValue= {resultTotalMessagePerDay?.average_message?.toString() || '0'}
                        chartId = "Chart 3"
                        reportNo = '1.1.005'
                        loading = {loadingTotalKeystats}
                    />
                </Grid> :
                ""
            }

            {
                resultReportPermission?.includes("4") ? 
                <Grid id="chart4" item xs={12} md={4}>
                    <KeyStatusReport
                        stats={resultTotalEngagement?.comparison || '0'}
                        type={resultTotalEngagement?.type}
                        color='primary'
                        trendNumber={resultTotalEngagement?.percentage || '0'}
                        icon={<ThumbUp />}
                        title='Period over Period Comparison'
                        chipText='Last 1 Month'
                        totalText = 'Total Engagements'
                        totalValue = {resultTotalEngagement?.total_engagement?.toString() || '0'}
                        averageText="Avg. Engagement per Day"
                        averageValue={resultTotalEngagement?.average_engagement?.toString() || '0'}
                        chartId = "Chart 4"
                        reportNo = '1.1.006'
                        loading = {loadingTotalKeystats}
                    />
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("5") ? 
                <Grid id="chart5" item xs={12} md={4}>
                    <KeyStatusReport
                        stats={resultTotalAccount?.comparison || '0'}
                        type={resultTotalAccount?.type}
                        color='primary'
                        trendNumber={resultTotalAccount?.percentage || '0'}
                        icon={<Person />}
                        title='Period over Period Comparison'
                        chipText='Last 1 Month'
                        totalText = 'Total Accounts'
                        totalValue = {resultTotalAccount?.total_account?.toString() || '0'}
                        averageText="Average Account per Day"
                        averageValue={resultTotalAccount?.average_account?.toString() || '0'}
                        chartId = "Chart 5"
                        reportNo = '1.1.007'
                        loading = {loadingTotalKeystats}
                    />
                </Grid> : ""
            }
        </Grid>
        
        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("6") ? 
                <Grid id="chart6" item xs={12}>
                    <KeywordTable params={params} chartId="Chart 6"/>
                </Grid> : ""
            }
        </Grid>

        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("7") ? 
                <Grid id="chart7" item xs={12} md={4}>
                    <MainKeyWordTable params={params} chartId="Chart 7"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("8") ? 
                <Grid id="chart8" item xs={12} md={4}>
                    <TopSiteList params={params} chartId="Chart 8"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("9") ? 
                <Grid id="chart9" item xs={12} md={4}>
                    <TopHashtagList params={params} chartId="Chart 9"/>
                </Grid> : ""
            }

        </Grid>

        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("10") ? 
                <Grid id="chart10" item xs={12} md ={6}>
                    <SentimentGaugeChart params={params} chartId="Chart 10" />
                </Grid> : 
                ""
            }
            {
                resultReportPermission?.includes("11") ? 
                <Grid id="chart11" item xs={12} md={6}>
                    <CommentSentiment params={params} chartId="Chart 11" />
                </Grid> : ""
            }
        </Grid>

        <Grid container spacing={3} mt={2}>
            {
                resultReportPermission?.includes("12") ? 
                <>
                    <Grid id="chart12" item xs={12} md={8}>
                        <ShareOfVoice params={params} chartId="Chart 12"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SentimentLevelChart params={params}/>
                    </Grid>
                </> : ""
            }
        </Grid>

        {
            resultReportPermission?.includes("13") || resultReportPermission?.includes("15") || resultReportPermission?.includes("18") ?
            <Grid container spacing={3} mt ={2}> 
                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <span  style={{marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
                    <Button variant="contained" color={topKeyword === 'top10' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }}
                    onClick={() => {handleTopKeywords("top10")}}> Top 10</Button>
                    <Button variant="contained" color={topKeyword === 'top20' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeywords("top20")}}> Top 20</Button>
                    <Button variant="contained" color={topKeyword === 'top50' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeywords("top50")}}> Top 50</Button>
                    <Button variant="contained" color={topKeyword === 'top100' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeywords("top100")}}> Top 100</Button>
                    <Button variant="contained" color={topKeyword === 'all' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeywords("all")}}> ALL </Button>
                </Grid>
            </Grid> : ""
        }

        {
            resultReportPermission?.includes("13") ?
            <>
                <Grid container spacing={3} mt ={2}>
                    <Grid id="chart13" item xs={12} md={6}>
                        <WordCloud params={params} chartId="Chart 13"/>
                    </Grid>
                    <Grid id="chart14" item xs={12} md={6}>
                        <TotalMessageLists params={params} chartId="Chart 14"/>
                    </Grid>
                </Grid>
            </> : ""
        }

        {
            resultReportPermission?.includes("15") ?
            <Grid container spacing={3} mt ={2}> 
                <Grid id="chart15" item xs={12} md={6}>
                    <WordCloudChannel params={params} chartId="Chart 15"/>
                </Grid>
                <Grid id="chart16" item xs={12} md={6}>
                    <AccountList params={params} chartId="Chart 16" cardHeader="Word Cloud by Account" 
                    title="Word Cloud by Account: Message Transaction" networkTitle="Word Cloud by Account: Social Network Analysis"
                    />
                </Grid>
            </Grid> : ""
        }
        {
            resultReportPermission?.includes("18") ?
            <Grid container spacing={3} mt ={2}>
                <Grid id="chart17" item xs={12} md={6}>
                    <WordCloudSentiment params={params} chartId="Chart 18"/>
                </Grid>
                <Grid id="chart18" item xs={12} md={6}>
                    <AccountList params={params} chartId="Chart 19" cardHeader="Word Cloud by Sentiment Type" 
                    title="Word Cloud by Sentiment Type: Message Transaction" networkTitle="Word Cloud by Sentiment Type: Social Network Analysis"/>
                </Grid>
            </Grid> : ""
        }   

        {/* <QuickView /> */}
    </>
  )
    
}

export default OverallDashboard