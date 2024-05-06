import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { Typography, Card, Row, Col,Layout, Statistic, Button, Modal, Form, Input, InputNumber } from 'antd';
import {
  UserOutlined,
  StepForwardOutlined,
  SlidersOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import {setItem} from '@web/libraries/localStorage'
import { Api } from '@web/domain'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { ReactNode, useState,useEffect } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'
import axiosInstance from '@web/libraries/axios/axios';

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const user = authentication?.user as Model.User
  const [showPaymentModal, setShowPaymentModal] = useState(user.subscription?.status==='active'?false:true);

  const [razorpayInstance, setRazorpayInstance] = useState<any | null>(null);
  useEffect(() => {
    // Load the Razorpay script asynchronously
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const razorpayInstance = new window.Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
        // Add other Razorpay configuration options as needed
      });
      setRazorpayInstance(razorpayInstance);
    };
    document.body.appendChild(script);
  }, []);

  const showModal = () => {
    setShowPaymentModal(true);
  };
  const onSuccess = async () => {
    try {
      const {user} = await Api.User.findMe()
      setItem('user', JSON.stringify(user));
      authentication.login(user)
      router.push(RouterObject.route.HOME)
      setShowPaymentModal(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong during the initialization', {
        variant: 'error',
      })
    }
  }
  const handleJoinMembership = async () => {
    try {
      // Make an API call to the backend to initiate the subscription process
      const response = await axiosInstance.post('/v1/payments/subscribe', {});
  
      // Handle the response and initiate the Razorpay payment flow
      const { orderId } = response.data;
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: 9900, // Amount in paise (99 INR)
        currency: 'INR',
        name: 'Ayus Club',
        description: '30-day Membership Plan',
        order_id: orderId,
        handler: async (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) => {
          // Handle the successful payment response
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          await verifyPayment(razorpay_order_id, razorpay_payment_id);
        },
        prefill: {
          name: user?.name, // Replace with the user's name
          email: user?.email, // Replace with the user's email
          contact: user?.phoneNumber, // Replace with the user's phone number
        },
        notes: {
          address: 'User Address', // Replace with the user's address (optional)
        },
      };
  
      // Initialize the Razorpay payment flow
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  const verifyPayment = async (razorpayOrderId, razorpayPaymentId) => {
    try {
      // Make an API call to the backend to verify the payment
      await axiosInstance.post('v1/payments/payment/verify', {
        razorpayOrderId,
        razorpayPaymentId,
      });
      // Payment verification successful, handle the success case
      onSuccess()
      console.log('Payment successful');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?._id))
  }

  const itemsLeftbar = [
    {
      key: '/home',
      label: 'Dashboard',
      onClick: () => goTo('/home'),
    },

    // {
    //   key: '/activity/upload',
    //   label: 'Upload Activity',
    //   onClick: () => goTo('/activity/upload'),
    // },

    {
      key: '/health-metrics/add',
      label: 'Add Metrics',
      onClick: () => goTo('/health-metrics/add'),
    },

    {
      key: '/subscription',
      label: 'Subscription',
      onClick: () => goTo('/subscription'),
    },

    {
      key: '/wallet',
      label: 'Wallet',
      onClick: () => goTo('/wallet'),
    },

    // {
    //   key: '/sleep/add',
    //   label: 'Add Sleep',
    //   onClick: () => goTo('/sleep/add'),
    // },

    {
      key: '/community/stats',
      label: 'Community Stats',
      onClick: () => goTo('/community/stats'),
    },
  ]

  const itemsUser = []

  const itemsTopbar = []

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Dashboard',
    },

    {
      key: '/activity/upload',
      label: 'Upload Activity',
    },

    {
      key: '/activity/:id',
      label: 'View Activity',
    },

    {
      key: '/steps/add',
      label: 'Add Steps',
    },

    {
      key: '/sleep/add',
      label: 'Add Sleep',
    },

    {
      key: '/community/stats',
      label: 'Community Stats',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>

      <Modal
        title="Payment"
        visible={showPaymentModal}
        // onCancel={handlePaymentModalCancel}
        footer={null}
        maskClosable={false}
      >
               <div
          // initial={{ opacity: 0, y: 50 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5 }}
        >
          <Card
            title="30-day Membership Plan"
            style={{ textAlign: 'center' }}
            actions={[
              <Button type="primary" onClick={handleJoinMembership}>
                Join Membership
              </Button>,
            ]}
          >
            <Title level={3} style={{ marginBottom: 0 }}>
              ₹99
            </Title>
            <Text type="secondary">for 30 days</Text>
            <ul style={{ marginTop: 16, textAlign: 'left' }}>
              <li>Access to all features</li>
              <li>Priority support</li>
              <li>Exclusive content</li>
            </ul>
          </Card>
        </div>

      </Modal>
    </>
  )
}
