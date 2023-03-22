import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GraphicColors } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'

const ChannelVsDevice = ({
  chartId,
  highlight,
  resultDeviceVsChannel,
  loadingDeviceVsChannel
}: {
  params: any
  chartId: string
  highlight: boolean
  resultDeviceVsChannel: any
  loadingDeviceVsChannel: boolean
}) => {
  const [seriesData, setSeriesData] = useState([])
  const [labels, setLabels] = useState([])

  const series = [
    {
      data: seriesData
    }
  ]
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },

    // labels: ["Anriod", "Web", "iPhone"],
    colors: GraphicColors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: GraphicColors,
          fontSize: '12px'
        }
      }
    }
  }

  useEffect(() => {
    if (resultDeviceVsChannel) {
      const seriesData = resultDeviceVsChannel?.data
      const labelData = resultDeviceVsChannel?.labels

      if (seriesData) {
        setSeriesData(seriesData)
      }
      if (labelData) {
        setLabels(labelData)
      }
    }
  }, [resultDeviceVsChannel])

  const reportNo = '2.2.024'

  return (
    <Card style={{ minHeight: 550, maxHeight: 550 }}>
      {loadingDeviceVsChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Channel vs. Device: Period over Period Comparison' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          subheader='Period over Period Comparison'
          subheaderTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {' Report Level 2(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} height={315}>
            {!resultDeviceVsChannel ? (
              <div
                style={{
                  height: 300,
                  padding: '70px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <ReactApexcharts type='bar' options={options} series={series} height={305} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ChannelVsDevice
