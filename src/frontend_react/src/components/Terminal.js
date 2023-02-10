import React from 'react';
import Style from '../Style.module.scss';
import {Box, Grid, Button, CircularProgress, MenuItem, Checkbox, FormGroup, FormControlLabel} from "@mui/material";

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CircleIcon from '@mui/icons-material/Circle';
import ListIcon from '@mui/icons-material/List';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import classNames from "classnames";


const TerminalTextField = styled(TextField)({
  'backgroundColor': '#27242f',
  '.MuiInputBase-root' : {
    color: 'white',
    fontFamily: [
      'Courier New, Courier, monospace'
    ].join(','),
    fontSize: '1.2rem'
  },
  'input': {
    color: 'white',
    fontFamily: [
      'Courier New, Courier, monospace'
    ].join(','),
    fontSize: '1.2rem'
  },
  '& label.Mui-focused': {
    color: 'white'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey'
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
      '&.Mui-focused fieldset': {
    borderColor: 'white',
    },
    '& .MuiSelect-icon':{
      color: 'white'
    }
  }
});

function Terminal(props) {
  const {text} = props;

  return (
    <Box component={'section'} width={{xs: '75%', md: '75%'}} borderRadius={'0.5rem'} mb={'4rem'}>
      <Box sx={{backgroundColor: '#8c8c8c'}} p={'0.5rem'} borderRadius={'0.5rem 0.5rem 0 0'} fontSize={'1rem'}>
        <CircleIcon fontSize="small" className={classNames(Style.red)} />
        <CircleIcon fontSize="small" className={classNames(Style.yellow)} />
        <CircleIcon fontSize="small" className={classNames(Style.green)} />
      </Box>
      <Box style={{overflowWrap: 'break-word'}} py={{xs: '1rem', md: '2rem'}} px={{xs: '2rem', md: '3rem'}} borderRadius={'0 0 0.5rem 0.5rem'} sx={{backgroundColor: '#27242f'}} fontSize={'1.2rem'} fontFamily={'Courier New, Courier, monospace'}>
        {text}
      </Box>
    </Box>
  );
}

function richObjectTreeView(data, handleSelect, loading) {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
 
  return (
    <TreeView
    defaultCollapseIcon={<FolderOpenIcon className={classNames(Style.yellow)} />}
    defaultExpandIcon={<FolderIcon className={classNames(Style.yellow)} />}
    defaultEndIcon={<ArticleIcon className={classNames(Style.blue)} />}
    onNodeSelect={handleSelect}
    disableSelection = {loading ? true : false}
    sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
 }

function inputTerminal(promptWidth, promptText, hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick) {
  return <>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1}>
      <Grid item width={promptWidth}>
        <span className={classNames(Style.purple)}>$</span> {promptText}
      </Grid>
      <Grid marginLeft='auto' item xs>
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" onChange={handleChange} value={hostname} onKeyDown={handleKeyDown}/>
      </Grid>
      <Grid item width="100px">
        <Button variant="contained" sx={{ width: 100, height: 44}} color="primary" onClick={handleClick} endIcon={loading ? "" : <KeyboardReturnIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && "Send"}
        </Button>
      </Grid>
    </Grid>
    {responseStatus > 0 &&
      <p>
      <br></br>
      <span className={classNames(Style.purple)}>></span> {response}
      </p>
    }
  </>;
}

