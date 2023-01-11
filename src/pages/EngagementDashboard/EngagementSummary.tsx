import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from "../dashboard/overall";
import { Information } from "mdi-material-ui";

const EngagementSummary = ({resultSummary, chartId, highlight} : {resultSummary: any, chartId: string, highlight:boolean}) => {
    
    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Summary Engagement by Account'
                    titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
                </StyledTooltip>
            </span>
            <CardContent>
            <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableCell variant="head"> Influencer </TableCell>
                        <TableCell variant="head"> Total </TableCell>
                        <TableCell variant="head"> Share </TableCell>
                        <TableCell variant="head"> Comment </TableCell>
                        <TableCell variant="head"> Reaction </TableCell>
                        <TableCell variant="head"> Period over Period </TableCell>
                        <TableCell variant="head"> Period over Period (%) </TableCell>

                    </TableHead>
                    <TableBody>
                        {
                            (resultSummary||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.infulencer}</b></TableCell>
                                        <TableCell>{summary.total}</TableCell>
                                        <TableCell>{summary.share}</TableCell>
                                        <TableCell>{summary.comment}</TableCell>
                                        <TableCell>{summary.reaction}</TableCell>
                                        <TableCell>{summary.period_over_preiod}</TableCell>
                                        <TableCell>{summary.period_over_period_percentage} %</TableCell>

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

export default EngagementSummary