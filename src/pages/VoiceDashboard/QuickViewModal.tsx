import {forwardRef, ReactElement, Ref} from "react";
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import DailyMessageGraph from "./DailyMessageGraph";
import MessagesByDays from "./MessageByDays";
import { useTheme } from '@mui/material/styles'
import MessagesByTime from "./MessageByTime";
import MessagesByDevices from "./MessageByDevice";
import MessagesByAccount from "./MessageByAccount";
import MessagesByChannel from "./MessagesByChannel";
import MessagesBySentiment from "./MessagesBySentiment";
import MessagesByBullyLevel from "./MessageByBullyLevel";
import MessagesByBullyType from "./MessageByBullyType";


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
}

const QuickViewModal = (props: DialogInfoProps) => {
    const { show, setShow, params, chartId } = props

    const theme = useTheme()

    const whiteColor = '#fff'
    const lineChartYellow = '#d4e157'
    const lineChartPrimary = '#787EFF'
    const lineChartWarning = '#ff9800'
    const labelColor = theme.palette.text.primary
    const borderColor = theme.palette.action.focus
    const gridLineColor = theme.palette.action.focus
   
    const onCloseDialog = () => {
        setShow(false);
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
            <IconButton
              size='small'
              onClick={onCloseDialog}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                QuickView
              </Typography>
            </Box>
            {
                chartId === 'chart2' ?
                    <DailyMessageGraph type="message" params={params} chartId="Chart 2"/>
                : chartId === 'chart3' ?
                    <MessagesByDays 
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        chartId="Chart 3"
                        params={params}
                    />
                : chartId === 'chart4' ?
                        <MessagesByTime
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 4"
                            params = {params}
                        />
                    : chartId === 'chart5' ?
                        <MessagesByDevices
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 5"
                            params={params}
                        />
                : chartId === 'chart6' ?
                            <MessagesByAccount
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                chartId="Chart 6"
                                params={params}
                            />
                :chartId === 'chart7' ?
                    <MessagesByChannel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params = {params}
                        chartId="Chart 7"
                    />
                :chartId === 'chart8' ?
                    <MessagesBySentiment
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 8"
                    />
                :chartId === 'chart9' ?
                    <MessagesByBullyLevel
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 9"
                    />
                :chartId === 'chart10' ?
                    <MessagesByBullyType
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params = {params}
                        chartId="Chart 10"
                    />
                :""
            } 
          </DialogContent>
        </Dialog>
      </Card>
    );
}

export default QuickViewModal
