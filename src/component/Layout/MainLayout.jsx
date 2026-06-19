import React from 'react'
import { Navbar, Footer } from '../../component/index'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout