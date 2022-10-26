import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'

// interface KeywordsProps {
//   indexNumber: number
//   keywords: any
//   setKeywords: any
//   handleKeyword: any
//   handleChangeLabel: any
//   removeKeyword: any
//   value: any
// }

const KeywordForm = (props: any) => {
  const { indexNumber, keywords, setKeywords, removeKeyword, value } = props
  const { keyword_and, keyword_or, keyword_ex } = value

  function handleChangeLabel(i: number, event: any) {

    const values = [...keywords]
    values[i].name = event.target.value
    setKeywords(values)
  }

  function addMoreKeyword(i: number, list: any, current: any, type: any) {
    // keywords

    const newTextKeyword = [...list, '']

    const values = [...keywords]

    if (type === 'keyword_or') {
      console.log(values, i, values[i])
      values[i].keyword_or = newTextKeyword
    }

    if (type === 'keyword_and') {
      values[i].keyword_and = [...list, '']
    }

    if (type === 'keyword_ex') {
      values[i].keyword_ex = [...list, '']
    }

    setKeywords(values)
  }

  function removeTextKeyword(i: number, indexValue: number, list: any, type: any) {

    const values = [...keywords];
    const news = list.filter((item:any, index:number) => index !== i);
    if (type === 'keyword_or') {
      values[indexValue].keyword_or = news
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and = news
    }

    if (type === 'keyword_ex') {
      values[indexValue].keyword_ex = news
    }


    setKeywords(values);
  }

  function handleTextKeyword(i: number, e: any, list: any, current: any, type: any, indexValue: number) {
    let textKeywords
    if (list.length <= 0) {
      textKeywords = [...list, e.target.value]
    } else {
      textKeywords = [...list]
      textKeywords[i] = e.target.value
    }

    const values = [...keywords]

    if (type === 'keyword_or') {
      values[indexValue].keyword_or = textKeywords
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and = textKeywords
    }

    if (type === 'keyword_ex') {
      values[indexValue].keyword_ex = textKeywords
    }

    setKeywords(values)
  }

  return (
    <>
      <Grid container sx={{ py: 4, width: '100%' }}>
        <Grid item xs={12} sx={{ px: 4 }}>
          <Typography variant='subtitle2' className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
            <Close
              fontSize='small'
              onClick={() => {
                removeKeyword(value)
              }}
            />{' '}
            Keyword
          </Typography>

          <TextField
            fullWidth
            multiline
            size='small'
            sx={{ mt: 3.5 }}
            placeholder='Enter Label'
            label='Label'
            value={keywords[indexNumber]?.name || ''}
            onChange={e => handleChangeLabel(indexNumber, e)}
          />
        </Grid>

        <Grid item sm={4} xs={12} sx={{ px: 4 }}>

          {keyword_and.length > 0 &&
          keyword_and.map((text:any, index:number) => {
            return (
              <InputKeyword
                value={value}
                key={index}
                textValue={text}
                handleTextKeyword={handleTextKeyword}
                addMoreKeyword={addMoreKeyword}
                removeTextKeyword={removeTextKeyword}
                list={keyword_and}
                type={'keyword_and'}
                index={index}
                indexValue={indexNumber}
                label={'คำที่ต้องมี (AND)'}
              />
            )
          })}

          {keyword_and.length <= 0 && (
            <InputKeyword
              value={value}
              textValue={''}
              handleTextKeyword={handleTextKeyword}
              removeTextKeyword={removeTextKeyword}
              addMoreKeyword={addMoreKeyword}
              list={keyword_and}
              type={'keyword_and'}
              index={0}
              indexValue={indexNumber}
              label={'คำที่ต้องมี (AND)'}
            />
          )}

        </Grid>

        <Grid item sm={4} xs={12} sx={{ px: 4 }}>
          {keyword_or.length > 0 &&
            keyword_or.map((text:any, index:number) => {
              return (
                <InputKeyword
                  key={index}
                  value={value}
                  textValue={text}
                  handleTextKeyword={handleTextKeyword}
                  addMoreKeyword={addMoreKeyword}
                  removeTextKeyword={removeTextKeyword}
                  list={keyword_or}
                  type={'keyword_or'}
                  index={index}
                  indexValue={indexNumber}
                  label={'คำที่สนใจ (OR)'}
                />
              )
            })}

          {keyword_or.length <= 0 && (
            <InputKeyword
              value={value}
              textValue={''}
              handleTextKeyword={handleTextKeyword}
              removeTextKeyword={removeTextKeyword}
              addMoreKeyword={addMoreKeyword}
              list={keyword_or}
              type={'keyword_or'}
              index={0}
              indexValue={indexNumber}
              label={'คำที่สนใจ (OR)'}
            />
          )}
        </Grid>


        <Grid item sm={4} xs={12} sx={{ px: 4 }}>

          {keyword_ex.length > 0 &&
          keyword_ex.map((text:any, index:number) => {
            return (
              <InputKeyword
                value={value}
                key={index}
                textValue={text}
                handleTextKeyword={handleTextKeyword}
                addMoreKeyword={addMoreKeyword}
                removeTextKeyword={removeTextKeyword}
                list={keyword_ex}
                type={'keyword_ex'}
                index={index}
                indexValue={indexNumber}
                label={'คำที่ห้ามมี (Exclude)'}
              />
            )
          })}

          {keyword_ex.length <= 0 && (
            <InputKeyword
              value={value}
              textValue={''}
              handleTextKeyword={handleTextKeyword}
              removeTextKeyword={removeTextKeyword}
              addMoreKeyword={addMoreKeyword}
              list={keyword_ex}
              type={'keyword_ex'}
              index={0}
              indexValue={indexNumber}
              label={'คำที่ห้ามมี (Exclude)'}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}

const InputKeyword = (props: any) => {
  const {
    value,
    textValue,
    handleTextKeyword,
    addMoreKeyword,
    removeTextKeyword,
    list,
    indexValue,
    type,
    label,
    index
  } = props
  const [text, setText] = useState(textValue)

  function handleChangeText(e:any, index:any, indexValue:any) {
    setText(e.target.value)
    handleTextKeyword(index, e, list, value, type, indexValue)
  }

  return (
    <>
      <span style={{ display: 'flex' }}>
        <TextField
          fullWidth
          multiline
          size='small'
          sx={{ mt: 3.5 }}
          placeholder={label}
          label={label}
          value={text}
          onChange={e => handleChangeText(e, index, indexValue)}
        />
        {list.length > 1 && (
          <Close fontSize='small' sx={{ mt: 5.5 }} onClick={() => removeTextKeyword(index, indexValue, list, type)} />
        )}
        <br />
      </span>
      <Button
        sx={{ mt: '3%', p: '0px' }}
        size='small'
        variant='contained'
        startIcon={<Plus fontSize='small' />}
        onClick={() => {
          addMoreKeyword(indexValue, list, value, type)
        }}
      ></Button>
    </>
  )
}

export default KeywordForm
