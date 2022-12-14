// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment';
import DailyMessageDetail from './DailyMessageDetail'
import { Button } from '@mui/material'
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
  filterData: any
}

const chartLabel = (data:any) => {
  if(!data) return [];
  
  const labels : string[] = [];
  for(let i = 0 ; i<data?.length; i++) {
    const label = data[i]?.value;
    labels.push(moment(label[0].date_m).format('DD/MM'));

    // for(let j=0; j<data[i]?.value?.length ; j++ ) {
       
    // } 
  }

  return labels;
}

const StackedChart = (props: LineProps) => {
  // ** Props
  const { white, labelColor,primary,  borderColor, gridLineColor, filterData } = props

  // const [ chartData, setChartData ] = useState();


  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);

  const chartRef = useRef();
  const onClick = (event : any) => {
    if(chartRef.current) {
      console.log(getDatasetAtEvent(chartRef.current, event));
      console.log(getElementAtEvent(chartRef.current, event));
      console.log(getElementsAtEvent(chartRef.current, event));
      setShowDetail(true);
    }
  }

  const showMessageDetail = () => {
    setShowDetail(false);
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

        // stacked: true
        
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
    const color = ['#FF80AA','#36a2eb','#7FFFD4', '#A52A2A', '#29A6A6', '#FFA500',primary]
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
        <CardHeader
          title='Daily Message'
          titleTypographyProps={{ variant: 'h6' }}
          subheader='KeyWords'
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        {
          showDetail ? 
          <Button style={{ marginTop: '20px', marginRight: '10px' }} 
             color="primary" onClick={showMessageDetail} size="small">
            <CloseCircleOutline fontSize='large'/>
          </Button>
          :
          ""
        }
      </div>
      
      <CardContent>
        {
          showDetail ? 
          <DailyMessageDetail/>
          :
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
        }
        
      </CardContent>
    </Card>
  )
}

export default StackedChart
