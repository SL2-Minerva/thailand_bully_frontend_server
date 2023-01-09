import { Card, CardHeader, Grid } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { useState } from "react"
import Filter from "../VoiceDashboard/Filter"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { StyledTooltip } from "../dashboard/overall"
import {  GetSummaryByAccount, GetSummaryByChannel, GetSummaryByKeywords, GetTotalSentiment } from "src/services/api/dashboards/sentiment/sentimentDashboard"
import DailySenitment from "./DailySentiment"
import PercentageOfSentiment from "./PercentageOfSentiment"
import TotalMessage from "./TotalMessage"
import PeriodComparisonChart from "../EngagementDashboard/PeriodComparisonChart"
import SentimentScore from "./SentimentScore"
import SentimentScorePercentage from "./SentimentScorePercentage"
import SentimentComparison from "./SentimentComparison"
import SummaryByAccount from "./SummaryByAccount"
import SummaryByChannel from "./SummaryByChannel"
import SummaryByKeywords from "./SummaryByKeywords"
import QuickView from "./QuickView"
import { Information } from "mdi-material-ui"
import { UserPermission } from "src/services/api/users/role"
import SentimentByDay from "./SentimentByDay"
import PeriodComparisonChannelChart from "./PeriodComparisonChannel"
import SentimentByTime from "./SentimentByTime"
import SentimentByDevice from "./SentimentByDevice"
import SentimentByBullyType from "./SentimentByBullyType"
import SentimentByBullyLevel from "./SentimentByBullyLevel"
import SentimentByChannel from "./SentitmentByChannel"
import SentimentByAccount from "./SentimentByAccount"

const SentimentDashboard = () => {
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
    const [ topKeyword, setTopKeyword ] = useState<string>('all');
    const [ topAccount, setTopAccount ] = useState<string>('all');
    const [ topChannel, setTopChannel ] = useState<string>('all');

    const { resultReportPermission } = UserPermission();
    const { resultTotalSentiment } = GetTotalSentiment(campaign, date, endDate, period);
    const { resultSummaryByAccount } = GetSummaryByAccount(campaign, date, endDate, period);
    const { resultSummaryByChannel } = GetSummaryByChannel(campaign, date, endDate, period);
    const { resultSummaryByKeywords } = GetSummaryByKeywords(campaign, date, endDate, period);
    const params = {
        campaign: campaign,
        date : date, 
        endDate : endDate,
        period : period
    }

    return (
        <Grid container spacing={2}>
            <Filter 
                tilte="Sentiment Dashboard"
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
            <Grid container spacing={3} mt={2}>
                {
                    resultReportPermission?.includes("76") ?
                    <Grid id="chart1" item xs={12} md={8}>
                        <DailySenitment
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params= {params}
                            type="transaction"
                            chartId="Chart 1"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("77") ?
                    <Grid id="chart2" item xs={12} md={4}>
                        <PercentageOfSentiment params={params} type="transaction" chartId="Chart 2"/>
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("78") ?
                    <Grid item xs={12} md={12} id="chart3">
                        <SentimentByDay 
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params={params}
                            chartId="Chart 3"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("79") ?
                    <Grid item xs={12} md={12} id="chart4">
                        <SentimentByTime
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params={params}
                            chartId="Chart 4"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("80") ?
                    <Grid item xs={12} md={12} id="chart5">
                        <SentimentByDevice
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params={params}
                            chartId="Chart 5"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("81") ?
                    <Grid item xs={12} md={12} id="chart6">
                        <SentimentByAccount
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
                    resultReportPermission?.includes("82") ?
                    <Grid item xs={12} md={12} id="chart7">
                        <SentimentByChannel
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 7"
                            params={params}
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("83") ?
                    <Grid item xs={12} md={12} id="chart8">
                        <SentimentByBullyLevel
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 8"
                            params={params}
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("84") ?
                    <Grid item xs={12} md={12} id="chart9">
                        <SentimentByBullyType
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params ={params}
                            chartId="Chart 9"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("85") ?
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
                        <Grid item xs={12} md={12} id="chart10">
                            <TotalMessage
                                totalMessage={resultTotalSentiment}
                            />
                        </Grid>
                    </> : ""
                }
                {
                    resultReportPermission?.includes("86") ?
                    <Grid item xs={12} md={6} id="chart11">
                        <PeriodComparisonChannelChart
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                type = "channel"
                                chartTitle="Sentiment Comparison"
                                colorType="engagementDefault"
                                chartId="Chart 11"
                                params={params}
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("87") ?
                    <Grid item xs={12} md={6} id="chart12">
                        <PeriodComparisonChart
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                type = "engagementType"
                                chartTitle="Sentiment Comparison"
                                colorType="sentimentComparison"
                                chartId="Chart 12"
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("88") ?
                    <>
                        <Grid item xs={12} md={6} id="chart13">
                            <SentimentScore
                                    params={params}
                                    chartId="Chart 13"
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SentimentScorePercentage
                                    params={params}
                                />
                        </Grid>
                    </> : ""
                }
                {
                    resultReportPermission?.includes("89") ?
                    <Grid item xs={12} md={12} id="chart14">
                        <SentimentComparison
                                params={params}
                                chartId="Chart 14"
                            />
                    </Grid>: ""
                }
                {
                    resultReportPermission?.includes("90") ?
                    <Grid item xs={12} md={12} id="chart15">
                        <SummaryByAccount
                                resultSummary={resultSummaryByAccount}
                                topAccount = {topAccount}
                                setTopAccount = {setTopAccount}
                                chartId="Chart 15"
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("91") ?
                    <Grid item xs={12} md={12} id="chart16">
                        <SummaryByChannel
                                resultSummary={resultSummaryByChannel}
                                topChannel = {topChannel}
                                setTopChannel = {setTopChannel}
                                chartId = "Chart 16"
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("92") ?
                    <Grid item xs={12} md={12} id="chart17">
                        <SummaryByKeywords
                                resultSummary={resultSummaryByKeywords}
                                topKeyword = {topKeyword}
                                setTopKeyword = {setTopKeyword}
                                chartId = "Chart 17"
                            />
                    </Grid> : ""
                } 
            </Grid>
            <QuickView />
        </Grid> 
    )
}

export default SentimentDashboard