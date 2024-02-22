import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Grid, LinearProgress, Stack } from '@mui/material'
import { gitHubIcon } from 'src/utils/const'
import { CommentOutline, ShareVariantOutline, ThumbUpOutline } from 'mdi-material-ui'

interface CardInfo {
  comment: any
  loadingTopEngagement: boolean
}

const CommentDetail = (props: CardInfo) => {
  const { comment, loadingTopEngagement } = props
  const imgPath = gitHubIcon
  const [showMore, setShowMore] = React.useState(false)

  return (
    <Card sx={{ mt: 5, mr: 5 }}>
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
              <Box sx={{ minHeight: '70px' }}>
                <Typography gutterBottom variant='body1' component='div' ml={2} sx={{ fontWeight: 600 }}>
                  {comment.account_name}
                </Typography>
                <Typography gutterBottom variant='body1' component='div' ml={2}>
                  {showMore ? (
                    <span>
                      {comment.message_detail}
                      <a
                        style={{ cursor: 'pointer' }}
                        onClick={(event: any) => {
                          setShowMore(!showMore)
                          event.stopPropagation()
                        }}
                        rel='noopener noreferrer'
                      >
                        <Typography variant='caption' sx={{ pl: 2 }}>
                          ...Show less
                        </Typography>
                      </a>
                    </span>
                  ) : (
                    <Stack>
                      <span
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2

                          // maxWidth: '400px'
                        }}
                      >
                        {comment.message_detail}
                      </span>
                      <a
                        onClick={(event: any) => {
                          setShowMore(!showMore)
                          event.stopPropagation()
                        }}
                        rel='noopener noreferrer'
                        style={{ cursor: 'pointer' }}
                      >
                        <Typography variant='caption' sx={{ pl: 2 }}>
                          ... Show More
                        </Typography>
                      </a>
                    </Stack>
                  )}
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item md={4} xs={12} sx={{ display: 'flex' }}>
            <Stack direction='row' spacing={2}>
              <ThumbUpOutline fontSize='medium' sx={{ paddingRight: '3px' }} /> {' : ' + comment.number_of_reactions}
            </Stack>

            <Stack direction='row' spacing={2} sx={{ marginLeft: '12px' }}>
              <CommentOutline fontSize='medium' sx={{ paddingRight: '3px' }} /> {' : ' + comment.number_of_comments}
            </Stack>

            <Stack direction='row' spacing={2} sx={{ marginLeft: '12px' }}>
              <ShareVariantOutline fontSize='medium' sx={{ paddingRight: '3px' }} /> {' : ' + comment.number_of_shares}
            </Stack>
            {/* <span style={{marginTop: 3, marginLeft: 4}}>
              Link:{' '}
              <a href={comment.link_message} target='_blank' rel='noreferrer'>
                <LinkVariant fontSize='small' sx={{ color: 'blue', paddingTop: 1 }} />
              </a>
            </span> */}
          </Grid>
          <Grid item md={8} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <>
              <Typography variant='body1' sx={{ pr: '20px' }}>
                {' '}
                <b>Sentiment: </b> <br /> {comment.sentiment}
              </Typography>
              <Typography variant='body1' sx={{ pr: '20px' }}>
                {' '}
                <b>Bully Level: </b> <br /> {comment.bully_level}
              </Typography>
              <Typography variant='body1' sx={{ pr: '20px' }}>
                {' '}
                <b>Bully Type: </b> <br /> {comment.bully_type}{' '}
              </Typography>
            </>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CommentDetail
