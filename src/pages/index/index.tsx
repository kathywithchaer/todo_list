import { View, Text, ScrollView, Button, Image, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
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

  useDidShow(() => {
    const storedTasks = Taro.getStorageSync('tasks') || []
    setTasks(storedTasks)
    const storedUserInfo = Taro.getStorageSync('userInfo')
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    }
  })

  // Handle Login (WeChat Authorization)
  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料', // Required by WeChat
      success: (res) => {
        const { userInfo: authUserInfo } = res
        const newUserInfo = {
          avatarUrl: authUserInfo.avatarUrl,
          nickName: authUserInfo.nickName
        }
        setUserInfo(newUserInfo)
        Taro.setStorageSync('userInfo', newUserInfo)
        Taro.showToast({ title: '登录成功', icon: 'success' })
      },
      fail: (err) => {
        console.error(err)
        Taro.showToast({ title: '您拒绝了授权', icon: 'none' })
      }
    })
  }

  const handleComplete = (id: number) => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? { ...t, status: 'processed' as const } : t
    )
    setTasks(updatedTasks)
    Taro.setStorageSync('tasks', updatedTasks)
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
      {/* User Profile Header */}
      <View className='profile-header'>
        {!userInfo?.avatarUrl ? (
          <View className='login-section'>
            <Button className='avatar-btn' openType='chooseAvatar' onChooseAvatar={onChooseAvatar}>
              <View className='avatar-placeholder' />
            </Button>
            <Text className='login-tip'>点击头像登录</Text>
          </View>
        ) : (
          <View className='user-info'>
            <Button className='avatar-btn' openType='chooseAvatar' onChooseAvatar={onChooseAvatar}>
              <Image className='avatar' src={userInfo.avatarUrl} />
            </Button>
            <Input
              className='nickname-input'
              type='nickname'
              placeholder='请输入昵称'
              value={userInfo.nickName}
              onBlur={onNicknameBlur}
            />
          </View>
        )}
      </View>

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
