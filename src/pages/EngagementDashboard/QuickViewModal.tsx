import {forwardRef, ReactElement, Ref} from "react";
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailyEngagement from "./DailyEngagement";
import EngagementByDay from "./EngagementByDay";
import EngagementByTime from "./EngagementByTime";
import EngagementByDevice from "./EngagementByDevice";
import EngagementByAccounts from "./EngagementByAccount";
import EngagementByChannel from "./EngagementByChannel";
import EngagementByType from "./EngagementByType";
import DailyEngagementType from "./DailyEngagementType";
import EngagementTypeByDay from "./EngagementTypeByDay";
import EngagementTypeByDevice from "./EngagementTypeByDevice";
import EngagementTypeByAccount from "./EngagementTypeByAccount";
import EngagementTypeByChannel from "./EngagementTypeByChannel";
import EngagementTypeByTime from "./EngagementTypeByTime";


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
  quickViewData : any
}

const QuickViewModal = (props: DialogInfoProps) => {
    const { show, setShow, params, chartId, quickViewData } = props

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
                <DailyEngagement
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
                    resultFilterData={quickViewData?.resultFilterData}
                    loadingFilterData={quickViewData?.loadingFilterData}
                />
                : chartId === 'chart3' ?
                <EngagementByDay 
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params ={params}
                            chartId="Chart 3"
                            resultBy={quickViewData?.resultEngagementByDay}
                            loading={quickViewData?.loadingEngagementBy}
                        />
                   
                : chartId === 'chart4' ?
                <EngagementByTime
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params= {params}
                            chartId="Chart 4"
                            resultBy={quickViewData?.resultEngagementByTime}
                            loading={quickViewData?.loadingEngagementBy}
                        />
                    
                : chartId === 'chart5' ?
                <EngagementByDevice
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            params={params}
                            chartId="Chart 5"
                            resultBy={quickViewData?.resultEngagementByDevice}
                            loading={quickViewData?.loadingEngagementBy}
                        />
                        
                : chartId === 'chart6' ?
                <EngagementByAccounts
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 6"
                            params={params}
                            loading={quickViewData?.loadingEngagementBy}
                            resultBy={quickViewData?.resultEngagementByAccount}
                        />
                    
                :chartId === 'chart7' ?
                <EngagementByChannel
                            white={whiteColor}
                            labelColor={labelColor}
                            success={lineChartYellow}
                            borderColor={borderColor}
                            primary={lineChartPrimary}
                            warning={lineChartWarning}
                            gridLineColor={gridLineColor}
                            chartId="Chart 7"
                            params={params}
                            loading={quickViewData?.loadingEngagementBy}
                            resultBy={quickViewData?.resultEngagementChannel}
                        />
                :chartId === 'chart8' ?
                    <EngagementByType
                        white={whiteColor}
                        labelColor={labelColor}
                        success={lineChartYellow}
                        borderColor={borderColor}
                        primary={lineChartPrimary}
                        warning={lineChartWarning}
                        gridLineColor={gridLineColor}
                        params={params}
                        chartId="Chart 8"
                        loading={quickViewData?.loadingEngagementBy}
                        resultBy={quickViewData?.resultKeywordByEngagementType}
                        />
                :chartId === 'chart10' ?
                    <DailyEngagementType
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
                        resultBy={quickViewData?.resultEngagementPercentage}
                        loading = {quickViewData?.loadingEngagementType}
                    /> 
                :chartId === 'chart11' ?
                <EngagementTypeByDay 
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 11"
                                loading = {quickViewData?.loadingEngagementType}
                                resultBy={quickViewData?.resultEngagementTypeByDay}
                        />
                :chartId === 'chart12' ?
                <EngagementTypeByTime
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 12"
                                loading = {quickViewData?.loadingEngagementType}
                                resultBy={quickViewData?.resultEngagementTypeByTime}
                            />
                :chartId === 'chart13' ?
                <EngagementTypeByDevice
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                colorType="engagementType"
                                chartId="Chart 13"
                                loading = {quickViewData?.loadingEngagementType}
                                resultBy={quickViewData?.resultEngagementTypeByDevice}
                            />
                :chartId === 'chart14' ?
                <EngagementTypeByAccount
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                chartId="Chart 14"
                                loading = {quickViewData?.loadingEngagementType}
                                resultBy={quickViewData?.resultEngagementTypeByAccount}
                            />
                :chartId === 'chart15' ?
                <EngagementTypeByChannel
                                white={whiteColor}
                                labelColor={labelColor}
                                success={lineChartYellow}
                                borderColor={borderColor}
                                primary={lineChartPrimary}
                                warning={lineChartWarning}
                                gridLineColor={gridLineColor}
                                params={params}
                                chartId="Chart 15"
                                loading = {quickViewData?.loadingEngagementType}
                                resultBy={quickViewData?.resultEngagementTypeByChannel}
                            />
                :""
            } 
          </DialogContent>
        </Dialog>
      </Card>
    );
}

export default QuickViewModal
