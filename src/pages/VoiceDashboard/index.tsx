import { useCallback, useState } from "react" 
import { Grid, Card, CardHeader, CardContent, InputLabel, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DailyMessageGraph from "./DailyMessageGraph"
import InfluencerGraph from "./InfluencerGraph"
import InfluencerComparison from "./InfluencerComparison"
import MessageText  from 'mdi-material-ui/MessageText'
import { AccountGroup } from "mdi-material-ui"
import DayTimeComparison from "./DayTimeComparison"
import DayTimeSentiment from "./DayTimeSentiment"
import DayTimeBullyLevel from "./DayTimeBullyLevel"
import DayTimeBullyType from "./DayTimeBullyType"
import { calculateDate, get1stAndLastDayOfMonth } from "../dashboard/overall"
import DailyMessagePieChart from "./DailyMessagesPieChart"
import MessagesByDay from "./MessagesByDay"
import { CampaignList } from "src/services/api/campaign/CampaignAPI"
import { useTheme } from '@mui/material/styles'
import { GetDailyMessages, GetMessagesByDay, GetMessagesByTime,GetMessagesByDevice,
    GetMessagesByChannel, GetMessagesBySentiment, GetMessagesByAccount, GetMessagesByBullyLevel, GetMessagesByBullyType, GetNumbersOfAccounts, GetComparison, GetDayTimeComparison, GetDayTimeBySentiment, GetDayTimeByBullyLevel, GetDayTimeByBullyType } from "src/services/api/dashboards/voice/VoiceDashboardAPIs"

// import DailyMessagePercentage from "./DailyMessagePercentage"


const VoiceDashboard = () => {
    const theme = useTheme()

    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus

    const [date, setDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [ period, setPeriod ] = useState<string>('daily')
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ campaign, setCampaign ] = useState<string>("1")
    const [ disableSelectDate, setDisableSelectDate ] = useState<boolean>(true);
    const { resultMessagesByDay } = GetMessagesByDay(campaign, date, endDate, period);
    const { resultDailyMessage } = GetDailyMessages(campaign, date, endDate, period);
    const { resultMessagesByTime } = GetMessagesByTime(campaign, date, endDate, period);
    const { resultMessagesByDevice } = GetMessagesByDevice(campaign, date, endDate, period);
    const { resultMessagesByAccount } = GetMessagesByAccount(campaign, date, endDate, period);
    const { resultMessagesByChannel } = GetMessagesByChannel(campaign, date, endDate, period);
    const { resultMessagesBySentiment } = GetMessagesBySentiment(campaign, date, endDate, period);
    const { resultMessagesByBullyLevel } = GetMessagesByBullyLevel(campaign, date, endDate, period);
    const { resultMessagesByBullyType } = GetMessagesByBullyType(campaign, date, endDate, period);
    const { resultNumbersOfAccounts } = GetNumbersOfAccounts(campaign, date, endDate, period);
    const { resultTotalAccount,resultTotalMessages } = GetComparison(campaign, date, endDate, period);
    const { resultDayTimeComparison } = GetDayTimeComparison(campaign, date, endDate, period);
    const { resultDayBySentiment, resultTimeBySentiment } = GetDayTimeBySentiment(campaign, date, endDate, period);
    const { resultTimeByBullyLevel, resultDayByBullyLevel } = GetDayTimeByBullyLevel(campaign, date, endDate, period);
    const { resultDayByBullyType, resultTimeByBullyType } = GetDayTimeByBullyType(campaign, date, endDate, period);
    const { resultCampaiganList } = CampaignList();

    const handleDateSelect = useCallback((e:SelectChangeEvent) => {
        const value = e.target.value; 
        setDateSelect(value);
        setDisableSelectDate(true);
        if (value === '1') {
            setPeriod('daily');
            setDate(new Date());
            setEndDate(new Date());
        } else if (value === '2') {
            const yesterday = calculateDate(1);
            setPeriod('yesterday');
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
            setPeriod('customrange');
            setDisableSelectDate(false);
        }
    }, [])

    const handleSelectList = useCallback((e: SelectChangeEvent) => {
        setCampaign(e.target.value)
    }, [])
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Voice Dashboard' />
                    <CardContent>

                        <Grid container spacing={2} mt={2}>
                        <Grid item sm={3} xs={12}>
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
                        <Grid item sm={3} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    readOnly = {disableSelectDate}
                                    label='Start Date'
                                    value={date}
                                    onChange={newValue => setDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    readOnly = {disableSelectDate}
                                    label='End Date'
                                    value={endDate}
                                    onChange={newValue => setEndDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item sm={3} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Campaign</InputLabel>
                            <Select
                                fullWidth
                                value={campaign}
                                id='select-campaign'
                                label='Select campaign'
                                labelId='campaign-select'
                                onChange={(e) => {handleSelectList(e)}}
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

                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <DailyMessagePieChart />
            </Grid>
            <Grid item xs={12} md={6}>
                <DailyMessageGraph dailyMessages={resultDailyMessage}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay 
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByDay}
                    type="day"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByTime}
                    type="time"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByDevice}
                    type = "device"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByAccount}
                    type = "account"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByChannel}
                    type = "channel"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesBySentiment}
                    type = "sentiment"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByBullyLevel}
                    type = "bullyLevel"
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <MessagesByDay
                    white={whiteColor}
                    labelColor={labelColor}
                    success={lineChartYellow}
                    borderColor={borderColor}
                    primary={lineChartPrimary}
                    warning={lineChartWarning}
                    gridLineColor={gridLineColor}
                    filterData={resultMessagesByBullyType}
                    type = "bullyType"
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <InfluencerGraph numberOfAccounts={resultNumbersOfAccounts}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid xs={12}>
                    <InfluencerComparison 
                        color='primary'
                        trendNumber={resultTotalMessages?.percentage}
                        trend={resultTotalMessages?.type}
                        icon={<MessageText />}
                        totalText = 'Messages'
                        totalValue = {resultTotalMessages?.total_message}
                    />
                </Grid>
                <Grid xs={12} mt={5}>
                    <InfluencerComparison 
                        color='primary'
                        trendNumber={resultTotalAccount?.percentage}
                        trend={resultTotalAccount?.type}
                        icon={<AccountGroup />}
                        totalText = 'Accounts'
                        totalValue = {resultTotalAccount?.total_account}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <DayTimeComparison dayTimeComparison={resultDayTimeComparison}/>
            </Grid>
            <Grid item xs={12}>
                <DayTimeSentiment day={resultDayBySentiment} hour={resultTimeBySentiment} />
            </Grid>
            <Grid item xs={12}>
                <DayTimeBullyLevel day={resultDayByBullyLevel} hour={resultTimeByBullyLevel}/>
            </Grid>
            <Grid item xs={12}>
                <DayTimeBullyType day={resultDayByBullyType} hour={resultTimeByBullyType}/>
            </Grid>
        </Grid>
    )

}

export default VoiceDashboard 