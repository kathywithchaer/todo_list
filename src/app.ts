import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      Taro.cloud.init({
        // env: 'your-env-id', // Optional: if using default env
        traceUser: true,
      })
    }
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
