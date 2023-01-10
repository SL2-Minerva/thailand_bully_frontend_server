import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'

// ** Custom Components Imports
import { GraphicColors } from 'src/utils/const' 
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { InteractionItem } from 'chart.js'
import moment from 'moment'
import { GetDailyChannel } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import MessageDetail from './MessageDetail'

interface Props {
  type: string
  chartId : string
  params: any
}
export const getSeries = (seriesData: any) => {
  if(!seriesData) return [];

  const series : any[] = [];
  if (seriesData && seriesData?.length>0) {
    for(let i= 0 ; i<seriesData?.length; i++) {
      series.push({
        name: seriesData[i].name,
        data: seriesData[i].data
      })
    }
  }

  return series;
}

export const chartLabel = (data:any) => {
  if(!data) return [];
  
  let labels : any[] = [];

  // let labelsArrayLength; 
  const labelValue : string[] = []

  for(let i = 0 ; i<data?.length; i++) {
    const label = data[i]?.value;

    // if(data?.length-1 !== i) {
    //     if(label?.length > data[i+1].length) {
    //         labelsArrayLength= i
    //         labels = data[labelsArrayLength]?.value
    //     } else {
    //         labelsArrayLength= i+1
    //         labels = data[labelsArrayLength]?.value
    //     }
    // } else {
    //   labels = label;
    // }
    if(labels && label){
      labels = [...labels, ...label];
    }
    
  }

  if (labels && labels?.length > 0) {
    const filterArray = [...new Set(labels)]
    for (let i =0; i<filterArray?.length; i++) {
        labelValue.push(moment(filterArray[i]?.date_m).format('DD/MM/YYYY'));
    }
  }

  return labelValue;
}

const DailyMessageGraph = ( props : Props) => {
    const { type, chartId, params} = props;
    const [ label, setLabel ] = useState<string[]>([]);
    const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
    const [ showDetail , setShowDetail ] = useState<boolean>(false);
    const [ paramsId, setParamsId] = useState<any>({
      keywordId : null,
      sourceId: null,
      campaign_id: null,
      organization_id: null
    });
    const { resultDailyChannel } = GetDailyChannel(params?.campaign, params?.date, params?.endDate, params?.period);

    const chartRef = useRef();
    const getKeywordId = (dataset: InteractionItem[]) => {
      if (!dataset.length) return;
  
      const datasetIndex = dataset[0].datasetIndex;
      const keywordName = data.datasets[datasetIndex].label;
      const dailyMessageData = resultDailyChannel;

      let keywordId : number | null= null;
      let sourceId : number | null = null;
      let campaign_id : number | null = null;
      let organization_id : number | null = null;

      if (dailyMessageData?.length > 0) {
        for (let i =0; i<dailyMessageData?.length; i++) {
            if(keywordName === dailyMessageData[i].source_name) {
              sourceId = dailyMessageData[i].source_id;
              campaign_id = dailyMessageData[i].campaign_id;
              organization_id = dailyMessageData[i].organization_id;
              keywordId = dailyMessageData[i].value[i]?.keyword_id;
            }
        }
      }

      const returnData  = {
        keywordId : keywordId,
        sourceId: sourceId,
        campaign_id: campaign_id,
        organization_id: organization_id
      }
      
      return returnData;
    };

    const onClick = (event : any) => {
      if(chartRef.current) {
        const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));

        if(keyword_id) {
          setParamsId(keyword_id);
          setShowDetail(true);
        }
        
      }
    }

    const options = {
      responsive: true,
      backgroundColor: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "grey" },
          stacked: true
        },
        y: {
          min: 0,
  
          // max: 5000,
          
          scaleLabel: { display: true },
          ticks: {
            stepSize: 100,
            color: "grey"
          },
          stacked: true
          
        }
      },
      plugins: {
        legend: {
          align: 'end',
          position: 'top',
          labels: {
            padding: 25,
            boxWidth: 10,
            color: "grey",
            usePointStyle: true
          }
        }
      }
    }

    const chartDatasets = (data:any) => {
      if(!data) return [];
      let totalAmount : number[] = [];
      let keywordName = "";
      const returnData : StackChartDataset[] = [];
      const color = GraphicColors
      for(let i = 0 ; i<data?.length; i++) {
        totalAmount = []
        const total = data[i]?.value;
      
        for(let j=0; j<data[i]?.value?.length ; j++ ) {
          totalAmount.push(total[j].total_at_date);
        } 
        
        keywordName = data[i].keyword_name ? data[i].keyword_name : data[i].source_name ? data[i].source_name : "";
  
        const chartDataset : StackChartDataset  = {
          fill: false,
          tension: 0.5,
          pointRadius: 1,
          label: keywordName,
          pointHoverRadius: 5,
          pointStyle: 'circle',
          borderColor: color[i],
          backgroundColor: color[i],
          pointHoverBorderWidth: 5,
          pointHoverBorderColor: "#fff",
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: color[i],
          data: totalAmount
        }
    
        returnData.push(chartDataset);
      }
  
      return returnData;
    
    }

    const data = {
      labels: label || [],
      datasets: dataset
    }

      useEffect(() => {
        if(resultDailyChannel) {
            const labels = chartLabel(resultDailyChannel);
            setLabel(labels);
            
            const dataSets = chartDatasets(resultDailyChannel);
            setDataset(dataSets);
        }
      },[resultDailyChannel]);

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {
              type === 'message' ?
              <CardHeader 
                  title='Daily Messages'
                  titleTypographyProps={{ variant: 'h6' }}
              />
              :
              type === 'channel' ?
              <CardHeader 
                  title='Daily Channel'
                  titleTypographyProps={{ variant: 'h6' }}
              />
              : ""
            }
            <StyledTooltip arrow title={chartId}>
                <Information  style={{marginTop: '22px', fontSize: '29px'}} />
            </StyledTooltip>
        </span>  
          <CardContent>
              <Bar ref={chartRef} data={data} options={options as any} height={366} onClick={onClick} />
          </CardContent>
          {
            showDetail ?
            <MessageDetail 
                show={showDetail}
                setShow={setShowDetail}
                params = {params}
                paramsId = {paramsId}
                setParamsId={setParamsId}
            /> : ""
          }
        </Card>
        
      )
}

export default DailyMessageGraph