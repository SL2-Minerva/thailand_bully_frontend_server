// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, LinearProgress } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GraphicColors } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations' 
import CustomeLabels from './CustomLabel'

Chart.register(DoughnutLabel)
const PlatformsComparison = ({
  chartId,
  highlight,
  resultPlatformComparison,
  loadingPlatformComparison
}: {
  params: any
  chartId: string
  highlight: boolean
  resultPlatformComparison: any
  loadingPlatformComparison: boolean
}) => {
  const initValue = {
    label: [],
    data: [],
    total: 0
  }
  const [previousData, setPreviousData] = useState(initValue)
  const [currentData, setCurrentData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const currentPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: currentData?.total && currentData?.total !=0 ? currentData?.total : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: '#434343'
          }
        ]
      }
    }
  }

  const currentPeriodData = {
    labels: currentData?.label || [],
    datasets: [
      {
        data: currentData?.data || [],
        backgroundColor: GraphicColors,

        // backgroundColor: [
        //   "#299b82",
        //   "#1640a1c4",
        //   "#d8df20",
        //   "#e02916",
        //   "#ffca25",
        //   "#C0D3DF",
        // ],
        hoverOffset: 3
      }
    ]
  }

  const previousPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: previousData?.total && previousData?.total !=0 ? previousData?.total : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: '#434343'
          }
        ]
      }
    }
  }

  const previousPeriodData = {
    labels: previousData?.label || [],
    datasets: [
      {
        data: previousData?.data || [],
        backgroundColor: GraphicColors,

        // backgroundColor: [
        //   "#299b82",
        //   "#1640a1c4",
        //   "#d8df20",
        //   "#e02916",
        //   "#ffca25",
        //   "#C0D3DF",
        // ],
        hoverOffset: 3
      }
    ]
  }

  useEffect(() => {
    if (resultPlatformComparison) {
      setCurrentData(resultPlatformComparison.current_period)
      setPreviousData(resultPlatformComparison.previous_period)

      if (resultPlatformComparison?.current_period?.total || resultPlatformComparison?.previous_period?.total) {
        setShowNoDataText(false)
      } else {
        setShowNoDataText(true)
      }
    }
  }, [resultPlatformComparison])

  const reportNo = '2.2.022'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card style={{ minHeight: 550 }}>
      {loadingPlatformComparison && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Channel/Platform: Period over Period Comparison' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          subheader='Period over Period Comparison'
          subheaderTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Box pl={{ xs: 1.3 }} pr={{ xs: 1 }}  sx={{display: 'flex', justifyContent: 'center'}}>
              <CustomeLabels
                data={currentData}
                labels={previousData?.label || currentData?.label}
                color={GraphicColors}
                itemsCountPerPage={50}
                showValue={false}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataText ? (
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
              <Doughnut data={currentPeriodData} options={currentPeriodOptions as any} height={290} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataText ? (
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
              <Doughnut data={previousPeriodData} options={previousPeriodOptions as any} height={290} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            Current Period
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            Previous Period
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PlatformsComparison
