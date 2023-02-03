import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent} from 'react-chartjs-2'

// ** Custom Components Imports
import { GraphicColors } from 'src/utils/const' 
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { InteractionItem } from 'chart.js'
import moment from 'moment'
import { GetDailyMessages } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import MessageDetail from '../ChannelDashboard/MessageDetail'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

interface Props {
  type: string
  chartId : string
  params: any
  highlight? : boolean
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
    const dataValue = data[i]?.value;
    const label : any [] = [];

    for (let j=0; j<dataValue?.length; j++) {
      label.push(dataValue[j]?.date);
      
    }
    
    labels = [...labels, ...label];
    
  }

  if (labels && labels?.length > 0) {
    const filterArray = [...new Set(labels)]
    for (let i =0; i<filterArray?.length; i++) {
      labelValue.push(moment(filterArray[i]).format('DD/MM/YYYY'));
  }
  }

  return labelValue;
}

const DailyMessageGraph = ( props : Props) => {
    const { type, chartId, params, highlight} = props;
    const [ label, setLabel ] = useState<string[]>([]);
    const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
    const [ showDetail , setShowDetail ] = useState<boolean>(false);
    const [ paramsId, setParamsId] = useState<any>({
      keywordId : null,
      sourceId: null,
      campaign_id: null,
      organization_id: null
    });
    const { resultDailyMessage, loadingDailyMessage } = GetDailyMessages(params?.campaign, params?.date, params?.endDate, params?.period, params?.keywordIds);

    const chartRef = useRef();
    const getKeywordId = (dataset: InteractionItem[]) => {
      if (!dataset.length) return;
  
      const datasetIndex = dataset[0].datasetIndex;
      const keywordName = data.datasets[datasetIndex].label;
      const dailyMessageData = resultDailyMessage;
  
      let keywordId : number | null= null;
      let sourceId : number | null = null;
      let campaign_id : number | null = null;
      let organization_id : number | null = null;
  
      if (dailyMessageData?.length > 0) {
        for (let i =0; i<dailyMessageData?.length; i++) {
            if(keywordName === dailyMessageData[i].keyword_name) {
              sourceId = dailyMessageData[i].source_id || "";
              campaign_id = dailyMessageData[i].campaign_id || "";
              organization_id = dailyMessageData[i].organization_id || "";
              keywordId = dailyMessageData[i]?.keyword_id || "";
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
        
      const getIndex = getElementAtEvent(chartRef.current, event);

        if(getIndex?.length > 0 ) {
          const index =  getIndex[0].index;
          params.label = label[index];
        }

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
          ticks: { color: "#4c4e64de" },
          stacked: true
        },
        y: {
          min: 0,
  
          // max: 5000,
          
          scaleLabel: { display: true },
          ticks: {
            stepSize: 100,
            color: "#4c4e64de"
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
            color: "#4c4e64de",
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
        if(resultDailyMessage) {
            const labels = chartLabel(resultDailyMessage);
            setLabel(labels);
            
            const dataSets = chartDatasets(resultDailyMessage);
            setDataset(dataSets);
        } else {
          setLabel([]);
          setDataset([]);
        } 
      },[resultDailyMessage]);

      const reportNo = '2.2.002';

      const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

      return (
        <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} square variant='outlined'>
          {loadingDailyMessage && (
          <LinearProgress
            style={{ width: "100%" }}
          />
        )}
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {
              type === 'message' ?
              <CardHeader 
                  title={<Translations text="Daily Messages by Date"/>}
                  titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
              />
              :
              type === 'channel' ?
              <CardHeader 
                  title='Daily Channel By Date'
                  titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
              />
              : ""
            }
            <StyledTooltip arrow title={chartTitle || ""}>
                <Information  style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
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
              reportNo = {reportNo}
              title="Daily Messages: Message Transactions"
              networkTitle="Daily Messages: Social Network Analysis"
          /> : ""
         }
          
        </Paper>
        
      )
}

export default DailyMessageGraph