import React, { useState, useEffect } from 'react';
import { Dialog, inputHttpRequest } from "../layout/Dialog";
import { Box } from "@mui/material";

export default function Http() {

    const [hostname, setHostname] = useState("https://api.publicapis.org/random");
    const [response, setResponse] = useState(0);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(0);
    const [headers, setHeaders] = useState("");
    const [body, setBody] = useState("");
    const [verify, setVerify] = useState(false);
    const [request, setRequest] = useState("GET");

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

    let call_url = ``

    const handleChange = event => {
      setHostname(event.target.value);
    };

    const handleChangeHeaders = event => {
      setHeaders(event.target.value);
    };

    const handleChangeBody = event => {
      setBody(event.target.value);
    };

    const handleChangeVerify = event => {
      setVerify(!verify);
    };

    const handleChangeRequest = event => {
      setRequest(event.target.value);
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

          call_url = `/conntest/api/http?t=${request.toLowerCase()}&h=${hostname}&v=${verify}`

          if (headers) {
            call_url = call_url + `&hdrs=${headers}`
          }

          if ((request === "POST")||(request === "PUT")){
            if (body) {
              call_url = call_url + `&b=${body}`
            }
          }
      
          fetch(call_url).then(res => res.json()).then(data => {
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
            <Dialog text={inputHttpRequest(hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick, headers, handleChangeHeaders, body, handleChangeBody, verify, handleChangeVerify, request, handleChangeRequest)}/>
        </Box>
    )
}