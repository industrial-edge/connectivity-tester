import React, { useState, useEffect } from 'react';
import { Dialog, inputOpcua } from "../layout/Dialog";
import { Box } from "@mui/material";

export default function Opcua() {

    const [hostname, setHostname] = useState('');
    const [response, setResponse] = useState(0);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [somethingSelected, setSomethingSelected] = useState(false);
    const [nodeInfo, setNodeInfo] = useState(0);
    const [nodeInfoStatus, setNodeInfoStatus] = useState(0);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    
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

    const handleChangeUser = event => {
        setUser(event.target.value);
    };

    const handleChangePwd = event => {
        setPwd(event.target.value);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            callApi();
        }
    }

    useEffect(() => {
        fetch(`/conntest/api/opcua/status`).then(res => res.json()).then(data => {
            setResponse(data.response);
            setResponseStatus(data.status);
            setHostname(data.hostname);
            setUser(data.user);
            setPwd(data.pwd);
        });
      },[]);

    function callApi() {
        if (!loading) {
            setResponseStatus(0);
            setSomethingSelected(false);
            setLoading(true);

            call_url = `/conntest/api/opcua?h=${hostname}`

            if (user && pwd) {
                call_url = call_url + `&u=${user}&p=${pwd}`
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

    const handleSelect = (event, nodeIds) => {
        event.preventDefault();

        if (!loading) {
            setNodeInfoStatus(0);
            setSomethingSelected(true);
            setLoading(true);
        
            fetch(`/conntest/api/opcua/node?i=${nodeIds}`).then(res => res.json()).then(data => {
                setNodeInfoStatus(data.status);
                if (data.status !== 0 && data.status !== 3){
                    setNodeInfo(JSON.parse(data.response));
                }
                else{
                    setNodeInfo(data.response);
                }
                setLoading(false);
            });
        }
    };

    return (
        <Box style={{maxWidth: windowSize[0]-20}} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Dialog text={inputOpcua(hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick, handleSelect, somethingSelected, nodeInfo, nodeInfoStatus, user, handleChangeUser, pwd, handleChangePwd)}/>
        </Box>
    )
}