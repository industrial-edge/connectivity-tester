import React, {useState} from 'react';
import Style from '../Style.module.scss';
import {Link, useLocation} from "react-router-dom";
import {Box} from "@mui/material";

const links = [
    {
        name: 'Ping',
        to: '/',
        active: 'ping'
    },
    {
        name: 'DNS',
        to: '/dns',
        active: 'dns'
    },
    {
        name: 'NTP',
        to: '/ntp',
        active: 'ntp'
    },    
    {
        name: 'OPC UA',
        to: '/opcua',
        active: 'opcua'
    },    
    {
        name: 'HTTP Request',
        to: '/http',
        active: 'http'
    }
]

export default function Navbar() {
    const location = useLocation()
    const [active, setActive] = useState(location.pathname === '/' ? 'ping' : location.pathname.slice(1, location.pathname.length));

    return (
        <Box width={'100%'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={{xs: '2rem', md: '5rem'}} fontWeight={'bold'} fontSize={'1.1rem'} pt={'3rem'}>
                    {links.map((link, index) => (
                        <Box key={index} className={(link.active === active && !link.type) && Style.active}>
                            <Link to={link.to} onClick={() => setActive(link.active)}>
                                <p>{link.name}</p>                            
                            </Link>
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}