'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, List, Avatar, Spin } from 'antd'
import { DollarCircleOutlined, HistoryOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function WalletOverviewPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()

  const [wallets, setWallets] = useState([
    {
      id: 1,
      balance: 100.0,
      user: { name: 'John Doe', pictureUrl: 'https://example.com/avatar.jpg' },
      dateCreated: '2024-04-30',
      dateUpdated: '2024-05-01',
    },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // if (userId) {
    //   Api.Wallet.findManyByUserId(userId, { includes: ['user'] })
    //     .then(wallets => {
    //       setWallets(wallets)
    //       setLoading(false)
    //     })
    //     .catch(error => {
    //       enqueueSnackbar('Failed to fetch wallets: ' + error.message, {
    //         variant: 'error',
    //       })
    //       setLoading(false)
    //     })
    // }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
          <DollarCircleOutlined style={{ marginRight: '8px' }} /> Wallet
          Overview
        </Title>
        <Text type="secondary">
          Here you can see your current balance and transaction history.
        </Text>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={wallets}
            renderItem={wallet => (
              <List.Item>
                <Card
                  title={`Wallet ID: ${wallet.id}`}
                  extra={<Avatar src={wallet.user?.pictureUrl} />}
                  style={{ width: '100%' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <strong style={{ minWidth: '150px', marginRight: '8px' }}>
                        Balance
                      </strong>
                      <span>${wallet.balance.toFixed(2)}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <strong style={{ minWidth: '150px', marginRight: '8px' }}>
                        Date Created
                      </strong>
                      <span>{wallet.dateCreated}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong style={{ minWidth: '150px', marginRight: '8px' }}>
                        Last Updated
                      </strong>
                      <span>{wallet.dateUpdated}</span>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </PageLayout>
  )
}
