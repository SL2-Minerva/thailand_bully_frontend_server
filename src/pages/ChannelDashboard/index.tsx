import { Card, CardHeader, Grid } from "@mui/material"
import { useState } from "react"
import { GetChannelByAccount, GetChannelByBullyLevel, GetChannelByBullyType, GetChannelByDay, GetChannelByDevice, GetChannelBySentiment, GetChannelByTime, GetChannelSentimentLevel, GetDailyChannel, GetEngagementRate, GetPercentageChannel, GetSentimentLevel, GetSentimentScore } from "src/services/api/dashboards/channel/ChannelDashboardApi"
import DailyMessageGraph from "../VoiceDashboard/DailyMessageGraph"
import DailyMessagePieChart from "../VoiceDashboard/DailyMessagesPieChart"
import Filter from "../VoiceDashboard/Filter"
import { StyledTooltip } from "../dashboard/overall"
import { useTheme } from '@mui/material/styles'
import MessagesByDay from "../VoiceDashboard/MessagesByDay"
import ChannelComparison from "./ChannelComparison"
import { GetComparison } from "src/services/api/dashboards/channel/ChannelDashboardApi" 
import ChannelBySentiment from "./ChannelBySentiment"
import SentimentLevelChart from "../dashboard/SentimentLevelChart"
import QuickView from "./QuickView"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { Information } from "mdi-material-ui"
import { UserPermission } from "src/services/api/users/role"

const ChannelDashboard = () => {
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

    //api call
    const { resultReportPermission } = UserPermission();
    const { resultPercentageChannel } = GetPercentageChannel(campaign, date, endDate, period);
    const { resultDailyChannel } = GetDailyChannel(campaign, date, endDate, period);
    const { resultChannelByDay } = GetChannelByDay(campaign, date, endDate, period);
    const { resultChannelByTime } = GetChannelByTime(campaign, date, endDate, period);
    const { resultChannelByDevice } = GetChannelByDevice(campaign, date, endDate, period);
    const { resultChannelByAccount } = GetChannelByAccount(campaign, date, endDate, period);
    const { resultChannelBySentiment } = GetChannelBySentiment(campaign, date, endDate, period);
    const { resultChannelByBullyLevel } = GetChannelByBullyLevel(campaign, date, endDate, period);
    const { resultChannelByBullyType } = GetChannelByBullyType(campaign, date, endDate, period);
    const { resultFacebookComparison, resultInstagramComparison, resultPantipComparison, resultTwitterComparison, resultYoutubeComparison } = GetComparison(campaign, date, endDate, period);
    const { resultEngagementRate } = GetEngagementRate(campaign, date, endDate, period); 
    const { resultSentimentScore } = GetSentimentScore(campaign, date, endDate, period);
    const { resultChannelSentimentLevel } = GetChannelSentimentLevel(campaign, date, endDate, period);
    const { resultSentimentLevel } = GetSentimentLevel(campaign, date, endDate, period);

    return (
        <Grid container spacing={6}>
            <Filter 
                tilte="Channel Dashboard"
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
                resultReportPermission?.includes("44") ?
                <Grid item xs={12} md={6} id="chart1">
                    <DailyMessagePieChart percentData={resultPercentageChannel} type="channel" chartId="Chart 1"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("45") ?
                <Grid item xs={12} md={6} id="chart2">
                    <DailyMessageGraph dailyData={resultDailyChannel} type="channel" chartId="Chart 2"/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("46") ?
                <Grid item xs={12} md={12} id="chart3">
                    <MessagesByDay 
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByDay}
                        type="day"
                        chartTitle="Channel"
                        chartId="Chart 3"
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("47") ?
                <Grid item xs={12} md={12} id="chart4">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByTime}
                        type="time"
                        chartTitle="Channel"
                        chartId="Chart 4"
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("48") ?
                <Grid item xs={12} md={12} id="chart5">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByDevice}
                        type = "device"
                        chartTitle="Channel"
                        chartId="Chart 5"
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("49") ?
                <Grid item xs={12} md={12} id="chart6">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByAccount}
                        type = "account"
                        chartTitle="Channel"
                        chartId="Chart 6"
                    />
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("50") ?
                <Grid item xs={12} md={12} id="chart7">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelBySentiment}
                        type = "sentiment"
                        chartTitle="Channel"
                        chartId="Chart 7"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("51") ?
                <Grid item xs={12} md={12} id="chart8">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByBullyLevel}
                        type = "bullyLevel"
                        chartTitle="Channel"
                        chartId="Chart 8"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("52") ?
                <Grid item xs={12} md={12} id="chart9">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultChannelByBullyType}
                        type = "bullyType"
                        chartTitle="Channel"
                        chartId="Chart 9"
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("53") ?
                <>
                    <Grid item xs={12}>
                        <Card>
                            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CardHeader 
                                    title='Period over Period Comparison'
                                    titleTypographyProps={{ variant: 'h6' }}
                                />
                                <StyledTooltip arrow title="Chart 10">
                                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                                </StyledTooltip>
                            </span>
                        </Card>
                    </Grid>

                    <Grid container spacing={4} ml={3} mt={2}>
                        <Grid item xs={6} md={2.4} >
                            <ChannelComparison 
                                color='#44546a'
                                trendNumber={resultFacebookComparison?.percentage}
                                trend={resultFacebookComparison?.type}
                                totalText = 'Facebook'
                                totalValue = {resultFacebookComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                            <ChannelComparison 
                                color='#4472c4'
                                trendNumber={resultTwitterComparison?.percentage}
                                trend={resultTwitterComparison?.type}
                                totalText = 'Twitter'
                                totalValue = {resultTwitterComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4} id="chart13">
                            <ChannelComparison 
                                color='#c92d27'
                                trendNumber={resultYoutubeComparison?.percentage}
                                trend={resultYoutubeComparison?.type}
                                totalText = 'Youtube'
                                totalValue = {resultYoutubeComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4} id="chart14">
                            <ChannelComparison 
                                color='#a5a5a5'
                                trendNumber={resultInstagramComparison?.percentage}
                                trend={resultInstagramComparison?.type}
                                totalText = 'Instagram'
                                totalValue = {resultInstagramComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4} id="chart15">
                            <ChannelComparison 
                                color='#ffc000'
                                trendNumber={resultPantipComparison?.percentage}
                                trend={resultPantipComparison?.type}
                                totalText = 'Pantip'
                                totalValue = {resultPantipComparison?.comparison_value}
                            />
                        </Grid>
                    </Grid>
                </> : ""
            }
            
            {
                resultReportPermission?.includes("54") ?
                <Grid item xs={12} md={6} id="chart11">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultEngagementRate}
                        type = ""
                        chartTitle="Engagement Rate"
                        chartId="Chart 11"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("55") ?
                <Grid item xs={12} md={6} id="chart12">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultSentimentScore}
                        type = ""
                        chartTitle="Sentiment Score"
                        chartId = "Chart 12"
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("56") ?
                <Grid container spacing={4} ml={3} mt={2} id="chart13">
                    <Grid item xs={12} md={6}>
                        <ChannelBySentiment channelBySentiment={resultChannelSentimentLevel} chartId="Chart 13"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SentimentLevelChart sentimentLevel={resultSentimentLevel} chartId="Chart 13"/>
                    </Grid>
                </Grid> : ""
            }
            <QuickView/>
        </Grid>

    )
}

export default ChannelDashboard