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
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogOrganizationType from './typeDialog';

const createData = (name: string, description: string, status : boolean) => {
  return { name, description, status }
}

const rows = [
  createData('องค์กร Type1', "This is Desctiption 1", true),
  createData('องค์กร Type2', "This is Desctiption 2", true),
  createData('องค์กร Type3', "This is Desctiption 3", false),
  createData('องค์กร Type4', "This is Desctiption 4", true),
]


const OrganizationType = () => {

  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)
  const toggleCreate = () => setShowCreate(!showCreate)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Organization Type Management' />
          <CardContent>
          <CardContent>
                    <TableContainer component={Paper}>
                        <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                            
                                <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                                     Add
                                </Button>
                            </Box>
                        </Box>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                            <TableRow>
                                <TableCell>Organizaton Type</TableCell>
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
                                    <PencilOutline onClick={()=> { setShowEdit(true) }}/>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogOrganizationType show={showEdit} setShow={setShowEdit} action="edit" />
                    <DialogOrganizationType show={showCreate} setShow={setShowCreate} action="create" />
                    
                </CardContent>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizationType
