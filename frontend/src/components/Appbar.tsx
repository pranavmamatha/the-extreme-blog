import { Avatar } from "./BlogCard"

export function Appbar(){
    return <div className="border-b flex justify-between px-10 py-4 mb-10">
        <div className="flex justify-center flex-col">
            <div className="text-2xl font-normal">
                e<span className="font-extrabold">X</span>treme
            </div>
        </div>
        <div className="flex justify-center flex-col" >
            <Avatar name="P" size={8}/>
        </div>
    </div>
}