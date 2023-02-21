import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'

// ** Custom Components Imports
// import { chartLabel } from './DailyMessageGraph'
// import { GetNumbersOfAccounts } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { useEffect, useRef, useState } from 'react'
import { InteractionItem } from 'chart.js'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import MessageDetail from './MessageDetail'
import moment from 'moment'

const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []

  // let labelsArrayLength;
  const labelValue: string[] = []

  for (let i = 0; i < data?.length; i++) {
    const dataValue = data[i]?.date
    const label: any[] = []

    for (let j = 0; j < dataValue?.length; j++) {
      label.push(dataValue[j])
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

const InfluencerGraph = ({
  chartId,
  params,
  highlight,
  resultNumbersOfAccounts,
  loadingNumbersOfAccounts,
  keywordsColor
}: {
  chartId: string
  params: any
  highlight: boolean
  resultNumbersOfAccounts: any
  loadingNumbersOfAccounts: boolean
  keywordsColor: any
}) => {
  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })

  // const { resultNumbersOfAccounts, loadingNumbersOfAccounts } = GetNumbersOfAccounts(
  //   params?.campaign,
  //   params?.date,
  //   params?.endDate,
  //   params?.period,
  //   params?.keywordIds
  // )

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultNumbersOfAccounts?.value

    let keywordId: number | null = null
    let sourceId: number | null = null
    let campaign_id: number | null = null

    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].keyword_name) {
          sourceId = dailyMessageData[i].source_id || ''
          campaign_id = dailyMessageData[i].campaign_id || ''
          keywordId = dailyMessageData[i].id || ''
        }
      }
    }

    const returnData = {
      keywordId: keywordId,
      sourceId: sourceId,
      campaign_id: campaign_id,
      organization_id: ''
    }

    return returnData
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
        ticks: { color: 'grey' },
        stacked: true
      },
      y: {
        min: 0,

        // max: 5000,

        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: '#ff9800'
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
          color: '#ff9800',
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
      // totalAmount = data[i].data
      keywordName = data[i].name
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === keywordName) {
          color.push(keywordColor[j]?.color)
        }
      }
      totalAmount = []
      const total = data[i]?.date
      const dataArray: any[] = []
      for (let j = 0; j < total?.length; j++) {
        dataArray.push({
          total_at_date: data[i]?.data[j],
          date: moment(total[j]).format('DD/MM/YYYY')
        })
      }
      
      const modifiedData = labels.map((node: any) => {
        const oldInfo = dataArray.find((item: any) => item?.date === node)
        if (oldInfo) {
          return {
            ...node,
            total_at_date: oldInfo?.total_at_date || 0,
            date: oldInfo?.date || node
          }
        } else {
          return { ...node, total_at_date: 0, date: node }
        }
      })

      for (let j = 0; j < modifiedData?.length; j++) {
        totalAmount.push(modifiedData[j].total_at_date)
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

  // const chartDatasets = (data: any, labels: any, keywordColor: any) => {
  //   if (!data) return []
  //   let totalAmount: number[] = []
  //   let keywordName = ''
  //   const returnData: StackChartDataset[] = []
  //   const color = []
  //   for (let i = 0; i < data?.length; i++) {
  //     totalAmount = []
  //     const total = data[i]?.value

  //     const modifiedData = labels.map((node: any) => {
  //       const oldInfo = total.find((item: any) => moment(item?.date).format('DD/MM/YYYY') === node)
  //       if (oldInfo) {
  //         return {
  //           ...node,
  //           total_at_date: oldInfo?.total_at_date || 0,
  //           date: oldInfo?.date || node,
  //           keyword_name: oldInfo?.keyword_name || ''
  //         }
  //       } else {
  //         return { ...node, total_at_date: 0, date: node, keyword_name: oldInfo?.keyword_name || '' }
  //       }
  //     })

  //     for (let j = 0; j < modifiedData?.length; j++) {
  //       totalAmount.push(modifiedData[j].total_at_date)
  //     }

  //     keywordName = data[i]?.value[0]?.keyword_name ? data[i]?.value[0]?.keyword_name : ''

  //     for (let j = 0; j < keywordColor?.length; j++) {
  //       if (keywordColor[j]?.keywordName === keywordName) {
  //         color.push(keywordColor[j]?.color)
  //       }
  //     }

  //     const chartDataset: StackChartDataset = {
  //       fill: false,
  //       tension: 0.5,
  //       pointRadius: 1,
  //       label: keywordName,
  //       pointHoverRadius: 5,
  //       pointStyle: 'circle',
  //       borderColor: color[i],
  //       backgroundColor: color[i],
  //       pointHoverBorderWidth: 5,
  //       pointHoverBorderColor: '#fff',
  //       pointBorderColor: 'transparent',
  //       pointHoverBackgroundColor: color[i],
  //       data: totalAmount
  //     }

  //     returnData.push(chartDataset)
  //   }

  //   return returnData
  // }

  const data = {
    labels: label || [],
    datasets: dataset
  }

  useEffect(() => {
    if (resultNumbersOfAccounts) {
      const labels = chartLabel(resultNumbersOfAccounts)
      setLabel(labels)

      const dataSets = chartDatasets(resultNumbersOfAccounts, labels, keywordsColor)
      setDataset(dataSets)
      setShowNoDataText(false)
    } else {
      setLabel([])
      setDataset([])
      setShowNoDataText(true)
    }
  }, [resultNumbersOfAccounts, keywordsColor])

  const reportNo = '2.2.013'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card style={{ height: 520 }}>
      {loadingNumbersOfAccounts && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Number of Accounts' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
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
          <Bar ref={chartRef} data={data} options={options as any} height={353} onClick={onClick} />
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
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default InfluencerGraph
