import React from 'react';
import {createAvatar} from "@dicebear/core";
import {botttsNeutral , initials} from "@dicebear/collection";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface GeneratedAvatarProps {
  seed : string;
  className?: string;
  variant : "botttsNeutral" | "initials";
}

/**
 * Renders a generated avatar using the DiceBear avatar collection.
 *
 * @param seed - The seed string used to generate the avatar.
 * @param className - Optional CSS class for styling the avatar.
 * @param variant - The avatar style variant, either "botttsNeutral" or "initials".
 */
export const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatarProps) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  }else{
    avatar = createAvatar(initials, {
      seed,
      fontWeight : 500,
      fontSize: 42,
    });
  }

  return (
  
      <Avatar className={cn(className)}>
        <AvatarImage src={avatar.toDataUri()} alt="Generated Avatar" className={className} />
        <AvatarFallback className={className}>{seed.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    
  )
}
