// ** React Imports
import { Ref, forwardRef, ReactElement, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'

import { Organization } from 'src/services/api/organization/organization'
import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { API_PATH } from 'src/utils/const'
import { role_list } from '../../../../services/api/users/role'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
}


const DialogEditUserInfo = (props: DialogInfoProps) => {
  const {show, setShow, action, current} = props

  console.log('current', current)

  const [organization, setOrganization] = useState<any>(current.organization_id ?? '')
  const [name, setName] = useState<string>(current.name ?? '')
  const [email, setEmail] = useState<string>(current.email ?? '')
  const [company, setCompany] = useState<string>(current.company ?? '')
  const [role_id, setRole] = useState<any>(current.role_id ?? '')
  const [status, setStatus] = useState<string>(current.status ?? '')


  const { list } = Organization.getList()
  const { resultRoleList } = role_list()



  const handleSummit = () => { 
    if (action === 'edit') {

      axios
      .put(`${API_PATH}/user/update/${current.id}`, {  name, email,company, organization_id: organization, role_id, status }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(async response => {
        const { data, status } = response.data
        console.log(data, status)

        setShow(false)
      })
      .catch((ex: any) => {
        console.log(ex)
      })
    } else {
      axios
      .post(`${API_PATH}/user/create/`, {  name, email,company, organization_id: organization, role_id, status }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(async response => {
        const { data, status } = response.data
        console.log(data, status)

        setShow(false)
      })
      .catch((ex: any) => {
        console.log(ex)
      })
    }
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
               {
                  action === 'edit' ?  'Edit User Information ': 'Create User Information'
               }
               
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField fullWidth  value={name} label='Full Name' onChange={(e) => setName(e.target.value)} placeholder='johnDoe' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='johnDoe@email.com'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Company' onChange={ (e) => setCompany(e.target.value)} value={company}  placeholder='' />
            </Grid>
            <Grid item sm={6} xs={12}>
           
              <FormControl fullWidth>
                <InputLabel id='role-select'>Role</InputLabel>
                <Select fullWidth labelId='role-select' label='Role' value={role_id} onChange={(e) => setRole(e.target.value)}>
                {
                      resultRoleList && resultRoleList.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.user_role_name}
                          </MenuItem>
                        )
                      })
                    }
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='organization-select'>Organization</InputLabel>
                <Select fullWidth labelId='organization-select' value={organization} label='Organization' onChange={(e) => setOrganization(e.target.value)}>
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
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    inputProps={{ placeholder: 'Select status' }}
                  >
                    <MenuItem value=''>Select status</MenuItem>
                    <MenuItem value='2'>Pending</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleSummit()}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogEditUserInfo
