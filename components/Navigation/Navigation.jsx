"use client"

import Nav from "@components/Nav/Nav";
import SideNav from "@components/SideNav/SideNav";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

const Navigation = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const params = useParams();
    useEffect(() => {setMenuVisible(false)},[params]);
  return (
    <div>
        <Nav setMenuVisible={setMenuVisible} />
        <SideNav menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
    </div>
    
  )
}

export default Navigation