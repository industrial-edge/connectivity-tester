import React, { useState, useEffect } from 'react';
import { Dialog, inputS7Request } from "../layout/Dialog";
import { Box } from "@mui/material";

export default function S7() {

    const [hostname, setHostname] = useState('');
    const [rack, setRack] = useState(0)
    const [slot, setSlot] = useState(2)
    const [port, setPort] = useState(102)
    const [response, setResponse] = useState("");
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



    const handleChange = (event, parameter) => {  

      switch (parameter) {
        case "hostname":
          setHostname(event.target.value);
          break;

        case "port":
          setPort(event.target.value);
          break;

        case "rack":
          setRack(event.target.value);
          break;
        
        case "slot":
          setSlot(event.target.value);
          break;

        default:
          break;
        } 
        
        setResponse("")
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            callApi();
        }
    }

    function callApi() {
        if (!loading) {
            setLoading(true);
        
            fetch(`/conntest/api/s7?hostname=${hostname}&rack=${rack}&slot=${slot}&port=${port}`).then(res => res.json()).then(data => {
                setResponse(data.response);
                setLoading(false);
            });
        }
    }

    const handleClick = event => {
        event.preventDefault();

        callApi();
    };

    const connectionParameters = {
      hostname: hostname,
      rack: rack,
      slot: slot, 
      port: port, 
    }

    return (
        <Box style={{maxWidth: windowSize[0]-20}} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Dialog text={
                inputS7Request(connectionParameters, loading, response, handleChange, handleKeyDown, handleClick)}/>
        </Box>
    )
}