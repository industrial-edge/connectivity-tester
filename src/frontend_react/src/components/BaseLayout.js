import React from 'react';
import Style from '../Style.module.scss'
import Navbar from "./Navbar";
import Home from "./home/Home";
import Ping from "./ping/Ping";
import Dns from "./dns/Dns";
import Ntp from "./ntp/Ntp";
import Opcua from "./opcua/Opcua";
import Http from "./http/Http";
import {Route, Routes} from "react-router-dom";
import {Box, Grid} from "@mui/material";

export default function BaseLayout() {

   return (
      <Box className={Style.dark}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
               justifyContent={'space-between'}>
            <Grid item>
               <Navbar />
            </Grid>
            <Grid item flexGrow={1}>
               <Routes>
                  <Route exact path={'/'} element={<Home/>}/>
                  <Route exact path={'/ping'} element={<Ping/>}/>
                  <Route exact path={'/dns'} element={<Dns/>}/>
                  <Route exact path={'/ntp'} element={<Ntp/>}/>
                  <Route exact path={'/opcua'} element={<Opcua/>}/>
                  <Route exact path={'/http'} element={<Http/>}/>
               </Routes>
            </Grid>
            <Grid item>
               <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'}
                    py={'1.5rem'} sx={{opacity: 0.7}} width={'100%'}>
                  <p>Edge Deployment Team Vienna</p>
                  <p>&copy; 2023</p>
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

