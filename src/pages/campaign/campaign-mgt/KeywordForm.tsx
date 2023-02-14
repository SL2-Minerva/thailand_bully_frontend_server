import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import { Color, ColorPicker, createColor } from 'material-ui-color'

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

  const { keyword_and, keyword_or, keyword_exclude, keyword_or_color, keyword_and_color } = value

  function handleChangeLabel(i: number, event: any) {
    const values = [...keywords]
    values[i].name = event.target.value
    setKeywords(values)
  }

  function handleChangeColor(event: any, i: number) {
    const values = [...keywords]
    values[i].colors = '#' + event.hex
    setKeywords(values)
  }

  function addMoreKeyword(i: number, list: any, current: any, type: any) {
    // keywords

    const newTextKeyword = [...list, '']

    const values = [...keywords]

    if (type === 'keyword_or') {
      // console.log(values, i, values[i])
      values[i].keyword_or = newTextKeyword
    }

    if (type === 'keyword_and') {
      values[i].keyword_and = [...list, '']
    }

    if (type === 'keyword_exclude') {
      values[i].keyword_exclude = [...list, '']
    }

    setKeywords(values)
  }

  function removeTextKeyword(i: number, indexValue: number, list: any, type: any) {
    const values = [...keywords]
    const news = list.filter((item: any, index: number) => index !== i)
    if (type === 'keyword_or') {
      values[indexValue].keyword_or = news
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and = news
    }

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude = news
    }

    setKeywords(values)
  }

  const addMoreKeywordColors = (i: number, colorList: any, current: any, type: any) => {
    console.log('colorlist', colorList)
    const newKeywordColor = [...colorList, '']

    const values = [...keywords]

    if (type === 'keyword_or') {
      // console.log(values, i, values[i])
      values[i].keyword_or_color = newKeywordColor
    }

    if (type === 'keyword_and') {
      values[i].keyword_and_color = [...colorList, '']
    }

    if (type === 'keyword_exclude') {
      values[i].keyword_exclude_color = [...colorList, '']
    }

    setKeywords(values)
  }

  const removeKeywordColors = (i: number, indexValue: number, colorList: any, type: any) => {
    const values = [...keywords]
    const news = colorList.filter((item: any, index: number) => index !== i)
    if (type === 'keyword_or') {
      values[indexValue].keyword_or_color = news
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and_color = news
    }

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude_color = news
    }

    setKeywords(values)
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

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude = textKeywords
    }

    setKeywords(values)
  }

  function handlChangeKeywordColors(i: number, e: any, colorList: any, current: any, type: any, indexValue: number) {
    let keywordsColor
    const hashColor = '#' + e.hex
    if (colorList.length <= 0) {
      keywordsColor = [...colorList, hashColor]
    } else {
      keywordsColor = [...colorList]
      keywordsColor[i] = hashColor
    }

    const values = [...keywords]

    setKeywords(values)

    if (type === 'keyword_or') {
      values[indexValue].keyword_or_color = keywordsColor
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and_color = keywordsColor
    }
    setKeywords(values)
  }

  return (
    <>
      <Grid container sx={{ py: 4, width: '100%' }}>
        <Grid item xs={11} sx={{ px: 4 }} style={{ marginBottom: '15px' }}>
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

        <Grid item xs={1} sx={{ mt: 12 }}>
          {keyword_and.length > 0 && !keyword_and[0] && !keyword_or[0] && !keyword_exclude[0] ? (
            <ColorPicker
              hideTextfield={true}
              value={keywords[indexNumber]?.colors ? keywords[indexNumber]?.colors : createColor('#fff')}
              onChange={(color: Color) => {
                handleChangeColor(color, indexNumber)
              }}
            />
          ) : (
            ''
          )}
        </Grid>

        <Grid item sm={4} xs={12} sx={{ px: 4 }}>
          {keyword_and &&
            keyword_and.length > 0 &&
            keyword_and.map((text: any, index: number) => {
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
                  colorList={keyword_and_color || []}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                />
              )
            })}

          {!keyword_and ||
            (keyword_and.length <= 0 && (
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
                colorList={keyword_and_color || []}
                handlChangeKeywordColors={handlChangeKeywordColors}
                addMoreKeywordColors={addMoreKeywordColors}
                removeKeywordColors={removeKeywordColors}
              />
            ))}
        </Grid>

        <Grid
          item
          sm={4}
          xs={12}
          sx={{ px: 4 }}
          style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}
        >
          {keyword_or &&
            keyword_or.length > 0 &&
            keyword_or.map((text: any, index: number) => {
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
                  colorList={keyword_or_color || []}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                />
              )
            })}

          {!keyword_or && keyword_or.length <= 0 && (
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
              colorList={keyword_or_color || []}
              handlChangeKeywordColors={handlChangeKeywordColors}
              addMoreKeywordColors={addMoreKeywordColors}
              removeKeywordColors={removeKeywordColors}
            />
          )}
        </Grid>
        <Grid item sm={4} xs={12} sx={{ px: 4 }}>
          {keyword_exclude &&
            keyword_exclude.length > 0 &&
            keyword_exclude.map((text: any, index: number) => {
              return (
                <InputKeyword
                  value={value}
                  key={index}
                  textValue={text}
                  handleTextKeyword={handleTextKeyword}
                  addMoreKeyword={addMoreKeyword}
                  removeTextKeyword={removeTextKeyword}
                  list={keyword_exclude}
                  type={'keyword_exclude'}
                  index={index}
                  indexValue={indexNumber}
                  label={'คำที่ห้ามมี (Exclude)'}
                  colorList={[]}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                />
              )
            })}

          {!keyword_exclude ||
            (keyword_exclude.length <= 0 && (
              <InputKeyword
                value={value}
                textValue={''}
                handleTextKeyword={handleTextKeyword}
                removeTextKeyword={removeTextKeyword}
                addMoreKeyword={addMoreKeyword}
                list={keyword_exclude}
                type={'keyword_exclude'}
                index={0}
                indexValue={indexNumber}
                label={'คำที่ห้ามมี (Exclude)'}
                colorList={[]}
                handlChangeKeywordColors={handlChangeKeywordColors}
                addMoreKeywordColors={addMoreKeywordColors}
                removeKeywordColors={removeKeywordColors}
              />
            ))}
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
    index,
    color,
    handlChangeKeywordColors,
    addMoreKeywordColors,
    removeKeywordColors,
    colorList
  } = props
  const [text, setText] = useState(textValue)
  const [keywordColor, setKeywordColor] = useState(color || createColor('#ED5D5D'))
  const [keywordColors, setKeywordColors] = useState(createColor('#70D477'))
  useEffect(() => {
    setText(textValue)
  }, [textValue])

  function handleChangeText(e: any, index: any, indexValue: any) {
    setText(e.target.value)
    handleTextKeyword(index, e, list, value, type, indexValue)
  }

  return (
    <>
      <span style={{ display: 'flex' }}>
        {label === 'คำที่สนใจ (OR)' ? (
          <Grid sx={{ display: 'flex' }}>
            <span style={{ marginTop: 15 }}>
              {text ? (
                <ColorPicker
                  hideTextfield={true}
                  value={keywordColors}
                  onChange={(color: Color) => {
                    setKeywordColors(color)
                    handlChangeKeywordColors(index, color, colorList, value, type, indexValue)
                  }}
                />
              ) : (
                ''
              )}
            </span>

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
          </Grid>
        ) : (
          <>
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
          </>
        )}

        {list.length > 1 && (
          <Close
            fontSize='small'
            sx={{ mt: 5.5 }}
            onClick={() => {
              removeTextKeyword(index, indexValue, list, type)
              removeKeywordColors(index, indexValue, colorList, type)
            }}
          />
        )}
        <br />
      </span>

      {list.length === index + 1 && (
        <>
          {label === 'คำที่สนใจ (OR)' ? (
            <Grid sx={{ display: 'flex', mt: 3 }}>
              <Button
                sx={{ mt: '3%', p: '0px' }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => {
                  addMoreKeyword(indexValue, list, value, type)
                  addMoreKeywordColors(indexValue, colorList, value, type)
                }}
              ></Button>
            </Grid>
          ) : label === 'คำที่ต้องมี (AND)' ? (
            <Grid sx={{ display: 'flex', mt: 3 }}>
              <Button
                sx={{ mt: '3%', p: '0px', mr: 4 }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => {
                  addMoreKeyword(indexValue, list, value, type)
                }}
              ></Button>
              <span style={{ marginTop: 5 }}>
                {(text && index == 0) || index > 0 ? (
                  <ColorPicker
                    hideTextfield={true}
                    value={keywordColor}
                    onChange={(color: Color) => {
                      setKeywordColor(color)
                      handlChangeKeywordColors(index, color, colorList, value, type, indexValue)
                    }}
                  />
                ) : (
                  ''
                )}
              </span>
            </Grid>
          ) : (
            <Grid sx={{ display: 'flex', mt: 3 }}>
              <Button
                sx={{ mt: '3%', p: '0px', mr: 4 }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => {
                  addMoreKeyword(indexValue, list, value, type)
                }}
              ></Button>
            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default KeywordForm
