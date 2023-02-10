import React, { useState, useEffect } from 'react';
import { Dialog, inputDialog } from "../layout/Dialog";
import { Box } from "@mui/material";

export default function Dns() {

    const [hostname, setHostname] = useState("google.com");
    const [response, setResponse] = useState(0);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(0);

    const [hostnameReverse, setHostnameReverse] = useState("8.8.8.8");
    const [responseReverse, setResponseReverse] = useState(0);
    const [responseStatusReverse, setResponseStatusReverse] = useState(0);
    const [loadingReverse, setLoadingReverse] = useState(0);

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
            callApi(false);
        }
    }

    const handleClick = event => {
        event.preventDefault();

        callApi(false);
    };

    const handleChangeReverse = event => {
        setHostnameReverse(event.target.value);
      };

    const handleKeyDownReverse = event => {
        if (event.key === 'Enter') {
            callApi(true);
        }
    }

    const handleClickReverse = event => {
        event.preventDefault();

        callApi(true);
    };

    function callApi(reverse) {
        if (reverse){
            if (!loadingReverse) {
                setResponseStatusReverse(0);
                setLoadingReverse(true);
            
                fetch(`/conntest/api/dns/reverse?h=${hostnameReverse}`).then(res => res.json()).then(data => {
                    setResponseReverse(data.response);
                    setResponseStatusReverse(data.status);
                    setLoadingReverse(false);
                });
            }
        }
        else{
            if (!loading) {
                setResponseStatus(0);
                setLoading(true);
            
                fetch(`/conntest/api/dns?h=${hostname}`).then(res => res.json()).then(data => {
                    setResponse(data.response);
                    setResponseStatus(data.status);
                    setLoading(false);
                });
            }
        }
    }

    return (
        <Box style={{maxWidth: windowSize[0]-20}} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Dialog text={inputDialog("150px", "name to ip", hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick)}/>
            <Dialog text={inputDialog("150px", "ip to name", hostnameReverse, loadingReverse, responseReverse, responseStatusReverse, handleChangeReverse, handleKeyDownReverse, handleClickReverse)}/>
        </Box>
    )
}