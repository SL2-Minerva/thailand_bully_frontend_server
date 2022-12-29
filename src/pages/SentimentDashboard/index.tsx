import { Card, CardHeader, Grid } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { useState } from "react"
import Filter from "../VoiceDashboard/Filter"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { StyledTooltip } from "../dashboard/overall"
import MessagesByDay from "../VoiceDashboard/MessagesByDay"
import { FilterByCampaignId, GetSenitmemntByDay, GetSenitmentComparisonByChannel, 
    GetSenitmentComparisonByEngagement, GetSentimentByAccount, GetSentimentByBullyLevel,
     GetSentimentByBullyType, GetSentimentByChannel, GetSentimentByDevice,
      GetSentimentByTime, GetSentimentComparison, GetSentimentScore, GetSummaryByAccount, GetSummaryByChannel, GetSummaryByKeywords, GetTotalSentiment } from "src/services/api/dashboards/sentiment/sentimentDashboard"
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
    const { resultFilterData } = FilterByCampaignId(campaign, date, endDate, period);
    const { resultSentimentByDay } = GetSenitmemntByDay(campaign, date, endDate, period);
    const { resultSentimentByTime  } = GetSentimentByTime(campaign, date, endDate, period);
    const { resultSentimentByDevice } = GetSentimentByDevice(campaign, date, endDate, period);
    const { resultSentimentByAccount } = GetSentimentByAccount(campaign, date, endDate, period);
    const { resultSentimentByChannel } = GetSentimentByChannel(campaign, date, endDate, period);
    const { resultSentimentByBullyLevel } = GetSentimentByBullyLevel(campaign, date, endDate, period);
    const { resultSentimentByBullyType  } = GetSentimentByBullyType(campaign, date, endDate, period);
    const { resultTotalSentiment } = GetTotalSentiment(campaign, date, endDate, period);
    const { resultSenitmentComparisonByChannel } = GetSenitmentComparisonByChannel(campaign, date, endDate, period);
    const { resultSenitmentComparisonByEngagement } = GetSenitmentComparisonByEngagement(campaign, date, endDate, period);
    const { resultSenitmentScore, resultSentimentScorePercentage } = GetSentimentScore(campaign, date, endDate, period);
    const { resultSentimentComparison } = GetSentimentComparison(campaign, date, endDate, period);
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
                            filterData={resultFilterData}
                            params= {params}
                            type="transaction"
                            chartId="Chart 1"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("77") ?
                    <Grid id="chart2" item xs={12} md={4}>
                        <PercentageOfSentiment filterData={resultFilterData} type="transaction" chartId="Chart 2"/>
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("78") ?
                    <Grid item xs={12} md={12} id="chart3">
                        <MessagesByDay 
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByDay}
                            type="day"
                            chartTitle="Sentiment"
                            chartId="Chart 3"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("79") ?
                    <Grid item xs={12} md={12} id="chart4">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByTime}
                            type="time"
                            chartTitle="Sentiment"
                            chartId="Chart 4"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("80") ?
                    <Grid item xs={12} md={12} id="chart5">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByDevice}
                            type = "device"
                            chartTitle="Sentiment"
                            chartId="Chart 5"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("81") ?
                    <Grid item xs={12} md={12} id="chart6">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByAccount}
                            type = "account"
                            chartTitle="Sentiment"
                            chartId="Chart 6"
                        />
                    </Grid> : ""
                }

                {
                    resultReportPermission?.includes("82") ?
                    <Grid item xs={12} md={12} id="chart7">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByChannel}
                            type = "channel"
                            chartTitle="Sentiment"
                            chartId="Chart 7"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("83") ?
                    <Grid item xs={12} md={12} id="chart8">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByBullyLevel}
                            type = "bullyLevel"
                            chartTitle="Sentiment"
                            chartId="Chart 8"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("84") ?
                    <Grid item xs={12} md={12} id="chart9">
                        <MessagesByDay
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            filterData={resultSentimentByBullyType}
                            type = "bullyType"
                            chartTitle="Sentiment"
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
                        <PeriodComparisonChart
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultSenitmentComparisonByChannel}
                                type = "channel"
                                chartTitle="Sentiment Comparison"
                                colorType="engagementDefault"
                                chartId="Chart 11"
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
                                filterData={resultSenitmentComparisonByEngagement}
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
                                    sentimentScore={resultSenitmentScore}
                                    chartId="Chart 13"
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SentimentScorePercentage
                                    sentimentLevel={resultSentimentScorePercentage}
                                />
                        </Grid>
                    </> : ""
                }
                {
                    resultReportPermission?.includes("89") ?
                    <Grid item xs={12} md={12} id="chart14">
                        <SentimentComparison
                                sentimentComparison={resultSentimentComparison}
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