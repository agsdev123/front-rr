'use client'

import { Button, Form, InputNumber, Typography } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddStepsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()
  const [stepCount, setStepCount] = useState<number>(0)

  const handleStepSubmit = async (values: any) => {
    if (!userId) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      return
    }

    console.log('values',values)
    

    try {

      await Api.Activity.createOne(values)
      enqueueSnackbar('Steps added successfully!', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to add steps', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Add Your Daily Steps and Seelp Hours</Title>
        <Text type="secondary">
          Enter the number of steps you walked today and the hours of sleep you
          got last night.
        </Text>
        <Form
          layout="vertical"
          onFinish={handleStepSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            label="Number of Steps"
            name="stepCount"
            rules={[{ required: true, message: 'Please input your steps!' }]}
          >
            <InputNumber
              min={1}
              onChange={value => setStepCount(value)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Hours of Sleep"
            name="sleepHours"
            rules={[
              { required: true, message: 'Please input your sleep hours!' },
            ]}
          >
            <InputNumber
              min={1}
              // onChange={value => setSleepHours(value)}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
