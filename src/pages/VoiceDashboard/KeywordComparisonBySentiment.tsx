import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { getChartData, initValue } from './KeywordComparisonByBullyType'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const KeywordComparisonBySentiment = ({
  chartId,
  highlight,
  resultKeywordComparisonBySentiment,
  loadingKeywordComparisonBySentiment,
  keywordsColor
}: {
  params: any
  chartId: string
  highlight?: boolean
  resultKeywordComparisonBySentiment: any
  loadingKeywordComparisonBySentiment: boolean
  keywordsColor: any
}) => {
  const [charData, setChartData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  useEffect(() => {
    if (resultKeywordComparisonBySentiment) {
      const seriesData = getChartData(resultKeywordComparisonBySentiment?.value, keywordsColor)
      setChartData({
        labels: resultKeywordComparisonBySentiment?.labels ? resultKeywordComparisonBySentiment?.labels : [],
        datasets: seriesData
      })

      if (resultKeywordComparisonBySentiment?.value) {
        setShowNoDataText(false)
      } else {setShowNoDataText(true)}
    }
  }, [resultKeywordComparisonBySentiment, keywordsColor])

  const reportNo = '2.2.026'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card>
      {loadingKeywordComparisonBySentiment && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Percentage of Keyword Comparison by Sentiment' />}
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
          <Radar data={charData} height={100} />
        )}
      </CardContent>
    </Card>
  )
}

export default KeywordComparisonBySentiment
