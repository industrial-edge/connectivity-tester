import React from 'react';
import Style from '../../Style.module.scss';
import classNames from 'classnames';
import {Box} from "@mui/material";
import {info} from "../../info/Info";

function EmojiBullet(props) {
   const {emoji, text} = props;

   return (
       <Box component={'li'} fontSize={'1rem'} lineHeight={1.5} style={{cursor: 'default'}}>
           <Box component={'span'} aria-label="cheese"
                role="img"
                mr={{xs: '0.5rem', md: '1rem'}} fontSize={'1.5rem'}>{emoji}</Box> {text}
       </Box>
   );
}

export default function Home() {
   return (
      <Box component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
           justifyContent={'center'} minHeight={'calc(80vh - 175px)'}>
         <Box className={classNames(Style.avatar, Style.shadowed)} alt={'Connectivity Tester'} style={{background: info.gradient}} component={'img'} src={info.icon} width={{xs: '35vh', md: '40vh'}}
              height={{xs: '35vh', md: '40vh'}}
              borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/>
         <Box>
            <h1>Welcome to <span style={{background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{info.appName}</span>
            </h1>
            <h2>Using this app you can test:</h2>
            <Box component={'ul'} p={'0.8rem'}>
               {info.tools.map((bio, index) => (
                  <EmojiBullet key={index} emoji={bio.emoji} text={bio.text}/>
               ))}
            </Box>
         </Box>
      </Box>
   )
}