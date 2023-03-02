import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Card, CardHeader, LinearProgress } from '@mui/material'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordClouds } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'

const WordCloud = ({ params, chartId }: { params: any; chartId: string }) => {
  const { resultWordClouds, loadingWordClouds } = GetWordClouds(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.topKeyword,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )
  const reportNo = '1.2.021'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card sx={{ maxHeight: 470, minHeight: 470 }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title='Word Clouds' titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <div style={{ height: 400, width: 600 }}>
        {!resultWordClouds?.word_clouds || resultWordClouds?.word_clouds?.length == 0 ? (
          <div
            style={{
              padding: '130px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        ) : (
          <ReactWordcloud words={resultWordClouds?.word_clouds || []} />
        )}
      </div>
    </Card>
  )
}

export default WordCloud
