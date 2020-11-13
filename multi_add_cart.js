const assert = require('assert')
const API = require('./api')

const productionId = process.argv.slice(2)[0]
const COOKIE_ECC = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.0000000000'
const COOKIE_COOKIE_ECWEBSESS = 'XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.0000000000'
var incart = 0;

function pagedown() {
	var robot = require("robotjs");
	robot.moveMouse(2550,1361);
	robot.mouseClick("left","false");
}

function line_Order() {
	var robot = require("robotjs");
	robot.moveMouse(996, 208);
	robot.moveMouseSmooth(922, 160);
	robot.mouseClick("left","false");
	robot.moveMouse(1271, 975);
	robot.mouseClick("left","false");
}

function address_confirm() {
	var robot = require("robotjs");
	robot.moveMouse(1292,1032);
	robot.mouseClick("left","false");
}

async function test () {
  // console.log('env:')
  // console.log('  PROD_ID:', productionId)
  // console.log('  COOKIE_ECC:', COOKIE_ECC)
  // console.log('  COOKIE_COOKIE_ECWEBSESS:', COOKIE_COOKIE_ECWEBSESS)

  // 設定 cookie
  const api = new API({
    ECC: COOKIE_ECC,
    ECWEBSESS: COOKIE_COOKIE_ECWEBSESS
  })

  // 在加入購物車前，必須先呼叫這支 API，來取得產品狀況
  const snapupResult = await api.snapup(productionId)
  console.log('snapup result:', snapupResult.Status)

  // 加入購物車
  const add2CartResult = await api.add2Cart(productionId, snapupResult, 1)
  console.log('add2Cart result:', add2CartResult.PRODCOUNT)
  incart = add2CartResult.PRODCOUNT
  

  // 成功加入購物車，跳出結帳網頁，手動結帳。
  if(incart == process.argv.slice(2)[1])
  {
    var open = require("open")

    open("https://ecssl.pchome.com.tw/sys/cflow/fsindex/BigCar/BIGCAR/ItemList", "chrome")
	
	// setTimeout(pagedown, 2000)
	// setTimeout(line_Order, 2000)
	// setTimeout(address_confirm, 3000)	
  }
  assert(Number(add2CartResult.PRODCOUNT) > 0 || Number(add2CartResult.PRODADD) > 0)

  /**
   * 取得購物車資料與送出訂單，皆須登入，所以就不測試了
   */
}

test().catch(() => process.exit(1))
