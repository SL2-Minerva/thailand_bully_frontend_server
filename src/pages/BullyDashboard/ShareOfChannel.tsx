// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableBody } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Third Party Imports
// import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { BullyLevelSummaryColors, BullyTypeSummaryColors } from 'src/utils/const'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Translations from 'src/layouts/components/Translations'
import ShareOfChannelGraph from './ShareOfChannelGraph'

const getMaxValue = (data: any) => {
  if (!data) return 1000

  const total = data?.map((object: any) => {
    return object.total
  })

  const max = Math.max(...total) + 3000

  return max
}

const getKeywordColor = (shareofVoiceData: any, color: any) => {
  if (!shareofVoiceData) return ['#fff']

  const colors = []
  for (let i = 0; i < color?.length; i++) {
    if (color[i].name === shareofVoiceData?.keyword_name) {
      colors.push(color[i].color)
    }
  }

  return colors
}

const ShareOfChannel = ({
  resultShareOfChannel,
  resultShareofChannelPlatform,
  chartId,
  highlight,
  type,
  loading,
  loadingChannel,
  title
}: {
  resultShareOfChannel: any
  resultShareofChannelPlatform: any
  chartId: any
  highlight: boolean
  type: string
  loading: boolean
  loadingChannel: boolean
  title?: string
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (resultShareofChannelPlatform) {
      resultShareofChannelPlatform?.sort((a: any, b: any) => {
        const fa = a?.keyword_name?.toLowerCase(),
          fb = b?.keyword_name?.toLowerCase()

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }

        return 0
      })
    }
  }, [t, resultShareOfChannel])

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} square variant='outlined'>
      {loading && loadingChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text={title || ''} />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartId}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          {/* <Grid item md={5} xs={12}>
            {resultShareOfChannel ? (
              <Bar data={data} options={{ indexAxis: 'y', plugins: { legend: { display: false } } }} height={150} />
            ) : (
              ''
            )}
          </Grid> */}
          <Grid item xs={12}>
            {resultShareofChannelPlatform?.length > 0 ? (
              <Table size='small'>
                <TableHead>
                  {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        {index == 0 ? (
                          <>
                            <TableCell sx={{ maxWidth: 100 }}></TableCell>
                            <TableCell sx={{ maxWidth: 200 }}></TableCell>
                            {(shareVoice.value || []).map((value: any, key: number) => {
                              return (
                                <TableCell variant='head' key={key}>
                                  {value?.channel === 'facebook' ? (
                                    <img alt={'logo'} width={34} height={34} src={`/images/logos/facebook-round.png`} />
                                  ) : value?.channel === 'twitter' ? (
                                    <img alt={'logo'} width={34} height={34} src={`/images/logos/twitter.png`} />
                                  ) : value?.channel === 'youtube' ? (
                                    <img width={34} height={34} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                                  ) : value?.channel === 'instagram' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/instagram.png`} />
                                  ) : value?.channel === 'pantip' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/pantip.png`} />
                                  ) : value?.channel === 'google' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/google.png`} />
                                  ) : (
                                    <span style={{ textTransform: 'uppercase' }}>{value?.channel}</span>
                                  )}
                                </TableCell>
                              )
                            })}
                          </>
                        ) : (
                          ''
                        )}
                      </TableRow>
                    )
                  })}
                </TableHead>
                <TableBody>
                  {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: 'right', maxWidth: 80, paddingRight: '0px' }}>
                          {shareVoice?.keyword_name}
                        </TableCell>
                        <TableCell sx={{ maxWidth: 150, paddingLeft: '0px'}}>
                          <ShareOfChannelGraph
                            max={getMaxValue(resultShareofChannelPlatform)}
                            keywordsColor={
                              type === 'level'
                                ? getKeywordColor(shareVoice, BullyLevelSummaryColors)
                                : getKeywordColor(shareVoice, BullyTypeSummaryColors)
                            }
                            resultShareOfVoiceChart={shareVoice}
                          />
                        </TableCell>
                        {(shareVoice.value || []).map((value: any, key: number) => {
                          return (
                            <TableCell key={key}>
                              <span style={{ border: value?.highlight ? '1px solid red' : '', padding: '4px' }}>
                                {value?.percentage > 0 ? <>{value?.percentage?.toFixed(2) + '%'}</> : '0%'}
                              </span>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <div
                style={{
                  height: 300,
                  padding: '70px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default ShareOfChannel
