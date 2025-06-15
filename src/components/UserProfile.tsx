
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ProfileSettingsPopover from './ProfileSettingsPopover';
import { User } from 'lucide-react';

const UserProfile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-accent transition-colors">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>
                <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <ProfileSettingsPopover />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
