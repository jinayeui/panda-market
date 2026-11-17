import { Outlet } from 'react-router';

export default function Contents() {
  return (
    <div className='page-contents'>
      <Outlet />
    </div>
  );
}
