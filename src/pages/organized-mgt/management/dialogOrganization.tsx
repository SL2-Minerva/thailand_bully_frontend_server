// ** React Imports
import { Ref, forwardRef, ReactElement, useEffect } from 'react'

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
import Select  from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from '../../../configs/auth'

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
  id?: number
  table: any
  current?: any
  types?: any
  groups?: any
}

const DialogOrganization = (props: DialogInfoProps) => {
  const { show, setShow, action, current, types, groups } = props

  const schema = yup.object().shape({
    name: yup.string().required(),
    organization_group_id: yup.string().required(),
    organization_type_id: yup.string().required()
  })

  interface FormData {
    description: string
    status: boolean
    name: string
    id?: number
    organization_type_id: string
    organization_group_id: string
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    shouldUnregister: false,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('description', current?.description || "")
    setValue('name', current?.name || "")
    setValue('status', current?.status === 1 ? true : false)
    setValue('organization_type_id', current?.organization_type_id || "")
    setValue('organization_group_id', current?.organization_group_id || "")
    if (action === 'edit') {
      setValue('id', current?.id)
    }
  }, [current])

  const onSubmit = (data: FormData) => {
    if (action === 'create') {

      axios
        .post(authConfig.createOrganization, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          // console.log('res', res)
          setShow(false)
        })
    } else {
      axios
        .put(authConfig.updateOrganization, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          // console.log('res', res)
          setShow(false)
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
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                {action === 'edit' ? 'Edit Organization' : 'Create Organization'}
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        onBlur={onBlur}
                        label='Organization'
                        onChange={onChange}
                        placeholder='Organization'
                        error={errors?.name ? true : false}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={value}
                        label='Description'
                        onChange={onChange}
                        placeholder='description'
                        error={errors?.description ? true : false}
                      />
                    )}
                  />
                  {errors.description && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Organization Group</InputLabel>
                  <Controller
                    name='organization_group_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        label='Organization Group'
                        onChange={onChange}
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                        error={errors?.organization_group_id ? true : false}
                      >
                        {groups &&
                          groups.map((item: any, index: number) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.organization_group_name}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Organization Type</InputLabel>
                  <Controller
                    name='organization_type_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        label='Organization Type'
                        onChange={onChange}
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                        error={errors?.organization_type_id ? true : false}
                      >
                        {types &&
                          types.map((item: any, index: number) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.organization_type_name}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        name={'status'}
                        control={<Switch checked={value} onChange={onChange} />}
                        label='Status : '
                        labelPlacement='start'
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default DialogOrganization
