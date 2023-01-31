import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css';
import { CampaignList } from 'src/services/api/campaign/CampaignAPI';
import { GetNetworkGraph } from 'src/services/api/networkGraph/networkGraphAPI';


const NetworkGraph = () => {

  const [ campaign, setCampaign ] = useState<string>("1");
  const { resultCampaiganList } = CampaignList();
  const { resultNetworkGraph, loadingNetworkGraph } = GetNetworkGraph(campaign);

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
    height: "700px"
  };
  
  // const events = {
  //   select: function(event : any) {

  //     const { nodes, edges } = event;
  //   }
  // };

  const handleSelectList = useCallback((e: SelectChangeEvent) => {
    setCampaign(e.target.value)
  }, [])

  useEffect(() => {
    if (resultNetworkGraph) {
      setGraph(resultNetworkGraph);

      // const edges :any = [];
      // for(let i = 0; i< resultNetworkGraph?.edges?.length; i++) {
      //   edges.push({
      //     color: resultNetworkGraph?.edges[i].color,
      //     from:resultNetworkGraph?.edges[i].from,
      //     length: resultNetworkGraph?.edges[i].length, 
      //     to:resultNetworkGraph?.edges[i].to,
      //     width: 5
      //   })
      // }

      // const data = {
      //   edges: edges,
      //   nodes: resultNetworkGraph.nodes
      // }
      // setGraph(data);

      // const values = resultNetworkGraph?.nodes;
      // const lookup = values.reduce((a :any, e :any) => {
      //   a[e.id] = ++a[e.id] || 0;

      //   return a;
      // }, {});
      
      // console.log("filter duplicate ids", values.filter((e:any) => lookup[e.id]));
    }
  },[resultCampaiganList, resultNetworkGraph]);

  return (
    <>
      <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                {loadingNetworkGraph && (
                    <LinearProgress
                      style={{ width: "100%" }}
                    />
                  )}
                    <CardHeader title='Network' />
                    <CardContent>

                    <Grid container spacing={6} mt={2}>
                        
                        <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id='plan-select'>Select Campaign</InputLabel>
                            <Select
                                fullWidth
                                value={campaign}
                                id='select-campaign'
                                label='Select campaign'
                                labelId='campaign-select'
                                onChange={(e) => {handleSelectList(e)}}
                                inputProps={{ placeholder: 'Select Campaign' }}
                            >
                                {
                                  resultCampaiganList && resultCampaiganList.map((item: any, index: number) => {
                                    return (
                                    <MenuItem key={index} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                    )
                                })
                                }
                            </Select>
                            </FormControl>
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Graph
                  key={Math.random()}
                  graph={graph}
                  options={options}
                />
              </Card>
            </Grid>
      </Grid>

    </>
   
  );
}

export default NetworkGraph


