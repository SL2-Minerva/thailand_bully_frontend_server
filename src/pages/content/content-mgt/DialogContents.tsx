import React, { Ref, useState, forwardRef, ReactElement, SyntheticEvent, useEffect, useCallback, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { Editor } from '@tinymce/tinymce-react'

// ** Styles
import 'react-quill/dist/quill.snow.css'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ContentList } from 'src/types/content/ContentType'
import { CreateContent, UpdateContent } from 'src/services/api/content/ContentAPI'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

// import { Quill } from 'react-quill';
// import dynamic from 'next/dynamic'

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
export const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
export const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: ContentList
  table?: any
}

// const quillModules = {
//   toolbar: [
//     // [{ 'font': [] }],
//     [{ size: ['small', false, 'large', 'huge'] }],
//     ['bold', 'italic', 'underline'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     ['clean']
//   ]
// }

const DialogContents = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props

  const editorRef: any = useRef(null)

  const [date, setDate] = useState<Date | null>(new Date())
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [contentId, setContentId] = useState('')
  const [status, setStatus] = useState<number>(0)
  const [id, setId] = useState<number | null>(null)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>('')

  // ** State
  const [files, setFiles] = useState<File[]>([])

  const { fileUpload } = CreateContent()
  const { updateContentData } = UpdateContent()

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const handleContent = useCallback((e: SelectChangeEvent) => {
    setContentId(e.target.value)
  }, [])

  const img = files.map((file: FileProp) => (
    <div key={file.name} style={{ display: 'flex', justifyContent: 'center' }}>
      <img key={file.name} alt={file.name} style={{ width: 246, height: 246 }} src={URL.createObjectURL(file as any)} />
      <IconButton onClick={() => handleRemoveFile(file)} size='small'>
        <Close fontSize='large' />
      </IconButton>
    </div>
  ))

  function closeDialogBox() {
    setShow(false)
    setFiles([])
    setDescription('')
    acceptedFiles.length = 0
  }

  const submitData = () => {
    const inputData = {
      title: topic,
      content_text: description,
      date: date,
      content_id: contentId ? contentId : '',
      status: status,
      id: id
    }

    if (id) {
      updateContentData({ file: files[0] }, inputData)
        .then(() => {
          setShow(false)
          setFiles([])
          setDescription('')
          acceptedFiles.length = 0
          setShowErrorMessage(false)
        })
        .catch(ex => {
          setErrorMessage('something went wrong!')
          console.log('user import error!', ex)
          setShowErrorMessage(true)
        })
    } else {
      fileUpload({ file: files[0] }, inputData)
        .then(() => {
          setShow(false)
          setFiles([])
          setDescription('')
          acceptedFiles.length = 0
          setShowErrorMessage(false)
        })
        .catch(ex => {
          setErrorMessage('something went wrong!')
          console.log('user import error!', ex)
          setShowErrorMessage(true)
        })
    }
  }

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('status', event.target.checked)
    setStatus(event.target.checked ? 1 : 0)
  }

  useEffect(() => {
    if (action === 'edit') {
      if (current) {
        setDescription(current.content_text)
        setDate(current.date ? new Date(current.date) : new Date())
        setTopic(current.title)
        setImagePath(current.picture)
        setContentId(current.content_id)
        setStatus(current.status)
        setShowErrorMessage(false)
        setId(current.id)
      }
    } else {
      setDescription('')
      setTopic('')
      setDate(new Date())
      setImagePath('')
      setContentId('')
      setStatus(0)
      setShowErrorMessage(false)
      setId(null)
    }
  }, [current, action])

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={closeDialogBox}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={closeDialogBox} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? 'Edit Content Information ' : 'Create Content Information'}
            </Typography>
          </Box>
          <div id={`content-master`}>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Contents</InputLabel>
                  <Select
                    fullWidth
                    value={contentId}
                    id='select-content'
                    label='Select content'
                    labelId='content-select'
                    onChange={handleContent}
                    inputProps={{ placeholder: 'Select content' }}
                  >
                    <MenuItem value='1'>
                      <Translations text='News' />
                    </MenuItem>
                    <MenuItem value='2'>
                      <Translations text='Announcement' />
                    </MenuItem>
                    <MenuItem value='3'>
                      <Translations text='FAQ' />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <InputLabel style={{ marginBottom: '10px' }}>
                  {' '}
                  Topic <b style={{ color: 'red' }}>*</b>
                </InputLabel>
                {/* <ReactQuill
                  theme='snow'
                  value={topic}
                  onChange={e => {
                    setTopic(e)
                  }}
                  modules={quillModules}
                /> */}

                <Editor
                  apiKey='r3xjktnzb6gaa31wr6tupvyxqzoqwzy77eyn0f251jg8pwvw'
                  onInit={(evt: any, editor: any) => (editorRef.current = editor)}
                  value={topic}
                  onEditorChange={(newValue, editor) => {
                    setTopic(newValue)
                    console.log('editor', editor.getContent({ format: 'text' }))
                  }}
                  init={{
                    plugins:
                      'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar:
                      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

                    height: 160,
                    menubar: false
                  }}
                />
              </Grid>

              {/* <Grid item sm={12} xs={12}>
                <InputLabel style={{ marginBottom: '10px' }}> Content Name <b style={{ color: 'red' }}>*</b> </InputLabel>
                <ReactQuill theme="snow" value={contentName} onChange={(e) => {setContentName(e)}}
                    modules = {quillModules}
                  />
              </Grid> */}

              <Grid item sm={12} xs={12}>
                <InputLabel style={{ marginBottom: '10px' }}> Content Details </InputLabel>
                {/* <ReactQuill
                  theme='snow'
                  value={description}
                  onChange={e => {
                    setDescription(e)
                  }}
                  modules={quillModules}
                /> */}

                <Editor
                  apiKey='r3xjktnzb6gaa31wr6tupvyxqzoqwzy77eyn0f251jg8pwvw'
                  onInit={(evt: any, editor: any) => (editorRef.current = editor)}
                  value={description}
                  onEditorChange={(newValue, editor) => {
                    setDescription(newValue)
                    console.log('editor', editor.getContent({ format: 'text' }))
                  }}
                  init={{
                    plugins:
                      'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar:
                      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

                    height: 500,
                    menubar: false
                  }}
                />
              </Grid>

              <Grid
                item
                sm={12}
                xs={12}
                mt={5}
                pb={3}
                style={{ border: '1px solid #4c4e6430', borderRadius: '1rem', marginLeft: '1.2rem' }}
              >
                <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 320 } : {}}>
                  <input {...getInputProps()} />
                  {files.length ? (
                    img
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                      {imagePath ? (
                        <Img width={200} alt='image' src={'https://cornea-analysis.com/storage/' + imagePath} />
                      ) : (
                        <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
                      )}

                      <Box
                        sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}
                      >
                        <HeadingTypography variant='h5'>Drop image file here or click to upload.</HeadingTypography>
                        <Typography color='textSecondary'>
                          Drop image file here or click{' '}
                          <Link href='/' onClick={handleLinkClick}>
                            browse
                          </Link>{' '}
                          thorough your machine
                        </Typography>
                        <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                        <Typography color='textSecondary'>
                          <Translations text='imageSizeText' />
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={<Switch checked={status == 1 ? true : false} onChange={handleChangeStatus} />}
                    label='Content Status : '
                    labelPlacement='start'
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Date'
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                      inputFormat='dd-MM-yyyy'
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div>
            {showErrorMessage ? (
              <Typography
                variant='body1'
                sx={{ mt: 5, mb: 3, lineHeight: '2rem', display: 'flex', justifyContent: 'center', color: 'red' }}
              >
                {errorMessage}
              </Typography>
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={submitData}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={closeDialogBox}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogContents
