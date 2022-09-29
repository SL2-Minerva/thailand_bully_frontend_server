// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
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
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { boolean } from 'yup/lib/locale'

interface DialogRoleInfoProps {
    show : boolean
    setShow: any
    action : string
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
  
const rows = [
    createData('User MGT'),
    createData('Campaign'),
    createData('Dashboard'),
    createData('Report')
]

const DialogRoleInfo = (props: DialogRoleInfoProps) => {
    const { show, setShow, action } = props
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
                  action === 'edit' ?  'Edit Role ': 'Create New Role'
               }
               
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Role Name' placeholder='Role Name' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Description' placeholder='description' />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                        <TableRow>
                            <TableCell>Menu Authorized</TableCell>
                            <TableCell align='left'>Add</TableCell>
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
                                <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default' />} />
                            </TableCell>
                            <TableCell align='left'>
                                <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default' />} />
                            </TableCell>
                            <TableCell align='left'>
                                <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default' />} />
                            </TableCell>
                            <TableCell align='left'>
                                <FormControlLabel label='' control={<Checkbox defaultChecked name='size-default' />} />
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setShow(false)}>
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
