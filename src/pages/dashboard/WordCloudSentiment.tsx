import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Button, Card, CardHeader, Grid, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordCloudsSentiment } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import SentimentAccountList from './SentimentAccountList'
import 'd3-transition'
import { select } from 'd3-selection'

const WordCloudSentiment = ({ params, chartId }: { params: any; chartId: string }) => {
  const [sentiment, setSentiment] = useState('positive')
  const [word, setWord] = useState<string>('')
  const [apiParams, setApiParams] = useState<any>()

  const { resultWordCloudsSentiment, loadingWordCloudsSentiment } = GetWordCloudsSentiment(apiParams)

  const chooseSentiment = (value: string) => {
    setSentiment(value)
  }

  function getCallback(callback: any) {
    return function (word: any, event: any) {
      const isActive = callback !== 'onWordMouseOut'
      const element = event.target
      const text = select(element)
      text
        .on('click', () => {
          if (isActive && word) {
            const selectedWord = word?.text
            setWord(selectedWord)
          }
        })
        .transition()
        .attr('background', 'white')
        .attr('font-size', isActive ? '300%' : '100%')
        .attr('text-decoration', isActive ? 'underline' : 'none')
    }
  }

  const callbacks = {
    // getWordColor: (word:any) => (word.value > 50 ? "orange" : "purple"),
    getWordTooltip: (word: any) => `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver')
  }

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds,
        word: word,
        select: params?.topKeyword || 'top10',
        sentiment_type: sentiment
      })
    }
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate &&
      params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds,
        word: word,
        select: params?.topKeyword || 'top10',
        sentiment_type: sentiment
      })
    }
  }, [params, sentiment, word])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ maxHeight: 500, minHeight: 500, overflow: 'auto' }}>
          {loadingWordCloudsSentiment && <LinearProgress style={{ width: '100%' }} />}
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader
              title={<Translations text='Word Cloud by Sentiment Type' />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <StyledTooltip
              arrow
              title={
                <span>
                  {chartId} <br /> Report Level 2(1.2.025)
                </span>
              }
            >
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
          <div style={{ height: 400, width: 500 }}>
            {!loadingWordCloudsSentiment ? (
              <>
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
                    <Translations text='no data' />
                  </div>
                ) : (
                  <ReactWordcloud callbacks={callbacks} words={resultWordCloudsSentiment?.word_clouds_position || []} />
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </Card>
      </Grid>
      <Grid id='chart18' item xs={12} md={6}>
        <SentimentAccountList
          loading={loadingWordCloudsSentiment}
          accountList={resultWordCloudsSentiment?.wordCloudBySentimentType}
          chartId='Chart 19'
          cardHeader='Word Cloud by Sentiment Type'
          title='Word Cloud by Sentiment Type: Message Transaction'
          networkTitle='Word Cloud by Sentiment Type: Social Network Analysis'
          params={params}
        />
      </Grid>
    </Grid>
  )
}

export default WordCloudSentiment
