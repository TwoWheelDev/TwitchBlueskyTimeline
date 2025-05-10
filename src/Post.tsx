import { type FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Heart, Repeat, Reply } from "lucide-react";
import React from "react";
import { truncateString } from "./helpers";
import PostMedia from "./PostMedia";

interface PostProps {
    post: FeedViewPost;
}

const postUrl = (uri: string, handle: string) => {    
    const postKey = uri?.split("/").splice(-1)
    return `https://bsky.app/profile/${handle}/post/${postKey}`
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <a href={postUrl(post.post.uri, post.post.author.handle)} target="_blank">
            <div className="border-b border-gray-500">
                <div className="flex items-center space-x-3">
                    <img
                        className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700"
                        src={post.post.author.avatar}
                        alt={post.post.author.displayName}
                        loading="lazy"
                    />
                    <div className="flex flex-col items-start justify-between mb-2">
                        <span className="text-sm">{truncateString(post.post.author.displayName, 25)}</span>
                        <span className="text-xs text-gray-500">@{post.post.author.handle}</span>
                        <span className="text-xs text-gray-500">{new Date(post.post.record.createdAt as string).toLocaleString('en-us', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        })}</span>
                    </div>
                </div>

                <p>{post.post.record['text'] as string}</p>

                {post.post.embed && <PostMedia media={post.post.embed} />}

                <div className="flex flex-row justify-evenly py-4">
                    <span className="flex flex-row items-center gap-2">
                        <Reply size={16} />{post.post.replyCount}
                    </span>
                    <span className="flex flex-row items-center gap-2">
                        <Repeat size={16} />
                        {post.post.repostCount}
                    </span>
                    <span className="flex flex-row items-center gap-2">
                        <Heart size={16} />
                        {post.post.likeCount}
                    </span>
                </div>
            </div>
        </a>
    );
};

export default Post;