import React from 'react';
import Style from '../Style.module.scss'
import Navbar from "./Navigation";
import Ping from "../pages/Ping";
import Dns from "../pages/Dns";
import Ntp from "../pages/Ntp";
import Opcua from "../pages/Opcua";
import Http from "../pages/Http";
import {Route, Routes} from "react-router-dom";
import {Box, Grid} from "@mui/material";
import icon from "../img/conntest_edge.png"

export default function Layout() {

   return (
      <Box className={Style.dark}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
               justifyContent={'space-between'}>
            <Grid item>
               <Navbar />
            </Grid>
            <Grid item flexGrow={1}>
               <Routes>
               <Route exact path={'/'} element={<Ping/>}/>
               <Route exact path={'/dns'} element={<Dns/>}/>
               <Route exact path={'/ntp'} element={<Ntp/>}/>
               <Route exact path={'/opcua'} element={<Opcua/>}/>
               <Route exact path={'/http'} element={<Http/>}/>
               </Routes>
            </Grid>
            <Grid item>
               <Box fontSize={'0.8rem'} display={'flex'} justifyContent={'center'} alignItems={'center'} py={'1.5rem'} sx={{opacity: 0.8}}>
                  <img src={icon} alt="Connectivity Tester" width={60} height={60}/>
                  Connectivity Tester v0.2.5
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

