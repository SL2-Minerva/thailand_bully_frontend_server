import { Paper, CardContent, CardHeader, LinearProgress, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import MessageDetail from './MessageDetail'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

const onCapture = () => {
  const pictureId = document.getElementById('byDay')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Daily Engagement Trans by Day.png')
    })
  }
}

const EngagementByDay = (props: LineProps) => {
  const reportNo = '4.2.003'
  const { t } = useTranslation()
  const {
    white,
    labelColor,
    borderColor,
    gridLineColor,
    chartId,
    params,
    highlight,
    resultBy,
    loading,
    keywordsColor
  } = props

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
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
    const dailyMessageData = resultBy?.value

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
      const getDatasetIndex = getDatasetAtEvent(chartRef.current, event)

      if (getDatasetIndex?.length > 0) {
        const datasetIndex = getDatasetIndex[0]?.datasetIndex

        if (datasetIndex === 0 || datasetIndex) {
          params.Llabel = dataset[datasetIndex]?.label
        }
      }
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
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: false
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
        }

        // stacked: true
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

  const chartDatasets = (data: any, keywordColor: any) => {
    if (!data) return []
    let totalAmount: number[] = []
    let keywordName = ''
    const returnData: StackChartDataset[] = []
    const color = []
    const total = data?.value || data?.data || []

    for (let i = 0; i < total?.length; i++) {
      totalAmount = []

      for (let j = 0; j < total[i]?.data?.length; j++) {
        totalAmount.push(total[i]?.data[j])
      }

      keywordName = total[i]?.keyword_name
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
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }

      returnData.push(chartDataset)
    }

    return returnData
  }

  const chartLabel = (data: any) => {
    if (!data) return []
    const labels: any[] = []

    if (data) {
      for (let i = 0; i < data.labels?.length; i++) {
        labels.push(t(data.labels[i]))
      }
    }

    return labels
  }
  useEffect(() => {
    if (resultBy) {
      const labels = chartLabel(resultBy)
      setLabel(labels)
    }
  }, [t])

  useEffect(() => {
    if (resultBy) {
      const dailyMessageData = resultBy
      if (dailyMessageData) {
        const labels = chartLabel(dailyMessageData)
        setLabel(labels)

        const dataSets = chartDatasets(dailyMessageData, keywordsColor)
        setDataset(dataSets)
      }
      if (!dailyMessageData?.value) {
        setShowNoDataText(true)
      } else {
        setShowNoDataText(false)
      }
    }
  }, [resultBy, keywordsColor])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: '300px' }} square variant='outlined'>
      {loading && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Daily Engagement Trans By Day' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
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
          </Menu>
        </span>
      </div>

      <CardContent id="byDay">
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
      </CardContent>
    </Paper>
  )
}

export default EngagementByDay
