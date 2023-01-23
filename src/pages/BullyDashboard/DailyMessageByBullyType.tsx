// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment'; 
import { InteractionItem } from 'chart.js'
import { BullyTypeColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { FilterBullyTypeByCampaignId } from 'src/services/api/dashboards/bully/BullyDashboardAPI'
import MessageDetail from '../ChannelDashboard/MessageDetail'

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
  chartId : string
  highlight: boolean
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

const DailyMessgeByBullyType = (props: LineProps) => {
  // ** Props
  const { white, labelColor,  borderColor, gridLineColor, params, type, chartId, highlight } = props

  // const [ chartData, setChartData ] = useState();
  const colors = BullyTypeColors;

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [ paramsId, setParamsId] = useState<any>({
    keywordId : null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  });
  const {resultBullyTypeFilterData} = FilterBullyTypeByCampaignId(params?.campaign, params?.date, params?.endDate, params?.period);

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = resultBullyTypeFilterData?.bully_type;

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
      
      if(data[i].bully_level) {
        keywordName = data[i].bully_level;
      } 

      
      if(data[i].bully_type) {
        keywordName = data[i].bully_type;
      } 

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
    if(resultBullyTypeFilterData) {
      const bully_levelData = resultBullyTypeFilterData;
      if(bully_levelData) {
        const labels = chartLabel(bully_levelData);
        setLabel(labels);
        
        const dataSets = chartDatasets(bully_levelData);
        setDataset(dataSets);
      } else {
        setLabel([]);
        setDataset([]);
      }
    } else {
      setLabel([]);
      setDataset([]);
    }
  },[resultBullyTypeFilterData]);

  const data = {
    labels: label || [],
    datasets: dataset
  }
  const reportNo = '6.2.012';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

  const title =  type === 'level' ? 'Bully Level: Daily Message by Date' : "Bully Type: Daily Message by Date";

  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
            title= {title}
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ""}>
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
    </Card>
  )
}

export default DailyMessgeByBullyType
