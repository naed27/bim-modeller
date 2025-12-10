import { cn } from "@/lib/utils";
import NivoPie from "./simple/nivo-pie";
import NivoBar from "./simple/nivo-bar";
import NivoRadar from "./simple/nivo-radar";
import NivoBullet from "./simple/nivo-bullet";
import NivoSwarmplot from "./simple/nivo-swarmplot";
import { memo, useEffect, useMemo, useState } from "react";
import NivoStream from "@/components/nivo/simple/nivo-stream";
import { generateRandomPieData } from "./mock-datas/mock-data-pie";
import { generateRandomBarData } from "./mock-datas/mock-data-bar";
import { generateRandomRadarData } from "./mock-datas/mock-data-radar";
import { generateRandomBulletData } from "./mock-datas/mock-data-bullet";
import { generateRandomSwarmData } from "./mock-datas/mock-data-swarmplot";
import { generateRandomStreamData } from "@/components/nivo/mock-datas/mock-data-stream";

const MemoizedPie = memo(NivoPie);
const MemoizedBar = memo(NivoBar);
const MemoizedRadar = memo(NivoRadar);
const MemoizedStream = memo(NivoStream);
const MemoizedBullet = memo(NivoBullet);
const MemoizedSwarm = memo(NivoSwarmplot);

function SmartChartDemo({
    className,
    type = 'bar',
    refreshData = false,
    refreshDataInterval = 1000
}:{
    className?: string
    refreshData?: boolean
    refreshDataInterval?: number
    type?: 'bar' | 'stream' | 'pie' | 'line' | 'swarmplot' | 'radar' | 'heatmap' | 'bullet'
}) {

    const dataMocker = useMemo(()=>{
        if(type === 'pie') return generateRandomPieData
        if(type === 'bar') return generateRandomBarData
        if(type === 'radar') return generateRandomRadarData
        if(type === 'stream') return generateRandomStreamData
        if(type === 'bullet') return generateRandomBulletData
        if(type === 'swarmplot') return generateRandomSwarmData
        return ()=>[]
    },[type])

    const [data, setData] = useState(dataMocker());

    useEffect(() => {
        if(!refreshData) return
        const interval = setInterval(() => setData(dataMocker()), refreshDataInterval);
        return () => clearInterval(interval);
    }, [dataMocker, refreshDataInterval, refreshData]);

    return (
        <div className={cn("rounded-md", className)}>
            {(()=>{
                if(type === 'pie') return <MemoizedPie data={data}/>
                if(type === 'bar') return <MemoizedBar data={data}/>
                if(type === 'radar') return <MemoizedRadar data={data}/>
                if(type === 'stream') return <MemoizedStream data={data}/>
                if(type === 'bullet') return <MemoizedBullet data={data}/>
                if(type === 'swarmplot') return <MemoizedSwarm data={data}/>
                return null
            })()}
        </div>
    );
}

export default memo(SmartChartDemo)
