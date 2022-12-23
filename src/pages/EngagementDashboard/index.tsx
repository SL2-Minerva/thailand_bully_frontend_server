import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useCallback, useState } from "react";
import { CampaignList } from "src/services/api/campaign/CampaignAPI";
import { EngagementTypePercetage, FilterByCampaignId,GetEngagementTypeByAccount,
    GetEngagementTypeByChannel,GetEngagementTypeByDay,GetEngagementTypeByDevice
    ,GetEngagementTypeByTime,GetMessagesByAccount, 
    GetMessagesByChannel, GetMessagesByDay, GetMessagesByDevice, GetMessagesByTime } from "src/services/api/dashboards/engagement/EngagementApi";
import { StyledTooltip } from "../dashboard/overall";
import DailyEngagement from "./DailyEngagement";
import PercentageOfEngangement from "./PercentageOfEngagement";
import { useTheme } from '@mui/material/styles'
import MessagesByDay from "../VoiceDashboard/MessagesByDay";
import Filter from "../VoiceDashboard/Filter";
import { DateType } from "src/types/forms/reactDatepickerTypes";

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
                <StyledTooltip arrow title="Chart 1">
                    <Grid id="chart1" item xs={12} md={4}>
                        <PercentageOfEngangement filterData={resultFilterData} type="transaction"/>
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end" title="Chart 2">
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
                        />
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end"  title="Chart 3">
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
                        />
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end" title="Chart 4">
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
                        />
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end" title="Chart 5">
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
                        />
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end" title="Chart 6">
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
                        />
                    </Grid>
                </StyledTooltip>
                <StyledTooltip arrow placement="top-end" title="Chart 7">
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
                        />
                    </Grid>
                </StyledTooltip>
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
                    <StyledTooltip arrow title="Chart 8">
                        <Grid id="chart8" item xs={12} md={4}>
                            <PercentageOfEngangement filterData={resultEngagementType} type="type"/>
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end" title="Chart 9">
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
                            />
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end"  title="Chart 10">
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
                            />
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end" title="Chart 11">
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
                            />
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end" title="Chart 12">
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
                            />
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end" title="Chart 13">
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
                            />
                        </Grid>
                    </StyledTooltip>
                    <StyledTooltip arrow placement="top-end" title="Chart 14">
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
                            />
                        </Grid>
                    </StyledTooltip>
                </Grid>
            </Grid>
        </>
        
    )
}

export default EngagementDashboard