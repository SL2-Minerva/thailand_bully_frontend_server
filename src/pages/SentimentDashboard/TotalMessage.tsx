
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

interface InfluencerComparisonProps {
    totalMessage?: any
  }

const TotalMessage = (props: InfluencerComparisonProps) => {
    // ** Props
    const { totalMessage } = props


  return (
    <>
        <Card>
            <CardContent>
                <Box>
                    <Grid container spacing={7}>
                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='h4'>Total Message</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'space-between' }}>
                                    
                                        {/* { totalMessage?.totalMessage?.type === 'plus' ? "+" : "-" } */}
                                        {totalMessage?.totalSentiment?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalMessage?.totalSentiment?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }

                                                <Typography variant='h4' sx={{ color: totalMessage?.totalSentiment?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalMessage?.totalSentiment?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                            
                    </Grid>
                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <ThumbUp fontSize='large'/>
                                <Typography variant='h4' sx={{ marginLeft: '20px' }}>Positive</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                    
                                       {totalMessage?.positive?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalMessage?.positive?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h4' sx={{ color: totalMessage?.positive?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalMessage?.positive?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <ThumbsUpDown fontSize='large'/>
                                <Typography variant='h4' sx={{ marginLeft: '20px' }}>Neutral</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                        {totalMessage?.neutral?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalMessage?.neutral?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h4' sx={{ color: totalMessage?.neutral?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalMessage?.neutral?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <ThumbDown fontSize='large'/>
                                <Typography variant='h4' sx={{ marginLeft: '20px' }}>Negative</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                        {totalMessage?.negative?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalMessage?.negative?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h4' sx={{ color: totalMessage?.negative?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalMessage?.negative?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                    </Grid>

                    </Grid>
                </Box>
            </CardContent>
        </Card>
    </>
  )
}

export default TotalMessage

