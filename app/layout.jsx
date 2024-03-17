import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

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
            components:{
              Button:{
                defaultHoverBorderColor:'#d9d9d9',
                defaultBg:'#ffffff'
              },
              Input:{
                activeBorderColor:'rgb(197,197,201)',
                hoverBorderColor:'rgb(197,197,201)',
                activeShadow:'rgb(197,197,201)'
              },
              Menu:{
                itemSelectedBg:'white',
                itemSelectedColor:'rgb(254,44,85)'

              }
            }
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
