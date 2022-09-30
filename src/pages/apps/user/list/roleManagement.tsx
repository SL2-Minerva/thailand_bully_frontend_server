// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Grid , Card, CardHeader, CardContent } from "@mui/material";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import DialogRoleInfo from './DialogRoleInfo';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const createData = (name: string, description: string, status : boolean) => {
  return { name, description, status }
}

const rows = [
  createData('System Admin ', "This is Desctiption", true),
  createData('System Operation ', "This is Desctiption", true),
  createData('User Admin ', "This is Desctiption", false),
  createData('User Operation ', "This is Desctiption", true),
]


const RoleManagement = () => {
    const [ showDialog , setShowDialog ] = useState<boolean>(false)
    const [ addRoleOpen, setAddRoleOpen ] = useState<boolean>(false)
    const toggleAddRole = () => setAddRoleOpen(!addRoleOpen)

  return (
    <Grid container>
        <Grid item xs={12}>
            <Card>
                 <CardHeader title='Role Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                            
                                <Button sx={{ mb: 2 }} onClick={toggleAddRole} variant='contained'>
                                     Add Role
                                </Button>
                            </Box>
                        </Box>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                            <TableRow>
                                <TableCell>Role Name</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell align='center'>Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                    }
                                }}
                                >
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='center'>{row.description}</TableCell>
                                <TableCell align='center'>
                                    <Switch  checked={row.status}/>
                                </TableCell>
                                <TableCell align='center'>
                                    <PencilOutline onClick={()=> { setShowDialog(true) }}/>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogRoleInfo show={showDialog} setShow={setShowDialog} action="edit"/>
                    <DialogRoleInfo show={addRoleOpen} setShow={setAddRoleOpen} action="create"/>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default RoleManagement
