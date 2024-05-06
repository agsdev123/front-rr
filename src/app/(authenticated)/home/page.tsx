'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Statistic, Button, Modal, Form, Input, InputNumber } from 'antd';
import {
  UserOutlined,
  StepForwardOutlined,
  SlidersOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'

import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import axiosInstance from '@web/libraries/axios/axios';

export default function DashboardPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()
  // const [user, setUser] = useState(authentication.user??null)
  const user=authentication.user
  const [userAnalysis, setuserAnalysis] = useState<any | null>(null)

  const [form] = Form.useForm();
  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login again.', {
        variant: 'error',
      })
      return
    }

    const fetchData = async () => {
      try {
        const fetchedUser = await Api.User.userAnalysis()
        console.log('userAnalysis',fetchedUser.analysis)
        setuserAnalysis(fetchedUser.analysis)
        // setUser(fetchedUser)
        // const fetchedActivities = await Api.Activity.findManyByUserId(userId, {
        //   includes: ['steps', 'sleeps'],
        // })
        // setActivities(fetchedActivities)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data: ' + error.message, {
          variant: 'error',
        })
      }
    }

    fetchData()
  }, [userId])



  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Dashboard</Title>
        <Text>Welcome back, {user?.name || 'User'}!</Text>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Steps"
                value={userAnalysis?.totalSteps}
                prefix={<StepForwardOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Sleep Hours"
                value={userAnalysis?.totalSleepHours}
                prefix={<SlidersOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Rank"
                value={userAnalysis?.rank}
                prefix={<SlidersOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card title="Quick Links">
              <Button
                icon={<UserOutlined />}
                onClick={() => router.push('/activity/upload')}
              >
                Upload Activity
              </Button>
              <Button
                icon={<UserOutlined />}
                onClick={() => router.push('/community/stats')}
              >
                Community Stats
              </Button>
            </Card>
          </Col>
        </Row> */}
      </div>
     
    </PageLayout>
  )
}
