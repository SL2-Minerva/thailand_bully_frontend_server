// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  Typography
} from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { getSourceIcon } from './TopFiveInfluencers'
import SentimentLevelGraph from './SentimentLevelGraph'
import ExportExcel from '../VoiceDashboard/ExportExcel'
import InfluencerDetail from './InfluencerDetail'
import { useState } from 'react'

// import { ChannelColors } from 'src/utils/const'

const InfluencerSocialMedia = ({
  resultInfluencer,
  loading,
  total,
  pageCountInfluencer,
  pageInfluencer,
  handleChangePagination,
  setIsLoading,
  select,
  params,
  apiParams,
  setAnchorEl
}: {
  resultInfluencer: any
  loading: boolean
  total: number
  pageCountInfluencer: number
  pageInfluencer: number
  handleChangePagination: any
  setIsLoading: any
  params: any
  apiParams: any
  select: string
  setAnchorEl: any
}) => {
  const [accountName, setAccountName] = useState<string>('')
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const handleOnClick = (name: string) => {
    setAccountName(name)
    setShowDetail(true)
  }

  console.log('params', params);

  return (
    <>
      {loading && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Influencer by Social Media' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='Influencer by Social Media' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    {/* <Translations text='channelChart14Description' /> */}
                  </Typography>
                </span>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>

        <Button variant='contained' color='warning' sx={{ m: 2 }} size='small'>
          <ExportExcel
            setIsLoading={setIsLoading}
            params={params}
            apiParams={apiParams}
            reportNo={''}
            setAnchorEl={setAnchorEl}
            select={select}
            fileName='Infulencer by Social Media.xlsx'
            apiPath='/dashboard-monitoring/engagements/export'
          />
        </Button>
      </div>
      <CardContent id='shareOfVoices'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table size='small' sx={{ overflow: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}></TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      {' '}
                      Account Name{' '}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#dadadade', color: 'black' }}>Channel</TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      Total Post
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      Total Engagment
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      Sentiment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(resultInfluencer || []).map((influencer: any, index: number) => {
                    return (
                      <TableRow
                        key={index}
                        onClick={() => {
                          handleOnClick(influencer.account_name)
                        }}
                      >
                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{influencer?.account_name}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Avatar sx={{ width: 35, height: 35, textAlign: 'center' }}>
                            <img src={getSourceIcon(influencer?.source_name)} width={35} height={35} alt='' />
                          </Avatar>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{influencer?.total_post}</TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>{influencer?.total_engagement}</TableCell>
                        <TableCell sx={{ maxWidth: 300 }}>
                          {' '}
                          <SentimentLevelGraph resultSentimentLevel={influencer} />{' '}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              {total > 0 ? (
                <Pagination
                  count={pageCountInfluencer}
                  page={pageInfluencer + 1}
                  onChange={handleChangePagination}
                  variant='outlined'
                  color='primary'
                />
              ) : (
                ''
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {showDetail && accountName ? (
        <InfluencerDetail
          show={showDetail}
          setShow={setShowDetail}
          params={params}
          keywordId={accountName}
          setKeywordId={setAccountName}
          reportNo={''}
          title='Post Detail by Influencer'
          networkTitle=''
        />
      ) : (
        ''
      )}
    </>
  )
}

export default InfluencerSocialMedia
