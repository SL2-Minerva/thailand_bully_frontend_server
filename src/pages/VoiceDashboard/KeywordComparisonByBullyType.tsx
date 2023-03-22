import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { GraphicColors } from 'src/utils/const'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const datasets: any[] = []
export const initValue = {
  labels: [],
  datasets: datasets
}

export const getChartData = (data: any, keywordColor: any) => {
  if (!data) return []

  const seriesData: any[] = []

  if (data) {
    for (let i = 0; i < data?.length; i++) {
      let color = ''
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === data[i].keyword_name) {
          color = keywordColor[j]?.color
        }
      }
      seriesData.push({
        label: data[i].keyword_name || '',
        data: data[i].data || [],
        backgroundColor: color || GraphicColors[i],
        borderColor: color || GraphicColors[i],
        borderWidth: 1,
        fill: false
      })
    }
  }

  return seriesData
}

const KeywordComparisonByBullyType = ({
  chartId,
  highlight,
  resultKeywordComparisonByBullyType,
  loadingKeywordComparisonByBullyType,
  keywordsColor
}: {
  params: any
  chartId: string
  highlight?: boolean
  resultKeywordComparisonByBullyType: any
  loadingKeywordComparisonByBullyType: boolean
  keywordsColor: any
}) => {
  const [charData, setChartData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  useEffect(() => {
    if (resultKeywordComparisonByBullyType) {
      const seriesData = getChartData(resultKeywordComparisonByBullyType?.value, keywordsColor)
      setChartData({
        labels: resultKeywordComparisonByBullyType?.labels ? resultKeywordComparisonByBullyType?.labels : [],
        datasets: seriesData
      })
    }
    if (resultKeywordComparisonByBullyType?.value) {
      setShowNoDataText(false)
    } else {
      setShowNoDataText(true)
    }
  }, [resultKeywordComparisonByBullyType, keywordsColor])

  const reportNo = '2.2.028'

  return (
    <Card>
      {loadingKeywordComparisonByBullyType && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Percentage of Keyword Comparison by Bully Type' />}
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
          <Radar data={charData} height={100} />
        )}
      </CardContent>
    </Card>
  )
}

export default KeywordComparisonByBullyType
