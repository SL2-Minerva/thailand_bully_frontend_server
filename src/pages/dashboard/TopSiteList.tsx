import { Table, TableRow, TableHead, TableCell, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

interface Props {
    topsites: any
}

const TopSiteList = ({topsites} : Props) => {
    
    return (
        <Card>
            <CardHeader
                title='Top Sites'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <TableContainer sx={{ maxHeight: 250 }}>
                    <Table stickyHeader={true} size="small">
                        <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                            <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                            <TableCell variant="head"> No. of Messages </TableCell>
                            <TableCell variant="head"> % </TableCell>
                        </TableHead>

                        {
                            (topsites || [])?.map((topsite :any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white' }}>{topsite?.site_domain}</TableCell>
                                        <TableCell>{topsite?.no_of_message}</TableCell>
                                        <TableCell>{topsite?.percentage}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
        
    )
}

export default TopSiteList