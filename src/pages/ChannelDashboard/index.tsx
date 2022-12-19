import { Grid } from "@mui/material"
import BullyLevel from "./BullyLevel"
import BullyType from "./BullyType"
import ChannelComparison from "./ChannelComparison"
import ChannelVsDevice from "./ChannelVsDevice"
import DeviceComparison from "./DeviceComparison"
import EngagementTransaction from "./EngagementTransaction"

// import KeywordComparisonByChannel from "./KeywordComparison"
import KeywordComparisonByBullyLevel from "./KeywordComparisonByBullyLevel"
import KeywordComparisonByBullyType from "./KeywordComparisonByBullyType"
import KeywordComparisonBySentiment from "./KeywordComparisonBySentiment"
import PercentageOfEngagement from "./PercentageofEngagement"
import Sentiment from "./Sentiment"

const ChannelDashboard = () => {
    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                    <ChannelComparison />
                </Grid>
                <Grid item xs={12} md={4}>
                    <DeviceComparison />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ChannelVsDevice />
                </Grid>
                <Grid item xs={12} md={6}>
                    <EngagementTransaction />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PercentageOfEngagement />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Sentiment/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BullyLevel />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BullyType />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* <KeywordComparisonByChannel /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonBySentiment />
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonByBullyLevel />
                </Grid>
                <Grid item xs={12} md={6}>
                    <KeywordComparisonByBullyType />
                </Grid>
            </Grid>
        </>
    )
}

export default ChannelDashboard