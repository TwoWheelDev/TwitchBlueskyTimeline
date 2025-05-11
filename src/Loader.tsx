import { ThreeCircles } from "react-loader-spinner";

const Loader: React.FC = () => {
    return (
        <div className="flex h-full place-items-center justify-center">
            <ThreeCircles color='#6441A4' />
        </div>
        
    )
    
}

export default Loader