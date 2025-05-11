import { SiBluesky } from '@icons-pack/react-simple-icons'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import type { blueskyConfig } from './types'
import useThemeSwitcher from './hooks/useThemeSwitcher'

function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const blueskyHandle = form.elements.namedItem('blueskyHandle') as HTMLInputElement
    const numPosts = form.elements.namedItem('numPosts') as HTMLInputElement

    const config: blueskyConfig = {
        blueskyHandle: blueskyHandle.value,
        numPosts: Number(numPosts.value)
    }

    Twitch.ext.configuration.set('broadcaster', '1', JSON.stringify(config))

    const submitBtn = form.elements.namedItem('submitBtn') as HTMLInputElement
    submitBtn.value = "Saved!"
}

function Config() {
    const [blueskyHandle, setBlueskyHandle] = useState<string>(() => {
        const config = Twitch.ext.configuration.broadcaster;
        if (config) {
            const parsedConfig: blueskyConfig = JSON.parse(config.content);
            return parsedConfig.blueskyHandle || '';
        }
        return '';
    });

    const [numPosts, setNumPosts] = useState<number>(() => {
        const config = Twitch.ext.configuration.broadcaster;
        if (config) {
            const parsedConfig: blueskyConfig = JSON.parse(config.content);
            return parsedConfig.numPosts || 5;
        }
        return 5;
    });
    const submitBtn = useRef<HTMLInputElement | null>(null)

    useThemeSwitcher()

    useEffect(() => {
        // Listen for configuration changes
        Twitch.ext.configuration.onChanged(() => {
            const config = Twitch.ext.configuration.broadcaster;
            
            if (config) {
                    const parsedConfig: blueskyConfig = JSON.parse(config.content)

                    console.log(parsedConfig)

                    setBlueskyHandle(parsedConfig.blueskyHandle)
                    setNumPosts(parsedConfig.numPosts)
            }
        });
    }, []);

    return (
        <div className='w-1/2 flex flex-col bg-white dark:bg-dark-purple text-dark-grey dark:text-light-grey'>
          <header className='p-4 w-full flex gap-4 bg-gray-900 sticky top-0'>
            <SiBluesky className='text-bluesky' />
            <h1 className='text-light-grey'>Bluesky Configuration</h1>
          </header>
          <main className='flex-1 p-4 overflow-scroll'>
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col'>
                <label>
                    Bluesky Handle:
                    <input
                        name='blueskyHandle'
                        type='text'
                        placeholder='username.bsky.social'
                        defaultValue={blueskyHandle}
                        onChange={() => {
                            if (submitBtn.current) {
                                submitBtn.current.value = "Save"
                            }                            
                        }}
                        className='border rounded-md border-light-grey p-2 w-full'
                    />
                </label>
                <label>
                    Number of posts:
                    <input
                        name='numPosts'
                        type='number'
                        defaultValue={numPosts}
                        min={1}
                        max={25}
                        onChange={() => {
                            if (submitBtn.current) {
                                submitBtn.current.value = "Save"
                            }                            
                        }}
                        className='border rounded-md border-light-grey p-2 w-full'
                    />
                </label>
                <input 
                    name='submitBtn'
                    type='submit'
                    value='Save'
                    ref={submitBtn}
                    className='bg-twitch-purple rounded-md p-2 mt-2 text-light-grey'
                />
            </form>
          </main>
        </div>
      )
}

export default Config