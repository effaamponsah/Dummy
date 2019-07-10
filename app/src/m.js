export const hello = {
me(){
fetch("http://moscophones.com/index.php?route=feed/rest_api/session",{
    headers: {
        "Content-Type": "text/plain",
        "X-Oc-Merchant-Id": "123"
      },
    method: 'GET'
})
.then((r) => r.json())
.then((res) => {
console.log(res)
})
.catch((e) => {
console.log('Error', e)})
}
}