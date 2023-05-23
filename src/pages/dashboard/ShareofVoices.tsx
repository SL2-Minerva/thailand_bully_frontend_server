// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  Typography
} from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetShareOfVoice, GetSentimentLevel } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { FacebookIcon, googleIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { MouseEvent, useEffect, useState } from 'react'
import NumberOfEachMessage from './NumberOfEachMessage'
import SentimentEachGraph from './SentimentEachGraph'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

const onCapture = () => {
  const pictureId = document.getElementById('shareOfVoices')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Share of Voices(overall).png')
    })
  }
}

// import MuiTableCell from "@material-ui/core/TableCell";
// import { withStyles } from '@material-ui/core'

// const TableCell = withStyles({
//   root: {
//     borderBottom: "none"
//   }
// })(MuiTableCell);

const ShareOfVoices = ({ params, keywordsColor }: { params: any; chartId: string; keywordsColor: any }) => {

  const [apiParams, setApiParams] = useState<any>()

  const { resultShareOfVoice, loadingShareOfVoice } = GetShareOfVoice(
   apiParams
  )

  // const reportNo = '1.1.020'

  const { resultSentimentLevel } = GetSentimentLevel(
   apiParams
  )

  const [tableData, setTableData] = useState<any[]>([])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (resultShareOfVoice && resultSentimentLevel) {
      const data: any = []

      for (let i = 0; i < resultShareOfVoice?.length; i++) {
        data.push({
          keyword_id: resultShareOfVoice[i]?.keyword_id,
          keyword_name: resultShareOfVoice[i]?.keyword_name,
          campaign_id: resultShareOfVoice[i]?.campaign_id,
          campaign_name: resultShareOfVoice[i]?.campaign_name,
          organization_id: resultShareOfVoice[i]?.organization_id,
          organization_name: resultShareOfVoice[i]?.organization_name,
          number_of_message: resultShareOfVoice[i]?.total,
          value: resultShareOfVoice[i]?.value,
          Negative: resultSentimentLevel[i]?.Negative,
          Neutral: resultSentimentLevel[i]?.Neutral,
          Positive: resultSentimentLevel[i]?.Positive
        })
      }

      setTableData(data)
    }
  }, [resultSentimentLevel, resultShareOfVoice])

  const ShareOfVoiceTable = (data: any) => {
    if (!data) return null

    const percentageData = data?.data?.value

    return (
      <>
        {(percentageData || []).map((percentage: any, index: number) => {
          return (
            <TableCell key={index} sx={{ textAlign: 'center' }}>
              <span style={{ border: percentage?.highlight ? '1px solid red' : '', padding: '4px' }}>
                {percentage?.percentage + '%'}
              </span>
            </TableCell>
          )
        })}
      </>
    )
  }

  const ShareOfVoiceTableHead = (data: any) => {
    if (!data) return null
    const tableHeader: any[] = []

    const headerData = data?.data

    for (let i = 0; i < headerData?.length; i++) {
      const value = headerData[i]?.value
      for (let j = 0; j < value?.length; j++) {
        tableHeader.push(value[j]?.channel)
      }
    }

    const filterData = [...new Set(tableHeader)]

    return (
      <>
        {(filterData || []).map((title: any, i: number) => {
          const imgPath =
            title === 'twitter'
              ? TwitterIcon
              : title === 'youtube'
              ? YoutubeIcon
              : title === 'facebook'
              ? FacebookIcon
              : title === 'instagram'
              ? InstagramIcon
              : title === 'pantip'
              ? PantipIcon
              : title === 'google'
              ? googleIcon
              : ''

          return (
            <TableCell key={i} sx={{ textAlign: 'center' }}>
              {imgPath ? (
                <img alt='logo' width={34} height={34} src={imgPath} />
              ) : (
                <Typography variant='caption' textTransform='uppercase'>
                  {title}
                </Typography>
              )}
            </TableCell>
          )
        })}
      </>
    )
  }

  const getKeywordColor = (shareofVoiceData: any) => {
    if (!shareofVoiceData) return ['#fff']

    const colors = []
    for (let i = 0; i < keywordsColor?.length; i++) {
      if (keywordsColor[i].keywordName === shareofVoiceData?.keyword_name) {
        colors.push(keywordsColor[i].color)
      }
    }

    return colors
  }

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    } 
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate
      && params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
    <Card sx={{ minheight: 450 }}>
      {loadingShareOfVoice && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader title={<Translations text='Share of Voice' />} titleTypographyProps={{ variant: 'h6' }} />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='overallChart12Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='overallChart12Description' />
                </Typography>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='large' onClick={handleRowOptionsClick} sx={{ m: 2 }}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                onCapture()
                setAnchorEl(null)
              }}
            >
              <Download fontSize='medium' sx={{ mr: 2 }} />
              PNG
            </MenuItem>
          </Menu>
        </span>
      </div>
      <CardContent id="shareOfVoices">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table size='small' sx={{ overflow: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Number of Messages</TableCell>
                    {resultShareOfVoice ? <ShareOfVoiceTableHead data={resultShareOfVoice} /> : ''}
                    <TableCell sx={{ textAlign: 'right' }}>Negative</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Neutral</TableCell>
                    <TableCell>Positive</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(tableData || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: 'right', maxWidth: 120, paddingRight: '0px' }}>
                          {shareVoice?.keyword_name}
                        </TableCell>
                        <TableCell sx={{ minWidth: 100, maxWidth: 300, paddingLeft: '0px' }}>
                          <NumberOfEachMessage
                            keywordsColor={getKeywordColor(shareVoice)}
                            resultShareOfVoiceChart={shareVoice}
                          />
                        </TableCell>
                        <ShareOfVoiceTable data={shareVoice} />
                        <TableCell colSpan={3} sx={{ maxWidth: 300 }}>
                          <SentimentEachGraph resultSentimentLevel={shareVoice} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ShareOfVoices
