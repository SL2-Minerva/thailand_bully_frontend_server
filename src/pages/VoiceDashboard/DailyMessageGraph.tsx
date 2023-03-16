import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'

// ** Custom Components Imports
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { InteractionItem } from 'chart.js'
import moment from 'moment'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import MessageDetail from './MessageDetail'

interface Props {
  type: string
  chartId: string
  params: any
  keywordsColor: any
  highlight?: boolean
  resultDailyMessage: any
  loadingDailyMessage : boolean
}
export const getSeries = (seriesData: any) => {
  if (!seriesData) return []

  const series: any[] = []
  if (seriesData && seriesData?.length > 0) {
    for (let i = 0; i < seriesData?.length; i++) {
      series.push({
        name: seriesData[i].name,
        data: seriesData[i].data
      })
    }
  }

  return series
}

export const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []

  // let labelsArrayLength;
  const labelValue: string[] = []

  for (let i = 0; i < data?.length; i++) {
    const dataValue = data[i]?.value
    const label: any[] = []

    for (let j = 0; j < dataValue?.length; j++) {
      label.push(dataValue[j]?.date)
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

const DailyMessageGraph = (props: Props) => {
  const { type, chartId, params, highlight, keywordsColor,resultDailyMessage, loadingDailyMessage } = props
  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [keywordId, setKeywordId] = useState<any>()

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultDailyMessage

    let keywordId: number | null = null
    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (dailyMessageData[i]?.value && dailyMessageData[i]?.value?.length > 0) {
          if (keywordName === dailyMessageData[i]?.value[0]?.keyword_name) {
            keywordId = dailyMessageData[i].value[0]?.keyword_id
          }
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
        setParamsId(keyword_id)
        setKeywordId(keyword_id)
        setShowDetail(true)
      }
    }
  }

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#4c4e64de' },
        stacked: true
      },
      y: {
        min: 0,

        // max: 5000,

        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: '#4c4e64de'
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
          color: '#4c4e64de',
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
        const oldInfo = total.find((item: any) => moment(item?.date).format('DD/MM/YYYY') === node)
        if (oldInfo) {
          return {
            ...node,
            total_at_date: oldInfo?.total_at_date || 0,
            date: oldInfo?.date || node,
            keyword_name: oldInfo?.keyword_name || ''
          }
        } else {
          return { ...node, total_at_date: 0, date: node, keyword_name: oldInfo?.keyword_name || '' }
        }
      })

      for (let j = 0; j < modifiedData?.length; j++) {
        totalAmount.push(modifiedData[j].total_at_date)
      }

      keywordName = data[i]?.value[0]?.keyword_name ? data[i]?.value[0]?.keyword_name : ''

      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === keywordName) {
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
        pointHoverBorderColor: '#fff',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }

      returnData.push(chartDataset)
    }

    return returnData
  }

  const data = {
    labels: label || [],
    datasets: dataset
  }

  useEffect(() => {
    if (resultDailyMessage && resultDailyMessage?.length > 0) {
      const labels = chartLabel(resultDailyMessage)
      setLabel(labels)

      if (labels?.length > 0) {
        const dataSets = chartDatasets(resultDailyMessage, labels, keywordsColor)
        setDataset(dataSets)
        setShowNoDataText(false)
      }
    } else {
      setLabel([])
      setDataset([])
      setShowNoDataText(true)
    }
  }, [resultDailyMessage, keywordsColor])

  const reportNo = '2.2.002'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 400 }} square variant='outlined'>
      {loadingDailyMessage && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {type === 'message' ? (
          <CardHeader
            title={<Translations text='Daily Messages by Date' />}
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          />
        ) : type === 'channel' ? (
          <CardHeader
            title='Daily Channel By Date'
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          />
        ) : (
          ''
        )}
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
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
          <Bar ref={chartRef} data={data} options={options as any} height={360} onClick={onClick} />
        )}
      </CardContent>
      {showDetail ? (
        <MessageDetail
          show={showDetail}
          setShow={setShowDetail}
          params={params}
          paramsId={paramsId}
          setParamsId={setParamsId}
          reportNo={reportNo}
          keywordId={keywordId}
          setKeywordId={setKeywordId}
          title='Daily Messages: Message Transactions'
          networkTitle='Daily Messages: Social Network Analysis'
        />
      ) : (
        ''
      )}
    </Paper>
  )
}

export default DailyMessageGraph
