// https://stackoverflow.com/questions/55151041/window-is-not-defined-in-next-js-react-app/57848309#57848309

import dynamic from 'next/dynamic'

const DynamicDashboard = dynamic(
  () => import('./PersesDashboardProviders'),
  { ssr: false }
)

function DynamicDashboardComponent() {
  return (
    <div>
      <DynamicDashboard />
      <p>TESTER DynamicDashboard</p>
    </div>
  )
}

export default DynamicDashboardComponent
