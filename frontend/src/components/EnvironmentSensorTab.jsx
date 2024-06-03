


export default function EnvironmentSensorTab() {


    return (

        <div className="bg-white p-3 rounded-xl border-4 border-solid border-black w-[24rem] mt-2">
            <div className="flex flex-row justify-between">
                <p className="text-2xl pl-2">Temp (C)</p>
                <p className="text-2xl pr-2">30.8</p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="text-2xl pl-2">Pressure (kPa)</p>
                <p className="text-2xl pl-2">99.45</p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="text-2xl pl-2">Humidity (%)</p>
                <p className="text-2xl pl-2">68.5</p>
            </div>
        </div>
    )
}