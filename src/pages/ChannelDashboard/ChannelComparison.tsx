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
import { Avatar, Chip, LinearProgress } from '@mui/material'
import { FacebookIcon, googleIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const'

interface InfluencerComparisonProps {
  icon?: ReactNode
  color?: string
  trendNumber: number
  trend?: string
  totalText: string
  totalValue: number
  loading?: boolean
}

const ChannelComparison = (props: InfluencerComparisonProps) => {
  // ** Props
  const { color, trend, trendNumber, totalText, totalValue, loading } = props

  const TrendIcon = trend === 'plus' ? ChevronUp : ChevronDown
  const imgPath =
    totalText === 'Facebook'
      ? FacebookIcon
      : totalText === 'Twitter'
      ? TwitterIcon
      : totalText === 'Instagram'
      ? InstagramIcon
      : totalText === 'Youtube'
      ? YoutubeIcon
      : totalText === 'Pantip'
      ? PantipIcon
      : totalText === 'Google'
      ? googleIcon
      : FacebookIcon

  const percentageValue = trendNumber ? trendNumber + '%' : '';

  return (
    <>
      <Card>
        {loading && <LinearProgress style={{ width: '100%' }} />}
        <CardContent>
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <img src={imgPath} width={30} height={30} alt=""/>
                  </Avatar>
                  <Chip
                    label={totalText}
                    sx={{
                      ml: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: color,
                      color: 'white',
                      fontSize: '12px'
                    }}
                  />
                  {/* <Typography variant='h4'>
                                    
                                </Typography> */}
                </span>
                <Grid mt={4}>
                  {totalValue != 0 ? (
                    <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
                      {trend === 'plus' ? '+' : ''}
                      {totalValue}
                    </Typography>
                  ) : (
                    <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
                      {totalValue}
                    </Typography>
                  )}
                </Grid>
                <Grid mt={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {
                            trendNumber !=  0 ?
                            <>
                                <TrendIcon fontSize='large' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }} />

                                <Typography variant='h6' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}>
                                    {percentageValue}
                                </Typography>
                            </>

                            :
                            <Typography variant='h6'>
                                {0 + '%'}
                            </Typography>

                        }
                      
                    </Box>
                  </Box>
                </Grid>
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
