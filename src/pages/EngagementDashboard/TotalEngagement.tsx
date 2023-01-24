
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
import { StyledTooltip } from '../dashboard/overall'
import { Information } from "mdi-material-ui";
import { LinearProgress } from '@mui/material'

interface InfluencerComparisonProps {
    totalEngagement?: any,
    highlight: boolean,
    loading?: boolean 
  }

const TotalEngagement = (props: InfluencerComparisonProps) => {
    // ** Props
    const { totalEngagement, highlight, loading } = props


  return (
    <>
        
        <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
            <Card>
                {loading && (
                <LinearProgress
                    style={{ width: "100%" }}
                />
                )}
                <CardContent>
                    <span style={{ display: 'flex', justifyContent: 'left' }}>
                        <Typography variant='h5' sx={{ color : highlight ? 'green' : '#4c4e64de' }}>
                            Total Engagement
                        </Typography>
                        <StyledTooltip arrow title="Chart 16, Report Level 2 (4.2.020)">
                            <Information style={{margin: '2px 0px 0px 5px', fontSize: '29px', color : highlight ? 'green' : '#4c4e64de'}} />
                        </StyledTooltip>
                    </span>
                    <Grid  mt={10} sx={{ display:'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h3' >
                                {/* { totalEngagement?.totalEngagement?.type === 'plus' ? "+" : "-" } */}
                                {totalEngagement?.totalEngagement?.totalValue}
                        </Typography>
                                
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h4' mt={4}>
                                    {
                                        totalEngagement?.totalEngagement?.type === 'plus' ?
                                        <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                        :
                                        <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                    }
                                </Typography>

                                <Typography variant='h4' sx={{ color: totalEngagement?.totalEngagement?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                    {totalEngagement?.totalEngagement?.comparison}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </CardContent>
            </Card>
            </Grid>
        <Grid item xs={6} md={3}>
            <Card>
            {loading && (
                <LinearProgress
                    style={{ width: "100%" }}
                />
                )}
                <CardContent>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    <Share fontSize='large'/>
                    <Typography variant='h5' sx={{ marginLeft: '20px' }}>Share</Typography>
                </span>
                
                <Grid  mt={10} sx={{ display:'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h3' >
                        {totalEngagement?.share?.totalValue}
                    </Typography>
                            
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h4' mt={4}>
                                {
                                    totalEngagement?.share?.type === 'plus' ?
                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                    :
                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                }
                            </Typography>

                            <Typography variant='h4' sx={{ color: totalEngagement?.share?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                {totalEngagement?.share?.comparison}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>    
                </CardContent>
            </Card>   
        </Grid>

        <Grid item xs={6} md={3}>
             <Card>
             {loading && (
                <LinearProgress
                    style={{ width: "100%" }}
                />
                )}
                <CardContent>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    <Message fontSize='large'/>
                    <Typography variant='h5' sx={{ marginLeft: '20px' }}>Comment</Typography>
                </span>
                <Grid  mt={10} sx={{ display:'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h3' >
                        {totalEngagement?.comment?.totalValue}
                    </Typography>
                            
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h4' mt={4}>
                                {
                                    totalEngagement?.comment?.type === 'plus' ?
                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                    :
                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                }
                            </Typography>

                            <Typography variant='h4' sx={{ color: totalEngagement?.comment?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                {totalEngagement?.comment?.comparison}
                            </Typography>
                        </Box>
                    </Box>
                </Grid> 
                </CardContent>
            </Card>
        </Grid>

        <Grid item xs={6} md={3}>
            <Card>
            {loading && (
                <LinearProgress
                    style={{ width: "100%" }}
                />
                )}
                <CardContent>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    <StickerEmoji fontSize='large'/>
                    <Typography variant='h5' sx={{ marginLeft: '20px' }}>Reaction</Typography>
                </span>
                <Grid  mt={10} sx={{ display:'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h3' >
                        {totalEngagement?.reaction?.totalValue}
                    </Typography>
                            
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h4' mt={4}>
                                {
                                    totalEngagement?.reaction?.type === 'plus' ?
                                    <ChevronUp fontSize='large' sx={{ color: 'success.main'}} />
                                    :
                                    <ChevronDown fontSize='large' sx={{ color: 'error.main'}} />
                                }
                            </Typography>

                            <Typography variant='h4' sx={{ color: totalEngagement?.reaction?.type === 'plus' ? 'success.main' : 'error.main' }}>
                                {totalEngagement?.reaction?.comparison}
                            </Typography>
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

export default TotalEngagement

