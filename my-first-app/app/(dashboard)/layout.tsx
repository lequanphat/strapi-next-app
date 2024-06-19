import React, { ReactNode } from 'react'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <h1>This is dashboard layout</h1>
      {children}
    </div>
  )
}

export default DashboardLayout
