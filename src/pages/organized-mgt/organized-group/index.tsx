// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid , Card, CardHeader, CardContent } from "@mui/material";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import axios from 'axios'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogOrganizationInfo from './dialogOrganizationInfo'
import { OrganzationGroupServiceList } from 'src/services/api/organization/OrganizationApi';
import authConfig from '../../../configs/auth'


const OrganizationGroup = () => {
  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const toggleShowCreate = () => setShowCreate(!showCreate)


  const { result_organization_group_list } = OrganzationGroupServiceList(reload);


  useEffect(() => {
    setReload(!reload)
  }, [showCreate, showEdit])


  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(result_organization_group_list[i])
    setShowEdit(true)
  }


  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateOrgGroup,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    setReload(!reload)

    // const values = [...result_organization_group_list]
    // values[index].status = event.target.checked
  }


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
                    {result_organization_group_list && result_organization_group_list.map((row: any, index: number) => (
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
                        <TableCell align='center'>{row.organization_group_name}</TableCell>
                        <TableCell align='center'>{row.organization_group_description}</TableCell>
                        <TableCell align='center'>
                          <Switch key={index} checked={row.status === 1 ? true : row.status ? true : false} onChange={e => handleChange(index, row.id, e)} />
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
            <DialogOrganizationInfo show={action === 'create' ? showCreate : showEdit}
                setShow={action === 'create' ? setShowCreate : setShowEdit}
                action={action}
                current={current} />


          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizationGroup
