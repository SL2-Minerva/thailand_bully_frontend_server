// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment';
import MessageDetail from './MessageDetail' 
import { EngagementTransChartColor, EngagementTypeColors } from 'src/utils/const'
import { InteractionItem } from 'chart.js'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { EngagementTypePercetage } from 'src/services/api/dashboards/engagement/EngagementApi'

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
  chartId: string
}

const chartLabel = (data:any) => {
  if(!data) return [];
  
  let labels : any[] = [];
  let labelsArrayLength; 
  const labelValue : string[] = []
  for(let i = 0 ; i<data?.length; i++) {
    const label = data[i]?.value;
    if(data?.length-1 !== i) {
        if(label?.length > data[i+1].length) {
            labelsArrayLength= i
            labels = data[labelsArrayLength]?.value
        } else {
            labelsArrayLength= i+1
            labels = data[labelsArrayLength]?.value
        }
    } else {
        labels = label;
    }
    
  } 

  if (labels?.length > 0) {
    for (let i =0; i<labels?.length; i++) {
        labelValue.push(moment(labels[i]?.date_m).format('DD/MM'));
    }
  }
  

  return labelValue;
}

const DailyEngagementType = (props: LineProps) => {
  // ** Props
  const { white, labelColor,  borderColor, gridLineColor, params, type, chartId } = props

  // const [ chartData, setChartData ] = useState();
  const colors = type === 'transaction' ? EngagementTransChartColor : EngagementTypeColors;
  const { resultEngagementType } = EngagementTypePercetage(params?.campaign, params?.date, params?.endDate, params?.period);

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [keywordId, setKeywordId] = useState<any>();

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => { 
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const engagementData = resultEngagementType?.engagement;
    let keywordId : number | null= null;
    if (engagementData?.length > 0) {
      for (let i =0; i<engagementData?.length; i++) {
          if(keywordName === engagementData[i].name) {
            keywordId = engagementData[i].keyword_id;
          }
      }
    }

    return keywordId;
  };

  const onClick = (event : any) => {
    if(chartRef.current) {
      const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));
      if(keyword_id) {
        setKeywordId(keyword_id);
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
      
      keywordName = data[i].name;

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
    if(resultEngagementType) {
      const engagementData = resultEngagementType?.engagement;
      if(engagementData) {
        const labels = chartLabel(engagementData);
        setLabel(labels);
        
        const dataSets = chartDatasets(engagementData);
        setDataset(dataSets);
      }
    }
  },[resultEngagementType]);

  const data = {
    labels: label || [],
    datasets: dataset
  }

  return (
    <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
              title='Daily Engagement'
              titleTypographyProps={{ variant: 'h6' }}
              subheader='KeyWords'
              subheaderTypographyProps={{ variant: 'caption' }}
            />
          <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
        </span>
      
      <CardContent>
         <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
         <MessageDetail 
            show={showDetail}
            setShow={setShowDetail}
            params = {params}
            keywordId = {keywordId}
         />
      </CardContent>
    </Card>
  )
}

export default DailyEngagementType
