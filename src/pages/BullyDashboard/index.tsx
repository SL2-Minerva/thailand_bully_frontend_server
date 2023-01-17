import { Button, Grid, useTheme } from "@mui/material"
import { useState } from "react"
import {
    GetShareOfChannelChart,
    GetShareOfChannelPlatforms,
    GetShareOfChannelBullyLevel,
    GetShareOfChannelChartBullyLevel, } from "src/services/api/dashboards/bully/BullyDashboardAPI"
import { UserPermission } from "src/services/api/users/role"
import { DateType } from "src/types/forms/reactDatepickerTypes"
import Filter from "../VoiceDashboard/Filter"
import BullyLevelByAccount from "./BullyLevelByAccount"
import BullyLevelByChannel from "./BullyLevelByChannel"
import BullyLevelByDay from "./BullyLevelByDay"
import BullyLevelByDevice from "./BullyLevelByDevice"
import BullyLevelBySentiment from "./BullyLevelBySentiment"
import BullyLevelByTime from "./BullyLevelByTime"
import BullyTypeByAccount from "./BullyTypeByAccount"
import BullyTypeByChannel from "./BullyTypeByChannel"
import BullyTypeByDay from "./BullyTypeByDay"
import BullyTypeByDevice from "./BullyTypeByDevice"
import BullyTypeBySentiment from "./BullyTypeBySentiment"
import BullyTypeByTime from "./BullyTypeByTime"
import DailyMessgeByBully from "./DailyMessageByBully"
import DailyMessgeByBullyType from "./DailyMessageByBullyType"
import PercentageOfBully from "./PercentageOfBully"
import PercentageOfBullyType from "./PercentageOfBullyType"
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
    const [ bullyType, setBullyType ] = useState<string>('level');
    const [ highlight, setHighlight ] = useState<string>("");

    const { resultReportPermission } = UserPermission();
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
                    <PercentageOfBully params={params} type="level" chartId="Chart 1" highlight = { highlight==='chart1' ? true : false }/>
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
                        params= {params}
                        type="level"
                        chartId="Chart 2"
                        highlight = { highlight==='chart2' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("95") ?
                <Grid item xs={12} md={12} id="chart3">
                    <BullyLevelByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 3"
                        colorType="bullyDashboard"
                        highlight = { highlight==='chart3' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("96") ?
                <Grid item xs={12} md={12} id="chart4">
                    <BullyLevelByTime
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 4"
                        colorType="bullyDashboard"
                        highlight = { highlight==='chart4' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("97") ?
                <Grid item xs={12} md={12} id="chart5">
                    <BullyLevelByDevice
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 5"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart5' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("98") ?
                <Grid item xs={12} md={12} id="chart6">
                    <BullyLevelByAccount
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 6"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart6' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("99") ?
                <Grid item xs={12} md={12} id="chart7">
                    <BullyLevelByChannel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 7"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart7' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("100") ?
                <Grid item xs={12} md={12} id="chart8">
                    <BullyLevelBySentiment
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 8"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart8' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("101") ?
                <Grid id="chart9" item xs={12} md={4}>
                    <PercentageOfBullyType params={params} type="type" chartId="Chart 9" highlight = { highlight==='chart9' ? true : false }/>
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("102") ?
                <Grid id="chart10" item xs={12} md={8}>
                    <DailyMessgeByBullyType
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params= {params}
                        type="type"
                        chartId="Chart 10"
                        highlight = { highlight==='chart10' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("103") ?
                <Grid item xs={12} md={12} id="chart11">
                    <BullyTypeByDay
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 11"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart11' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("104") ?
                <Grid item xs={12} md={12} id="chart12">
                    <BullyTypeByTime
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 12"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart12' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("105") ?
                <Grid item xs={12} md={12} id="chart13">
                    <BullyTypeByDevice
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 13"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart13' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("106") ?
                <Grid item xs={12} md={12} id="chart14">
                    <BullyTypeByAccount
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 14"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart14' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("107") ?
                <Grid item xs={12} md={12} id="chart15">
                    <BullyTypeByChannel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 15"
                        colorType="bullyDashboard"
                        params={params}
                        highlight = { highlight==='chart15' ? true : false }
                    />
                </Grid>
                : ""
            }
            {
                resultReportPermission?.includes("108") ?
                <Grid item xs={12} md={12} id="chart16">
                    <BullyTypeBySentiment
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 16"
                        colorType="bullyDashboard"
                        highlight = { highlight==='chart16' ? true : false }
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
                        chartId={bullyType === 'level' ? "Chart 17, Report Level 2(6.2.021)" : "Chart 18, Report Level 2(6.2.022)"} highlight = { highlight==='chart17' ? true : false }/>
                    </Grid>
                </>
                : ""
            }
            <QuickView setHighlight={setHighlight}/>

        </Grid> 
    )
}

export default BullyDashboard