import { CombinedGameState } from "@/app/games/combined/combinedGamePageReducer";

type ResourceHeaderProps = {
    state: CombinedGameState;
};

export default function ResourceHeader({ state }: ResourceHeaderProps) {
    return (
        <div className="flex justify-between">
            <p className="text-white mr-2 px-5 py-2 rounded">{`Iron: ${state.resources.iron} - ${state.resourceCollection.resourceRateMap.iron}/s`}</p>
            <p className="text-white mr-2 px-5 py-2 rounded">{`Gold: ${state.resources.gold} - ${state.resourceCollection.resourceRateMap.gold}/s`}</p>
            <p className="text-white mr-2 px-5 py-2 rounded">{`Diamond: ${state.resources.diamond} - ${state.resourceCollection.resourceRateMap.diamond}/s`}</p>
        </div>
    );
}
