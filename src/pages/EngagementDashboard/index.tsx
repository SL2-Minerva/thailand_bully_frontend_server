import { Button, Grid } from "@mui/material"
import { useState } from "react";
import { GetTotalEngagment } from "src/services/api/dashboards/engagement/EngagementApi";
import DailyEngagement from "./DailyEngagement";
import PercentageOfEngangement from "./PercentageOfEngagement";
import { useTheme } from '@mui/material/styles'
import Filter from "../VoiceDashboard/Filter";
import { DateType } from "src/types/forms/reactDatepickerTypes";
import TotalEngagement from "./TotalEngagement";
import PeriodComparisonChart from "./PeriodComparisonChart";
import EngagementTypeComparison from "./EngagementTypeComparison";
import EngagmentComparisonChart from "./EngagmentComparisonChart";
import EngagementSummary from "./EngagementSummary";
import QuickView from "./QuickView";
import { UserPermission } from "src/services/api/users/role";
import DailyEngagementType from "./DailyEngagementType";
import EngagementByDay from "./EngagementByDay";
import EngagementByTime from "./EngagementByTime";
import EngagementByDevice from "./EngagementByDevice";
import EngagementByAccounts from "./EngagementByAccount";
import EngagementByChannel from "./EngagementByChannel";
import PercentageOfEngangementType from "./PercentageEngagementType";
import EngagementTypeByDay from "./EngagementTypeByDay";
import EngagementTypeByTime from "./EngagementTypeByTime";
import EngagementTypeByDevice from "./EngagementTypeByDevice";
import EngagementTypeByAccount from "./EngagementTypeByAccount";
import EngagementTypeByChannel from "./EngagementTypeByChannel";
import PeriodComparisonChartSentiment from "./PeriodComparisonChartSentiment";

