import { Grid } from '@mui/material'
import MessagesByAccount from './MessagesBy/MessageByAccount'
import MessagesByChannel from './MessagesBy/MessagesByChannel'
import MessagesBySentiment from './MessagesBy/MessagesBySentiment'
import MessagesByBullyLevel from './MessagesBy/MessageByBullyLevel'
import MessagesByBullyType from './MessagesBy/MessageByBullyType'
import MessagesByDays from './MessagesBy/MessageByDays'
import MessagesByTime from './MessagesBy/MessageByTime'
import MessagesByDevices from './MessagesBy/MessageByDevice'
import { useTheme } from '@mui/material/styles'
import { GetMessagesByAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const MessageByAll = ({
  params,
  highlight,
  resultReportPermission
}: {
  params: any
  highlight: string
  resultReportPermission: any
}) => {
  const { resultMessagesByAll, loadingMessagesByAll } = GetMessagesByAll(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keyword,
    params?.previousDate,
    params?.previousEndDate
  )

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus
  
  return (
    <>
      {resultReportPermission?.includes('22') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <MessagesByDays
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 3'
            params={params}
            result={resultMessagesByAll?.messageByDay}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart3' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('23') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <MessagesByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 4'
            params={params}
            result={resultMessagesByAll?.messageByTime}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart4' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('24') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <MessagesByDevices
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 5'
            params={params}
            result={resultMessagesByAll?.messageByDevice}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart5' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('25') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <MessagesByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 6'
            params={params}
            result={resultMessagesByAll?.messageByAccount}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart6' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('26') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <MessagesByChannel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 7'
            result={resultMessagesByAll?.messageByChannel}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart7' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('27') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <MessagesBySentiment
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 8'
            result={resultMessagesByAll?.messageBySentiment}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart8' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('28') ? (
        <Grid item xs={12} md={12} id='chart9'>
          <MessagesByBullyLevel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 9'
            result={resultMessagesByAll?.messageByLevel}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart9' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('29') ? (
        <Grid item xs={12} md={12} id='chart10'>
          <MessagesByBullyType
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 10'
            result={resultMessagesByAll?.messageByType}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart10' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default MessageByAll
