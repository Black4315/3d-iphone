import { navLists } from "../constants"
import { appleImg, bagImg, searchImg } from "../utils"

const Navebar = () => {
    return (
        <header className="w-full !sm:px-10 !px-5 !py-5 flex justify-between items-center">
            <nav className="nav w-full screen-max-width flex justify-between items-center">
                <img loading="lazy" src={appleImg} alt="Apple" width={14} height={18} />

                <div className="products flex ">
                    {navLists.map(nav => (
                        <div key={nav} className="!px-5 text-sm max-sm:hidden text-gray transition-all cursor-pointer hover:text-white">{nav}</div>
                    ))}
                </div>

                <div className="search--cart flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1">
                    <img className='cursor-pointer' width={18} height={18} src={searchImg} alt="search" />
                    <img className='cursor-pointer' width={18} height={18} src={bagImg} alt="bag" />
                </div>
            </nav>
        </header>
    )
}

export default Navebar
