// 默认厦门演示环境
let rootConfig = {
  rootUrl: 'http://xm.xmipop.com/xipop',
  indexUrl: 'http://www.xmipop.com'
}
if (location.host.indexOf('localhost') === 0) {
  rootConfig = {
    rootUrl: '//' + location.host + '/xipop',
    indexUrl: '//' + location.host
  }
}
// 测试环境
if (location.host.indexOf('192.168.0.155:3002') > -1) {
  rootConfig = {
    rootUrl: 'http://192.168.0.155:8078',
    indexUrl: 'http://192.168.0.155:3002'
  }
}
// 正式环境
if (location.host.indexOf('112.48.134.160:3002') > -1) {
  rootConfig = {
    rootUrl: 'http://112.48.134.160:8092',
    indexUrl: 'http://112.48.134.160:3002'
  }
}
// 政务云测试环境
if (location.host.indexOf('112.48.134.160:4001') > -1) {
  rootConfig = {
    rootUrl: '//112.48.134.160:4001/xmsebeapi',
    indexUrl: '//112.48.134.160:4001'
  }
}
// 正式域名环境
if (location.host.indexOf('ipop.scjg.xm.gov.cn') > -1) {
  rootConfig = {
    rootUrl: 'https://ipop.scjg.xm.gov.cn/xmsebeapi',
    indexUrl: 'https://ipop.scjg.xm.gov.cn/xmsebe'
  }
}
// 拾贝测试环境
if (location.host.indexOf('test') === 0) {
  rootConfig = {
    rootUrl: 'https://testxipop.ipsebe.com/xipop',
    indexUrl: 'http://112.48.134.160:3002'
  }
}
export default rootConfig