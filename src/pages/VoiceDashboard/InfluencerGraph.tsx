import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'

// ** Custom Components Imports
// import { chartLabel } from './DailyMessageGraph'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { GraphicColors } from 'src/utils/const'
import { useEffect, useRef, useState } from 'react'
import { InteractionItem } from 'chart.js'
import { GetNumbersOfAccounts } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import MessageDetail from '../ChannelDashboard/MessageDetail'

const chartLabel = (data:any) => {
  if(!data) return [];
  
  let labels : any[] = [];
  if(data.length > 0) labels = data[0]?.date;
  
  return labels;
}

const InfluencerGraph = ({ chartId, params, highlight}: {chartId: string, params: any, highlight: boolean}) => {

      const [ label, setLabel ] = useState<string[]>([]);
      const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
      const [ showDetail , setShowDetail ] = useState<boolean>(false);
      const [ paramsId, setParamsId] = useState<any>({
        keywordId : null,
        sourceId: null,
        campaign_id: null,
        organization_id: null
      });
      const { resultNumbersOfAccounts } = GetNumbersOfAccounts(params?.campaign, params?.date, params?.endDate, params?.period);
  
      const chartRef = useRef();
      const getKeywordId = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;
    
        const datasetIndex = dataset[0].datasetIndex;
        const keywordName = data.datasets[datasetIndex].label;
        const dailyMessageData = resultNumbersOfAccounts?.value;
    
        let keywordId : number | null= null;
        let sourceId : number | null = null;
        let campaign_id : number | null = null;
    
        if (dailyMessageData?.length > 0) {
          for (let i =0; i<dailyMessageData?.length; i++) {
              if(keywordName === dailyMessageData[i].keyword_name) {
                sourceId = dailyMessageData[i].source_id || "";
                campaign_id = dailyMessageData[i].campaign_id || "";
                keywordId = dailyMessageData[i].id || "";
              }
          }
        }
    
        const returnData  = {
          keywordId : keywordId,
          sourceId: sourceId,
          campaign_id: campaign_id,
          organization_id: ""
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
        if(resultNumbersOfAccounts) {
            const labels = chartLabel(resultNumbersOfAccounts);
            setLabel(labels);
            
            const dataSets = chartDatasets(resultNumbersOfAccounts);
            setDataset(dataSets);
        }
      },[resultNumbersOfAccounts]);

      const reportNo = '2.2.013';

      const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

      return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardHeader 
                  title='Number of Accounts'
                  titleTypographyProps={{ variant: 'h6',color: highlight ? 'green' : '#4c4e64de' }}
              />
              <StyledTooltip arrow title={chartTitle || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
              </StyledTooltip>
          </span>
            <CardContent>
              <Bar ref={chartRef} data={data} options={options as any} height={353} onClick={onClick} />
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
            />: ""
          }
            
        </Card>
        
      )
}

export default InfluencerGraph