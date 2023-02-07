import { Navigate } from "react-router-dom"

import { ROUTE } from "../constants/index"

const useFromRedux = {
    username: "Canh"
}

function ProtectedLayout(props) {
    const isAuth = useFromRedux !== null

    if (!isAuth) return <Navigate to={ROUTE.LOGIN}/>
}