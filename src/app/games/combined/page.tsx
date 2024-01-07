import ResourceCollection from "@/components/combinedGames/resourceCollection";
import { ReactNode } from "react";

export default function Combined() {
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-end mb-4">
                <button className="bg-gray-300 text-black mr-2 px-5 py-2 rounded">Import</button>
                <button className="bg-blue-500 text-white px-5 py-2 rounded">Export</button>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">General information</h2>
                    </div>
                </div>
            
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Resource Collection</h2>
                        <ResourceCollection/>
                    </div>
                </div>
            
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Charging method</h2>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}