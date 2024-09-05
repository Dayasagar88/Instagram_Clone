import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPosts from '@/hooks/useGetAllPosts'
import useSuggestedUser from '@/hooks/useSuggestedUser'

const Home = () => {
  useGetAllPosts();
  useSuggestedUser();
  return (
    <div className='flex'>
      <div className='flex mx-auto '>
        <Feed/>
        <Outlet/>
      </div>
      <RightSidebar/>
    </div>
  )
}

export default Home