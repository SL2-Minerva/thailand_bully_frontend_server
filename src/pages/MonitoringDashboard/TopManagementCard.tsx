import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Grid, LinearProgress, Stack } from '@mui/material'
import {
  FacebookIcon,
  InstagramIcon,
  PantipIcon,
  TwitterIcon,
  YoutubeIcon,
  gitHubIcon,
  googleIcon
} from 'src/utils/const'
import { CommentOutline, LinkVariant, ShareVariantOutline, ThumbUpOutline } from 'mdi-material-ui'

// import Button from '@mui/material/Button'

// import dynamic from 'next/dynamic'

// type tinyLinkProps = { cardSize: string; showGraphic: boolean; maxLine: number; minLine: number; url: string }

// const ReactTinyLink : tinyLinkProps = dynamic(
//   ({cardSize}) => {
//     return import('react-tiny-link').then(mod => mod.ReactTinyLink)
//   },
//   { ssr: false }
// )

// const ReactTinyLink = dynamic(() => import('react-tiny-link'), { ssr: false })

interface CardInfo {
  resultTopEngagement: any
  loadingTopEngagement: boolean
  result_source_list?: any
}

const TopManagementCard = (props: CardInfo) => {
  const { resultTopEngagement, loadingTopEngagement, result_source_list } = props
  const imgPath = gitHubIcon

  const [sourceName, setSourceName] = React.useState('')

  // const [showFullMessage, setShowFullMessage] = React.useState(false)

  const sourceIcon =
    resultTopEngagement?.source_name || sourceName === 'facebook'
      ? FacebookIcon
      : resultTopEngagement.source_name || sourceName === 'twitter'
      ? TwitterIcon
      : resultTopEngagement.source_name || sourceName === 'instagram'
      ? InstagramIcon
      : resultTopEngagement.source_name || sourceName === 'youtube'
      ? YoutubeIcon
      : resultTopEngagement.source_name || sourceName === 'pantip'
      ? PantipIcon
      : resultTopEngagement.source_name || sourceName === 'google'
      ? googleIcon
      : '/images/NoImage.png'

  const getSourceName = (sourceId: number) => {
    if (result_source_list) {
      for (let i = 0; i < result_source_list?.length; i++) {
        if (result_source_list[i].id === sourceId) {
          return result_source_list[i]?.name
        }
      }

      return ''
    }
  }

  React.useEffect(() => {
    if (resultTopEngagement?.source_id) {
      const source_name = getSourceName(resultTopEngagement?.source_id)

      // setShowFullMessage(true)

      setSourceName(source_name)
    }
  }, [resultTopEngagement?.source_id])

  return (
    <Card sx={{ minHeight: '335px' }}>
      {loadingTopEngagement && <LinearProgress style={{ width: '100%' }} />}
      {/* <CardMedia sx={{ height: 140 }} image={'images/NoImage.png'} title='No Image' /> */}

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={2.5}>
            <Avatar sx={{ width: 50, height: 50 }}>
              <img src={imgPath} width={50} height={50} alt='' />
            </Avatar>
          </Grid>

          <Grid item xs={8.5}>
            <div style={{ display: 'flex' }}>
              <Avatar sx={{ width: 35, height: 35 }}>
                <img src={sourceIcon} width={35} height={35} alt='' />
              </Avatar>
              <Box maxHeight={30}>
                <Typography gutterBottom variant='body1' component='div' ml={2}>
                  <b>{resultTopEngagement.account_name}</b>
                  <Typography gutterBottom variant='caption' component='div'>
                    {resultTopEngagement.post_date + ', ' + resultTopEngagement.post_time}
                  </Typography>
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>

        <Typography variant='body2' color='text.secondary' mt={4}>
          <Box sx={{ minHeight: '70px', maxHeight: '70px' }}>
            <span
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                maxWidth: '400px'
              }}
            >
              {resultTopEngagement.message_detail}
            </span>
          </Box>
        </Typography>

        <Box sx={{ maxWidth: '400px', display: 'flex', justifyContent: 'center', mt: 3 }}>
          <img src={'/images/NoImage.png'} width={150} height={150} alt='' />
        </Box>

        <Grid container spacing={2}>
          <Grid item md={10} xs={12} sx={{ display: 'flex' }}>
            <Stack direction='row' spacing={2}>
              <ThumbUpOutline fontSize='medium' sx={{paddingRight: '3px'}}/> { ' : ' + resultTopEngagement.number_of_reactions}
            </Stack>

            <Stack direction='row' spacing={2} sx={{marginLeft: '12px'}}>
              <CommentOutline fontSize='medium' sx={{paddingRight: '3px'}}/> { ' : ' + resultTopEngagement.number_of_comments}
            </Stack>

            <Stack direction='row' spacing={2} sx={{marginLeft: '12px'}}>
              <ShareVariantOutline fontSize='medium' sx={{paddingRight: '3px'}}/> { ' : ' + resultTopEngagement.number_of_shares}
            </Stack>
          </Grid>
          <Grid item md={2} xs={12} sx={{ display: 'flex', justifyContent: 'end', pr: 3 }}>
            Link:{' '}
            <a href={resultTopEngagement.link_message} target='_blank' rel='noreferrer'>
              <LinkVariant fontSize='small' sx={{ color: 'blue' }} />
            </a>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Sentiment: </b> {resultTopEngagement.sentiment}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Bully Level: </b> {resultTopEngagement.bully_level}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Bully Type: </b> {resultTopEngagement.bully_type}{' '}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {/* <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button> */}
      </CardActions>
    </Card>
  )
}

export default TopManagementCard
