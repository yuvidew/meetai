"use client";
import { Button } from '@/components/ui/button'
import { Plus, XCircleIcon } from 'lucide-react'
import { useState } from 'react';
import { AgentListDialog } from './agent-dialog';
import { useAgentsFilters } from '../hooks/use-agents-filter';
import { AgentsSearchFilter } from './agents-search-filter';
import { DEFAULT_PAGE } from '@/constants';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


export const AgentsListHeader = () => {
  const [filters , setFilters] = useAgentsFilters();
  const [isOpen , setIsOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search : "",
      page : DEFAULT_PAGE
    })
  }

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

      {/* start to search filter */}
      <ScrollArea>
      <div className=' flex items-center gap-x-2 p-1'>
        <AgentsSearchFilter/>
        {isAnyFilterModified && (
          <Button 
            variant={"outline"}
            onClick={onClearFilters} 
            size={"sm"}
          >
            <XCircleIcon/>
            Clear
          </Button>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* end to search filter */}
    </div>
    </>
  )
}

