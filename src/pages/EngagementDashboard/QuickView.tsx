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
  
 
  
const QuickView = ({setHighlight} : {setHighlight?:any}) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [ highlightText, setHightlightText ] = useState<string>('');

  const onClose = (chartId?: string) => {
    if(chartId) {
      setHighlight(chartId);
      setHightlightText(chartId);
    }
    setOpen(false);
  }
  
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
              onClick={() => onClose()}
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
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart1")}}>
                    <Typography sx={{ color : highlightText === 'chart1' ? 'green' : '#4c4e64de'  }}>Chart 1 : Percentage of Engagement Trans</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart2" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart2")}}>
                    <Typography sx={{ color : highlightText === 'chart2' ? 'green' : '#4c4e64de'  }}>Chart 2 : Daily Engagement by Date</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart3" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart3")}}>
                    <Typography sx={{ color : highlightText === 'chart3' ? 'green' : '#4c4e64de'  }}>Chart 3 : Daily Engagement by Day</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart4" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart4")}}>
                    <Typography sx={{ color : highlightText === 'chart4' ? 'green' : '#4c4e64de'  }}>Chart 4 : Daily Engagement  by Time</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart5" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart5")}}>
                    <Typography sx={{ color : highlightText === 'chart5' ? 'green' : '#4c4e64de'  }}>Chart 5 : Daily Engagement  by Devices</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart6" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart6")}}>
                    <Typography sx={{ color : highlightText === 'chart6' ? 'green' : '#4c4e64de'  }}>Chart 6 : Daily Engagement  by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart7" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart7")}}>
                    <Typography sx={{ color : highlightText === 'chart7' ? 'green' : '#4c4e64de'  }}>Chart 7 : Daily Engagement  by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart8" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart8")}}>
                    <Typography sx={{ color : highlightText === 'chart8' ? 'green' : '#4c4e64de'  }}>Chart 8 : Percentage of Engagement Type</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart9" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart9")}}>
                    <Typography sx={{ color : highlightText === 'chart9' ? 'green' : '#4c4e64de'  }}>Chart 9 : Daily Engagement Type by Date</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart10" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart10")}}>
                    <Typography sx={{ color : highlightText === 'chart10' ? 'green' : '#4c4e64de'  }}>Chart 10 : Daily Engagement Type by Day</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart11" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart11")}}>
                    <Typography sx={{ color : highlightText === 'chart11' ? 'green' : '#4c4e64de'  }}>Chart 11 : Daily Engagement Type by Time</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart12" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart12")}}>
                    <Typography sx={{ color : highlightText === 'chart12' ? 'green' : '#4c4e64de'  }}>Chart 12 : Daily Engagement Type by Devices</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart13" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart13")}}>
                    <Typography sx={{ color : highlightText === 'chart13' ? 'green' : '#4c4e64de'  }}>Chart 13 : Daily Engagement Type by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart14" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart14")}}>
                    <Typography sx={{ color : highlightText === 'chart14' ? 'green' : '#4c4e64de'  }}>Chart 14 : Daily Engagement Type by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart15" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart15")}}>
                    <Typography sx={{ color : highlightText === 'chart15' ? 'green' : '#4c4e64de'  }}>Chart 15 : Total Engagement </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart16" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart16")}}>
                    <Typography sx={{ color : highlightText === 'chart16' ? 'green' : '#4c4e64de'  }}>Chart 16 : Engagement by Channel </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart17" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart17")}}>
                    <Typography sx={{ color : highlightText === 'chart17' ? 'green' : '#4c4e64de'  }}>Chart 17 : Engagement by Sentiment</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart18" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart18")}}>
                    <Typography sx={{ color : highlightText === 'chart18' ? 'green' : '#4c4e64de'  }}>Chart 18 : Engagement Type Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart19" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart19")}}>
                    <Typography sx={{ color : highlightText === 'chart19' ? 'green' : '#4c4e64de'  }}>Chart 19 : Engagement Type Proportion</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart20" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart20")}}>
                    <Typography sx={{ color : highlightText === 'chart20' ? 'green' : '#4c4e64de'  }}>Chart 20 : Summary Engagement by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              {/* <Link to="chart21" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart21")}}>
                    <Typography sx={{ color : highlightText === 'chart21' ? 'green' : '#4c4e64de'  }}>Chart 21 : Summary Engagement by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}

            </CustomizerSpacing>
  
            <Divider sx={{ m: 0 }} />
          </PerfectScrollbar>
        </Drawer>
      </div>
    )
  }
  
  export default QuickView