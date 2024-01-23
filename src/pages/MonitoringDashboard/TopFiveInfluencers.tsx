import React, { useState } from 'react'
import { Avatar, Grid, Paper, Typography } from '@mui/material'

interface MessageData {
  params: any
  highlight: boolean
  chartId: string
  resultTopFiveInfluencer: any
  loadingTopFiveInfluencer: boolean
}
import { FacebookIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon, googleIcon } from 'src/utils/const'
import SentimentLevelGraph from './SentimentLevelGraph'
import InfluencerDetail from './InfluencerDetail'

export const getSourceIcon = (sourceName: string) => {
  const sourceIcon =
    sourceName === 'facebook'
      ? FacebookIcon
      : sourceName === 'twitter'
      ? TwitterIcon
      : sourceName === 'instagram'
      ? InstagramIcon
      : sourceName === 'youtube'
      ? YoutubeIcon
      : sourceName === 'pantip'
      ? PantipIcon
      : sourceName === 'google'
      ? googleIcon
      : '/images/NoImage.png'

  return sourceIcon
}

const TopFiveInfluencer = (props: MessageData) => {
  const { resultTopFiveInfluencer, params } = props

  const [accountName, setAccountName] = useState<string>('')
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const handleOnClick = (name: string) => {
    setAccountName(name)
    setShowDetail(true)
  }

  return (
    <Grid container spacing={2} pl={3}>
      {(resultTopFiveInfluencer?.data || [])?.map((influencer: any, index: number) => {
        return (
          <>
            {index < 5 ? (
              <Grid xs={6} md={2.4} key={index} p={2}>
                <Paper
                  onClick={() => {
                    handleOnClick(influencer.account_name)
                  }}
                >
                  <Grid display='flex' justifyContent='center'>
                    <Avatar sx={{ width: 80, height: 80 }}>
                      <img src={influencer?.cover_image || '/images/NoImage.png'} width={80} height={80} alt='' />
                    </Avatar>
                  </Grid>
                  <Grid display='flex' justifyContent='center'>
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      {' '}
                      {influencer.account_name}{' '}
                    </Typography>
                  </Grid>

                  <Grid display='flex' justifyContent='center'>
                    <Avatar sx={{ width: 35, height: 35 }}>
                      <img src={getSourceIcon(influencer?.source_name)} width={35} height={35} alt='' />
                    </Avatar>
                  </Grid>

                  <Grid container spacing={2} mt={2} mb={2}>
                    <Grid item xs={12} md={5}>
                      <Typography variant='caption' sx={{ pl: 2, fontWeight: 600 }}>
                        Total Post : {influencer.total_post}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Typography variant='caption' sx={{ fontWeight: 600 }}>
                        Total Engagement : {influencer.total_engagement}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={5}>
                      <Typography variant='caption' sx={{ pl: 2, fontWeight: 600 }}>
                        Sentiment:
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <SentimentLevelGraph resultSentimentLevel={influencer} />
                  </Grid>
                </Paper>
              </Grid>
            ) : (
              ''
            )}
          </>
        )
      })}

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
    </Grid>
  )
}

export default TopFiveInfluencer
