import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'

// ** Custom Components Imports
import { getXaxisData } from './DailyMessageGraph'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { GraphicColors } from 'src/utils/const'
import { useEffect, useRef, useState } from 'react'
import { InteractionItem } from 'chart.js'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'

const InfluencerGraph = ({numberOfAccounts, chartId, params}: {numberOfAccounts: any, chartId: string, params: any}) => {

      const [ label, setLabel ] = useState<string[]>([]);
      const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
      const [ showDetail , setShowDetail ] = useState<boolean>(false);
      const [ keywordId, setKeywordId] = useState<any>();
  
      const chartRef = useRef();
      const getKeywordId = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;
    
        const datasetIndex = dataset[0].datasetIndex;
        const keywordName = data.datasets[datasetIndex].label;
        const dailyMessageData = numberOfAccounts;
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
          setShowDetail(true);
    
          if(keyword_id) {
            setKeywordId(keyword_id);
  
            // setShowDetail(true);
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
              color: "#ff9800"
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
              color: "#ff9800",
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
          totalAmount = data[i].data;         
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
            pointHoverBorderColor: '#fff',
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
        if(numberOfAccounts) {
            const labels = getXaxisData(numberOfAccounts);
            setLabel(labels);
            
            const dataSets = chartDatasets(numberOfAccounts);
            setDataset(dataSets);
        }
      },[numberOfAccounts]);

      return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardHeader 
                  title='Number of Accounts'
                  titleTypographyProps={{ variant: 'h6' }}
              />
              <StyledTooltip arrow title={chartId || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px'}} />
              </StyledTooltip>
          </span>
            <CardContent>
              <Bar ref={chartRef} data={data} options={options as any} height={353} onClick={onClick} />
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

export default InfluencerGraph