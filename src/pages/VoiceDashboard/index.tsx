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
import { StyledTooltip } from "../dashboard/overall"
import QuickView from "./QuickView"

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
            <StyledTooltip arrow title="Chart 1">
                <Grid item xs={12} md={6} id="chart1">
                    <DailyMessagePieChart percentData={resultPercentageMessage} type="message"/>
                </Grid>
            </StyledTooltip>

            <StyledTooltip arrow title="Chart 2">
                <Grid item xs={12} md={6} id="chart2">
                    <DailyMessageGraph dailyData={resultDailyMessage} type="message"/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 3">
                <Grid item xs={12} md={12} id="chart3">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 4">
                <Grid item xs={12} md={12} id="chart4">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 5">
                <Grid item xs={12} md={12} id="chart5">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 6">
                <Grid item xs={12} md={12} id="chart6">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 7">
                <Grid item xs={12} md={12} id="chart7">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 8">
                <Grid item xs={12} md={12} id="chart8">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 9">
                <Grid item xs={12} md={12} id="chart9">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 10">
                <Grid item xs={12} md={12} id="chart10">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 11">
                <Grid item xs={12} md={8} id="chart11">
                    <InfluencerGraph numberOfAccounts={resultNumbersOfAccounts}/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 12">
                <Grid item xs={12} md={4} id="chart12">
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
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 13">
                <Grid item xs={12} id="chart13">
                    <DayTimeComparison dayTimeComparison={resultDayTimeComparison}/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 14">
                <Grid item xs={12} id="chart14">
                    <DayTimeSentiment day={resultDayBySentiment} hour={resultTimeBySentiment} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 15">
                <Grid item xs={12} id="chart15">
                    <DayTimeBullyLevel day={resultDayByBullyLevel} hour={resultTimeByBullyLevel}/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 16">
                <Grid item xs={12} id="chart16">
                    <DayTimeBullyType day={resultDayByBullyType} hour={resultTimeByBullyType}/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 17">
                <Grid item xs={12} md={4} id="chart17">
                    <PlatformsComparison resultPlatformComparison={resultPlatformComparison} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 18">
                <Grid item xs={12} md={4} id="chart18">
                    <DevicesComparison resultDevicesComparison={resultDevicesComparison} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 19">
                <Grid item xs={12} md={4} id="chart19">
                    <ChannelVsDevice resultDeviceVsChannel={resultDeviceVsChannel} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 20">
                <Grid item xs={12} md={6} id="chart20">
                    <KeywordComparisonByChannel resultKeywordComparisonByChannel={resultKeywordComparisonByChannel} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 21">
                <Grid item xs={12} md={6} id="chart21">
                    <KeywordComparisonBySentiment resultKeywordComparisonBySentiment={resultKeywordComparisonBySentiment} />
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 22">
                <Grid item xs={12} md={6} id="chart22">
                    <KeywordComparisonByBullyLevel resultKeywordComparisonByBullyLevel={resultKeywordComparisonByBullyLevel}/>
                </Grid>
            </StyledTooltip>
            <StyledTooltip arrow title="Chart 23">
                <Grid item xs={12} md={6} id="chart23">
                    <KeywordComparisonByBullyType resultKeywordComparisonByBullyType={resultKeywordComparisonByBullyType}/>
                </Grid>
            </StyledTooltip>
            <QuickView/>
        </Grid>
    )

}

export default VoiceDashboard 