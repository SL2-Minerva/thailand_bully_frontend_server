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
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import moment from 'moment'

interface Props {
  dailyData: any
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
        labelValue.push(moment(labels[i]?.date_m).format('DD/MM/YYYY'));
    }
  }

  return labelValue;
}

const DailyMessageGraph = ( props : Props) => {
    const {dailyData, type, chartId, params} = props;
    const [ label, setLabel ] = useState<string[]>([]);
    const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
    const [ showDetail , setShowDetail ] = useState<boolean>(false);
    const [keywordId, setKeywordId] = useState<any>();

    const chartRef = useRef();
    const getKeywordId = (dataset: InteractionItem[]) => {
      if (!dataset.length) return;
  
      const datasetIndex = dataset[0].datasetIndex;
      const keywordName = data.datasets[datasetIndex].label;
      const dailyMessageData = dailyData;
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
        if(dailyData) {
            const labels = chartLabel(dailyData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyData);
            setDataset(dataSets);
        }
      },[dailyData]);

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
          <DailyMessageDetail 
            show={showDetail}
            setShow={setShowDetail}
            params = {params}
            keywordId = {keywordId}
            setKeywordId={setKeywordId}
         />
        </Card>
        
      )
}

export default DailyMessageGraph