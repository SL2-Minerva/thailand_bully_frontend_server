import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { getChartData, initValue } from './KeywordComparisonByBullyType'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const KeywordComparisonByChannel = ({
  chartId,
  highlight,
  resultKeywordComparisonByChannel,
  loadingKeywordComparisonByChannel,
  keywordColors
}: {
  params: any
  chartId: string
  highlight: boolean
  resultKeywordComparisonByChannel: any
  loadingKeywordComparisonByChannel: boolean
  keywordColors: any
}) => {
  const [charData, setChartData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  useEffect(() => {
    if (resultKeywordComparisonByChannel) {
      const seriesData = getChartData(resultKeywordComparisonByChannel?.value, keywordColors)
      setChartData({
        labels: resultKeywordComparisonByChannel?.labels ? resultKeywordComparisonByChannel?.labels : [],
        datasets: seriesData
      })
    }
    if (resultKeywordComparisonByChannel?.value) {
      setShowNoDataText(false)
    } else {setShowNoDataText(true)}
  }, [resultKeywordComparisonByChannel, keywordColors])

  const reportNo = '2.2.025'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card>
      {loadingKeywordComparisonByChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Percentage of Keyword Comparison by Channel' />}
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

export default KeywordComparisonByChannel
