"use client";
import { Button } from '@/components/ui/button'
import { Plus, XCircleIcon } from 'lucide-react'
import { MeetingListDialog } from './meeting-dialog';
import { useState } from 'react';
import { MeetingsSearchFilter } from './meetings-search-filter';
import { StatusFilter } from './status-filter';
import { AgentIdFilter } from './Agent-id-filter';
import { useMeetingsFilters } from '../hooks/use-meetings-filter';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DEFAULT_PAGE } from '@/constants';
// import { AgentListDialog } from './agent-dialog';
// import { useAgentsFilters } from '../hooks/use-agents-filter';
// import { AgentsSearchFilter } from './agents-search-filter';


export const MeetingsListHeader = () => {
  const [isOpen , setIsOpen] = useState(false);
  const [filters , setFilters] = useMeetingsFilters();

  const isAnyFilterModified = !!filters.status || !!filters.search || !! filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status : null,
      agentId : "",
      search : "",
      page : DEFAULT_PAGE
    })
  }

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

      {/* start to search status and agentId filter */}
      <ScrollArea>
        <div className=' flex items-center gap-x-2 p-1'>
          <MeetingsSearchFilter/>
          <StatusFilter/>
          <AgentIdFilter/>

          {isAnyFilterModified && (
            <Button variant={"outline"} onClick={onClearFilters}>
              <XCircleIcon className=' size-4' />
              Clear
            </Button>
          )}
        </div>
        <ScrollBar orientation= "horizontal" />
      </ScrollArea>
      {/* end to search status and agentId filter */}
    </div>
    </>
  )
}

