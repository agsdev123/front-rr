'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Image, Space } from 'antd'
import {
  UserOutlined,
  PictureOutlined,
  StepForwardOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ViewActivityPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()
  const [activity, setActivity] = useState<Model.Activity | null>()

  useEffect(() => {
    // if (!userId) {
    //   enqueueSnackbar('User not authenticated', { variant: 'error' })
    //   router.push('/home')
    //   return
    // }

    const fetchActivity = async () => {
      try {
        const activityData = await Api.Activity.findOne(params.id, {
          includes: ['user', 'steps', 'sleeps', 'pictures'],
        })
        setActivity(activityData)
      } catch (error) {
        enqueueSnackbar('Failed to load activity data', { variant: 'error' })
      }
    }

    fetchActivity()
  }, [userId, params.id, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Activity Details</Title>
      <Text type="secondary">Detailed view of your recorded activity.</Text>
      {/* {activity ? ( */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="Activity Information">
            <Row gutter={16}>
              <Col span={8}>
                <Card type="inner" title="User Information">
                  <Space direction="vertical">
                    <Text>
                      <UserOutlined /> {activity?.user?.name}
                    </Text>
                    <Text>Email: {activity?.user?.email}</Text>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card type="inner" title="Activity Stats">
                  <Space direction="vertical">
                    <Text>
                      <StepForwardOutlined /> Steps:{' '}
                      {activity?.steps?.reduce(
                        (acc, step) => acc + (step?.stepCount || 0),
                        0,
                      )}
                    </Text>
                    <Text>
                      <ClockCircleOutlined /> Sleep Hours:{' '}
                      {activity?.sleeps?.reduce(
                        (acc, sleep) => acc + (sleep?.hoursSlept || 0),
                        0,
                      )}
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card type="inner" title="Activity Date">
                  <Text>{dayjs(activity?.date).format('MMMM D, YYYY')}</Text>
                </Card>
              </Col>
            </Row>
          </Card>
          <Card title="Activity Pictures">
            <Row gutter={16}>
              {activity?.pictures?.map(picture => (
                <Col key={picture.id} span={8}>
                  <Card
                    hoverable
                    cover={<Image alt="Activity" src={picture?.imageUrl} />}
                  >
                    <Card.Meta
                      title={
                        <Text>
                          <PictureOutlined /> Activity Picture
                        </Text>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Space>
      {/* ) : (
        <Text>Loading activity details...</Text>
      )} */}
    </PageLayout>
  )
}
