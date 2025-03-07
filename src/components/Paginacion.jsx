export function Paginacion ({page, adelantar, atrasar}){

    return(
        <div className="mt-5 flex flex-row justify-center">
            <div
                onClick={atrasar} 
                className="cursor-pointer rounded-lg w-20 h-12 m-3  bg-slate-400 flex justify-center items-center  hover:scale-105 duration-700 hover:bg-slate-300">
                Previus
            </div>

            <div className=" rounded-full w-12 h-12 m-3  bg-slate-200 flex justify-center items-center">
                {page}
            </div>

            <div 
                onClick={adelantar}
                className="cursor-pointer rounded-lg w-20 h-12 m-3  bg-slate-400 flex justify-center items-center  hover:scale-105 duration-700 hover:bg-slate-300">
                Next
            </div>
        </div>
    )

}