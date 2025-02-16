import ImageCard from "@/components/ImageCard";
import VideoCard from "@/components/VideoCard";

export default function Dashboard({assets, searchTerm, setSearchTerm}) {
    return (
        <main>
            <h2>Storage with AI for images</h2>
            <input
                className={'main-search'}
                placeholder={"Search in Storage"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={"uploads-container"}>
                {assets?.map((asset) => (asset.resource_type == "image" &&
                    <ImageCard key={asset.asset_id} asset={asset}/> ||
                    <VideoCard key={asset.asset_id} asset={asset}/>)
                )}
            </div>
        </main>
    )
}