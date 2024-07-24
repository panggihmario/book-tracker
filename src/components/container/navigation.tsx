import Link from "next/link"

const NavigationBar = () => {
    return (
        <header>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 ">
                    <Link className="text-sm font-semibold leading-6 text-gray-900" href="/ny-books" >Ny Books</Link>
                    <Link className="text-sm font-semibold leading-6 text-gray-900" href="/" >My Books</Link>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                <Link className="text-sm font-semibold leading-6 text-gray-900" href="/login" >Login</Link>
                </div>
                


            </nav>
        </header>
    )
}

export default NavigationBar