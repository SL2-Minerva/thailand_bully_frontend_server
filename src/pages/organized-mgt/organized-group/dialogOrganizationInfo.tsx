// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
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
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import AccountOutline from 'mdi-material-ui/AccountOutline'

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

const OrganizationGroup = [
    'AAA',
    'BBB',
    'CCC',
    'DDD',
    'EEE'
  ]

const snsPlatform = [
    'Twitter',
    'Youtube',
    'Twitch',
    'FB',
    'IG'
  ]

  const ITEM_HEIGHT = 20
  const ITEM_PADDING_TOP = 4
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }
  

const DialogOrganizationInfo = (props: DialogInfoProps) => {
    const { show, setShow, action } = props

    const [value, setValue] = useState<string>('controlled-checked')
    const [serviceValue, setServiceValue] = useState<string>('controlled-checked')

    const [organizationName, setOrganizationName] = useState<string[]>([])
    const [sns, setSns] = useState<string[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value)
    }

    const handleChangeService = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceValue((event.target as HTMLInputElement).value)
      }

    const handleOrganizationSelect = (event: SelectChangeEvent<string[]>) => {
        setOrganizationName(event.target.value as string[])
    }

    const handleSnsSelect = (event: SelectChangeEvent<string[]>) => {
        setSns(event.target.value as string[])
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
                  action === 'edit' ?  'Edit Organization Group ': 'Create Organization Group'
               }
               
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth  label='Organization Group' placeholder='' />
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
            <Grid item sm={12} xs={12}>
              <TextField fullWidth label='Number of Keyword' placeholder='2' type="number"/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <Typography>Keyword Condition</Typography>
                    <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={handleChange}>
                    <FormControlLabel value='controlled-checked' control={<Radio />} label='Include/Exclude' />
                    <FormControlLabel value='controlled-unchecked' control={<Radio />} label='none' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth label='Number of Message Transaction' placeholder='1000' type="number"/>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Organization Group</Typography>
                <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Organization</InputLabel>
                <Select
                    multiple
                    label='organization name'
                    value={organizationName}
                    MenuProps={MenuProps}
                    id='demo-multiple-name'
                    onChange={handleOrganizationSelect}
                    labelId='demo-multiple-name-label'
                >
                    {OrganizationGroup.map(organizaton => (
                    <MenuItem key={organizaton} value={organizaton}>
                        {organizaton}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Social Visualization</Typography>
                <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Platform</InputLabel>
                <Select
                    multiple
                    label='Social Platform'
                    value={sns}
                    MenuProps={MenuProps}
                    id='demo-multiple-name'
                    onChange={handleSnsSelect}
                    labelId='demo-multiple-name-label'
                >
                    {snsPlatform.map(sns_platform => (
                    <MenuItem key={sns_platform} value={sns_platform}>
                        {sns_platform}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Grid>

            <Grid item sm={12} xs={12}>
              <TextField fullWidth label='Number of Users' placeholder='10' type="number"/>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <Typography>Customer Services</Typography>
                    <RadioGroup row aria-label='controlled' name='controlled' value={serviceValue} onChange={handleChangeService}>
                    <FormControlLabel value='controlled-checked' control={<Radio />} label='Customer Service' />
                    <FormControlLabel value='controlled-unchecked' control={<Radio />} label='None' />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <Typography>Status </Typography>
                    <FormControlLabel control={<Switch defaultChecked />} label='' />
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

export default DialogOrganizationInfo
