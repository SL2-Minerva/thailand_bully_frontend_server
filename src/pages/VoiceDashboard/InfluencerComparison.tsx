// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

interface InfluencerComparisonProps {
    icon: ReactNode
    color?: ThemeColor
    trendNumber: string
    trend?: string
    totalText: string,
    totalValue : number
    chartId: string
    highlight: boolean
  }

const InfluencerComparison = (props: InfluencerComparisonProps) => {
  // ** Props
  const { color, icon, trend, trendNumber, totalText, totalValue, chartId, highlight } = props

  const TrendIcon = trend === 'plus' ? ChevronUp : ChevronDown

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={3}>
                    <CustomAvatar skin='light' variant='rounded' color={color} sx={{ mt: 5 }}>
                        {icon}
                    </CustomAvatar>
                </Grid>
                <Grid item xs={5} p={4}>
                    <Typography variant='h4'>
                        {trend === 'plus' ? "+" : "-"}{totalValue}
                    </Typography>
                    <Typography variant='h6' sx={{ m: 3 }} >
                        <b>{totalText}</b>
                    </Typography>
                </Grid>
                <Grid item xs={4} p={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}>
                                {trendNumber + "%"}
                            </Typography>
                            <TrendIcon fontSize='large' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>

        <Divider sx={{ mt: 2, mb: 7.5 }} />
         
         <span style={{ display: 'flex', justifyContent: 'flex-start',color: highlight ? 'green' : '#4c4e64de' }}>
             Period over Period comparison
              <StyledTooltip arrow title={chartId}>
                  <Information style={{marginLeft: '10px', fontSize: '29px'}} />
              </StyledTooltip>
          </span>
      </CardContent>
    </Card>
  )
}

export default InfluencerComparison

InfluencerComparison.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
