'use client'

import React, { useState } from 'react'
import { Button, Form, InputNumber, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddSleepPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [hours, setHours] = useState<number>()

  const handleSubmit = async () => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }
    if (hours == null || hours <= 0) {
      enqueueSnackbar('Please enter a valid number of hours', {
        variant: 'error',
      })
      return
    }

    try {
      setLoading(true)
      const today = dayjs().format('YYYY-MM-DD')
      const activity = await Api.Activity.createOneByUserId(userId, {
        type: 'Sleep',
        date: today,
        userId: userId,
      })

      await Api.Sleep.createOneByActivityId(activity.id, {
        hoursSlept: hours,
        activityId: activity.id,
      })

      enqueueSnackbar('Sleep hours added successfully', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to add sleep hours', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <ClockCircleOutlined /> Add Sleep Hours
        </Title>
        <Text type="secondary">
          Enter the number of hours you slept last night.
        </Text>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Hours of Sleep"
            required
            tooltip="This is a required field"
          >
            <InputNumber
              min={1}
              max={24}
              onChange={value => {
                if (typeof value === 'number') {
                  setHours(value)
                }
              }}
              value={hours}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
