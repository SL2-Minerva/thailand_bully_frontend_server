import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Button, Card, CardHeader, Grid, LinearProgress } from '@mui/material'
import { useState } from 'react'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordCloudsSentiment } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'

const WordCloudSentiment = ({ params, chartId }: { params: any; chartId: string }) => {
  const [sentiment, setSentiment] = useState('')
  const { resultWordCloudsSentiment, loadingWordCloudsSentiment } = GetWordCloudsSentiment(
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

  const chooseSentiment = (value: string) => {
    setSentiment(value)
  }

  return (
    <Card sx={{ maxHeight: 500, minHeight: 500 }}>
      {loadingWordCloudsSentiment && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Word Cloud by Sentiment Type' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip arrow title={chartId}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={8} ml={4}>
          <Button
            variant='contained'
            color={sentiment === 'positive' ? 'warning' : 'inherit'}
            size='medium'
            style={{ marginRight: '6px' }}
            onClick={() => {
              chooseSentiment('positive')
            }}
          >
            Positive
          </Button>
          <Button
            variant='contained'
            color={sentiment === 'negative' ? 'error' : 'inherit'}
            size='medium'
            onClick={() => {
              chooseSentiment('negative')
            }}
          >
            Negative
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: 600 }}>
        {!resultWordCloudsSentiment?.word_clouds_position ||
        resultWordCloudsSentiment?.word_clouds_position?.length == 0 ? (
          <div
            style={{
              padding: '130px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            There is no data
          </div>
        ) : (
          <ReactWordcloud words={resultWordCloudsSentiment?.word_clouds_position || []} />
        )}

      </div>
    </Card>
  )
}

export default WordCloudSentiment
