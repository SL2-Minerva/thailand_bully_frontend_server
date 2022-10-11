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

interface KeyStatusProps {
    title: string
    stats: string
    icon: ReactNode
    chipText: string
    color?: ThemeColor
    trendNumber: string
    trend?: 'positive' | 'negative'
    totalText: string,
    totalValue : string,
    averageText: string,
    averageValue: string
  }

// Styled Grid component
// const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
//     [theme.breakpoints.down('sm')]: {
//       borderBottom: `1px solid ${theme.palette.divider}`
//     },
//     [theme.breakpoints.up('sm')]: {
//       borderRight: `1px solid ${theme.palette.divider}`
//     }
//   }))

const KeyStatusReport = (props: KeyStatusProps) => {
  // ** Props
  const { title, color, icon, stats, trend, trendNumber, totalText, totalValue, averageText, averageValue } = props

  const TrendIcon = trend === 'positive' ? ChevronUp : ChevronDown

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={2}>
                    <CustomAvatar skin='light' variant='rounded' color={color} sx={{ mt: 5 }}>
                        {icon}
                    </CustomAvatar>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='body2' sx={{ mt: 7 }}>
                        <h4> {totalText} </h4>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body2' sx={{ mb: 5 }}>
                        <h1> <b>{totalValue}</b> </h1>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={6} sx={{ marginTop: '-17%' }}>
                <Grid item xs={8}>
                    <Typography variant='body2' sx={{ mt: 7 }}>
                        <h3> {averageText} </h3>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body2' sx={{ mb: 5 }}>
                        <h1> <b> {averageValue} </b> </h1>
                    </Typography>
                </Grid>
            </Grid>
        </Box>

        <Divider sx={{ mt: 2, mb: 7.5 }} />

        <Typography variant='body2' sx={{ mb: 5 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Typography variant='h4' sx={{ mb: 1 }}>
                {stats}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }}>
                    {trendNumber}
                </Typography>
                <TrendIcon fontSize='large' sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }} />
            </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default KeyStatusReport

KeyStatusReport.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
