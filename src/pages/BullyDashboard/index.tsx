import { Button, Grid, useTheme } from "@mui/material"
import { useState } from "react"
import { FilterByCampaignId, GetBullyByAccount, GetBullyByChannel, GetBullyByDay, GetBullyByDevice, 
    GetBullyBySentiment, GetBullyByTime, FilterBullyTypeByCampaignId,
    GetBullyTypeByDay,
    GetBullyTypeByTime,
    GetBullyTypeByDevice,
    GetBullyTypeByAccount,
    GetBullyTypeByChannel,
    GetBullyTypeBySentiment,
    GetShareOfChannelChart,
    GetShareOfChannelPlatforms,
    GetShareOfChannelBullyLevel,
    GetShareOfChannelChartBullyLevel, } from "src/services/api/dashboards/bully/BullyDashboardAPI"
import { UserPermission } from "src/services/api/users/role"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import Filter from "../VoiceDashboard/Filter"
import MessagesByDay from "../VoiceDashboard/MessagesByDay"
import DailyMessgeByBully from "./DailyMessageByBully"
import PercentageOfBully from "./PercentageOfBully"
import QuickView from "./QuickView"
import ShareOfChannel from "./ShareOfChannel"

const BullyDashboard = () => {
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

    // const [dateBullyType, setDateBullyType] = useState<DateType>(new Date())
    // const [endDateBullyType, setEndDateBullyType] = useState<DateType>(new Date())
    // const [ periodBullyType, setPeriodBullyType ] = useState<string>('daily')
    // const [ dateSelectBullyType, setDateSelectBullyType ] = useState<string>("1")
    // const [ campaignBullyType, setCampaignBullyType ] = useState<string>("1")
    // const [ previousDateBullyType, setPreviousDateBullyType] = useState<DateType>(new Date())
    // const [ previousEndDateBullyType, setPreviousEndDateBullyType] = useState<DateType>(new Date())

    const [ bullyType, setBullyType ] = useState<string>('level');

    const { resultReportPermission } = UserPermission();
    const { resultFilterData  } = FilterByCampaignId(campaign, date, endDate, period);
    const { resultBullyByDay } = GetBullyByDay(campaign, date, endDate, period);
    const { resultBullyByTime } = GetBullyByTime(campaign, date, endDate, period);
    const { resultBullyByDevice } = GetBullyByDevice(campaign, date, endDate, period);
    const { resultBullyByAccount } = GetBullyByAccount(campaign, date, endDate, period);
    const { resultBullyByChannel } = GetBullyByChannel(campaign, date, endDate, period);
    const { resultBullyBySentiment } = GetBullyBySentiment(campaign, date, endDate, period);

    const {resultBullyTypeFilterData} = FilterBullyTypeByCampaignId(campaign, date, endDate, period);
    const {resultBullyTypeByDay} = GetBullyTypeByDay(campaign, date, endDate, period);
    const {resultBullyTypeByTime} = GetBullyTypeByTime(campaign, date, endDate, period);
    const {resultBullyTypeByDevice} = GetBullyTypeByDevice(campaign, date, endDate, period);
    const {resultBullyTypeByAccount} =  GetBullyTypeByAccount(campaign, date, endDate, period);
    const {resultBullyTypeByChannel} = GetBullyTypeByChannel(campaign, date, endDate, period);
    const {resultBullyTypeBySentiment} = GetBullyTypeBySentiment(campaign, date, endDate, period);
    const { resultShareOfChannelBullyLevel } = GetShareOfChannelBullyLevel(campaign, date, endDate, period);
    const { resultShareOfChannelChartBullyLevel } = GetShareOfChannelChartBullyLevel(campaign, date, endDate, period);
    const { resultShareOfChannelPlatform } = GetShareOfChannelPlatforms(campaign, date, endDate, period);
    const { resultShareOfChannelChart } = GetShareOfChannelChart(campaign, date, endDate, period);
    const params = {
        campaign: campaign,
        date : date, 
        endDate : endDate,
        period : period
    }

    const handleBullyType = (data: string) => {
        setBullyType(data);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Filter 
                tilte="Bully Dashboard"
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
            </Grid>
            {
                resultReportPermission?.includes("93") ? 
                <Grid id="chart1" item xs={12} md={4}>
                    <PercentageOfBully filterData={resultFilterData} type="level" chartId="Chart 1"/>
                </Grid> : ""
            }
            {
                resultReportPermission?.includes("94") ?
                <Grid id="chart2" item xs={12} md={8}>
                    <DailyMessgeByBully
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultFilterData}
                        params= {params}
                        type="level"
                        chartId="Chart 2"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("95") ?
                <Grid item xs={12} md={12} id="chart3">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyByDay}
                        type="day"
                        chartTitle="Bully Level"
                        chartId="Chart 3"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("96") ?
                <Grid item xs={12} md={12} id="chart4">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyByTime}
                        type="time"
                        chartTitle="Bully Level"
                        chartId="Chart 4"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("97") ?
                <Grid item xs={12} md={12} id="chart5">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyByDevice}
                        type="device"
                        chartTitle="Bully Level"
                        chartId="Chart 5"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("98") ?
                <Grid item xs={12} md={12} id="chart6">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyByAccount}
                        type="account"
                        chartTitle="Bully Level"
                        chartId="Chart 6"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("99") ?
                <Grid item xs={12} md={12} id="chart7">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyByChannel}
                        type="channel"
                        chartTitle="Bully Level"
                        chartId="Chart 7"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("100") ?
                <Grid item xs={12} md={12} id="chart8">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyBySentiment}
                        type="sentiment"
                        chartTitle="Bully Level"
                        chartId="Chart 8"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("101") ?
                <Grid id="chart9" item xs={12} md={4}>
                    <PercentageOfBully filterData={resultBullyTypeFilterData} type="type" chartId="Chart 9"/>
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("102") ?
                <Grid id="chart10" item xs={12} md={8}>
                    <DailyMessgeByBully
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeFilterData}
                        params= {params}
                        type="type"
                        chartId="Chart 10"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("103") ?
                <Grid item xs={12} md={12} id="chart11">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeByDay}
                        type="day"
                        chartTitle="Bully Type"
                        chartId="Chart 11"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("104") ?
                <Grid item xs={12} md={12} id="chart12">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeByTime}
                        type="time"
                        chartTitle="Bully Type"
                        chartId="Chart 12"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("105") ?
                <Grid item xs={12} md={12} id="chart13">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeByDevice}
                        type="device"
                        chartTitle="Bully Type"
                        chartId="Chart 13"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("106") ?
                <Grid item xs={12} md={12} id="chart14">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeByAccount}
                        type="account"
                        chartTitle="Bully Type"
                        chartId="Chart 14"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("107") ?
                <Grid item xs={12} md={12} id="chart15">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeByChannel}
                        type="channel"
                        chartTitle="Bully Type"
                        chartId="Chart 15"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("108") ?
                <Grid item xs={12} md={12} id="chart16">
                    <MessagesByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        filterData={resultBullyTypeBySentiment}
                        type="sentiment"
                        chartTitle="Bully Type"
                        chartId="Chart 16"
                        colorType="bullyDashboard"
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("109") ?
                <>
                    <Grid container spacing={3} mt ={2}> 
                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant="contained" color={bullyType === 'level' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }}
                            onClick={() => {handleBullyType("level")}}> Bully Level</Button>
                            <Button variant="contained" color={bullyType === 'type' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }}
                            onClick={() => {handleBullyType("type")}}> Bully Type </Button>
                        </Grid>
                    </Grid>
                    <Grid id="chart17" item xs={12} mt={3}>
                        <ShareOfChannel resultShareOfChannel={bullyType !== 'level' ? resultShareOfChannelChartBullyLevel : resultShareOfChannelChart}
                        resultShareofChannelPlatform={bullyType !== 'level' ? resultShareOfChannelBullyLevel : resultShareOfChannelPlatform}
                        chartId={bullyType === 'level' ? "Chart 17" : "Chart 18"}/>
                    </Grid>
                </>
                : ""
            }
            <QuickView/>
        </Grid> 
    )
}

export default BullyDashboard