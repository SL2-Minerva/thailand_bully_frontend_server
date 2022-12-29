import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useCallback, useState } from "react";
import { CampaignList } from "src/services/api/campaign/CampaignAPI";
import { EngagementTypePercetage, FilterByCampaignId,GetComparison,GetEngagementComparison,GetEngagementTypeByAccount,
    GetEngagementTypeByChannel,GetEngagementTypeByDay,GetEngagementTypeByDevice
    ,GetEngagementTypeByTime,GetMessagesByAccount, 
    GetMessagesByChannel, GetMessagesByDay, GetMessagesByDevice, GetMessagesByTime, GetPeriodComparisonByChannel, GetPeriodComparisonBySenitment, GetSummary, GetTotalEngagment } from "src/services/api/dashboards/engagement/EngagementApi";
import { StyledTooltip } from "../dashboard/overall";
import DailyEngagement from "./DailyEngagement";
import PercentageOfEngangement from "./PercentageOfEngagement";
import { useTheme } from '@mui/material/styles'
import MessagesByDay from "../VoiceDashboard/MessagesByDay";
import Filter from "../VoiceDashboard/Filter";
import { DateType } from "src/types/forms/reactDatepickerTypes";
import TotalEngagement from "./TotalEngagement";
import PeriodComparisonChart from "./PeriodComparisonChart";
import EngagementTypeComparison from "./EngagementTypeComparison";
import EngagmentComparisonChart from "./EngagmentComparisonChart";
import EngagementSummary from "./EngagementSummary";
import QuickView from "./QuickView";
import { Information } from "mdi-material-ui";
import { UserPermission } from "src/services/api/users/role";

