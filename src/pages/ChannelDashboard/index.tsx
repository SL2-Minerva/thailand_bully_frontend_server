import { Card, CardHeader, Grid } from "@mui/material"
import { useState } from "react"
import DailyMessageGraph from "./DailyMessageGraph"
import Filter from "../VoiceDashboard/Filter"
import { StyledTooltip } from "../dashboard/overall"
import { useTheme } from '@mui/material/styles'
import ChannelComparison from "./ChannelComparison"
import { GetComparison } from "src/services/api/dashboards/channel/ChannelDashboardApi" 
import ChannelBySentiment from "./ChannelBySentiment"
import QuickView from "./QuickView"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { Information } from "mdi-material-ui"
import { UserPermission } from "src/services/api/users/role"
import DailyMessagePieChart from "./DailyMessagePieChart"
import ChannelByDay from "./ChannelByDay"
import ChannelByTime from "./ChannelByTime"
import ChannelByDevice from "./ChannelByDevice"
import ChannelByAccount from "./ChannelByAccount"
import ChannelBySentimentComparison from "./ChannelBySentimentComparison"
import ChannelByBullyLevel from "./ChannelByBullyLevel"
import ChannelByBullyType from "./ChannelByBullyType"
import EngagementRate from "./EngagementRate"
import SentimentScore from "./SenitmentScore"
import SentimentLevelChart from "./SentimentLevelChart"

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
    const [ highlight, setHighlight ] = useState<string>("");

    const params = {
        campaign: campaign,
        date: date,
        endDate: endDate, 
        period: period, 
        previousDate: previousDate, 
        previousEndDate: previousEndDate,
    }
    
    //api call
    const { resultReportPermission } = UserPermission();
    const { resultFacebookComparison, resultInstagramComparison, resultPantipComparison, resultTwitterComparison, resultYoutubeComparison } = GetComparison(campaign, date, endDate, period);

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
                    <DailyMessagePieChart params={params} type="channel" chartId="Chart 1" highlight = { highlight==='chart1' ? true : false }/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("45") ?
                <Grid item xs={12} md={6} id="chart2">
                    <DailyMessageGraph params={params} type="channel" chartId="Chart 2" highlight = { highlight==='chart2' ? true : false }/>
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("46") ?
                <Grid item xs={12} md={12} id="chart3">
                    <ChannelByDay 
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 3"
                        highlight = { highlight==='chart3' ? true : false }
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("47") ?
                <Grid item xs={12} md={12} id="chart4">
                    <ChannelByTime
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 4"
                        highlight = { highlight==='chart4' ? true : false }
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("48") ?
                <Grid item xs={12} md={12} id="chart5">
                    <ChannelByDevice
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 5"
                        highlight = { highlight==='chart5' ? true : false }
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("49") ?
                <Grid item xs={12} md={12} id="chart6">
                    <ChannelByAccount
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 6"
                        highlight = { highlight==='chart6' ? true : false }
                    />
                </Grid> : ""
            }

            {
                resultReportPermission?.includes("50") ?
                <Grid item xs={12} md={12} id="chart7">
                    <ChannelBySentimentComparison
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params ={params}
                        chartId="Chart 7"
                        highlight = { highlight==='chart7' ? true : false }
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("51") ?
                <Grid item xs={12} md={12} id="chart8">
                    <ChannelByBullyLevel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 8"
                        highlight = { highlight==='chart8' ? true : false }
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("52") ?
                <Grid item xs={12} md={12} id="chart9">
                    <ChannelByBullyType
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params = {params}
                        chartId="Chart 9"
                        highlight = { highlight==='chart9' ? true : false }
                    />
                </Grid> : ""
            }
            
            {
                resultReportPermission?.includes("53") ?
                <>
                    <Grid item xs={12} id="chart10">
                        <Card>
                            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CardHeader 
                                    title='Channel Comparison: Period over Period'
                                    titleTypographyProps={{ variant: 'h6', color : highlight === 'chart10' ? 'green' : '#4c4e64de' }}
                                />
                                <StyledTooltip arrow title="Chart 10, Report Level 2(3.3.012)">
                                    <Information style={{marginTop: '22px', fontSize: '29px',  color : highlight === 'chart10' ? 'green' : '#4c4e64de'}} />
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
                        <Grid item xs={6} md={2.4}>
                            <ChannelComparison 
                                color='#c92d27'
                                trendNumber={resultYoutubeComparison?.percentage}
                                trend={resultYoutubeComparison?.type}
                                totalText = 'Youtube'
                                totalValue = {resultYoutubeComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                            <ChannelComparison 
                                color='#a5a5a5'
                                trendNumber={resultInstagramComparison?.percentage}
                                trend={resultInstagramComparison?.type}
                                totalText = 'Instagram'
                                totalValue = {resultInstagramComparison?.comparison_value}
                            />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
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
                    <EngagementRate
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 11"
                        highlight = { highlight==='chart11' ? true : false }
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("55") ?
                <Grid item xs={12} md={6} id="chart12">
                    <SentimentScore
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params ={params}
                        chartId = "Chart 12"
                        highlight = { highlight==='chart12' ? true : false }
                    />
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("56") ?
                <Grid container spacing={4} ml={3} mt={2} id="chart13">
                    <Grid item xs={12} md={6}>
                        <ChannelBySentiment params={params} chartId="Chart 13" highlight = { highlight==='chart13' ? true : false }/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SentimentLevelChart params={params} chartId="Chart 13" highlight = { highlight==='chart13' ? true : false }/>
                    </Grid>
                </Grid> : ""
            }

            <QuickView setHighlight={setHighlight}/>

        </Grid>

    )
}

export default ChannelDashboard