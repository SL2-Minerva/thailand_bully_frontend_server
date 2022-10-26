// ** React Imports
import { Ref, forwardRef, ReactElement, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import axios from "axios";
import authConfig from "../../../../configs/auth";

interface DialogRoleInfoProps {
  show: boolean
  setShow: any
  action: string
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const createData = (menu: string) => {
  return { menu }
}

const rows = [createData('User'), createData('Campaign'), createData('Dashboard'), createData('Report')]

const DialogRoleInfo = (props: DialogRoleInfoProps) => {
  const { show, setShow, action } = props

  const [roleName, setRoleName] = useState('')
  const [roleDescription, setDescription] = useState('');
  const [permission, setPermission] = useState(
    {
      user: {
        authorized_create: true,
        authorized_edit: true,
        authorized_delete: true,
        authorized_view: true,
        authorized_export: true
      },
      campaign: {
        authorized_create: true,
        authorized_edit: true,
        authorized_delete: true,
        authorized_view: true,
        authorized_export: true
      },
      dashboard: {
        authorized_create: true,
        authorized_edit: true,
        authorized_delete: true,
        authorized_view: true,
        authorized_export: true
      },
      report: {
        authorized_create: true,
        authorized_edit: true,
        authorized_delete: true,
        authorized_view: true,
        authorized_export: true
      }
    }
  );

  const handleSubmit = () => {
    axios
      .post(authConfig.createRole,{
        role_name: roleName,
        role_description: roleDescription,
        permission: permission
      } ,{
        headers: {
          Authorization:`Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(res => {
        console.log('res', res);
        setShow(false);
      })

  }

  const handleChecked = (e, row, key) => {
    let permissionNew = permission;
    permissionNew =  { ...permissionNew, [row.toLowerCase()]: { ...permissionNew[row.toLowerCase()], [`authorized_${key}`]: e.target.checked } }
    setPermission(permissionNew)
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
              {action === 'edit' ? 'Edit Role ' : 'Create New Role'}
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Role Name'
                placeholder='Role Name'
                value={roleName}
                onChange={e => {
                  setRoleName(e.target.value)
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Description'
                placeholder='description'
                value={roleDescription}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Menu Authorized</TableCell>
                      <TableCell align='left'>Create</TableCell>
                      <TableCell align='left'>Edit</TableCell>
                      <TableCell align='left'>View</TableCell>
                      <TableCell align='left'>Export</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow
                        key={row.menu}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.menu}
                        </TableCell>
                        <TableCell align='left'>
                          <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default' onChange={e => handleChecked(e, row.menu, 'create')} />} />
                        </TableCell>
                        <TableCell align='left'>
                          <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default'  onChange={e => handleChecked(e, row.menu, 'edit')} />} />
                        </TableCell>
                        <TableCell align='left'>
                          <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default'  onChange={e => handleChecked(e, row.menu, 'view')} />} />
                        </TableCell>
                        <TableCell align='left'>
                          <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default'  onChange={e => handleChecked(e, row.menu, 'export')} />} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleSubmit()}>
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

export default DialogRoleInfo