const EngagementDashboard = () => {
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
    const [ previousDate, setPreviousDate] = useState<DateType>(new Date())
    const [ previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
    const [ period, setPeriod ] = useState<string>('daily')
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ campaignType, setCampaignType ] = useState<string>("1")
    const [ topKeyword, setTopKeyword ] = useState<string>('all');
    const [ highlight, setHighlight ] = useState<string>("");

    const { resultReportPermission } = UserPermission();
    const { resultTotalEngagement } = GetTotalEngagment(campaignType, date, endDate, period);

    const params = {
        campaign : campaignType,
        date : date, 
        endDate : endDate,
        period : period
    }

    const handleTopKeywords = (data: string) => {
        setTopKeyword(data);
    }

    return (
        <>
            <Grid container spacing={2}>
                 <Filter 
                    tilte="Engagement Dashboard"
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
                    campaign={campaignType}
                    setCampaign={setCampaignType}
                />
            </Grid> 

            <Grid container spacing={3} mt={2}>
                {
                    resultReportPermission?.includes("57") ?
                    <Grid id="chart1" item xs={12} md={4}>
                        <PercentageOfEngangement params={params} type="transaction" chartId="Chart 1" highlight = { highlight==='chart1' ? true : false }/>
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("58") ?
                    <Grid id="chart2" item xs={12} md={8}>
                        <DailyEngagement
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params= {params}
                            type="transaction"
                            chartId="Chart 2"
                            highlight = { highlight==='chart2' ? true : false }
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("59") ?
                    <Grid item xs={12} md={12} id="chart3">
                        <EngagementByDay 
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params ={params}
                            chartId="Chart 3"
                            highlight = { highlight==='chart3' ? true : false }
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("60") ?
                    <Grid item xs={12} md={12} id="chart4">
                        <EngagementByTime
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params= {params}
                            chartId="Chart 4"
                            highlight = { highlight==='chart4' ? true : false }
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("61") ?
                    <Grid item xs={12} md={12} id="chart5">
                        <EngagementByDevice
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
                    resultReportPermission?.includes("62") ?
                    <Grid item xs={12} md={12} id="chart6">
                        <EngagementByAccounts
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 6"
                            params={params}
                            highlight = { highlight==='chart6' ? true : false }
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("63") ?
                    <Grid item xs={12} md={12} id="chart7">
                        <EngagementByChannel
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 7"
                            params={params}
                            highlight = { highlight==='chart7' ? true : false }
                        />
                    </Grid> : ""
                }
            </Grid>

            <Grid container spacing={3} mt={2}>
                <Grid container spacing={3} mt={2}>
                    {
                        resultReportPermission?.includes("64") ?
                        <Grid id="chart8" item xs={12} md={4}>
                            <PercentageOfEngangementType params={params} type="type" chartId="Chart 8" highlight = { highlight==='chart8' ? true : false }/>
                        </Grid> : ''
                    }
                    {
                        resultReportPermission?.includes("65") ?
                        <Grid id="chart9" item xs={12} md={8}>
                            <DailyEngagementType
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params= {params}
                                type="type"
                                chartId="Chart 9"
                                highlight = { highlight==='chart9' ? true : false }
                            /> 
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("66") ?
                        <Grid item xs={12} md={12} id="chart10">
                            <EngagementTypeByDay 
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 10"
                                highlight = { highlight==='chart10' ? true : false }
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("67") ?
                        <Grid item xs={12} md={12} id="chart11">
                            <EngagementTypeByTime
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 11"
                                highlight = { highlight==='chart11' ? true : false }
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("68") ?
                        <Grid item xs={12} md={12} id="chart12">
                            <EngagementTypeByDevice
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 12"
                                highlight = { highlight==='chart12' ? true : false }
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("69") ?
                        <Grid item xs={12} md={12} id="chart13">
                            <EngagementTypeByAccount
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                chartId="Chart 13"
                                highlight = { highlight==='chart13' ? true : false }
                            />
                        </Grid> : ""
                    }   
                    
                    {
                        resultReportPermission?.includes("70") ?
                        <Grid item xs={12} md={12} id="chart14">
                            <EngagementTypeByChannel
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                chartId="Chart 14"
                                highlight = { highlight==='chart14' ? true : false }
                            />
                        </Grid> : ""
                    }
                    
                    {
                        resultReportPermission?.includes("71") ?
                        <>
                            {/* <Grid item xs={12}>
                                <Card id="chart15">
                                    <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <CardHeader 
                                            title='Total Engagement'
                                            titleTypographyProps={{ variant: 'h6', color : highlight === 'chart15' ? 'green' : '#4c4e64de' }}
                                        />
                                        <StyledTooltip arrow title="Chart 15, Report Level 2 (4.2.020)">
                                            <Information style={{marginTop: '22px', fontSize: '29px', color : highlight === 'chart15' ? 'green' : '#4c4e64de'}} />
                                        </StyledTooltip>
                                    </span>
                                </Card>
                            </Grid> */}
                            <Grid item xs={12} md={12} id="chart15">
                                <TotalEngagement
                                    totalEngagement={ resultTotalEngagement}
                                    highlight = { highlight==='chart15' ? true : false }
                                />
                            </Grid> 
                        </> : ""
                    }
                    {
                        resultReportPermission?.includes("72") ?
                        <Grid item xs={12} md={6} id="chart16">
                            <PeriodComparisonChart
                                    white={whiteColor}
                                    labelColor={labelColor}
                                    success={lineChartYellow}
                                    borderColor={borderColor}
                                    primary={lineChartPrimary}
                                    warning={lineChartWarning}
                                    gridLineColor={gridLineColor}
                                    params={params}
                                    type = "channel"
                                    chartTitle="Engagement"
                                    colorType="engagementDefault"
                                    chartId="Chart 16"
                                    highlight = { highlight==='chart16' ? true : false }
                                    reportNo = "4.2.021"
                                />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("73") ?
                        <Grid item xs={12} md={6} id="chart17">
                            <PeriodComparisonChartSentiment
                                    white={whiteColor}
                                    labelColor={labelColor}
                                    success={lineChartYellow}
                                    borderColor={borderColor}
                                    primary={lineChartPrimary}
                                    warning={lineChartWarning}
                                    gridLineColor={gridLineColor}
                                    params={params}
                                    type = "sentiment"
                                    chartTitle="Engagement"
                                    colorType="SentimentComparisonEngagment"
                                    chartId="Chart 17"
                                    highlight = { highlight==='chart17' ? true : false }
                                />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("74") ?
                        <>
                            <Grid item xs={12} md={7} id="chart18">
                                <EngagementTypeComparison
                                        params={params} chartId="Chart 18" highlight = { highlight==='chart18' ? true : false }
                                    />
                            </Grid> 
                            <Grid item xs={12} md={5} id="chart19">
                                    <EngagmentComparisonChart params={params} chartId="chart 19" highlight = { highlight==='chart19' ? true : false }/>
                            </Grid>
                        </>
                        : ""
                    }
                    {
                        resultReportPermission?.includes("75") ?
                        <>
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
                            </Grid>
                            <Grid item xs={12} id="chart20">
                                    <EngagementSummary topKeyword={topKeyword} params={params} chartId="Chart 20" highlight = { highlight==='chart20' ? true : false }/>
                            </Grid>
                        </> : ""
                    }
                    
                </Grid>
                <QuickView setHighlight={setHighlight}/>

            </Grid>
        </>
        
    )
}

export default EngagementDashboard