var min = 1024
  , max = 65535
  ;

function values (obj) {
  var vals = []
  for( var key in obj ) {
    if ( obj.hasOwnProperty(key) ) {
      vals.push(obj[key])
    }
  }
  return vals
}

function hashport (str) {
  var num = 0
  for (var i=0;i<str.length;i++) {
    num += str.charCodeAt(i)
  }

  num = num * str.length

  if (num > max){
    while (num > max) {
      num = num - (str.length + str.charAt(str.length - 5))
    }
  }

  if (num < min){
    while (num < min) {
      num = num + (str.length + str.charAt(str.length - 5))
    }
  }

  return num
}

module.exports = hashport

function makeTable (hosts) {
  var table = {}
  hosts.forEach(function (h) {
    table[h] = hashport(h)
  })
  return table
}

module.exports.table = function table (hosts) {
  var table = makeTable(hosts)
    , vals = values(table)
    , _conflicts = conflicts(table)
    ;

  if (_conflicts.length) {
    throw new Error('Conflict! '+Object.keys(table)[_conflicts[0]]+' and '+Object.keys(table)[_conflicts[1]])
  }

  return table
}

function conflicts (hosts) {
  var table
  if (Array.isArray(hosts)) {
    table = makeTable(hosts)
  } else {
    table = hosts
  }

  var vals = values(table)
    , conflicts = []
    ;
  vals.forEach(function (v, i) {
    if (vals.indexOf(v, i+1) !== -1) conflicts.push([i, vals.indexOf(v, i+1)])
  })
  return conflicts
}

module.exports.conflicts = conflicts