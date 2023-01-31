// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent} from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment';
import MessageDetail from './MessageDetail' 
import { EngagementTransChartColor, EngagementTypeColors } from 'src/utils/const'
import { InteractionItem } from 'chart.js'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { LinearProgress, Paper } from '@mui/material'

// import { Button } from '@mui/material'
// import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
// import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
  params : any
  type: string
  chartId: string,
  highlight?: boolean
  resultFilterData:any 
  loadingFilterData : boolean
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

const DailyEngagement = (props: LineProps) => {
  const reportNo = '4.2.002';

  // ** Props
  const { white, labelColor,  borderColor, gridLineColor, params, type, chartId, highlight,resultFilterData, loadingFilterData } = props

  // const [ chartData, setChartData ] = useState();
  const colors = type === 'transaction' ? EngagementTransChartColor : EngagementTypeColors;

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [ paramsId, setParamsId] = useState<any>({
    keywordId : null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  });
  
  

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = resultFilterData?.engagement;

    const keywordId : number | null= null;
    let sourceId : number | null = null;
    let campaign_id : number | null = null;
    let organization_id : number | null = null;

    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].keyword_name) {
            sourceId = dailyMessageData[i].source_id || "";
            campaign_id = dailyMessageData[i].campaign_id || "";
            organization_id = dailyMessageData[i].organization_id || "";

            // keywordId = dailyMessageData[i].value[i]?.keyword_id;
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
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: true
      },
      y: {
        min: 0,

        // max: 5000,
        
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
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
          color: labelColor,
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
    const color = colors
    for(let i = 0 ; i<data?.length; i++) {
      totalAmount = []
      const total = data[i]?.value;
    
      for(let j=0; j<data[i]?.value?.length ; j++ ) {
        totalAmount.push(total[j].total_at_date);
      } 
      
      keywordName = data[i].keyword_name;

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
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }
  
      returnData.push(chartDataset);
    }

    return returnData;
  
  }

  useEffect(() => {
    if(resultFilterData) {
      const engagementData = resultFilterData?.engagement;
      if(engagementData) {
        const labels = chartLabel(engagementData);
        setLabel(labels);
        
        const dataSets = chartDatasets(engagementData);
        setDataset(dataSets);
      }
    } else {
      setLabel([]);
      setDataset([]);
    }
  },[resultFilterData]);

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const title = chartId + ", Report Level 2(" + reportNo + ")";

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: '300px' }} square variant='outlined'>
      {loadingFilterData && (
        <LinearProgress
            style={{ width: "100%" }}
        />
        )}
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
              title='Daily Engagement By Date'
              titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
              subheader='KeyWords'
              subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
            />
          <StyledTooltip arrow title={title}>
              <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
          </StyledTooltip>
        </span>
      
      <CardContent>
         <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
         {
          showDetail ?
          <MessageDetail 
              show={showDetail}
              setShow={setShowDetail}
              params = {params}
              paramsId = {paramsId}
              setParamsId={setParamsId}
              reportNo = {reportNo}
          /> : ""
         }
      </CardContent>
    </Paper>
  )
}

export default DailyEngagement
