import { View, Text, ScrollView, Button, Image, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useRef } from 'react'
import './index.scss'

interface Task {
  id: number
  title: string
  priority: number
  description: string
  createTime: string
  status: 'pending' | 'processed'
}

interface UserInfo {
  avatarUrl: string
  nickName: string
}

const PRIORITY_MAP = {
  0: { label: '重要且紧急', color: '#ff4d4f' },
  1: { label: '重要不紧急', color: '#faad14' },
  2: { label: '紧急不重要', color: '#13c2c2' },
  3: { label: '不紧急不重要', color: '#bfbfbf' }
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<'pending' | 'processed'>('pending')
  const [tasks, setTasks] = useState<Task[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useDidShow(async () => {
    // 1. Fetch UserInfo
    const storedUserInfo = Taro.getStorageSync('userInfo')
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    }

    // 2. Fetch Tasks from Local Storage
    const storedTasks = Taro.getStorageSync('tasks') || []
    setTasks(storedTasks)
  })

  // Handle Login / Action Sheet
  const handleAvatarClick = () => {
    if (!userInfo) {
      // If not logged in, trigger login directly
      handleLogin()
    } else {
      // If logged in, show options
      Taro.showActionSheet({
        itemList: ['更新用户信息', '退出登录'],
        itemColor: '#333',
        success: (res) => {
          if (res.tapIndex === 0) {
            // Update Info
            handleLogin()
          } else if (res.tapIndex === 1) {
            // Logout
            handleLogout()
          }
        }
      })
    }
  }

  const isLoggingIn = useRef(false) // Prevent double clicks

  // Actual Login Logic
  const handleLogin = () => {
    if (isLoggingIn.current) return
    isLoggingIn.current = true

    console.log('handleLogin called');
    Taro.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const { userInfo: authUserInfo } = res
        const newUserInfo = {
          avatarUrl: authUserInfo.avatarUrl,
          nickName: authUserInfo.nickName
        }
        setUserInfo(newUserInfo)
        Taro.setStorageSync('userInfo', newUserInfo)
        Taro.showToast({ title: '更新成功', icon: 'success' })
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        // Reset lock after a short delay to allow next attempt
        setTimeout(() => {
          isLoggingIn.current = false
        }, 1000)
      }
    })
  }

  const handleLogout = () => {
    setUserInfo(null)
    Taro.removeStorageSync('userInfo')
    Taro.showToast({ title: '已退出', icon: 'none' })
  }

  const handleComplete = (id: string) => {
    const db = Taro.cloud.database()
    db.collection('todos').doc(id).update({
      data: {
        status: 'processed'
      },
      success: function (res) {
        // Optimistic update locally
        const updatedTasks = tasks.map(t =>
          t._id === id ? { ...t, status: 'processed' as const } : t
        )
        setTasks(updatedTasks)
        Taro.showToast({ title: '已完成', icon: 'success' })
      },
      fail: console.error
    })
  }

  // const handleDelete = (id: number) => {
  //   const updatedTasks = tasks.filter(t => t.id !== id)
  //   setTasks(updatedTasks)
  //   Taro.setStorageSync('tasks', updatedTasks)
  // }

  const navigateToAdd = () => {
    Taro.navigateTo({ url: '/pages/add/index' })
  }

  const filteredTasks = tasks.filter(t => t.status === activeTab)

  return (
    <View className='index'>
      {/* Login Modal (Only show when NOT logged in) */}
      {!userInfo && (
        <View className='login-modal-mask'>
          <View className='login-modal'>
            <View className='modal-title'>欢迎使用</View>
            <View className='modal-desc'>为了同步您的任务数据，请授权登录</View>
            <Button className='modal-login-btn' onClick={handleLogin}>
              微信授权登录
            </Button>
          </View>
        </View>
      )}

      {/* Tabs */}
      <View className='tabs'>
        <View
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          待处理
        </View>
        <View
          className={`tab ${activeTab === 'processed' ? 'active' : ''}`}
          onClick={() => setActiveTab('processed')}
        >
          已处理
        </View>

        {/* Avatar - Far Right */}
        {userInfo && (
          <View className='tab-avatar'>
            <Button
              style={{
                padding: 0,
                margin: 0,
                background: 'transparent',
                lineHeight: 1,
                border: 'none',
                display: 'flex'
              }}
              onClick={handleAvatarClick}
            >
              <Image className='mini-avatar' src={userInfo.avatarUrl} />
            </Button>
          </View>
        )}
      </View>

      {/* Task List */}
      <ScrollView className='task-list' scrollY>
        {filteredTasks.length === 0 ? (
          <View className='empty-state'>暂无数据</View>
        ) : (
          filteredTasks.map(task => (
            <View key={task.id} className='task-card'>
              <View className='task-left'>
                <View className='task-icon-bar' />
                <View className='task-content'>
                  <View className='task-header'>
                    <Text className='task-title'>{task.title}</Text>
                    {activeTab === 'pending' && <View className='check-btn' onClick={() => handleComplete(task.id)}>✔</View>}
                  </View>
                  <View className='task-meta'>
                    <Text>创建时间：{task.createTime}</Text>
                  </View>
                  <View className='task-meta'>
                    <Text>优先级：</Text>
                    <Text style={{ color: PRIORITY_MAP[task.priority]?.color, fontWeight: 'bold' }}>
                      {PRIORITY_MAP[task.priority]?.label}
                    </Text>
                  </View>
                  <View className='task-desc'>
                    <Text className='label'>任务描述：</Text>
                    <Text className='value'>{task.description.slice(0, 20)}{task.description.length > 20 ? '...' : ''}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <View className='fab' onClick={navigateToAdd}>
        <Text className='fab-icon'>+</Text>
      </View>
    </View>
  )
}
