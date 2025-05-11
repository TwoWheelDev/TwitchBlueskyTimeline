import { SiBluesky } from '@icons-pack/react-simple-icons'
import './App.css'
import { Agent, CredentialSession } from '@atproto/api'
import { useEffect, useState } from 'react'
import type { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import Post from './Post'
import type { blueskyConfig } from './types'
import useThemeSwitcher from './hooks/useThemeSwitcher'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { RefreshCw } from 'lucide-react'
import Loader from './Loader'

function getPosts(config: blueskyConfig, setPosts: (posts: FeedViewPost[]) => void, setIsLoading: (isLoading: boolean) => void) {
  setIsLoading(true)
  const session = new CredentialSession(new URL("https://public.api.bsky.app"))  
  const agent = new Agent(session)
  if (config.blueskyHandle != '') {
    agent.getAuthorFeed({
    actor: config.blueskyHandle, 
    limit: config.numPosts,
    filter: 'posts_no_replies'
  })
    .then((res) => {
      setPosts(res.data.feed)
      setIsLoading(false)
    })
  }   
}

function Panel() {
  const [blueskyConfig, setBlueskyConfig] = useState<blueskyConfig>({blueskyHandle: '', numPosts: 5})
  const [posts, setPosts] = useState<FeedViewPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useThemeSwitcher()
 
  useEffect(() => {
    getPosts(blueskyConfig, setPosts, setIsLoading)  
  }, [blueskyConfig])

  useEffect(() => {
    Twitch.ext.configuration.onChanged(() => {
      const config = Twitch.ext.configuration.broadcaster
      if (config) {
        setBlueskyConfig(JSON.parse(config.content))
      }
    })
  })

  return (
    <div className='h-[500px] w-full flex flex-col bg-white dark:bg-dark-purple text-dark-grey dark:text-light-grey'>
      <header className='p-4 w-full flex justify-between bg-gray-900 sticky top-0'>
        <div className='flex gap-4'>
          <SiBluesky className='text-bluesky' />
          <h1 className='text-light-grey'>Bluesky</h1>
        </div>
        <RefreshCw onClick={() => getPosts(blueskyConfig, setPosts, setIsLoading)} className='text-light-grey hover:cursor-pointer' />
      </header>
      <OverlayScrollbarsComponent className='flex-1' defer>
        <main className='h-full p-4 overflow-scroll'>
          {isLoading ? <Loader /> : posts.map(post => <Post key={post.post.uri} post={post} />) }
        </main>
      </OverlayScrollbarsComponent>
    </div>
  )
}

export default Panel