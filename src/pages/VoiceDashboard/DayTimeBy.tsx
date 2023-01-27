import { Grid } from "@mui/material"
import { GetDayTimeByAll } from "src/services/api/dashboards/voice/VoiceDashboardAPIs"
import DayTimeBullyLevel from "./DayTimeBullyLevel"
import DayTimeBullyType from "./DayTimeBullyType"
import DayTimeComparison from "./DayTimeComparison"
import DayTimeSentiment from "./DayTimeSentiment"

const DayTimeBy = ({
    params,
    highlight,
    resultReportPermission
  }: {
    params: any
    highlight: string
    resultReportPermission: any
  }) => {
    const { resultTimeByAll } = GetDayTimeByAll(params?.campaign, params?.date, params?.endDate, params?.period, params?.keyword)
    console.log("reault time by all", resultTimeByAll)

    return (
        <>
            {resultReportPermission?.includes('33') ? (
                <Grid item xs={12} id='chart14'>
                <DayTimeComparison params={params} chartId='Chart 14' highlight={highlight === 'chart14' ? true : false} />
                </Grid>
            ) : (
                ''
            )}

            {resultReportPermission?.includes('34') ? (
                <Grid item xs={12} id='chart15'>
                <DayTimeSentiment chartId='Chart 15' params={params} highlight={highlight === 'chart15' ? true : false} />
                </Grid>
            ) : (
                ''
            )}

            {resultReportPermission?.includes('35') ? (
                <Grid item xs={12} id='chart16'>
                <DayTimeBullyLevel chartId='Chart 16' params={params} highlight={highlight === 'chart16' ? true : false} />
                </Grid>
            ) : (
                ''
            )}

            {resultReportPermission?.includes('36') ? (
                <Grid item xs={12} id='chart17'>
                <DayTimeBullyType chartId='Chart 17' params={params} highlight={highlight === 'chart17' ? true : false} />
                </Grid>
            ) : (
                ''
            )}
        </>
    )
  }

  export default DayTimeBy; 