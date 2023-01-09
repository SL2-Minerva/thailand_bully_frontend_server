import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";
import { GetKeyWords } from "src/services/api/dashboards/overall/overallDashboardApi";

const TotalMessageLists = ({params, chartId} : {params: any, chartId: string}) => {
    const { resultKeywords } = GetKeyWords(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
    
    return (
        <Card sx={{ maxHeight: 450,minHeight: 450 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Total Message'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
            <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead sx={{ backgroundColor: "lightgrey !important"}}>
                        <TableCell variant="head"> No. </TableCell>
                        <TableCell variant="head"> Keyword </TableCell>
                        <TableCell variant="head"> จํานวน Keyword </TableCell>
                        <TableCell variant="head"> % </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            (resultKeywords||[])?.map((keyword: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell sx={{ backgroundColor: "lightgrey !important" }}><b>{index + 1}</b></TableCell>
                                        <TableCell>Keyword {keyword.id}</TableCell>
                                        <TableCell>{keyword.message}</TableCell>
                                        <TableCell>1.4%</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            </CardContent>
        </Card>
        
    )
}

export default TotalMessageLists