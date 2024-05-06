'use client'

import { useState } from 'react'
import { Button, Upload, message, Typography, Row, Col } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Dragger } = Upload
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UploadActivityPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?._id
  const { enqueueSnackbar } = useSnackbar()
  const [fileList, setFileList] = useState([])

  const handleUpload = async options => {
    const { file } = options
    try {
      const imageUrl = await Api.Upload.upload(file)
      const newPicture = await Api.Picture.createOneByActivityId(params.id, {
        imageUrl,
      })
      setFileList(fileList => [
        ...fileList,
        { uid: newPicture.id, url: imageUrl, status: 'done' },
      ])
      enqueueSnackbar('Picture uploaded successfully!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload picture.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24} md={12} lg={8}>
          <Title level={2}>Upload Your Daily Health Activity Pictures</Title>
          <Text type="secondary">
            Add pictures related to your daily health activities to keep track
            and share your progress.
          </Text>
          <Dragger
            fileList={fileList}
            customRequest={handleUpload}
            maxCount={1}
            accept="image/*"
            beforeUpload={file => {
              const isLt2M = file.size / 1024 / 1024 < 2
              if (!isLt2M) {
                message.error('Image must smaller than 2MB!')
                return Upload.LIST_IGNORE
              }
              return true
            }}
            onRemove={file => {
              setFileList(fileList.filter(f => f.uid !== file.uid))
            }}
            iconRender={() => (
              <InboxOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
            )}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other band files
            </p>
          </Dragger>
        </Col>
      </Row>
    </PageLayout>
  )
}
