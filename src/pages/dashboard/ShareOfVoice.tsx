// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'

const ChartLabels = (data: any) => {
  if (!data) return [];
  const keywordData = data;

  const labels : any[] = [];

  for (let i = 0; i<keywordData?.length ; i ++) {
    labels.push(keywordData[i].keyword_name)
  }
  
  return labels;
}

const ShareOfVoice  = ({resultShareOfVoice} : {resultShareOfVoice: any}) => {

  const labels = resultShareOfVoice ? ChartLabels(resultShareOfVoice) : [];
  const data = {
  labels: labels,
  datasets: [{
      axis: 'y',
      label: 'Number of Messages',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: ['rgb(54, 162, 235)'],
      borderColor: [
      'rgb(54, 162, 235)'
      ],
      borderWidth: 1
  }]
  };  


  return (
    <Card>
      <CardHeader
        title='Share of Voice'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={5}>
                <Bar data={data} options={{ indexAxis: 'y' }} height={280}/>
            </Grid>
            <Grid item xs={7} >
                <Table size="small">
                    <TableHead>
                        <TableCell variant="head">  
                          <img
                            width={34}
                            height={34}
                            src={`/images/logos/facebook-round.png`}
                          />
                        </TableCell>
                        <TableCell variant="head"> 
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/twitter.png`}
                            />
                        </TableCell>
                        <TableCell variant="head"> 
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/youtube-text.png`}
                            />
                        </TableCell>
                        <TableCell variant="head">
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/instagram.png`}
                            />
                        </TableCell>
                        <TableCell variant="head">
                          <img
                              width={34}
                              height={34}
                              src={`/images/logos/pantip.png`}
                            />
                        </TableCell>
                    </TableHead>
                    {
                      (resultShareOfVoice || []).map((shareVoice : any, index: number) => {
                        return(
                          <TableRow key={index}>
                            {
                              (shareVoice.value || []).map((value : any, key: number) => {
                                return (
                                  <TableCell key={key}>
                                    <span style={{ border : value?.highlight ? "1px solid red" : "", padding: '4px' }}>
                                      {value?.percentage + "%"}
                                    </span>
                                  </TableCell>
                                )
                              })
                            }
                          </TableRow>
                        )
                      })
                    }
                    
                </Table>
            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default ShareOfVoice
