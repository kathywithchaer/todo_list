import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      Taro.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 如 'test-0gq88'
        env: 'cloud1-0g303f2e825d19a3', // TODO: User needs to replace this or provide it
        traceUser: true,
      })
    }
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
