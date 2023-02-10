import React from 'react';
import Style from '../Style.module.scss'
import Navbar from "./Navbar";
import Info from "./Info";
import Ping from "./Ping";
import Dns from "./Dns";
import Ntp from "./Ntp";
import Opcua from "./Opcua";
import Http from "./Http";
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
                  <Route exact path={'/'} element={<Info/>}/>
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
                  <p>v 0.1.1</p>
                  <p>Edge Deployment Team Vienna</p>
                  <p>&copy; 2023</p>
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

