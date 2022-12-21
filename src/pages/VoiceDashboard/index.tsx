import { useState } from "react" 
import { Grid } from "@mui/material"
import DailyMessageGraph from "./DailyMessageGraph"
import InfluencerGraph from "./InfluencerGraph"
import InfluencerComparison from "./InfluencerComparison"
import MessageText  from 'mdi-material-ui/MessageText'
import { AccountGroup } from "mdi-material-ui"
import DayTimeComparison from "./DayTimeComparison"
import DayTimeSentiment from "./DayTimeSentiment"
import DayTimeBullyLevel from "./DayTimeBullyLevel"
import DayTimeBullyType from "./DayTimeBullyType"
import DailyMessagePieChart from "./DailyMessagesPieChart"
import MessagesByDay from "./MessagesByDay"
import { useTheme } from '@mui/material/styles'
import { GetDailyMessages, GetMessagesByDay, GetMessagesByTime,GetMessagesByDevice,
    GetMessagesByChannel, GetMessagesBySentiment, GetMessagesByAccount, GetMessagesByBullyLevel, GetMessagesByBullyType, GetNumbersOfAccounts, GetComparison, GetDayTimeComparison, GetDayTimeBySentiment, GetDayTimeByBullyLevel, GetDayTimeByBullyType, GetPlatformsComparison, GetDevicesComparison, GetDeviceVsChannel, GetKeywordComparisonByChannel, GetKeywordComparisonBySentiment, GetKeywordComparisonByBullyLevel, GetKeywordComparisonByBullyType, GetPercentageMessage } from "src/services/api/dashboards/voice/VoiceDashboardAPIs"
import PlatformsComparison from "./PlatformsComparison"
import DevicesComparison from "./DevicesComparison"
import ChannelVsDevice from "./ChannelVsDevice"
import KeywordComparisonByChannel from "./KeywordComparison"
import KeywordComparisonBySentiment from "./KeywordComparisonBySentiment"
import KeywordComparisonByBullyLevel from "./KeywordComparisonByBullyLevel"
import KeywordComparisonByBullyType from "./KeywordComparisonByBullyType"
import Filter from "./Filter"

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
    const {  resultPlatformComparison } = GetPlatformsComparison(campaign, date, endDate, period);
    const { resultDevicesComparison } = GetDevicesComparison(campaign, date, endDate, period);
    const { resultDeviceVsChannel } = GetDeviceVsChannel(campaign, date, endDate, period);
    const { resultKeywordComparisonByChannel } = GetKeywordComparisonByChannel(campaign, date, endDate, period);
    const { resultKeywordComparisonBySentiment } = GetKeywordComparisonBySentiment(campaign, date, endDate, period);
    const { resultKeywordComparisonByBullyType } = GetKeywordComparisonByBullyType(campaign, date, endDate, period);
    const { resultKeywordComparisonByBullyLevel } = GetKeywordComparisonByBullyLevel(campaign, date, endDate, period);
    const { resultPercentageMessage } = GetPercentageMessage(campaign, date, endDate, period);

    return (
        <Grid container spacing={6}>
            <Filter 
                tilte="Voice Dashboard"
                date ={date}
                setDate ={setDate}
                endDate ={endDate}
                setEndDate = {setEndDate}
                period ={period}
                setPeriod ={setPeriod}
                dateSelect= {dateSelect}
                setDateSelect ={setDateSelect}
                campaign={campaign}
                setCampaign={setCampaign}
            />
            <Grid item xs={12} md={6}>
                <DailyMessagePieChart percentData={resultPercentageMessage} type="message"/>
            </Grid>
            <Grid item xs={12} md={6}>
                <DailyMessageGraph dailyData={resultDailyMessage} type="message"/>
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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
                    chartTitle="Message"
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

            <Grid item xs={4}>
                <PlatformsComparison resultPlatformComparison={resultPlatformComparison} />
            </Grid>
            <Grid item xs={4}>
                <DevicesComparison resultDevicesComparison={resultDevicesComparison} />
            </Grid>
            <Grid item xs={4}>
                <ChannelVsDevice resultDeviceVsChannel={resultDeviceVsChannel} />
            </Grid>
            <Grid item xs={12} md={6}>
                    <KeywordComparisonByChannel resultKeywordComparisonByChannel={resultKeywordComparisonByChannel} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonBySentiment resultKeywordComparisonBySentiment={resultKeywordComparisonBySentiment} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonByBullyLevel resultKeywordComparisonByBullyLevel={resultKeywordComparisonByBullyLevel}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonByBullyType resultKeywordComparisonByBullyType={resultKeywordComparisonByBullyType}/>
                </Grid>
        </Grid>
    )

}

export default VoiceDashboard 