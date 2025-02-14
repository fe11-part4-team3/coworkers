'use client';

import { DeviceType, useDeviceType } from '@/contexts/DeviceTypeContext';
import useUser from '@/hooks/useUser';
import DarkmodeToggle from '@/components/DarkmodeToggle';

import Logo from './Logo';
import HeadersGnb from './HeadersGnb';
import HeadersSideNav from './HeadersSideNav';
import HeadersProfileDropDown from './HeadersProfileDropDown';

function renderGnb(type: DeviceType) {
  return type === 'mobile' ? <HeadersSideNav /> : <HeadersGnb />;
}

function Headers() {
  const deviceType = useDeviceType();

  const { user } = useUser();

  return (
    <header className="fixed z-40 flex w-full items-center border-b bg-b-secondary transition-all">
      <div className="mx-auto flex h-pr-60 w-pr-1280 items-center justify-between px-pr-40 mo:px-pr-16 ta:px-pr-25">
        <div className="flex items-center gap-x-pr-24 mo:flex-row-reverse mo:gap-x-pr-16">
          <Logo className="mo:flex-1" />
          {user && renderGnb(deviceType)}
        </div>

        <div className="flex items-center">
          <DarkmodeToggle />
          {user && <HeadersProfileDropDown />}
        </div>
      </div>
    </header>
  );
}

export default Headers;
