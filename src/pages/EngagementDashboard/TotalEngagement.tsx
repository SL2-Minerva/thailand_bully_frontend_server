// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Share, StickerEmoji, Message } from 'mdi-material-ui'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

interface InfluencerComparisonProps {
  totalEngagement?: any
  highlight: boolean
  loading?: boolean
}

const TotalEngagement = (props: InfluencerComparisonProps) => {
  // ** Props
  const { totalEngagement,  loading } = props

  return (
    <>
      <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }} >
        {loading && <LinearProgress style={{ width: '100%' }} />}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex', justifyContent: 'left' }}>
                <Typography
                  sx={{ color: highlight ? 'green' : '#4c4e64de', fontSize: '1.3vw', fontWeight: 'bold', mt: 1 }}
                >
                  <Translations text='Total Engagement' />
                </Typography>
                <StyledTooltip
                  arrow
                  title={
                    <span>
                      <Typography variant='h6' sx={{ color: 'white' }}>
                        <Translations text='engagementChart16Title' />
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'white' }}>
                        <Translations text='engagementChart16Description' />
                      </Typography>
                    </span>
                  }
                >
                  <Information
                    style={{ margin: '2px 0px 0px 5px', fontSize: '29px' }}
                  />
                </StyledTooltip>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{ mt: 1.5 }}>
                  {totalEngagement?.totalEngagement?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 15 }}>
                    {totalEngagement?.totalEngagement?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.totalEngagement?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.totalEngagement?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalEngagement?.totalEngagement?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalEngagement?.totalEngagement?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex' }}>
                <Share fontSize='large' />
                <Typography sx={{ marginLeft: '20px', fontSize: '1.5vw', fontWeight: 'bold', mt: 1 }}>Share</Typography>
              </span>

              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{ mt: 1.5 }}>
                  {totalEngagement?.share?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 15 }}>
                    {totalEngagement?.share?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.share?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.share?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.share?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.share?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex' }}>
                <Message fontSize='large' />
                <Typography sx={{ marginLeft: '20px', fontSize: '1.5vw', fontWeight: 'bold', mt: 1 }}>
                  Comment
                </Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{ mt: 1.5 }}>
                  {totalEngagement?.comment?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 15 }}>
                    {totalEngagement?.comment?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.comment?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.comment?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.comment?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.comment?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex' }}>
                <StickerEmoji fontSize='large' />
                <Typography sx={{ marginLeft: '20px', fontSize: '1.5vw', fontWeight: 'bold', mt: 1 }}>
                  Reaction
                </Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{ mt: 1.5 }}>
                  {totalEngagement?.reaction?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 15 }}>
                    {totalEngagement?.reaction?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.reaction?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.reaction?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.reaction?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.reaction?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </>
  )
}

export default TotalEngagement
