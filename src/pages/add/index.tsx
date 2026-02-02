import { View, Text, Input, Picker, Textarea, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

const PRIORITY_OPTIONS = ['重要且紧急', '重要不紧急', '紧急不重要', '不紧急不重要']

export default function Add() {
    const [title, setTitle] = useState('')
    const [priorityIndex, setPriorityIndex] = useState(0)
    const [description, setDescription] = useState('')

    const handleSave = () => {
        if (!title.trim()) {
            Taro.showToast({ title: '请输入标题', icon: 'none' })
            return
        }

        const db = Taro.cloud.database()
        const tasksCollection = db.collection('tasks')

        Taro.showLoading({ title: '保存中...' })

        tasksCollection.add({
            data: {
                title,
                priority: Number(priorityIndex),
                description,
                createTime: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }),
                status: 'pending'
            },
            success: function (res) {
                console.log(res)
                Taro.hideLoading()
                Taro.showToast({ title: '保存成功', icon: 'success' })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 500)
            },
            fail: function (err) {
                console.error(err)
                Taro.hideLoading()
                Taro.showToast({ title: '保存失败', icon: 'none' })
            }
        })
    }

    return (
        <View className='add-page'>
            <View className='form-group'>
                <View className='form-item'>
                    <Text className='label'>任务标题：</Text>
                    <Input
                        className='input'
                        placeholder='请输入'
                        value={title}
                        onInput={e => setTitle(e.detail.value)}
                    />
                </View>

                <View className='form-item'>
                    <Text className='label'>优先级：</Text>
                    <Picker
                        mode='selector'
                        range={PRIORITY_OPTIONS}
                        value={priorityIndex}
                        onChange={e => setPriorityIndex(Number(e.detail.value))}
                    >
                        <View className='picker-value'>
                            {PRIORITY_OPTIONS[priorityIndex]}
                            <Text className='arrow'>▼</Text>
                        </View>
                    </Picker>
                </View>

                <View className='form-item vertical'>
                    <Text className='label'>任务描述：</Text>
                    <Textarea
                        className='textarea' // Note: textarea usually needs explicit styling
                        placeholder='请输入描述'
                        value={description}
                        onInput={e => setDescription(e.detail.value)}
                    />
                </View>
            </View>

            <Button className='save-btn' onClick={handleSave}>
                保存
            </Button>
        </View>
    )
}
