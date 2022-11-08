// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent } from '@mui/material'
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

import DialogOrganization from './dialogOrganization'
import {OrganzationGroupServiceList}  from 'src/services/api/organization/OrganizationApi';
import OrganizationTypeService from 'src/services/api/organization/OrganizationApi'
import { Organization } from 'src/services/api/organization/organization'
import axios from 'axios'
import authConfig from '../../../configs/auth'

const OrganizedManagement = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [organization, setOrganization] = useState<string>('')
  const [organizationType, setOrganizationType] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')

  const { list } = Organization.getList(reload)
  const { result_organization_group_list } = OrganzationGroupServiceList(reload);
  const { result_organization_type_list } = OrganizationTypeService(reload)

  const [tableData, setTableData] = useState(list)


  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleOrganizationType = useCallback((e: SelectChangeEvent) => {
    setOrganizationType(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  //

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  useEffect(() => {
    setReload(!reload)

    setTableData(list)
  }, [showCreate, showEdit])

  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateOrganization,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    const values = [...list]
    values[index].status = event.target.checked
    setTableData(values)
    setReload(!reload)
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(list[i])
    setShowEdit(true)
    setTableData(list)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Organization Management'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField id='name' label='Organization Name' />
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

                    {
                      list && list.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        )
                      })
                    }

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
                   {
                      result_organization_type_list && result_organization_type_list.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.organization_type_name}
                          </MenuItem>
                        )
                      })
                    }
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
                    <MenuItem value='2'>Pending</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => {
                      console.log('search')
                    }}
                    variant='contained'
                  >
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
              <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
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
                  {list &&
                    list.map((row: any, index: number) => (
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
                          <Switch key={index} checked={row.status} onChange={e => handleChange(index, row.id, e)} />
                        </TableCell>
                        <TableCell align='center'>
                          <PencilOutline
                            onClick={() => {
                              handleEdit(index)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DialogOrganization
              table={tableData}
              types={result_organization_type_list}
              groups={result_organization_group_list}
              show={action === 'create' ? showCreate : showEdit}
              setShow={action === 'create' ? setShowCreate : setShowEdit}
              action={action}
              current={current}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizedManagement
