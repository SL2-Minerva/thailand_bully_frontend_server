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
import QuickView from "./QuickView"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { UserPermission } from "src/services/api/users/role"

const VoiceDashboard = () => {
    const theme = useTheme()

    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus

    const [date, setDate] = useState<DateType>(new Date())
    const [endDate, setEndDate] = useState<DateType>(new Date())
    const [ period, setPeriod ] = useState<string>('daily')
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ campaign, setCampaign ] = useState<string>("1")
    const [ previousDate, setPreviousDate] = useState<DateType>(new Date())
    const [ previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())

    const params = {
        campaign: campaign,
        date: date,
        endDate: endDate, 
        period: period, 
        previousDate: previousDate, 
        previousEndDate: previousEndDate,
    }

    const { resultReportPermission } = UserPermission();
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
                previousDate = {previousDate}
                setPreviousDate = {setPreviousDate}
                previousEndDate = {previousEndDate}
                setPreviousEndDate = {setPreviousEndDate}
                period ={period}
                setPeriod ={setPeriod}
                dateSelect= {dateSelect}
                setDateSelect ={setDateSelect}
                campaign={campaign}
                setCampaign={setCampaign}
            />
            {
                resultReportPermission?.includes("20") ?
                <Grid item xs={12} md={6} id="chart1">
                    <DailyMessagePieChart percentData={resultPercentageMessage} type="message" chartId="Chart 1"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("21") ? 
                <Grid item xs={12} md={6} id="chart2">
                    <DailyMessageGraph dailyData={resultDailyMessage} type="message" params={params} chartId="Chart 2"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("22") ? 
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
                        chartId="Chart 3"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("23") ? 
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
                        chartId="Chart 4"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("24") ? 
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
                        chartId="Chart 5"
                    />
                </Grid> : ""
            } 

            {
                resultReportPermission?.includes("25") ? 
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
                        chartId="Chart 6"
                    />
                </Grid> : ""
            }
              
           {
                resultReportPermission?.includes("26") ? 
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
                        chartId="Chart 7"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("27") ? 
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
                        chartId="Chart 8"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("28") ? 
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
                        chartId="Chart 9"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("29") ? 
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
                        chartId="Chart 10"
                    />
                </Grid> : ""
           }
            
           {
                resultReportPermission?.includes("30") ? 
                <Grid item xs={12} md={8} id="chart11">
                    <InfluencerGraph numberOfAccounts={resultNumbersOfAccounts} chartId="Chart 11" params={params}/>
                </Grid> : ""
           }
           
                <Grid item xs={12} md={4} id="chart12">
                {
                    resultReportPermission?.includes("31") ?
                    <Grid xs={12}>
                        <InfluencerComparison 
                            color='primary'
                            trendNumber={resultTotalMessages?.percentage}
                            trend={resultTotalMessages?.type}
                            icon={<MessageText />}
                            totalText = 'Messages'
                            totalValue = {resultTotalMessages?.total_message}
                            chartId = 'Chart 12'
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("32") ?
                    <Grid xs={12} mt={5}>
                        <InfluencerComparison 
                            color='primary'
                            trendNumber={resultTotalAccount?.percentage || ""}
                            trend={resultTotalAccount?.type}
                            icon={<AccountGroup />}
                            totalText = 'Accounts'
                            totalValue = {resultTotalAccount?.total_account || resultTotalAccount?.total_message}
                            chartId = 'Chart 12'
                        />
                    </Grid> : ""
                }
                </Grid> 
           
            {
                resultReportPermission?.includes("33") ?
                <Grid item xs={12} id="chart13">
                    <DayTimeComparison dayTimeComparison={resultDayTimeComparison} params={params} chartId="Chart 13"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("34") ? 
                <Grid item xs={12} id="chart14">
                    <DayTimeSentiment day={resultDayBySentiment} hour={resultTimeBySentiment} chartId="Chart 14" params={params}/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("35") ? 
                <Grid item xs={12} id="chart15">
                    <DayTimeBullyLevel day={resultDayByBullyLevel} hour={resultTimeByBullyLevel} chartId="Chart 15" params={params}/>
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("36") ?
                <Grid item xs={12} id="chart16">
                    <DayTimeBullyType day={resultDayByBullyType} hour={resultTimeByBullyType} chartId="Chart 16" params={params}/>
                </Grid>: ""
            }
            {
                resultReportPermission?.includes("37") ?
                <Grid item xs={12} md={4} id="chart17">
                    <PlatformsComparison resultPlatformComparison={resultPlatformComparison} chartId="chart 17"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("38") ?
                <Grid item xs={12} md={4} id="chart18">
                    <DevicesComparison resultDevicesComparison={resultDevicesComparison} chartId="Chart 18"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("39") ?
                <Grid item xs={12} md={4} id="chart19">
                    <ChannelVsDevice resultDeviceVsChannel={resultDeviceVsChannel} chartId="Chart 19" />
                </Grid> : ""
            }
            {   
                resultReportPermission?.includes("40") ? 
                <Grid item xs={12} md={6} id="chart20">
                    <KeywordComparisonByChannel resultKeywordComparisonByChannel={resultKeywordComparisonByChannel} chartId="Chart 20" />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("41") ?
                <Grid item xs={12} md={6} id="chart21">
                    <KeywordComparisonBySentiment resultKeywordComparisonBySentiment={resultKeywordComparisonBySentiment} chartId="Chart 21" />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("42") ?
                <Grid item xs={12} md={6} id="chart22">
                    <KeywordComparisonByBullyLevel resultKeywordComparisonByBullyLevel={resultKeywordComparisonByBullyLevel} chartId="Chart 22"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("43") ?
                <Grid item xs={12} md={6} id="chart23">
                    <KeywordComparisonByBullyType resultKeywordComparisonByBullyType={resultKeywordComparisonByBullyType} chartId="Chart 23"/>
                </Grid> : ""
            }
            <QuickView/>
        </Grid>
    )

}

export default VoiceDashboard 