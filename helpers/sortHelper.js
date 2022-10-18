function sortDescending(a, b, key = null){
  if(key) {
    if(a[key] > b[key]) return -1
    if(a[key] < b[key]) return 1
    return 0
  }
  
  if(a > b) return -1
  if(a < b) return 1
  return 0
}

function sortAscending(a, b, key = null){
  if(key) {
    if(a[key] > b[key]) return -1
    if(a[key] < b[key]) return 1
    return 0
  }
  
  if(a > b) return -1
  if(a < b) return 1
  return 0
}

module.exports = {
  sortAscending,
  sortDescending
}