import { Inter } from 'next/font/google'
import '../globals.css'
import { Content } from 'antd/es/layout/layout'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, FloatButton, Layout } from 'antd'
import Header from '../ui/home/header'
import Sider from '../ui/home/sider'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'TakTak',
  description: '仿TikTok的短视频网站'
}

export default function RootLayout({ children, detail }) {
  return (
    <html lang="en">
      <body className="text-black min-w-[500px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'black',
              borderRadius: 2,
              colorBgContainer: 'white'
            },
            components: {
              Button: {
                defaultHoverBorderColor: '#d9d9d9',
                defaultHoverBg: 'rgb(247,247,248)',
                defaultBg: '#ffffff',
                defaultActiveBg: 'rgb(229,229,230)',
                defaultActiveBorderColor: '#d9d9d9'
              },
              Input: {
                activeBorderColor: 'rgb(197,197,201)',
                hoverBorderColor: 'rgb(197,197,201)',
                activeShadow: 'rgb(197,197,201)'
              },
              Menu: {
                itemSelectedBg: 'white',
                itemSelectedColor: 'rgb(254,44,85)'
              },
              Slider: {
                trackBg: 'white',
                railBg: 'rgb(113,122,112)',
                railHoverBg: 'rgb(113,122,112)',
                trackHoverBg: 'white',
                handleLineWidth: 0,
                handleLineWidthHover: 0,
                handleSize: 6,
                handleSizeHover: 8
              }
            }
          }}
        >
          <AntdRegistry>
            <div className="overflow-hidden w-screen h-screen relative">
              <div className="absolute left-0 top-0 bottom-0 -right-[17px] overflow-x-hiden overflow-y-auto">
                {detail}
              </div>
              <div className="absolute h-screen w-screen overflow-x-hiden ">
                <Layout>
                  <Header></Header>
                  <Layout className={'!h-screen pt-[64px] w-full !bg-white'} hasSider>
                    <Sider></Sider>
                    <Content>{children}</Content>
                  </Layout>
                </Layout>
              </div>
            </div>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
