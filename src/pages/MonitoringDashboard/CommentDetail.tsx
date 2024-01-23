import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Grid, LinearProgress } from '@mui/material'
import { gitHubIcon } from 'src/utils/const'
import { CommentOutline, ShareVariantOutline, ThumbUpOutline } from 'mdi-material-ui'

interface CardInfo {
  comment: any
  loadingTopEngagement: boolean
}

const CommentDetail = (props: CardInfo) => {
  const { comment, loadingTopEngagement } = props
  const imgPath = gitHubIcon

  return (
    <Card sx={{ mt: 2 }}>
      {loadingTopEngagement && <LinearProgress style={{ width: '100%' }} />}

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={2.5}>
            <Avatar sx={{ width: 50, height: 50 }}>
              <img src={imgPath} width={50} height={50} alt='' />
            </Avatar>
          </Grid>

          <Grid item xs={8.5}>
            <div style={{ display: 'flex' }}>
              <Box sx={{ minHeight: '70px', maxHeight: '70px' }}>
                <span
                  style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    
                    // maxWidth: '400px'
                  }}
                >
                  <Typography gutterBottom variant='body1' component='div' ml={2}>
                    {comment.account_name} - {comment.message_detail}
                  </Typography>
                </span>
              </Box>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item md={6} xs={12} sx={{ display: 'flex' }}>
            <ThumbUpOutline fontSize='small' sx={{ m: 2 }} />
            <CommentOutline fontSize='small' sx={{ m: 2 }} />
            <ShareVariantOutline fontSize='small' sx={{ m: 2 }} />
            {/* <span style={{marginTop: 3, marginLeft: 4}}>
              Link:{' '}
              <a href={comment.link_message} target='_blank' rel='noreferrer'>
                <LinkVariant fontSize='small' sx={{ color: 'blue', paddingTop: 1 }} />
              </a>
            </span> */}
          </Grid>
          <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <>
              <Typography variant='body1' sx={{ mr: 2 }}>
                {' '}
                <b>Sentiment: </b> {comment.sentiment}
                {', '}
              </Typography>
              <Typography variant='body1' sx={{ mr: 2 }}>
                {' '}
                <b>Bully Level: </b> {comment.bully_level}
                {', '}
              </Typography>
              <Typography variant='body1'>
                {' '}
                <b>Bully Type: </b> {comment.bully_type}{' '}
              </Typography>
            </>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CommentDetail
