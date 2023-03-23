import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import {
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useCallback, useState } from 'react'
import SourceService from 'src/services/api/source/SourceApi'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordCloudsPlatform } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import 'd3-transition'
import { select } from 'd3-selection'
import AccountList from './AccountList'

const WordCloudChannel = ({
  params,
  chartId,
  word,
  setWord
}: {
  params: any
  chartId: string
  word: string
  setWord: any
}) => {
  const [platformId, setPlatformId] = useState<string>('1')
  const { result_source_list } = SourceService()
  const { resultWordCloudsPlatform, loadingWordCloudsPlatform } = GetWordCloudsPlatform(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.topKeyword,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds,
    platformId,
    word
  )

  const handleSelectList = useCallback((e: SelectChangeEvent) => {
    setPlatformId(e.target.value)
  }, [])

  const reportNo = '1.2.023'

  function getCallback(callback: any) {
    return function (word: any, event: any) {
      const isActive = callback !== 'onWordMouseOut'
      const element = event.target
      const text = select(element)
      text
        .on('click', () => {
          if (isActive && word) {
            // window.open(`https://www.google.com/`, "_blank");

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ maxHeight: 500, minHeight: 500, overflow: 'auto' }}>
          {loadingWordCloudsPlatform && <LinearProgress style={{ width: '100%' }} />}
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader
              title={<Translations text='Word Cloud by Channel' />}
              titleTypographyProps={{ variant: 'h6' }}
            />
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
          <Grid container spacing={2}>
            <Grid item sm={6} xs={6} ml={4}>
              <FormControl fullWidth>
                <InputLabel id='plan-select'>Select Platform</InputLabel>
                <Select
                  fullWidth
                  value={platformId}
                  id='select-platform'
                  label='Select Channel'
                  labelId='platform-select'
                  onChange={e => {
                    handleSelectList(e)
                  }}
                  inputProps={{ placeholder: 'Select Channel' }}
                >
                  {result_source_list &&
                    result_source_list.map((item: any, index: number) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ height: 400, width: 500 }}>
            {!resultWordCloudsPlatform?.word_clouds_platform ||
            resultWordCloudsPlatform?.word_clouds_platform?.length == 0 ? (
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
              <ReactWordcloud words={resultWordCloudsPlatform?.word_clouds_platform || []} callbacks={callbacks} />
            )}
          </div>
        </Card>
      </Grid>
      <Grid id='chart16' item xs={12} md={6}>
        <AccountList
          loading={loadingWordCloudsPlatform}
          accountList={resultWordCloudsPlatform?.wordCloudByAccount}
          chartId='Chart 16'
          cardHeader='Word Cloud by Account'
          title='Word Cloud by Account: Message Transaction'
          networkTitle='Word Cloud by Account: Social Network Analysis'
          params={params}
        />
      </Grid>
    </Grid>
  )
}

export default WordCloudChannel
