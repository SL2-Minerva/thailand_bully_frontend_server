// ** React Imports
import { useState, useCallback } from 'react'

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
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'


import DialogOrganization from './dialogOrganization';

const createData = (id: number, name: string, group: string,
  type: string, status: boolean) => {
return {id, name, group, type, status }
}

const rows = [
createData(1,'Organization 1', 'Group 1', 'Type 1 ', true),
createData(2,'Organization 1', 'Group 2', 'Type 2', true),
createData(3,'Organization 1', 'Group 3', 'Type 3', false)
]

const OrganizedManagement = () => {
  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)
  const toggleShowCreate = () => setShowCreate(!showCreate)
  const [organization, setOrganization] = useState<string>('')
  const [organizationType, setOrganizationType] = useState<string>('')

  const [status, setStatus] = useState<string>('')


  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleOrganizationType = useCallback((e: SelectChangeEvent) => {
    setOrganizationType(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Organization Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField id='name' label='Organization Name'/>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Organization</InputLabel>
                  <Select
                    fullWidth
                    value={organization}
                    id='select-organization'
                    label='Select Organization'
                    labelId='organization-select'
                    onChange={handleOrganization}
                    inputProps={{ placeholder: 'Select Organization' }}
                  >
                    <MenuItem value=''>Organization Group </MenuItem>
                    <MenuItem value='1'>Oragnization 1</MenuItem>
                    <MenuItem value='2'>Oragnization 2</MenuItem>
                    <MenuItem value='3'>Oragnization 3</MenuItem>
                    <MenuItem value='4'>Oragnization 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Organization Type</InputLabel>
                  <Select
                    fullWidth
                    value={organizationType}
                    id='select-organizationType'
                    label='Select OrganizationType'
                    labelId='organizationType-select'
                    onChange={handleOrganizationType}
                    inputProps={{ placeholder: 'Select Organization' }}
                  >
                    <MenuItem value=''>Organization Type </MenuItem>
                    <MenuItem value='1'>Type 1</MenuItem>
                    <MenuItem value='2'>Type 2</MenuItem>
                    <MenuItem value='3'>Type 3</MenuItem>
                    <MenuItem value='4'>Type 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        
                  <Button sx={{ mb: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                    search
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>

      <Grid item md={12} xs={12}>
        <Card>
          <CardContent>
              <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Button sx={{ mb: 2 }} onClick={toggleShowCreate} variant='contained'>
                              Add
                        </Button>
                    </Box>
                </Box>
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Organization Group</TableCell>
                        <TableCell align='center'>Organziation Type</TableCell>
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
                        <TableCell align='center'>{row.name}</TableCell>
                        <TableCell align='center'>{row.group}</TableCell>
                        <TableCell align='center'>{row.type}</TableCell>
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
            <DialogOrganization show={showEdit} setShow={setShowEdit} action="edit" />
            <DialogOrganization show={showCreate} setShow={setShowCreate} action="create" />

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizedManagement
