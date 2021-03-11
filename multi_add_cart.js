const assert = require('assert')
const API = require('./api')

const productionId = process.argv.slice(2)[0]
const COOKIE_ECC = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.0000000000'
const COOKIE_COOKIE_ECWEBSESS = 'XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.0000000000'
var incart = 0;

// function pagedown() {
	// var robot = require("robotjs");
	// robot.moveMouse(2550,1361);
	// robot.mouseClick("left","false");
// }

// function line_Order() {
	// var robot = require("robotjs");
	// robot.moveMouse(996, 208);
	// robot.moveMouseSmooth(922, 160);
	// robot.mouseClick("left","false");
	// robot.moveMouse(1271, 975);
	// robot.mouseClick("left","false");
// }

// function address_confirm() {
	// var robot = require("robotjs");
	// robot.moveMouse(1292,1032);
	// robot.mouseClick("left","false");
// }

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
	console.log("number correct, start process checkout")
	// setTimeout(pagedown, 2000)
	// setTimeout(line_Order, 2000)
	// setTimeout(address_confirm, 3000)	
	
	/* 2021/3/11 update */
	const primePriceInfo = (await api.prodCouponInfo())
    .ProdIDs.map((id) => ({
      ProdId: id,
      PrimeInfo:{}
    }))
	const res = await api.getCartInfo({
		CouponInfo: JSON.stringify({ prodCouponData: [] }),
		PrimePriceInfo: JSON.stringify(primePriceInfo)
	  })
	// console.log((res.shoppingFee) ? '要運費' : '免運費')
	// console.log((res.payment.COD.status === 'Y') ? '可貨到付款' : '不可貨到付款')
	// if (res.shoppingFee /* 需要運費 */ || res.payment.COD.status === 'N' /* 無法貨到付款 */) {
		// return console.log('取消流程')
	// }

	// 送出訂單
	const result = await api.order({
    payWay: 'COD' || 'ATM' || 'IBO', // COD 為貨到付款、ATM 為 ATM 付款、IBO 為 ibon 付款
    cusName: 'ALiangLiang',
    cusMobile: '0987654321',
    cusZip: '30010',
    cusAddress: '新竹市東區大學路1001號',
    recName: 'ALiangLiang',
    recMobile: '0987654321',
    recZip: '30010',
    recAddress: '新竹市東區大學路1001號'
  })
	
	if (result.status === 'ERR') {
    throw new Error(result.msg)
  }
  console.log(result)
	var open = require("open")

    open("https://ecvip.pchome.com.tw/web/order/all", "chrome")
  }
  assert(Number(add2CartResult.PRODCOUNT) > 0 || Number(add2CartResult.PRODADD) > 0)

  /**
   * 取得購物車資料與送出訂單，皆須登入，所以就不測試了
   */
}

test().catch(console.error)
