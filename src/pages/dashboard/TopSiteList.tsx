import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const TopSiteList = () => {
    
    return (
        <Card>
            <CardHeader
                title='Top Sites'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <Table>
                    <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                        <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                        <TableCell variant="head"> No. of Messages </TableCell>
                        <TableCell variant="head"> % </TableCell>
                    </TableHead>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>www.twitter.com</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>www.facebook.com</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>www.instagram.com</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>www.google.com</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                </Table>
            </CardContent>
        </Card>
        
    )
}

export default TopSiteList