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
import DialogOrganizationInfo from './dialogOrganizationInfo'


const createData = (id: number, organization_group: string, description: string, status : boolean) => {
  return {id, organization_group, description, status }
}

const rows = [
  createData(1, 'กลุ่มองค์กร 1', "This is Desctiption", true),
  createData(2, 'กลุ่มองค์กร 2', "This is Desctiption", true),
  createData(3, 'กลุ่มองค์กร 3', "This is Desctiption", false),
  createData(4, 'กลุ่มองค์กร 4', "This is Desctiption", true),
]

const OrganizationGroup = () => {
  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)
  const toggleShowCreate = () => setShowCreate(!showCreate)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Organization Group Management' />
          <CardContent>
          <TableContainer component={Paper}>
                <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Button sx={{ mb: 2 }} onClick={toggleShowCreate} variant='contained'>
                              Add
                        </Button>
                    </Box>
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align='center'>Orangization Group</TableCell>
                        <TableCell align='center'>Description</TableCell>
                        <TableCell align='center'>Status</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow
                        key={row.id}
                        sx={{
                            '&:last-of-type td, &:last-of-type th': {
                            border: 0
                            }
                        }}
                        >
                        <TableCell component='th' scope='row'>
                            {row.id}
                        </TableCell>
                        <TableCell align='center'>{row.organization_group}</TableCell>
                        <TableCell align='center'>{row.description}</TableCell>
                        <TableCell align='center'>
                            <Switch  checked={row.status}/>
                        </TableCell>
                        <TableCell align='center'>
                            <PencilOutline onClick={()=> {setShowEdit(true)}}/>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogOrganizationInfo show={showEdit} setShow={setShowEdit} action="edit" />
            <DialogOrganizationInfo show = {showCreate} setShow ={setShowCreate} action="create"/>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizationGroup
