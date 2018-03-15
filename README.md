### (非官方) PChome API

可以透過 API 來達到自動訂購。

#### APIs

- login - 登入 PChome。
      以帳號密碼登入 PChome。
- add2Cart - 將產品加入購物車。
      給入產品 ID 和數量，例如「DYAPC0-A90084I39-000」，注意最後一部分是規格編號，通常不會在網址上出現。
- getCartInfo - 取得購物車當前資訊。
- order - 訂購。
      目前只支援貨到付款，倘若目前訂單不支援貨到付款則無法使用。(例如訂單中的貨物從不同倉庫發貨的情況)

#### 聲明

此 API 不保證流程能完全符合 PChome 官方，僅測試過可以成功訂購，所以若無法使用或造成任何損失，我可不負責任的喔。