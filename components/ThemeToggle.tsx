'use client';

import * as React from 'react';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';
import {Button} from "@/components/ui/button";

export function ThemeToggle() {
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  };

  return (
    <div className='ml-auto mr-2'>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === 'light' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
        )}
      </Button>
    </div>
  );
}