function inputOpcua(hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick, handleSelect, somethingSelected, nodeInfo, nodeInfoStatus, user, handleChangeUser, pwd, handleChangePwd) {
  return <>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1}>
      <Grid marginLeft='auto' item xs>
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" onChange={handleChange} value={hostname} onKeyDown={handleKeyDown}/>
      </Grid>
      <Grid item width="150px">
        <Button variant="contained" sx={{ width: 150, height: 44}} color={responseStatus !== 1 ? "primary" : "error"} onClick={handleClick} endIcon={loading ? "" : <ListIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && responseStatus === 1  && "Disconnect"}
          {!loading && responseStatus !== 1 && "Connect"}
        </Button>
      </Grid>
    </Grid>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1} pt={2}>
      <Grid marginLeft='auto' item xs>
        user:
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" onChange={handleChangeUser} value={user} onKeyDown={handleKeyDown}/>
      </Grid>
      <Grid marginLeft='auto' item xs>
        password:
        <TerminalTextField type="password" size="small" fullWidth margin="none" variant="outlined" onChange={handleChangePwd} value={pwd} onKeyDown={handleKeyDown}/>
      </Grid>
    </Grid>
    <Grid container direction="row" alignItems="top" justifyContent="flexEnd" spacing={1}>
      <Grid marginLeft='auto' item xs>
        {responseStatus === 1 &&
          <div>
          <br></br>
          <p>
          <span className={classNames(Style.purple)}>></span> found {response[0]} nodes
          </p>
          <br></br>
          </div>
        }
        {responseStatus === 1 &&
          richObjectTreeView(JSON.parse(response[1]), handleSelect, loading)
        }
        {responseStatus > 1 &&
          <p>
          <br></br>
          <span className={classNames(Style.purple)}>></span> {response}
          </p>
        }
      </Grid>
      {responseStatus === 1 && somethingSelected === true && nodeInfoStatus !== 0 && nodeInfoStatus !== 3 &&
      <Grid item width="400px" style={{'overflowWrap': 'break-word'}}>
        <br></br>
        <p><b>Name:</b> {nodeInfo.name}</p>
        <p><b>id:</b> {nodeInfo.id}</p>
        <p><b>Class:</b> {nodeInfo.class}</p>
        {nodeInfoStatus === 1 &&
          <p><b>DataType:</b> {nodeInfo.datatype}</p>
        }
        {nodeInfoStatus === 1 &&
          <p><b>Value:</b> {nodeInfo.value}</p>
        }
      </Grid>
      }
      {responseStatus === 1 && somethingSelected === true && nodeInfoStatus === 3 &&
      <Grid item width="400px" style={{'overflowWrap': 'break-word'}}>
        <br></br>
        <p>{nodeInfo}</p>
      </Grid>
      }
    </Grid>
  </>;
}

function inputHttpRequest(hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick, headers, handleChangeHeaders, body, handleChangeBody, verify, handleChangeVerify, request, handleChangeRequest) {
  return <>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1}>
      <Grid item width="120px">
        <TerminalTextField
          size="small"
          fullWidth margin="none"
          select
          value={request}
          variant="outlined"
          onChange={handleChangeRequest}
        >
          <MenuItem value={"GET"}>GET</MenuItem>
          <MenuItem value={"POST"}>POST</MenuItem>
          <MenuItem value={"PUT"}>PUT</MenuItem>
        </TerminalTextField>
      </Grid>
      <Grid marginLeft='auto' item xs>
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" onChange={handleChange} value={hostname} onKeyDown={handleKeyDown}/>
      </Grid>
      <Grid item width="100px">
        <Button variant="contained" sx={{ width: 100, height: 44}} color="primary" onClick={handleClick} endIcon={loading ? "" : <KeyboardReturnIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && "Send"}
        </Button>
      </Grid>
    </Grid>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1} pt={2}>
      <Grid marginLeft='auto' item xs>
        headers:
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" multiline onChange={handleChangeHeaders} value={headers}/>
      </Grid>
    </Grid>

    {request !== "GET" &&
      <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1} pt={2}>
        <Grid marginLeft='auto' item xs>
          body:
          <TerminalTextField size="small" fullWidth margin="none" variant="outlined" multiline onChange={handleChangeBody} value={body}/>
        </Grid>
      </Grid>
    }
    <FormGroup>
      <FormControlLabel control={
      <Checkbox
        checked={verify}
        onChange={handleChangeVerify}
        sx={{
          color: '#8c8c8c',
          '& .MuiSvgIcon-root': { fontSize: 32 } 
        }}
      />
      } label="Verify SSL Certificate" />
    </FormGroup>
    {responseStatus > 0 &&
      <p>
      <Button variant="contained" sx={{ width: 200, height: 44}} color="primary" onClick={() => {navigator.clipboard.writeText(response);}} endIcon={<ContentCopyIcon />}>
        Copy To Clipboard
      </Button>
      <br></br>
      <br></br>
      <span className={classNames(Style.purple)}>></span> {response}
      </p>
    }
  </>;
}

export { Terminal, inputTerminal, inputOpcua, inputHttpRequest };