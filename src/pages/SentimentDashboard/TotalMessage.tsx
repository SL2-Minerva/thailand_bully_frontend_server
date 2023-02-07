// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { ThumbUp, ThumbDown, ThumbsUpDown } from 'mdi-material-ui'
import { LinearProgress } from '@mui/material'

interface InfluencerComparisonProps {
  totalMessage?: any
  loadingTotalSentiment?: boolean
}

const TotalMessage = (props: InfluencerComparisonProps) => {
  // ** Props
  const { totalMessage, loadingTotalSentiment } = props

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Card>
            {loadingTotalSentiment && <LinearProgress style={{ width: '100%' }} />}
            <CardContent>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h4'>Total Message</Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>{totalMessage?.totalSentiment?.totalValue}</Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalMessage?.totalSentiment?.comparison ? (
                      <>
                        <Typography variant='h6' mt={4}>
                          {totalMessage?.totalSentiment?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h4'
                          sx={{ color: totalMessage?.totalSentiment?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalMessage?.totalSentiment?.comparison}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h4' mt={2}>
                        {totalMessage?.totalSentiment?.comparison}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            {loadingTotalSentiment && <LinearProgress style={{ width: '100%' }} />}
            <CardContent>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <ThumbUp fontSize='large' />
                <Typography variant='h4' sx={{ marginLeft: '20px' }}>
                  Positive
                </Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>
                  {/* { totalMessage?.totalMessage?.type === 'plus' ? "+" : "-" } */}
                  {totalMessage?.positive?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalMessage?.positive?.comparison ? (
                      <>
                        <Typography variant='h4' mt={4}>
                          {totalMessage?.positive?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h4'
                          sx={{ color: totalMessage?.positive?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalMessage?.positive?.comparison}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h4' mt={2}>
                        {totalMessage?.positive?.comparison}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card>
            {loadingTotalSentiment && <LinearProgress style={{ width: '100%' }} />}
            <CardContent>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <ThumbsUpDown fontSize='large' />
                <Typography variant='h4' sx={{ marginLeft: '20px' }}>
                  Neutral
                </Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>
                  {/* { totalMessage?.totalMessage?.type === 'plus' ? "+" : "-" } */}
                  {totalMessage?.neutral?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalMessage?.neutral?.comparison ? (
                      <>
                        <Typography variant='h4' mt={4}>
                          {totalMessage?.neutral?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h4'
                          sx={{ color: totalMessage?.neutral?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalMessage?.neutral?.comparison}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h4' mt={2}>
                        {totalMessage?.neutral?.comparison}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card>
            {loadingTotalSentiment && <LinearProgress style={{ width: '100%' }} />}
            <CardContent>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <ThumbDown fontSize='large' />
                <Typography variant='h4' sx={{ marginLeft: '20px' }}>
                  Negative
                </Typography>
              </span>
              <Grid mt={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>
                  {/* { totalMessage?.totalMessage?.type === 'plus' ? "+" : "-" } */}
                  {totalMessage?.negative?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalMessage?.negative?.comparison ? (
                      <>
                        <Typography variant='h4' mt={4}>
                          {totalMessage?.negative?.type === 'plus' ? (
                            <ChevronUp fontSize='large' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='large' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h4'
                          sx={{ color: totalMessage?.negative?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalMessage?.negative?.comparison}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h4' mt={2}>
                        {totalMessage?.negative?.comparison}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TotalMessage
