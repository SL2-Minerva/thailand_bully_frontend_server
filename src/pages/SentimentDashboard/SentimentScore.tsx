// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableContainer, Typography } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall'
import { Information, ApproximatelyEqual } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'

const SenitmentScore = ({
  chartId,
  highlight,
  resultSenitmentScore,
  loadingSentimentScore
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSenitmentScore: any
  loadingSentimentScore: boolean
}) => {
  const reportNo = '5.2.015'

  return (
    <Card sx={{ minHeight: 520 }}>
      {loadingSentimentScore && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Sentiment Score' />}
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {resultSenitmentScore?.length > 0 ? (
              <TableContainer style={{ height: 400 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell variant='head' width={200}></TableCell>
                      <TableCell variant='head' align='center'>
                        Sentiment Score
                      </TableCell>
                      <TableCell variant='head' align='center'></TableCell>
                      <TableCell variant='head' align='center'>
                        Previous Period
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {(resultSenitmentScore || []).map((comparison: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            {comparison.keyword_name}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography
                            variant='body1'
                            sx={{
                              color:
                                comparison.hightlightColor === 'neutral'
                                  ? '#f5cd19'
                                  : comparison.hightlightColor === 'positive'
                                  ? '#5be12c'
                                  : '#ea4228'
                            }}
                          >
                            {comparison.sentimentScore?.toFixed(4)}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          {comparison?.hightlightColor === 'positive' ? (
                            <ChevronUp
                              fontSize='medium'
                              sx={{ color: '#5be12c', marginTop: '10px', marginRight: '10px' }}
                            />
                          ) : comparison?.hightlightColor === 'neutral' ? (
                            <ApproximatelyEqual
                              fontSize='medium'
                              sx={{ color: '#f5cd19', marginTop: '10px', marginRight: '10px' }}
                            />
                          ) : (
                            <ChevronDown
                              fontSize='medium'
                              sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          <Typography variant='body1'>
                            {comparison?.previous_period && comparison?.previous_period?.toFixed(4)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </Table>
              </TableContainer>
            ) : (
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
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SenitmentScore