const EngagementDashboard = () => {
    const theme = useTheme()
    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus

    const [ campaign, setCampaign ] = useState<string>("1")
    const [date, setDate] = useState<DateType>(new Date())
    const [endDate, setEndDate] = useState<DateType>(new Date())
    const [ previousDate, setPreviousDate] = useState<DateType>(new Date())
    const [ previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
    const [ period, setPeriod ] = useState<string>('daily')
    const [ dateSelect, setDateSelect ] = useState<string>("1")
    const [ campaignType, setCampaignType ] = useState<string>("1")
    const [ topKeyword, setTopKeyword ] = useState<string>('all');

    const { resultReportPermission } = UserPermission();
    const { resultCampaiganList } = CampaignList();
    const { resultFilterData } = FilterByCampaignId(campaign);
    const { resultMessagesByDay } = GetMessagesByDay(campaign);
    const { resultMessagesByTime } = GetMessagesByTime(campaign);
    const { resultMessagesByDevice } = GetMessagesByDevice(campaign);
    const { resultMessagesByAccount } = GetMessagesByAccount(campaign);
    const { resultMessagesByChannel } = GetMessagesByChannel(campaign);
    const { resultEngagementType } = EngagementTypePercetage(campaignType, date, endDate, period);
    const { resultEngagementTypeByDay } = GetEngagementTypeByDay(campaignType, date, endDate, period);
    const { resultEngagementTypeByTime } = GetEngagementTypeByTime(campaignType, date, endDate, period);
    const { resultEngagementTypeByDevice } = GetEngagementTypeByDevice(campaignType, date, endDate, period);
    const { resultEngagementTypeByAccount } = GetEngagementTypeByAccount(campaignType, date, endDate, period);
    const { resultEngagementTypeByChannel } =  GetEngagementTypeByChannel(campaignType, date, endDate, period);
    const { resultTotalEngagement } = GetTotalEngagment(campaignType, date, endDate, period);
    const { resultPeriodComparisonBySenitment }  =GetPeriodComparisonBySenitment(campaignType, date, endDate, period); 
    const { resultPeriodComparisonByChannel } = GetPeriodComparisonByChannel(campaignType, date, endDate, period);
    const { resultEngagementComparison } = GetEngagementComparison(campaignType, date, endDate, period); 
    const { resultComparison }  = GetComparison(campaignType, date, endDate, period); 
    const { resultSummary } = GetSummary(campaignType, date, endDate, period); 

    const params = {
        campaign: campaign,
        campaignType : campaignType,
        date : date, 
        endDate : endDate,
        period : period
    }

    const handleSelectList = useCallback((e: SelectChangeEvent) => {
        setCampaign(e.target.value)
    }, [])

    const handleTopKeywords = (data: string) => {
        setTopKeyword(data);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Engagement Dashboard' />
                        <CardContent>
                            <Grid container spacing={6} mt={2}>
                                <Grid item sm={4} xs={12}>
                                    <FormControl fullWidth>
                                    <InputLabel id='plan-select'>Select Campaign</InputLabel>
                                    <Select
                                        fullWidth
                                        value={campaign}
                                        id='select-campaign'
                                        label='Select campaign'
                                        labelId='campaign-select'
                                        onChange={(e) => {handleSelectList(e)}}
                                        inputProps={{ placeholder: 'Select Campaign' }}
                                    >
                                        {
                                        resultCampaiganList && resultCampaiganList.map((item: any, index: number) => {
                                            return (
                                            <MenuItem key={index} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                            )
                                        })
                                        }
                                    </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                        
                    </Card>
                </Grid> 
            </Grid> 

            <Grid container spacing={3} mt={2}>
                {
                    resultReportPermission?.includes("57") ?
                    <Grid id="chart1" item xs={12} md={4}>
                        <PercentageOfEngangement filterData={resultFilterData} type="transaction" chartId="Chart 1"/>
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
                            filterData={resultFilterData}
                            params= {params}
                            type="transaction"
                            chartId="Chart 2"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("59") ?
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
                            chartTitle="Engagement"
                            chartId="Chart 3"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("60") ?
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
                            chartTitle="Engagement"
                            chartId="Chart 4"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("61") ?
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
                            chartTitle="Engagement"
                            chartId="Chart 5"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("62") ?
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
                            chartTitle="Engagement"
                            chartId="Chart 6"
                        />
                    </Grid> : ""
                }
                {
                    resultReportPermission?.includes("63") ?
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
                            chartTitle="Engagement"
                            chartId="Chart 7"
                        />
                    </Grid> : ""
                }
            </Grid>

            <Grid container spacing={3} mt={2}>
                <Filter 
                    tilte=" Dashboard"
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
                <Grid container spacing={3} mt={2}>
                    {
                        resultReportPermission?.includes("64") ?
                        <Grid id="chart8" item xs={12} md={4}>
                            <PercentageOfEngangement filterData={resultEngagementType} type="type" chartId="Chart 8"/>
                        </Grid> : ''
                    }
                    {
                        resultReportPermission?.includes("65") ?
                        <Grid id="chart9" item xs={12} md={8}>
                            <DailyEngagement
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementType}
                                params= {params}
                                type="type"
                                chartId="Chart 9"
                            /> 
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("66") ?
                        <Grid item xs={12} md={12} id="chart10">
                            <MessagesByDay 
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementTypeByDay}
                                type="day"
                                chartTitle="Engagement"
                                colorType="engagementType"
                                chartId="Chart 10"
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("67") ?
                        <Grid item xs={12} md={12} id="chart11">
                            <MessagesByDay
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementTypeByTime}
                                type="time"
                                chartTitle="Engagement"
                                colorType="engagementType"
                                chartId="Chart 11"
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("68") ?
                        <Grid item xs={12} md={12} id="chart12">
                            <MessagesByDay
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementTypeByDevice}
                                type = "device"
                                chartTitle="Engagement"
                                colorType="engagementType"
                                chartId="Chart 12"
                            />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("69") ?
                        <Grid item xs={12} md={12} id="chart13">
                            <MessagesByDay
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementTypeByAccount}
                                type = "account"
                                chartTitle="Engagement"
                                colorType="engagementType"
                                chartId="Chart 13"
                            />
                        </Grid> : ""
                    }   
                    
                    {
                        resultReportPermission?.includes("70") ?
                        <Grid item xs={12} md={12} id="chart14">
                            <MessagesByDay
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                filterData={resultEngagementTypeByChannel}
                                type = "channel"
                                chartTitle="Engagement"
                                colorType="engagementType"
                                chartId="Chart 14"
                            />
                        </Grid> : ""
                    }
                    
                    {
                        resultReportPermission?.includes("71") ?
                        <>
                            <Grid item xs={12}>
                                <Card>
                                    <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <CardHeader 
                                            title='Period over Period Comparison'
                                            titleTypographyProps={{ variant: 'h6' }}
                                        />
                                        <StyledTooltip arrow title="Chart 15">
                                            <Information style={{marginTop: '22px', fontSize: '29px'}} />
                                        </StyledTooltip>
                                    </span>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12} id="chart15">
                                <TotalEngagement
                                    totalEngagement={ resultTotalEngagement}
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
                                    filterData={resultPeriodComparisonByChannel}
                                    type = "channel"
                                    chartTitle="Engagement Comparison"
                                    colorType="engagementDefault"
                                    chartId="Chart 16"
                                />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("73") ?
                        <Grid item xs={12} md={6} id="chart17">
                            <PeriodComparisonChart
                                    white={whiteColor}
                                    labelColor={labelColor}
                                    success={lineChartYellow}
                                    borderColor={borderColor}
                                    primary={lineChartPrimary}
                                    warning={lineChartWarning}
                                    gridLineColor={gridLineColor}
                                    filterData={resultPeriodComparisonBySenitment}
                                    type = "sentiment"
                                    chartTitle="Engagement Comparison"
                                    colorType="SentimentComparisonEngagment"
                                    chartId="Chart 17"
                                />
                        </Grid> : ""
                    }
                    {
                        resultReportPermission?.includes("74") ?
                        <>
                            <Grid item xs={12} md={7} id="chart18">
                                <EngagementTypeComparison
                                        engagementComparison={resultEngagementComparison} chartId="Chart 18"
                                    />
                            </Grid> 
                            <Grid item xs={12} md={5} id="chart19">
                                    <EngagmentComparisonChart sentimentLevel={resultComparison}/>
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
                                    <EngagementSummary resultSummary={resultSummary} chartId="Chart 20"/>
                            </Grid>
                        </> : ""
                    }
                    
                </Grid>
                <QuickView/>
            </Grid>
        </>
        
    )
}

export default EngagementDashboard