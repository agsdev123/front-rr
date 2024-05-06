'use client'
import { Button, Form, Input } from 'antd'
import { MrbPasswordStrength } from '@web/designSystem'
type Props = {
  isLoading: boolean
  onSubmit: (values: any) => void
}

export const RegisterForm = ({ isLoading, onSubmit }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  const password = Form.useWatch('password', form)

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'UserName is required' }]}
      >
        <Input placeholder="Enter Your Name" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          { required: true, message: 'Phone number is required' },
          {
            pattern: /^[0-9]{10}$/,
            message: 'Please enter a valid phone number',
          }, // Assuming 10-digit phone number
        ]}
      >
        <Input type="tel" placeholder="Your phone number" autoComplete="tel" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input type="email" placeholder="Your email" autoComplete="email" />
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
      <MrbPasswordStrength value={password} className="mb-3" />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
