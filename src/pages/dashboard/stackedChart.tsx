// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment'
import DailyMessageDetail from './DailyMessageDetail'
import { InteractionItem } from 'chart.js'

import { Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

// import { Button } from '@mui/material'
// import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
// import { Bar, getDatasetAtEvent,  } from 'react-chartjs-2'

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
  params: any
  resultFilterData: any
  loadingFilterData: boolean
  keywordsColor: any
}

const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []

  // let labelsArrayLength;
  const labelValue: string[] = []

  for (let i = 0; i < data?.length; i++) {
    const dataValue = data[i]?.value
    const label: any[] = []

    for (let j = 0; j < dataValue?.length; j++) {
      label.push(dataValue[j]?.date_m)
    }

    labels = [...labels, ...label]
  }

  if (labels && labels?.length > 0) {
    const filterArray = [...new Set(labels)]
    for (let i = 0; i < filterArray?.length; i++) {
      labelValue.push(moment(filterArray[i]).format('DD/MM/YYYY'))
    }
    labelValue.sort()
  }

  return labelValue
}

const StackedChart = (props: LineProps) => {
  // ** Props
  const { white, labelColor, borderColor, gridLineColor, params, resultFilterData, loadingFilterData, keywordsColor } =
    props

  // const [ chartData, setChartData ] = useState();

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [keywordId, setKeywordId] = useState<any>()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultFilterData?.daily_message
    let keywordId: number | null = null
    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].keyword_name) {
          keywordId = dailyMessageData[i].keyword_id
        }
      }
    }

    return keywordId
  }

  const onClick = (event: any) => {
    if (chartRef.current) {
      const getIndex = getElementAtEvent(chartRef.current, event)

      if (getIndex?.length > 0) {
        const index = getIndex[0].index
        params.label = label[index]
      }

      const keyword_id = getKeywordId(getDatasetAtEvent(chartRef.current, event))

      if (keyword_id) {
        setKeywordId(keyword_id)
        setShowDetail(true)
      }
    }
  }

  // const showMessageDetail = () => {
  //   setShowDetail(false);
  // }

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: true
      },
      y: {
        min: 0,

        // max: 5000,

        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
        },

        stacked: true
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  const chartDatasets = (data: any, labels: any, keywordColor: any) => {
    if (!data) return []
    let totalAmount: number[] = []
    let keywordName = ''
    const returnData: StackChartDataset[] = []
    const color = []
    for (let i = 0; i < data?.length; i++) {
      totalAmount = []
      const total = data[i]?.value

      const modifiedData = labels.map((node: any) => {
        const oldInfo = total.find((item: any) => moment(item?.date_m).format('DD/MM/YYYY') === node)
        if (oldInfo) {
          return {
            ...node,
            total_at_date: oldInfo?.total_at_date || 0,
            date: oldInfo?.date_m || node
          }
        } else {
          return { ...node, total_at_date: 0, date: node }
        }
      })

      for (let i = 0; i < modifiedData?.length; i++) {
        totalAmount.push(modifiedData[i].total_at_date)
      }

      keywordName = data[i].keyword_name
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === data[i].keyword_name) {
          color.push(keywordColor[j]?.color)
        }
      }

      const chartDataset: StackChartDataset = {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: keywordName,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: color[i],
        backgroundColor: color[i],
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }

      returnData.push(chartDataset)
    }

    return returnData
  }

  useEffect(() => {
    if (resultFilterData) {
      const dailyMessageData = resultFilterData?.daily_message
      if (dailyMessageData) {
        const labels = chartLabel(dailyMessageData)
        setLabel(labels)

        if (labels?.length > 0) {
          const dataSets = chartDatasets(dailyMessageData, labels, keywordsColor)
          setDataset(dataSets)
        }
        setShowNoDataText(false)
      } else {
        setLabel([])
        setDataset([])
        setShowNoDataText(true)
      }
    }
  }, [resultFilterData, keywordsColor])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const reportNo = '1.2.002'

  const chartTitle = 'Chart 2, Report Level 2(' + reportNo + ')'

  return (
    <Card sx={{ minHeight: 550, maxHeight: 550 }}>
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Daily Messages' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='KeyWords'
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip arrow title={chartTitle || ''}>
            <Information fontSize='large' style={{ marginTop: '23px' }} />
          </StyledTooltip>
        </span>
      </div>

      <CardContent>
        {showNoDataText ? (
          <div
            style={{
              height: 300,
              padding: '170px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        ) : (
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
        )}
        {keywordId && params?.campaign ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Daily Messages: Message Transactions'
            networkTitle='Daily Messages: Social Network Analysis'
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  )
}

export default StackedChart
