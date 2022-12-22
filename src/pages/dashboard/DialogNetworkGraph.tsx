import {forwardRef, ReactElement, Ref, useEffect, useState} from "react";
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, 
    Typography,  Grid } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import Graph from 'react-graph-vis';
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css';
import { CampaignList } from 'src/services/api/campaign/CampaignAPI';
import { GetNetworkGraph } from 'src/services/api/networkGraph/networkGraphAPI';


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
}

const DialogNetworkGraph = (props: DialogInfoProps) => {
    const { showDialog, setShowDialog, currentData } = props
    const { resultCampaiganList } = CampaignList();
    const { resultNetworkGraph } = GetNetworkGraph("1");
  
    const initialGraph = {
      "nodes": [],
      "edges": []
    };
    const [ graph, setGraph ] = useState(initialGraph);
  
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000",
        dashes: false
      },
      height: "500px"
    };
  
    useEffect(() => {
      if (resultNetworkGraph) {
        setGraph(resultNetworkGraph);
      }
    },[resultCampaiganList, resultNetworkGraph, currentData]);

    return (
      <Card>
        <Dialog
          fullWidth
          open={showDialog}
          maxWidth='md'
          scroll='body'
          onClose={() => setShowDialog(false)}
          TransitionComponent={Transition}
        > 
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShowDialog(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                  Social Network Analysis
              </Typography>
            </Box>

            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Graph
                  graph={graph}
                  options={options}
                />
            </Grid>
      </Grid>
          </DialogContent>
        </Dialog>
        
      </Card>
    );
}

export default DialogNetworkGraph
