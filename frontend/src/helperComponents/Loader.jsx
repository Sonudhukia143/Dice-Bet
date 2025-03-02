export default function Loader({ props  }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-10 backdrop-blur-md z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
                <p className="mt-4 text-blue text-lg font-semibold">{!props && "Loading"} {props && props}</p>
            </div>
        </div>
    );
}