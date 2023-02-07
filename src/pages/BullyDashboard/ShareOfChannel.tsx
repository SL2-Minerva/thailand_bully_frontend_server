// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableBody } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { BullyLevelSummaryColors, BullyTypeSummaryColors } from 'src/utils/const'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Translations from 'src/layouts/components/Translations'

const ChartData = (data: any) => {
  if (!data) return []

  const chartDatas: any[] = []
  for (let i = 0; i < data?.length; i++) {
    chartDatas.push(data[i]?.data || data[i]?.value)
  }

  return chartDatas
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
  chartId: string
  highlight: boolean
  type: string
  loading: boolean
  loadingChannel: boolean
  title?: string
}) => {
  const [label, setLabel] = useState<any>([])
  const { t } = useTranslation()

  const ChartLabels = (data: any) => {
    if (!data) return []
    const keywordData = data

    const labels: any[] = []

    for (let i = 0; i < keywordData?.length; i++) {
      labels.push(t(keywordData[i].keyword_name))
    }

    return labels
  }

  useEffect(() => {
    if (resultShareOfChannel) {
      const labels = ChartLabels(resultShareOfChannel)
      setLabel(labels)
    }
  }, [t, resultShareOfChannel])

  // const labels = resultShareOfChannel ? ChartLabels(resultShareOfChannel) : [];
  const data = {
    labels: label,
    datasets: [
      {
        axis: 'y',
        label: '',
        data: ChartData(resultShareOfChannel),
        fill: false,
        backgroundColor: type === 'level' ? BullyLevelSummaryColors : BullyTypeSummaryColors,
        borderColor: type === 'level' ? BullyLevelSummaryColors : BullyTypeSummaryColors,
        borderWidth: 1
      }
    ]
  }

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
          <Grid item xs={5}>
            <Bar data={data} options={{ indexAxis: 'y' }} height={150} />
          </Grid>
          <Grid item xs={7}>
            <Table size='small'>
              <TableHead>
                {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      {index == 0 ? (
                        <>
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
                                ) 
                                : 
                                (
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
                      {(shareVoice.value || []).map((value: any, key: number) => {
                        return (
                          <TableCell key={key}>
                            <span style={{ border: value?.highlight ? '1px solid red' : '', padding: '4px' }}>
                              {value?.percentage + '%'}
                            </span>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default ShareOfChannel
