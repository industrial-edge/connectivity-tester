import React, {useState} from 'react';
import Style from '../Style.module.scss';
import {Link, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {info} from "./Info";

const links = [
    {
        name: 'Info',
        to: '/',
        active: 'info'
    },
    {
        name: 'Ping',
        to: '/ping',
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
    const [active, setActive] = useState(location.pathname === '/' ? 'info' : location.pathname.slice(1, location.pathname.length));

    return (
        <Box width={'100%'}>
            <Box component={'ul'} display={'flex'} justifyContent={'center'} alignItems={'center'}
                 gap={{xs: '2rem', md: '8rem'}}
                 fontSize={'1rem'}
                 pt={'5rem'}>
                {links.map((link, index) => (
                    <Box key={index} component={'li'} className={(link.active === active && !link.type) && Style.active}
                         sx={{borderImageSource: info.gradient}}>
                        <Link to={link.to} onClick={() => setActive(link.active)}>
                            {!link.type && <p style={{paddingBottom: '0.5rem'}}>{link.name}</p>}
                            {link.type && <h1>{link.name}</h1>}
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}