var hashport = require('./')
  , assert = require('assert')
  , hosts =
    [ "localhost"
    , "localv6"
    , "oakjs"
    , "mikeal"
    , "cotton"
    , "metrics"
    , "verify"
    , "nodeconf"
    , "hoodies"
    , "leaks"
    , "jsregistry"
    , "localcouch"
    , "offliner"
    , "developer.yammer.io"
    , "morph"
    , "results"
    , "yamdev"
    , "jsbbq"
    , "dev.gather.at"
    , "logs.gather.at"
    , "joyent.gather.at"
    , "pouch02.gather.at"
    , "pouch002.gather.at"
    , "dev.earlyalameda.com"
    , "earlyalameda.com"
    , "dev.pouch.io"
    , "joyent.getable.com"
    , "joyent.tmpnews.com"
    ]

hashport.table(hosts)
assert.equal(hashport.conflicts(hosts).length, 0)

hosts.push("dveeloper.yammer.io")

assert.equal(hashport.conflicts(hosts).length, 1)


var passed = false
try {
  hasport.table(hosts)
} catch(e) {
  passed = true
}

assert.equal(passed, true)
