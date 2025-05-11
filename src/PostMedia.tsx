import type { $Typed, AppBskyEmbedExternal, AppBskyEmbedImages, AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia, AppBskyEmbedVideo } from "@atproto/api";
// import ReactHlsPlayer from "react-hls-video-player";
import EmbeddedPost from "./EmbeddedPost";
import { isViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import { lazy, Suspense } from "react";

interface PostMediaProps {
    media: $Typed<AppBskyEmbedImages.View | AppBskyEmbedExternal.View | AppBskyEmbedVideo.View | AppBskyEmbedRecord.View | AppBskyEmbedRecordWithMedia.View | { $type: string }>;
}

const ReactHlsPlayer = lazy(() => import("react-hls-video-player"));

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
    switch (media.$type) {
        case "app.bsky.embed.images#view":
            { 
                const gridCols = (media as AppBskyEmbedImages.View).images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                return (
                    <div className={"mt-2 grid gap-2 " + gridCols}>
                        {(media as AppBskyEmbedImages.View).images.map((image) => (
                            <img
                                key={image.thumb}
                                src={image.thumb}
                                alt={image.alt}
                                className="rounded-lg"
                                loading="lazy"
                            />
                        ))}
                    </div>
                ); 
            }
        case "app.bsky.embed.video#view": {
            const video = media as AppBskyEmbedVideo.View;
            return (
                <Suspense fallback={<div>Loading video...</div>}>
                    <ReactHlsPlayer
                        src={video.playlist}
                        controls={true}
                        width="100%"
                        height="auto"
                        className="mt-2 rounded-lg"
                    />
                </Suspense>
            );
            }
        // TODO This needs testing
        case "app.bsky.embed.external#view":
            {
                const external = media as AppBskyEmbedExternal.View;
                return (
                    <a
                        href={external.external.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <h4 className="font-bold">{external.external.title}</h4>
                        <p className="text-sm text-gray-500">{external.external.description}</p>
                    </a>
                );
            }
        case "app.bsky.embed.record#view":
            {
                const record = media as AppBskyEmbedRecord.View;
                if (isViewRecord(record.record)) {
                    return (
                        <div className="mt-2 p-2 border rounded-lg">
                            <EmbeddedPost post={record.record as AppBskyEmbedRecord.ViewRecord} />
                        </div>
                    );
                }
                return
            }
        case "app.bsky.embed.recordWithMedia#view":
            {
                const recordWithMedia = media as AppBskyEmbedRecordWithMedia.View;
                const embeddedRecord = recordWithMedia.record.record as AppBskyEmbedRecord.ViewRecord
                return (
                    <div>
                        <PostMedia media={recordWithMedia.media} />
                        <div className="mt-2 p-2 border rounded-lg">
                            <EmbeddedPost post={embeddedRecord} />
                        </div>
                    </div>
                );
            }
        default:
            return <p>Unsupported media type: {media.$type}</p>;
    }
};

export default PostMedia