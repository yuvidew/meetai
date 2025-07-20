"use client";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { MeetingListDialog } from './meeting-dialog';
import { useState } from 'react';
// import { AgentListDialog } from './agent-dialog';
// import { useAgentsFilters } from '../hooks/use-agents-filter';
// import { AgentsSearchFilter } from './agents-search-filter';


export const MeetingsListHeader = () => {
  const [isOpen , setIsOpen] = useState(false)

  return (
    <>
    {/* start to meeting - list - dialog */}
    <MeetingListDialog open = {isOpen} onOpenChange={setIsOpen}  />
    {/* end to meeting - list - dialog */}
    
    <div className=' py-4 px-4 md:px-8 flex flex-col gap-y-4'>
      {/* start to header text and button */}
      <div className=' flex items-center justify-between'>
        <h4 className=' font-medium text-xl'>My Meetings</h4>
        <Button onClick={() => setIsOpen(true)}>
          <Plus/>
          New Meeting
        </Button>
      </div>
      {/* end to header text and button */}

      {/* start to search filter */}
      <div className=' flex items-center gap-x-2 p-1'>
        {/* <AgentsSearchFilter/> */}
        TODO : filters
      </div>
      {/* end to search filter */}
    </div>
    </>
  )
}

