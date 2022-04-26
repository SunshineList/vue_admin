const formatGender = (value) => {
  if (value === '0') {
    return '未知'
  }
  return value === '1' ? '男' : '女'
}

const formatActive = (value) => {
  return value === true ? '启用' : '冻结'
}

export { formatGender, formatActive }
