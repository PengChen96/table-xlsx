const isPercentage = (str:string)=> {
  const percentageRegex = /^\d+(\.\d+)?%$/
  return percentageRegex.test(str)
}

const getSheetRawTypeFn = (raw:boolean, value:any)=>{
  if (raw && typeof value === 'number') return 'n'
  if (!isNaN(Number(value))) return 'n'
  if (isPercentage(value)) return 'n'
  return 's'
}

const getSheetRawValueFn = (value:any)=>{
  if (isPercentage(value)) return parseFloat(value) / 100
  return value
}

const getSheetRawNumberFormattingFn = (value:any)=>{
  const percentageRegex = /[1-9]/g
  let newValueStr = ''
  if (isPercentage(value)) {
    newValueStr =  parseFloat(value).toString().replace(percentageRegex, '0')
    return `${newValueStr}%`
  }
  if(!isNaN(Number(value))){
    const formatter = new Intl.NumberFormat('en-US');
    const formattedNumber = formatter.format(value);
    newValueStr =  formattedNumber.toString().replace(percentageRegex, '0')
    return newValueStr
  }
  return undefined
}

export {
  getSheetRawTypeFn,
  getSheetRawValueFn,
  getSheetRawNumberFormattingFn
}
