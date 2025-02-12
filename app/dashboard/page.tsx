import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to DubHere AI</h1>
        <p className="text-muted-foreground">Select a tool from the sidebar to get started</p>
      </div>
    )
  }
  
  