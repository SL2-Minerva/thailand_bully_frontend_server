import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Card, CardHeader, LinearProgress } from '@mui/material'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import 'd3-transition'
import { select } from 'd3-selection'

const WordCloud = ({
  chartId,
  resultWordClouds,
  loadingWordClouds,
  setWord
}: {
  params: any
  chartId: string
  resultWordClouds: any
  loadingWordClouds: boolean
  setWord: any
}) => {
  
  const reportNo = '1.2.021'

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

  return (
    <Card sx={{ maxHeight: 470, minHeight: 470, overflow: 'auto' }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title='Word Clouds' titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {' Report Level 2(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <div style={{ height: 400, width: 500 }}>
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
          <ReactWordcloud words={resultWordClouds?.word_clouds || []} callbacks={callbacks} />
        )}
      </div>
    </Card>
  )
}

export default WordCloud
