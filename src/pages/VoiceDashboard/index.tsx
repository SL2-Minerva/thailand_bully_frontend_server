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
import { useTheme } from '@mui/material/styles'
import { GetComparison } from "src/services/api/dashboards/voice/VoiceDashboardAPIs"
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
import MessagesByDays from "./MessageByDays"
import MessagesByTime from "./MessageByTime"
import MessagesByDevices from "./MessageByDevice"
import MessagesByAccount from "./MessageByAccount"
import MessagesByChannel from "./MessagesByChannel"
import MessagesBySentiment from "./MessagesBySentiment"
import MessagesByBullyLevel from "./MessageByBullyLevel"
import MessagesByBullyType from "./MessageByBullyType"

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
    const { resultTotalAccount,resultTotalMessages } = GetComparison(campaign, date, endDate, period);

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
                    <DailyMessagePieChart params={params} type="message" chartId="Chart 1"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("21") ? 
                <Grid item xs={12} md={6} id="chart2">
                    <DailyMessageGraph type="message" params={params} chartId="Chart 2"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("22") ? 
                <Grid item xs={12} md={12} id="chart3">
                    <MessagesByDays 
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 3"
                        params={params}
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("23") ? 
                <Grid item xs={12} md={12} id="chart4">
                    <MessagesByTime
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 4"
                        params = {params}
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("24") ? 
                <Grid item xs={12} md={12} id="chart5">
                    <MessagesByDevices
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 5"
                        params={params}
                    />
                </Grid> : ""
            } 

            {
                resultReportPermission?.includes("25") ? 
                <Grid item xs={12} md={12} id="chart6">
                    <MessagesByAccount
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 6"
                        params={params}
                    />
                </Grid> : ""
            }
              
           {
                resultReportPermission?.includes("26") ? 
                <Grid item xs={12} md={12} id="chart7">
                    <MessagesByChannel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params = {params}
                        chartId="Chart 7"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("27") ? 
                <Grid item xs={12} md={12} id="chart8">
                    <MessagesBySentiment
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 8"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("28") ? 
                <Grid item xs={12} md={12} id="chart9">
                    <MessagesByBullyLevel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 9"
                    />
                </Grid> : ""
           }

           {
                resultReportPermission?.includes("29") ? 
                <Grid item xs={12} md={12} id="chart10">
                    <MessagesByBullyType
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params = {params}
                        chartId="Chart 10"
                    />
                </Grid> : ""
           }
            
           {
                resultReportPermission?.includes("30") ? 
                <Grid item xs={12} md={8} id="chart11">
                    <InfluencerGraph chartId="Chart 11" params={params}/>
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
                    <DayTimeComparison params={params} chartId="Chart 13"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("34") ? 
                <Grid item xs={12} id="chart14">
                    <DayTimeSentiment chartId="Chart 14" params={params}/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("35") ? 
                <Grid item xs={12} id="chart15">
                    <DayTimeBullyLevel chartId="Chart 15" params={params}/>
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("36") ?
                <Grid item xs={12} id="chart16">
                    <DayTimeBullyType chartId="Chart 16" params={params}/>
                </Grid>: ""
            }
            {
                resultReportPermission?.includes("37") ?
                <Grid item xs={12} md={4} id="chart17">
                    <PlatformsComparison params={params} chartId="chart 17"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("38") ?
                <Grid item xs={12} md={4} id="chart18">
                    <DevicesComparison params={params} chartId="Chart 18"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("39") ?
                <Grid item xs={12} md={4} id="chart19">
                    <ChannelVsDevice params={params} chartId="Chart 19" />
                </Grid> : ""
            }
            {   
                resultReportPermission?.includes("40") ? 
                <Grid item xs={12} md={6} id="chart20">
                    <KeywordComparisonByChannel params={params} chartId="Chart 20" />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("41") ?
                <Grid item xs={12} md={6} id="chart21">
                    <KeywordComparisonBySentiment params={params} chartId="Chart 21" />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("42") ?
                <Grid item xs={12} md={6} id="chart22">
                    <KeywordComparisonByBullyLevel params={params} chartId="Chart 22"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("43") ?
                <Grid item xs={12} md={6} id="chart23">
                    <KeywordComparisonByBullyType params={params} chartId="Chart 23"/>
                </Grid> : ""
            }
            <QuickView/>
        </Grid>
    )

}

export default VoiceDashboard 