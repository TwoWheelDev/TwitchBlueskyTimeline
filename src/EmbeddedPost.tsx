import type { AppBskyEmbedRecord } from "@atproto/api";
import { truncateString } from "./helpers";
import PostMedia from "./PostMedia";

interface EmbeddedPostProps {
    post: AppBskyEmbedRecord.ViewRecord
}

const EmbeddedPost: React.FC<EmbeddedPostProps> = ({ post }) => {
    return (
        <div>
            <div className="flex items-center space-x-3">
                <img
                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700"
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    loading="lazy"
                />
                <div className="flex flex-col items-start justify-between mb-2">
                    <span className="text-sm">{truncateString(post.author.displayName, 25)}</span>
                    <span className="text-xs text-gray-500">@{post.author.handle}</span>
                    <span className="text-xs text-gray-500">{new Date(post.value.createdAt as string).toLocaleString('en-us', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    })}</span>
                </div>
            </div>

            <p>{post.value.text as string}</p>

            {post.embeds && Array.isArray(post.embeds) && post.embeds.map((embed) => (
                <PostMedia key={post.uri} media={embed} />
            ))}
        </div>
    );
}

export default EmbeddedPost