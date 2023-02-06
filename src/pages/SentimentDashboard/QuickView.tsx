// ** React Imports
import { useState } from 'react'

// ** Third Party Components
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import {Link} from 'react-scroll'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ArrowLeftDropCircle, ArrowRightDropCircle } from 'mdi-material-ui'
import { Toggler, TogglerOpen } from '../VoiceDashboard/QuickView'
import Translations from 'src/layouts/components/Translations'
  
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
  
 
  
const QuickView = ({setHighlight, setShowQuickView} : {setHighlight?:any, setShowQuickView?:any}) => {
  // ** State
  const [ highlightText, setHightlightText ] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false)

  const onClose = (chartId?: string) => {
    if(chartId) {
      setHighlight(chartId);
      setHightlightText(chartId);
      setShowQuickView(true);
    }
    setOpen(false);
  }
  
    return (
      <div className='customizer'>
        <Toggler className='customizer-toggler' onClick={() => setOpen(true)}>
          <ArrowLeftDropCircle fontSize='large' sx={{ color: 'common.white', mb : 3 , ml: 6}}/>
            <p style={{  transform: 'rotate(90deg)',color : 'white'  }}>QuickView</p>
        </Toggler>
        <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
        <TogglerOpen className='customizer-toggler' onClick={() => setOpen(false)}>
          <ArrowRightDropCircle fontSize='large' sx={{ color: 'common.white', mb : 3 , ml: 6}}/>
            
            <p style={{  transform: 'rotate(90deg)',color : 'white'  }}>QuickView</p>
        </TogglerOpen>
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
          
            <CustomizerSpacing className='customizer-body'>
              <Typography
                component='p'
                variant='caption'
                sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Charts
              </Typography>
  
              {/* <Link to="chart1" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart1")}}>
                    <Typography sx={{ color : highlightText === 'chart1' ? 'green' : '#4c4e64de'  }}>Chart 1 : Percentage of Sentiment</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart2")}}>
                    <Typography sx={{ color : highlightText === 'chart2' ? 'green' : '#4c4e64de'  }}>Chart 2 : <Translations text='Daily Sentiment Type by Date'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart3")}}>
                    <Typography sx={{ color : highlightText === 'chart3' ? 'green' : '#4c4e64de'  }}>Chart 3 : <Translations text='Daily Sentiment Type By Day'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart4")}}>
                    <Typography sx={{ color : highlightText === 'chart4' ? 'green' : '#4c4e64de'  }}>Chart 4 : <Translations text='Daily Sentiment Type By Time'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart5")}}>
                    <Typography sx={{ color : highlightText === 'chart5' ? 'green' : '#4c4e64de'  }}>Chart 5 : <Translations text='Daily Sentiment Type By Device'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart6")}}>
                    <Typography sx={{ color : highlightText === 'chart6' ? 'green' : '#4c4e64de'  }}>Chart 6 : <Translations text='Daily Sentiment Type By Account'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart7")}}>
                    <Typography sx={{ color : highlightText === 'chart7' ? 'green' : '#4c4e64de'  }}>Chart 7 : <Translations text='Daily Sentiment Type By Channel'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart8")}}>
                    <Typography sx={{ color : highlightText === 'chart8' ? 'green' : '#4c4e64de'  }}>Chart 8 : <Translations text='Daily Sentiment Type By Bully Level'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart9")}}>
                    <Typography sx={{ color : highlightText === 'chart9' ? 'green' : '#4c4e64de'  }}>Chart 9 : <Translations text='Daily Sentiment Type By Bully Type'/></Typography>
                </Box>
              <Divider sx={{ m: 0 }} />

              {/* <Link to="chart10" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart10")}}>
                    <Typography sx={{ color : highlightText === 'chart10' ? 'green' : '#4c4e64de'  }}>Chart 10 : Total Messages by Engagement Type</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart11" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart11")}}>
                    <Typography sx={{ color : highlightText === 'chart11' ? 'green' : '#4c4e64de'  }}>Chart 11 : Sentiment Comparison by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart12" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart12")}}>
                    <Typography sx={{ color : highlightText === 'chart12' ? 'green' : '#4c4e64de'  }}>Chart 12 : Sentiment Comparison by Engagement Type</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart13" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart13")}}>
                    <Typography sx={{ color : highlightText === 'chart13' ? 'green' : '#4c4e64de'  }}>Chart 13 : Sentiment Score</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart14" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart14")}}>
                    <Typography sx={{ color : highlightText === 'chart14' ? 'green' : '#4c4e64de'  }}>Chart 14 : Sentiment Type Comparison: Period over Period</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart15" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart15")}}>
                    <Typography sx={{ color : highlightText === 'chart15' ? 'green' : '#4c4e64de'  }}>Chart 15 : Summary Sentiment Score by Account</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart16" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart16")}}>
                    <Typography sx={{ color : highlightText === 'chart16' ? 'green' : '#4c4e64de'  }}>Chart 16 : Summary Sentiment Score by Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart17" spy={true} smooth={true}>
                <Box sx={{ mb: 4 }} onClick={() => {onClose("chart17")}}>
                    <Typography sx={{ color : highlightText === 'chart17' ? 'green' : '#4c4e64de'  }}>Chart 17 : Sentiment Type by Keyword</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}

            </CustomizerSpacing>
        </Drawer>
      </div>
    )
  }
  
  export default QuickView