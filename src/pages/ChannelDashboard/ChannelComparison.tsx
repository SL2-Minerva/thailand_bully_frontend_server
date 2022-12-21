// ** React Imports
import { ReactNode } from 'react'

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
import { Avatar, Chip } from '@mui/material'
import { FacebookIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const'

interface InfluencerComparisonProps {
    icon?: ReactNode
    color?: string
    trendNumber: string
    trend?: string
    totalText: string,
    totalValue : number
  }

const ChannelComparison = (props: InfluencerComparisonProps) => {
    // ** Props
    const { color, trend, trendNumber, totalText, totalValue } = props

    const TrendIcon = trend === 'plus' ? ChevronUp : ChevronDown
    const imgPath = totalText === "Facebook" ? FacebookIcon : totalText === "Twitter" ? TwitterIcon :
                    totalText === "Instagram" ? InstagramIcon : totalText === "Youtube" ? YoutubeIcon :
                    totalText === "Pantip" ? PantipIcon : FacebookIcon;

  return (
    <>
        <Card>
            <CardContent>
                <Box>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar sx={{ width: 60, height: 60 }}>
                                    <img src={imgPath} width={50} height={50}  />
                                </Avatar>
                                <Chip label={totalText} sx={{ ml:2, mt:'0.8rem', display:'flex', justifyContent: 'center', 
                                        backgroundColor: color, color: 'white', fontSize: '24px'}} />
                                {/* <Typography variant='h4'>
                                    
                                </Typography> */}
                            </span>
                            <Typography variant='body2' mt={4}>
                                <Typography variant='h3' sx={{ display:'flex', justifyContent: 'center' }}>
                                    {trend === 'plus' ? "+" : "-"}{totalValue}
                                </Typography>
                            </Typography>
                            <Typography variant='body2' mt={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TrendIcon fontSize='large' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }} />

                                        <Typography variant='h4' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}>
                                            {trendNumber + "%"}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
            </CardContent>
        </Card>
    </>
  )
}

export default ChannelComparison

ChannelComparison.defaultProps = {
  color: 'primary',
  trend: 'plus'
}
