import React, { useState, useEffect } from 'react';
import { Dialog, jsonDialog } from "../layout/Dialog";
import { Box } from "@mui/material";

export default function Nmap() {

    const [hostname, setHostname] = useState("192.168.0.1/24");
    const [response, setResponse] = useState(0);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(0);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      });

    const handleChange = event => {
      setHostname(event.target.value);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            callApi();
        }
    }

    function callApi() {
        if (!loading) {
            setResponseStatus(0);
            setLoading(true);
        
            fetch(`/conntest/api/nmap?h=${hostname}`).then(res => res.json()).then(data => {
                setResponse(data.response);
                setResponseStatus(data.status);
                setLoading(false);
            });
        }
    }

    const handleClick = event => {
        event.preventDefault();

        callApi();
    };

    return (
        <Box style={{maxWidth: windowSize[0]-20}} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Dialog text={jsonDialog("140px", "nmap -sn", hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick)}/>
        </Box>
    )
}