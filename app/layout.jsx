import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, Layout } from 'antd'
import Header from './ui/home/header'
import Sider from './ui/home/sider'
import { Content } from 'antd/es/layout/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TakTak',
  description: '仿TikTok的短视频网站',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token，影响范围大
              colorPrimary: 'black',
              borderRadius: 2,
              // 派生变量，影响范围小
              colorBgContainer: 'white',
            },
            components: {
              Button: {
                defaultHoverBorderColor: '#d9d9d9',
                defaultHoverBg:'rgb(247,247,248)',
                defaultBg: '#ffffff',
              },
              Input: {
                activeBorderColor: 'rgb(197,197,201)',
                hoverBorderColor: 'rgb(197,197,201)',
                activeShadow: 'rgb(197,197,201)',
              },
              Menu: {
                itemSelectedBg: 'white',
                itemSelectedColor: 'rgb(254,44,85)',
              },
              Slider:{
                trackBg:'white',
                railBg:'rgb(113,122,112)',
                railHoverBg:'rgb(113,122,112)',
                trackHoverBg:'white',
                handleLineWidth:0,
                handleLineWidthHover:0,
                handleSize:6,
                handleSizeHover:8

              }
            },
          }}
        >
          <AntdRegistry>
            <Layout>
              <Header></Header>
              <Layout className={'h-full'}>
                <Sider></Sider>
                <Content
                  style={{
                    margin: '24px 16px 0',
                    overflow: 'initial',
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
