// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material"
import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'


const ShareOfVoice  = () => {

  const labels = ["All", "KeyWord 1", 'Keyword 2', "KeyWord 3", "KeyWord 4", "KeyWord 5", "KeyWord 6",];
    const data = {
    labels: labels,
    datasets: [{
        axis: 'y',
        label: 'Number of Messages',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
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
                <Bar data={data} options={{ indexAxis: 'y' }} height={300}/>
            </Grid>
            <Grid item xs={7} >
                <Table>
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
                              src={`/images/logos/instagram.png`}
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

                    </TableHead>
                    <TableRow>
                        <TableCell>30%</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>30%</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>40%</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell>10%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>40%</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>10%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>50%</TableCell>
                        <TableCell>40%</TableCell>
                        <TableCell>5%</TableCell>
                        <TableCell>5%</TableCell>
                    </TableRow>
                </Table>
            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default ShareOfVoice
