// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {

  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
    show : boolean
    setShow: any
    action : string
}

const DialogOrganization = (props: DialogInfoProps) => {

    const { show, setShow, action } = props
    const [organization, setOrganization] = useState<string>('')
    const [organizationType, setOrganizationType] = useState<string>('')

    const handleOrganization = useCallback((e: SelectChangeEvent) => {
        setOrganization(e.target.value)
      }, [])
    
      const handleOrganizationType = useCallback((e: SelectChangeEvent) => {
        setOrganizationType(e.target.value)
      }, [])
      
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
                  action === 'edit' ?  'Edit Organization': 'Create Organization'
               }
               
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth  label='Organization' placeholder='' />
            </Grid>
            <Grid item sm={12} xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Description'
                    id='textarea-outlined-controlled'
                    />
            </Grid>

            <Grid item sm={6} xs={12}>
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

            <Grid item sm={6} xs={12}>
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


            <Grid item sm={6} xs={12}>
              <FormControl>
                    <FormControlLabel control={<Switch defaultChecked />} label='Status : ' labelPlacement='start' />
              </FormControl>
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

export default DialogOrganization
