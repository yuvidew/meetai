"use client";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react';
import { AgentListDialog } from './agent-list-dialog';


export const AgentsListHeader = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
    {/* start to agent - list - dialog */}
    <AgentListDialog open = {isOpen} onOpenChange={setIsOpen}  />
    {/* end to agent - list - dialog */}
    
    <div className=' py-4 px-4 md:px-8 flex flex-col gap-y-4'>
      {/* start to header text and button */}
      <div className=' flex items-center justify-between'>
        <h4 className=' font-medium text-xl'>My Agent</h4>
        <Button onClick={() => setIsOpen(true)}>
          <Plus/>
          New Agent
        </Button>
      </div>
      {/* end to header text and button */}
    </div>
    </>
  )
}

