import { SiBluesky } from '@icons-pack/react-simple-icons'
import './App.css'
import { Agent, CredentialSession } from '@atproto/api'
import { useEffect, useState } from 'react'
import type { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import Post from './Post'
import type { blueskyConfig } from './types'
import useThemeSwitcher from './hooks/useThemeSwitcher'

function Panel() {
  const [blueskyConfig, setBlueskyConfig] = useState<blueskyConfig>({blueskyHandle: '', numPosts: 5})
  const [posts, setPosts] = useState<FeedViewPost[]>([])

  useThemeSwitcher()
 
  useEffect(() => {
    const session = new CredentialSession(new URL("https://public.api.bsky.app"))  
    const agent = new Agent(session)
    if (blueskyConfig.blueskyHandle != '') {
      agent.getAuthorFeed({
      actor: blueskyConfig.blueskyHandle, 
      limit: blueskyConfig.numPosts,
      filter: 'posts_no_replies'
    })
      .then((res) => {
        setPosts(res.data.feed)
      })
    }    
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
      <header className='p-4 w-full flex gap-4 bg-gray-900 sticky top-0'>
        <SiBluesky className='text-bluesky' />
        <h1 className='text-light-grey'>Bluesky</h1>
      </header>
      <main className='flex-1 p-4 overflow-scroll'>
        { posts.map(post => <Post key={post.post.uri} post={post} />) }
      </main>
    </div>
  )
}

export default Panel