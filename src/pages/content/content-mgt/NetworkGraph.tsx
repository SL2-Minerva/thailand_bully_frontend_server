import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css';
import { CampaignList } from 'src/services/api/campaign/CampaignAPI';
import { GetNetworkGraph } from 'src/services/api/networkGraph/networkGraphAPI';


const NetworkGraph = () => {

  const [ campaign, setCampaign ] = useState<string>("1");
  const { resultCampaiganList } = CampaignList();
  const { resultNetworkGraph } = GetNetworkGraph(campaign);

  const initialGraph = {
    "nodes": [
      {
        "id": 1,
        "label": "Word 1",
        "title": "Word 1 change color,shape & size",
        "color": "#f7f0c8",
        "shape": "dot",
        "size": 40
      },
      {
        "id": 2,
        "label": "Word 2",
        "title": "Word 2 tootip text",
        "shape": "dot",
        "size": 50
      },
      {
        "id": 3,
        "label": "Word 3",
        "title": "Word 3 tootip text",
        "shape": "dot",
        "size": 40,
        "color": "#F7CACA"
      },
      {
        "id": 4,
        "label": "Word 4",
        "title": "Word 4 tootip text",
        "shape": "dot"
      },
      {
        "id": 5,
        "label": "Word 5",
        "title": "Word 5 tootip text",
        "shape": "dot"
      }
    ],
    "edges": [
      {
        "from": 1,
        "to": 2,
        "length": 200,
        "color": "red"
      },
      {
        "from": 1,
        "to": 3,
        "length": 250,
        "color": "blue"
      },
      {
        "from": 2,
        "to": 4,
        "length": 150,
        "color": "brown"
      },
      {
        "from": 2,
        "to": 5
      },
      {
        "from": 6,
        "to": 3
      }
    ]
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
      setGraph(resultNetworkGraph)
    }
  },[resultCampaiganList, resultNetworkGraph]);
  
  return (
    <>
      <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
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


