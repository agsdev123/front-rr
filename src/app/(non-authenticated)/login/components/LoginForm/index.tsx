'use client'
import { useConfiguration } from '@web/core/configuration'
import { Button, Flex, Form, Input } from 'antd'

type Props = {
  isLoading: boolean
  onSubmit: (values: { emailOrPhone: string; password: any }) => void
}

export const LoginForm = ({ isLoading, onSubmit }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  const initialValues = { name: null, email: null, phoneNumber: null }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
      requiredMark={false}
    >
      <Form.Item
        label="Email or Mobile Number"
        name="emailOrPhone"
        rules={[
          { required: true, message: 'Phone number is required' },
          // {
          //   pattern: /^[0-9]{10}$/,
          //   message: 'Please enter a valid phone number',
          // }, 
          
          // Assuming 10-digit phone number
        ]}
      >
        <Input
          type="tel"
          placeholder="Email or Mobile Number"
          autoComplete="tel"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}
