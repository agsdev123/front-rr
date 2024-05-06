'use client'

import { useEffect, useState } from 'react'
import { Typography, Statistic, Row, Col, Card } from 'antd'
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CommunityStatsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const [totalSteps, setTotalSteps] = useState<number>(0)
  const [averageSleep, setAverageSleep] = useState<number>(0)

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      enqueueSnackbar('You must be logged in to view this page', {
        variant: 'error',
      })
      router.push('/home')
      return
    }

    const fetchData = async () => {
      try {
        const activities = await Api.Activity.findMany({
          includes: ['steps', 'sleeps'],
        })
        const stepsData = activities.flatMap(activity => activity.steps ?? [])
        const sleepData = activities.flatMap(activity => activity.sleeps ?? [])

        const totalStepsCount = stepsData.reduce(
          (acc, step) => acc + (step.stepCount ?? 0),
          0,
        )
        const totalSleepHours = sleepData.reduce(
          (acc, sleep) => acc + (sleep.hoursSlept ?? 0),
          0,
        )
        const averageSleepHours =
          sleepData.length > 0 ? totalSleepHours / sleepData.length : 0

        setTotalSteps(totalStepsCount)
        setAverageSleep(averageSleepHours)
      } catch (error) {
        enqueueSnackbar('Failed to fetch community statistics', {
          variant: 'error',
        })
      }
    }

    fetchData()
  }, [authentication.isAuthenticated, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Community Statistics</Title>
      <Paragraph>
        This page provides an overview of aggregated statistics from all users,
        such as total steps walked and average hours slept.
      </Paragraph>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Steps Walked"
              value={totalSteps}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Average Hours Slept"
              value={averageSleep.toFixed(2)}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
