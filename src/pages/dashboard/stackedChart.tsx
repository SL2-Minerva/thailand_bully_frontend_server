// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment';
import DailyMessageDetail from './DailyMessageDetail'
import { GraphicColors } from 'src/utils/const'
import { InteractionItem } from 'chart.js'

import { Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'

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
  filterData: any
  params : any
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

const StackedChart = (props: LineProps) => {
  // ** Props
  const { white, labelColor,  borderColor, gridLineColor, filterData, params } = props

  // const [ chartData, setChartData ] = useState();


  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [keywordId, setKeywordId] = useState<any>();

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = filterData?.daily_message;
    let keywordId : number | null= null;
    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].keyword_name) {
            keywordId = dailyMessageData[i].keyword_id;
          }
      }
    }

    return keywordId;
  };

  const onClick = (event : any) => {
    if(chartRef.current) {
      // console.log(getDatasetAtEvent(chartRef.current, event));
      // console.log(getElementsAtEvent(chartRef.current, event));
      // console.log(getElementAtEvent(chartRef.current, event));

      const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));

      if(keyword_id) {
        setKeywordId(keyword_id);
        setShowDetail(true);
      }
      
    }
  }

  // const showMessageDetail = () => {
  //   setShowDetail(false);
  // }

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
    const color = GraphicColors
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
    if(filterData) {
      const dailyMessageData = filterData?.daily_message;
      if(dailyMessageData) {
        const labels = chartLabel(dailyMessageData);
        setLabel(labels);
        
        const dataSets = chartDatasets(dailyMessageData);
        setDataset(dataSets);
      }
    }
  },[filterData]);

  const data = {
    labels: label || [],
    datasets: dataset
  }

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Daily Message'
            titleTypographyProps={{ variant: 'h6' }}
            subheader='KeyWords'
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip arrow title="Chart 2">
              <Information fontSize='large' style={{marginTop: '23px'}} />
          </StyledTooltip>
      </span>
      </div>
      
      <CardContent>
         <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
         <DailyMessageDetail 
            show={showDetail}
            setShow={setShowDetail}
            params = {params}
            keywordId = {keywordId}
            setKeywordId={setKeywordId}
         />
      </CardContent>
    </Card>
  )
}

export default StackedChart
