import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, LinearProgress } from '@mui/material'

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
}

const TopManagementCard = (props: CardInfo) => {
  const { resultTopEngagement, loadingTopEngagement } = props

  return (
    <Card sx={{ height: '335px' }}>
      {loadingTopEngagement && <LinearProgress style={{ width: '100%' }} />}
      {/* <CardMedia sx={{ height: 140 }} image={'images/NoImage.png'} title='No Image' /> */}

      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {resultTopEngagement.account_name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
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
        </Typography>

        <Box sx={{ maxWidth: '400px' }}>
          {/* <ReactTinyLink
            cardSize='small'
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={resultTopEngagement.link_message || ''}
          /> */}
        </Box>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default TopManagementCard
