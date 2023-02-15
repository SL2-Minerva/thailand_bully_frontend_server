import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailyMessageGraph from './DailyMessageGraph'
import ChannelByDay from './ChannelByDay'
import ChannelByBullyType from './ChannelByBullyType'
import ChannelByBullyLevel from './ChannelByBullyLevel'
import ChannelByDevice from './ChannelByDevice'
import ChannelByAccount from './ChannelByAccount'
import ChannelBySentimentComparison from './ChannelBySentimentComparison'
import ChannelByTime from './ChannelByTime'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  params?: any
  chartId?: string
  resultDailyChannel: any
  loadingDailyChannel: boolean
  keywordsColor: any
}

const QuickViewModal = (props: DialogInfoProps) => {
  const { show, setShow, params, chartId, resultDailyChannel, loadingDailyChannel, keywordsColor } = props

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const onCloseDialog = () => {
    setShow(false)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={onCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              QuickView
            </Typography>
          </Box>
          {chartId === 'chart2' ? (
            <DailyMessageGraph
              params={params}
              type='channel'
              chartId='Chart 2'
              resultDailyChannel={resultDailyChannel}
              loadingDailyChannel={loadingDailyChannel}
              keywordsColor ={keywordsColor}
            />
          ) : chartId === 'chart3' ? (
            <ChannelByDay
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 3'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart4' ? (
            <ChannelByTime
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 4'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart5' ? (
            <ChannelByDevice
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 5'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart6' ? (
            <ChannelByAccount
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 6'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart7' ? (
            <ChannelBySentimentComparison
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 7'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart8' ? (
            <ChannelByBullyLevel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 8'
              keywordsColor={keywordsColor}
            />
          ) : chartId === 'chart9' ? (
            <ChannelByBullyType
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 9'
              keywordsColor={keywordsColor}
            />
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default QuickViewModal
