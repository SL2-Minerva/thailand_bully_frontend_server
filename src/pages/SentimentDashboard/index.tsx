import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { useState } from "react"
import Filter from "../VoiceDashboard/Filter"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import { StyledTooltip } from "../dashboard/overall"
import { GetTotalSentiment } from "src/services/api/dashboards/sentiment/sentimentDashboard"
import DailySenitment from "./DailySentiment"
import PercentageOfSentiment from "./PercentageOfSentiment"
import TotalMessage from "./TotalMessage"
import PeriodComparisonChart from "../EngagementDashboard/PeriodComparisonChart"
import SentimentScore from "./SentimentScore"
import SentimentScorePercentage from "./SentimentScorePercentage"
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
import SentimentComparisonTable from "./SentimentComparison"
import { GetKeyWordsList } from "src/services/api/dashboards/overall/overallDashboardApi"
import { SentimentAllColors } from "src/utils/const"
import QuickViewModal from "./QuickViewModal"

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
    const [ keyword, setKeyword ] = useState<string>('all');
    const [ filterKeyword, setFilterKeyword ] = useState<any>([]);
    const [ showQuickView, setShowQuickView ] = useState<boolean>(false);

    const [ highlight, setHighlight ] = useState<string>("");

    const { resultReportPermission } = UserPermission();
    const { resultTotalSentiment, loadingTotalSentiment } = GetTotalSentiment(campaign, date, endDate, period, keyword);
    const { resultKeywordList } = GetKeyWordsList(campaign);    
    const params = {
        campaign: campaign,
        date : date, 
        endDate : endDate,
        period : period,
        keywordIds : keyword
    }

    const checkKeywordId = (data: any, keywordId : string | number) => {
        const index = data.indexOf(keywordId);
        if (index > -1) { 
            data.splice(index, 1); 
        } else {
            data.push(keywordId);
        }

        setFilterKeyword(data);

        if(data.length === 0) {
            setKeyword('all');
        } else {
            setKeyword(data.join(','));
        }

        return data;
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
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Filter"></CardHeader>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={1}> 
                                    <Button
                                        sx={{ mb: 2 }}
                                        onClick={() => {
                                            if(keyword === 'all') {
                                                setKeyword('')
                                            } else {
                                                setKeyword('all')
                                                setFilterKeyword([]);
                                            }
                                            
                                        }}
                                        variant='contained'
                                        color ={keyword === 'all' ? 'primary' : 'secondary'}
                                    >
                                        ALL
                                    </Button>
                                </Grid>

                                {
                                    resultKeywordList && (resultKeywordList || []).map((keywords : any, index : number) => {
                                        return(
                                            <Grid item xs={6} md={1.2} key={index}> 
                                                <Button
                                                    sx={{ mb: 2, bgcolor: filterKeyword?.indexOf(keywords?.id) > -1 ? SentimentAllColors[index] : keyword ==='all' ? SentimentAllColors[index] : 'grey',
                                                    ":hover": {bgcolor: filterKeyword?.indexOf(keywords?.id) > -1 ? SentimentAllColors[index] : keyword ==='all' ? SentimentAllColors[index] : 'grey'} }}
                                                    onClick={() => {
                                                        checkKeywordId(filterKeyword, keywords?.id);
                                                    }}
                                                    variant='contained'
                                                >
                                                    {keywords.name}
                                                </Button>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
                {
                    resultReportPermission?.includes("76") ?
                    <Grid id="chart1" item xs={12} md={4}>
                        <PercentageOfSentiment params={params} type="transaction" chartId="Chart 1" highlight = { highlight==='chart1' ? true : false } />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("77") ?
                    <Grid id="chart2" item xs={12} md={8}>
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
                            chartId="Chart 2"
                            highlight = { highlight==='chart2' ? true : false }
                        />
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
                            highlight = { highlight==='chart3' ? true : false }
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
                            highlight = { highlight==='chart4' ? true : false }
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
                            highlight = { highlight==='chart5' ? true : false }
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
                            highlight = { highlight==='chart6' ? true : false }
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
                            highlight = { highlight==='chart7' ? true : false }
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
                            highlight = { highlight==='chart8' ? true : false }
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
                            highlight = { highlight==='chart9' ? true : false }
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("85") ?
                    <>
                        <Grid item xs={12}>
                            <Card  id="chart10">
                                <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <CardHeader 
                                        title='Total Messages by Engagement Type'
                                        titleTypographyProps={{ variant: 'h6', color : highlight === 'chart10' ? 'green' : '#4c4e64de' }}
                                    />
                                    <StyledTooltip arrow title="Chart 10, Report Level 2(5.2.012)">
                                        <Information style={{marginTop: '22px', fontSize: '29px', color : highlight === 'chart10' ? 'green' : '#4c4e64de'}} />
                                    </StyledTooltip>
                                </span>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TotalMessage
                                totalMessage={resultTotalSentiment}
                                loadingTotalSentiment={loadingTotalSentiment}
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
                                highlight = { highlight==='chart11' ? true : false }
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
                                highlight = { highlight==='chart12' ? true : false }
                                reportNo = "5.2.014"
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
                                    highlight = { highlight==='chart13' ? true : false }
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SentimentScorePercentage
                                    params={params}
                                    highlight = { highlight==='chart13' ? true : false }
                                />
                        </Grid>
                    </> : ""
                }
                {
                    resultReportPermission?.includes("89") ?
                    <Grid item xs={12} md={12} id="chart14">
                        <SentimentComparisonTable
                                params={params}
                                chartId="Chart 14"
                                highlight = { highlight==='chart14' ? true : false }
                            />
                    </Grid>: ""
                }
                {
                    resultReportPermission?.includes("90") ?
                    <Grid item xs={12} md={12} id="chart15">
                        <SummaryByAccount
                                params={params}
                                chartId="Chart 15"
                                highlight = { highlight==='chart15' ? true : false }
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("91") ?
                    <Grid item xs={12} md={12} id="chart16">
                        <SummaryByChannel
                                params={params}
                                chartId = "Chart 16"
                                highlight = { highlight==='chart16' ? true : false }
                            />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("92") ?
                    <Grid item xs={12} md={12} id="chart17">
                        <SummaryByKeywords
                                params = { params }
                                chartId = "Chart 17"
                                highlight = { highlight==='chart17' ? true : false }
                            />
                    </Grid> : ""
                } 
            </Grid>
            <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView}/>
            <QuickViewModal show={showQuickView} setShow={setShowQuickView} params={params} chartId={highlight}/>
        </Grid> 
    )
}

export default SentimentDashboard