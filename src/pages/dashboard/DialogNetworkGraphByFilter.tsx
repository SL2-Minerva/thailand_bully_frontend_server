import React, { forwardRef, ReactElement, Ref, useState } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography, Grid, LinearProgress } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import Graph from 'react-graph-vis'
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css'
import { GetNetworkGraph } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

// import FormLabel from '@mui/material/FormLabel'
// import { CampaignList } from 'src/services/api/campaign/CampaignAPI';

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  showDialog: boolean
  setShowDialog: any
  currentData?: any
  params?: any
  keywordId?: number | string
  messageId?: number | string
  setKeywordId?: any
  setMessageId?: any
  reportNo?: string
  title?: string
}

const initialGraph = {
  nodes: [],
  edges: []
}

const DialogNetworkGraphByFitler = (props: DialogInfoProps) => {
  const { showDialog, setShowDialog, params, keywordId, messageId, setMessageId, reportNo, title } = props
  const [selectedValue, setSelectedValue] = useState('bySentiment')
  const { resultNetworkGraph, resultBullyLevelNetwork, resultBullyTypeNetwork, resultSentimentNetwork, loadingNetworkGraph } = GetNetworkGraph(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    keywordId,
    messageId,
    reportNo
  )

  // const [ graph, setGraph ] = useState(initialGraph);

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000',
      dashes: false
    },
    height: '500px'
  }

  const onClose = () => {
    setShowDialog(false)
    setMessageId('')
  }

  const cardTitle = title ? title : 'Social Network Analysis'
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  // useEffect(() => {
  //   if (resultNetworkGraph) {
  //     console.log("get data from api", resultNetworkGraph);
  //     setGraph(resultNetworkGraph);
  //   }
  // },[resultNetworkGraph]);

  return (
    <Card>
      <Dialog
        fullWidth
        open={showDialog}
        maxWidth='md'
        scroll='body'
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>

          {loadingNetworkGraph && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={cardTitle} />
            </Typography>
          </Box>

          <Grid container spacing={1}>
            <FormControl sx={{mt:3 , ml: 5}}>
              {/* <FormLabel id='demo-row-radio-buttons-group-label'>Filter</FormLabel> */}
              <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                <FormControlLabel
                  value='bySentiment'
                  control={<Radio value='bySentiment' checked={selectedValue === 'bySentiment'} onChange={handleChange} />}
                  label='By Sentiment'
                />
                <FormControlLabel
                  value='byBullyLevel'
                  control={<Radio value='byBullyLevel' checked={selectedValue === 'byBullyLevel'} onChange={handleChange} />}
                  label='By Bully Level'
                />
                <FormControlLabel
                  value='byBullyType'
                  control={<Radio value='byBullyType' checked={selectedValue === 'byBullyType'} onChange={handleChange} />}
                  label='By Bully Type'
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}> 
            {
               selectedValue === 'bySentiment' ? 
               <Graph graph={resultSentimentNetwork ? resultSentimentNetwork : initialGraph} options={options} />
               : selectedValue === 'byBullyLevel' ? 
               <Graph graph={resultBullyLevelNetwork ? resultBullyLevelNetwork : initialGraph} options={options} />
               : selectedValue === 'byBullyType' ?
               <Graph graph={resultBullyTypeNetwork ? resultBullyTypeNetwork : initialGraph} options={options} />
               :
               <Graph graph={resultNetworkGraph ? resultNetworkGraph : initialGraph} options={options} />

            }
              
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogNetworkGraphByFitler
