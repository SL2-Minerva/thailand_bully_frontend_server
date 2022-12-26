// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Link} from 'react-scroll'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ViewGridOutline } from 'mdi-material-ui'

export const Toggler = styled(Box)<BoxProps>(({ theme }) => ({
    right: 0,
    top: '50%',
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    padding: theme.spacing(2.5),
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius
  }))
  
export const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
    width: 400,
    zIndex: theme.zIndex.modal,
    '& .MuiFormControlLabel-root': {
      marginRight: '0.6875rem'
    },
    '& .MuiDrawer-paper': {
      border: 0,
      width: 400,
      zIndex: theme.zIndex.modal,
      boxShadow: theme.shadows[9]
    }
  }))
  
export const CustomizerSpacing = styled('div')(({ theme }) => ({
    padding: theme.spacing(5, 6)
  }))
  
 
  
const QuickView = () => {
    // ** State
    const [open, setOpen] = useState<boolean>(false)
  
    return (
      <div className='customizer'>
        <Toggler className='customizer-toggler' onClick={() => setOpen(true)}>
            <ViewGridOutline fontSize='large' sx={{ color: 'common.white' }}/>
        </Toggler>
        <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
          <Box
            className='customizer-header'
            sx={{
              position: 'relative',
              p: theme => theme.spacing(3.5, 5),
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              Quick View
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                right: 20,
                top: '50%',
                position: 'absolute',
                color: 'text.secondary',
                transform: 'translateY(-50%)'
              }}
            >
              <Close fontSize='small' />
            </IconButton>
          </Box>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <CustomizerSpacing className='customizer-body'>
              <Typography
                component='p'
                variant='caption'
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Charts
              </Typography>
  
              <Link to="chart1" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 1 : Percentage of Engagement Trans</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart2" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 2 : Daily Engagement</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart3" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 3 : Engagement by Day</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart4" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 4 : Engagement  by Time</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart5" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 5 : Engagement  by Devices</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart6" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 6 : Engagement  by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart7" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 7 : Engagement  by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart8" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 8 : Percentage of Engagement Type(Period over Period)</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart9" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 9 : Daily Engagement(Period over Period)</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart10" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 10 : Engagement by Day</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart11" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 11 : Engagement by Time</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart12" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 12 : Engagement by Devices</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart13" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 13 : Engagement by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart14" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 14 : Engagement by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart15" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 15 : Total Engagement </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart16" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 16 : Engagement by Channel </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart17" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 17 : Engagement by Sentiment</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart18" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 18 : Engagement Type Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart19" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 19 : Engagement Type Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart20" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {setOpen(false)}}>
                    <Typography>Chart 20 : Summary Engagement by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

            </CustomizerSpacing>
  
            <Divider sx={{ m: 0 }} />
          </PerfectScrollbar>
        </Drawer>
      </div>
    )
  }
  
  export default QuickView