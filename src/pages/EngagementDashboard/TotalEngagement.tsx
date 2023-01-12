
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
import { Share, StickerEmoji, Message } from 'mdi-material-ui'

interface InfluencerComparisonProps {
    totalEngagement?: any
  }

const TotalEngagement = (props: InfluencerComparisonProps) => {
    // ** Props
    const { totalEngagement } = props


  return (
    <>
        <Card>
            <CardContent>
                <Box>
                    <Grid container spacing={7}>
                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'left' }}>
                                <Typography variant='h5'>Total Engagement</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'space-between' }}>
                                    
                                        {/* { totalEngagement?.totalEngagement?.type === 'plus' ? "+" : "-" } */}
                                        {totalEngagement?.totalEngagement?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalEngagement?.totalEngagement?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }

                                                <Typography variant='h5' sx={{ color: totalEngagement?.totalEngagement?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalEngagement?.totalEngagement?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                            
                    </Grid>
                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <Share fontSize='large'/>
                                <Typography variant='h5' sx={{ marginLeft: '20px' }}>Share</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                    
                                       {totalEngagement?.share?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalEngagement?.share?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h5' sx={{ color: totalEngagement?.share?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalEngagement?.share?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <Message fontSize='large'/>
                                <Typography variant='h5' sx={{ marginLeft: '20px' }}>Comment</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                        {totalEngagement?.comment?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalEngagement?.comment?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h5' sx={{ color: totalEngagement?.comment?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalEngagement?.comment?.comparison}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                    </Typography>
                                   
                                </Typography>
                            </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <StickerEmoji fontSize='large'/>
                                <Typography variant='h5' sx={{ marginLeft: '20px' }}>Reaction</Typography>
                            </span>
                            <Typography variant='body2' mt={10}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                        {totalEngagement?.reaction?.totalValue}
                                        <Typography variant='body2' mt={4}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {
                                                    totalEngagement?.reaction?.type === 'plus' ?
                                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                                    :
                                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                                }
                                                <Typography variant='h5' sx={{ color: totalEngagement?.reaction?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                                    {totalEngagement?.reaction?.comparison}
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

export default TotalEngagement

