import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, Line, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'

// ** Custom Components Imports
// import { chartLabel } from './DailyMessageGraph'
// import { GetNumbersOfAccounts } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { useEffect, useRef, useState, MouseEvent } from 'react'
import { InteractionItem } from 'chart.js'
import { IconButton, LinearProgress, Menu, MenuItem } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import MessageDetail from './MessageDetail'
import moment from 'moment'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { Download, ChartBarStacked, ChartLine } from 'mdi-material-ui'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import ExportExcel from './ExportExcel'

const chartLabel = (data: any) => {
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

const InfluencerGraph = ({
  chartId,
  params,
  highlight,
  resultNumbersOfAccounts,
  loadingNumbersOfAccounts,
  keywordsColor,
  apiParams,
  setIsLoading
}: {
  chartId: string
  params: any
  highlight: boolean
  resultNumbersOfAccounts: any
  loadingNumbersOfAccounts: boolean
  keywordsColor: any
  apiParams: any 
  setIsLoading: any
}) => {
  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [chooseChart, setChooseChart] = useState<string>('bar')
  const [keywordId, setKeywordId] = useState<any>()

  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultNumbersOfAccounts

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
        setKeywordId(keyword_id)
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

  const lineOptions = {
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
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: '#4c4e64de'
        }
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

  // const chartDatasets = (data: any, labels: any, keywordColor: any) => {
  //   if (!data) return []
  //   let totalAmount: number[] = []
  //   let keywordName = ''
  //   const returnData: StackChartDataset[] = []
  //   const color = []
  //   for (let i = 0; i < data?.length; i++) {
  //     // totalAmount = data[i].data
  //     keywordName = data[i].name
  //     for (let j = 0; j < keywordColor?.length; j++) {
  //       if (keywordColor[j]?.keywordName === keywordName) {
  //         color.push(keywordColor[j]?.color)
  //       }
  //     }
  //     totalAmount = []
  //     const total = data[i]?.date
  //     const dataArray: any[] = []
  //     for (let j = 0; j < total?.length; j++) {
  //       dataArray.push({
  //         total_at_date: data[i]?.data[j],
  //         date: moment(total[j]).format('DD/MM/YYYY')
  //       })
  //     }

  //     const modifiedData = labels.map((node: any) => {
  //       const oldInfo = dataArray.find((item: any) => item?.date === node)
  //       if (oldInfo) {
  //         return {
  //           ...node,
  //           total_at_date: oldInfo?.total_at_date || 0,
  //           date: oldInfo?.date || node
  //         }
  //       } else {
  //         return { ...node, total_at_date: 0, date: node }
  //       }
  //     })

  //     for (let j = 0; j < modifiedData?.length; j++) {
  //       totalAmount.push(modifiedData[j].total_at_date)
  //     }

  //     const chartDataset: StackChartDataset = {
  //       fill: false,
  //       tension: 0.2,
  //       pointRadius: 4,
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
        tension: 0.2,
        pointRadius: 4,
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

  const onCapture = () => {
    const pictureId = document.getElementById('numberOfAccounts')
    if (pictureId) {
      htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
        saveAs(dataUrl, 'Number Of Accounts(Voice).png')
      })
    }
  }

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleChooseChart = (data: string) => {
    setChooseChart(data)
  }

  return (
    <Card style={{ height: 520 }}>
      {loadingNumbersOfAccounts && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Number of Accounts' />}
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
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
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            size='large'
            onClick={() => {
              handleChooseChart('bar')
            }}
            sx={{ m: 1 }}
          >
            <ChartBarStacked />
          </IconButton>
          <IconButton
            size='large'
            onClick={() => {
              handleChooseChart('line')
            }}
            sx={{ m: 1 }}
          >
            <ChartLine />
          </IconButton>
          <IconButton size='large' onClick={handleRowOptionsClick} sx={{ m: 2 }}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                onCapture()
                setAnchorEl(null)
              }}
            >
              <Download fontSize='medium' sx={{ mr: 2 }} />
              PNG
            </MenuItem>
            <ExportExcel
              setIsLoading={setIsLoading}
              params={params}
              apiParams={apiParams}
              reportNo={reportNo}
              setAnchorEl={setAnchorEl}
              fileName = 'Number of Accounts(Voice).xlsx'
              apiPath = '/export/export-voice'
            />
          </Menu>
        </span>
      </div>
      <CardContent id='numberOfAccounts'>
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
          <>
            {chooseChart === 'line' ? (
              <Line ref={chartRef} data={data} options={lineOptions as any} height={353} onClick={onClick} />
            ) : (
              <Bar ref={chartRef} data={data} options={options as any} height={353} onClick={onClick} />
            )}
          </>
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
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default InfluencerGraph
