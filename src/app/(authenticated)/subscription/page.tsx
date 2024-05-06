'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Select, Modal } from 'antd'
import { PlusOutlined, SyncOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import axiosInstance from '@web/libraries/axios/axios'

export default function ManageSubscriptionPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()

  const [subscriptions, setSubscriptions] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId) {
      fetchUserSubscriptions()
      fetchSubscriptionPlans()
    }
  }, [userId])

  const fetchUserSubscriptions = async () => {
    setLoading(true)
    try {
      const userSubscriptions = await axiosInstance.get('v1/user/plan')
      console.log('userSubscriptions',userSubscriptions?.data?.subscriptionPlan)
      setSubscriptions([userSubscriptions?.data?.subscriptionPlan])
      // setSubscriptions(userSubscriptions)
    } catch (error) {
      enqueueSnackbar('Failed to fetch subscriptions', { variant: 'error' })
    }
    setLoading(false)
  }

  const fetchSubscriptionPlans = async () => {
    // try {
    //   const subscriptionPlans = await Api.SubscriptionPlan.findMany()
    //   setPlans(subscriptionPlans)
    // } catch (error) {
    //   enqueueSnackbar('Failed to fetch subscription plans', {
    //     variant: 'error',
    //   })
    // }
  }

  const handleRenew = async subscriptionId => {
    // try {
    //   await Api.UserSubscription.updateOne(subscriptionId, {
    //     endDate: dayjs().add(1, 'year').format('YYYY-MM-DD'),
    //   })
    //   enqueueSnackbar('Subscription renewed successfully', {
    //     variant: 'success',
    //   })
    //   fetchUserSubscriptions()
    // } catch (error) {
    //   enqueueSnackbar('Failed to renew subscription', { variant: 'error' })
    // }
  }

  const handleDelete = async subscriptionId => {
    // try {
    //   await Api.UserSubscription.deleteOne(subscriptionId)
    //   enqueueSnackbar('Subscription deleted successfully', {
    //     variant: 'success',
    //   })
    //   fetchUserSubscriptions()
    // } catch (error) {
    //   enqueueSnackbar('Failed to delete subscription', { variant: 'error' })
    // }
  }

  const handlePlanChange = async (subscriptionId, planId) => {
    // try {
    //   await Api.UserSubscription.updateOne(subscriptionId, {
    //     subscriptionPlanId: planId,
    //   })
    //   enqueueSnackbar('Subscription plan updated successfully', {
    //     variant: 'success',
    //   })
    //   fetchUserSubscriptions()
    // } catch (error) {
    //   enqueueSnackbar('Failed to update subscription plan', {
    //     variant: 'error',
    //   })
    // }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Manage Subscriptions</Title>
      <Text type="secondary">
        Here you can renew, change, or delete your subscription plans.
      </Text>
      <Row gutter={16} style={{ marginTop: 20 }}>
        {subscriptions?.map(subscription => (
          <Col key={subscription.id} lg={8} md={12} sm={12}>
            <Card
              title={subscription?.name}
            //   extra={
            //     <Button
            //       icon={<DeleteOutlined />}
            //       onClick={() => handleDelete(subscription.id)}
            //     />
            //   }
              actions={[
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => handleRenew(subscription.id)}
                >
                  Renew
                </Button>,
                // <Select
                //   defaultValue={subscription.subscriptionPlanId}
                //   style={{ width: 120 }}
                //   onChange={value => handlePlanChange(subscription.id, value)}
                // >
                //   {plans.map(plan => (
                //     <Option key={plan.id} value={plan.id}>
                //       {plan.name}
                //     </Option>
                //   ))}
                // </Select>,
              ]}
            >
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <strong style={{ minWidth: '150px', marginRight: '8px' }}>Price</strong>
    <span>${subscription?.amount}</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <strong style={{ minWidth: '150px', marginRight: '8px' }}>Duration</strong>
    <span>{subscription?.duration?.value} days</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <strong style={{ minWidth: '150px', marginRight: '8px' }}>Start Date</strong>
    <span>{dayjs(subscription?.createdAt).format('YYYY-MM-DD')}</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <strong style={{ minWidth: '150px', marginRight: '8px' }}>End Date</strong>
    <span>{subscription?.createdAt && subscription?.duration?.value
  ? dayjs(subscription.createdAt).add(subscription.duration.value, 'days').format('YYYY-MM-DD')
  : null
}</span>
  </div>
</div>


            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}