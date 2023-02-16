import React from 'react';
import Style from '../Style.module.scss';
import {Box, Grid, Button, CircularProgress, MenuItem, Checkbox, FormGroup, FormControlLabel} from "@mui/material";

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ListIcon from '@mui/icons-material/List';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import { createTheme, ThemeProvider  } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: Style.primary,
    },
    secondary: {
      main: Style.secondary,
    },
    error: {
      main: Style.error,
    },
  },
});


const TerminalTextField = styled(TextField)({
  'backgroundColor': Style.background,
  '.MuiInputBase-root' : {
    color: Style.white,
    fontFamily: [
      'Courier New, Courier, monospace'
    ].join(','),
    fontSize: '1.2rem'
  },
  'input': {
    color: Style.white,
    fontFamily: [
      'Courier New, Courier, monospace'
    ].join(','),
    fontSize: '1.2rem'
  },
  '& label.Mui-focused': {
    color: Style.white
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: Style.white,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: Style.secondary
    },
    '&:hover fieldset': {
      borderColor: Style.white,
    },
      '&.Mui-focused fieldset': {
    borderColor: Style.white,
    },
    '& .MuiSelect-icon':{
      color: Style.white
    }
  }
});

const MyTreeItem = styled(TreeItem)({
  "&.MuiTreeItem-root > .MuiTreeItem-content:hover": {
    background: Style.treehover,
  },
  "&.MuiTreeItem-root > .MuiTreeItem-content.Mui-selected": {
    background: Style.treeselect,
  },
  "&.MuiTreeItem-root > .MuiTreeItem-content.Mui-selected.Mui-focused": {
    background: Style.treeselect,
  },
  "&.MuiTreeItem-root > .MuiTreeItem-content.Mui-focused": {
    background: Style.treehover,
  },
});

function Dialog(props) {
  const {text} = props;
  return (
    <Box width={{xs: '75%', md: '75%'}} >
      <Box style={{overflowWrap: 'break-word'}} py={{xs: '1rem', md: '2rem'}} px={{xs: '2rem', md: '3rem'}} fontSize={'1.2rem'} fontFamily={'Courier New, Courier, monospace'}>
        {text}
      </Box>
    </Box>
  );
}

function richObjectTreeView(data, handleSelect, loading) {
  const renderTree = (nodes) => (
    <MyTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </MyTreeItem>
  );
 
  return (
    <TreeView
    defaultCollapseIcon={<FolderOpenIcon style={{color:Style.treefolder}} />}
    defaultExpandIcon={<FolderIcon style={{color:Style.treefolder}} />}
    defaultEndIcon={<ArticleIcon style={{color:Style.treevariable}} />}
    onNodeSelect={handleSelect}
    disableSelection = {loading ? true : false}
    sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
 }

function inputDialog(promptWidth, promptText, hostname, loading, response, responseStatus, handleChange, handleKeyDown, handleClick) {
  return <>
    <Grid container direction="row" alignItems="center" justifyContent="flexEnd" spacing={1}>
      <Grid item width={promptWidth}>
        <span style={{color:Style.prompt}}>$</span> {promptText}
      </Grid>
      <Grid marginLeft='auto' item xs>
        <TerminalTextField size="small" fullWidth margin="none" variant="outlined" onChange={handleChange} value={hostname} onKeyDown={handleKeyDown}/>
      </Grid>
      <Grid item width="100px">
      <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{ width: 100, height: 44}} color="primary" onClick={handleClick} endIcon={loading ? "" : <KeyboardReturnIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && "Send"}
        </Button>
      </ThemeProvider>
      </Grid>
    </Grid>
    {responseStatus > 0 &&
      <p>
      <br></br>
      <span style={{color:Style.prompt}}>></span> {response}
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
      <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{ width: 150, height: 44}} color={responseStatus !== 1 ? "primary" : "error"} onClick={handleClick} endIcon={loading ? "" : <ListIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && responseStatus === 1  && "Disconnect"}
          {!loading && responseStatus !== 1 && "Connect"}
        </Button>
      </ThemeProvider>
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
          <span style={{color:Style.prompt}}>></span> found {response[0]} nodes
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
          <span style={{color:Style.prompt}}>></span> {response}
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
      <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{ width: 100, height: 44}} color="primary" onClick={handleClick} endIcon={loading ? "" : <KeyboardReturnIcon />}>
          {loading === true && <CircularProgress color="inherit" size={28}/>}
          {!loading && "Send"}
        </Button>
      </ThemeProvider>
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
    <ThemeProvider theme={theme}>
    <FormGroup>
      <FormControlLabel control={
      <Checkbox
        checked={verify}
        onChange={handleChangeVerify}
        sx={{
          color: '#00ffb9',
          '& .MuiSvgIcon-root': { fontSize: 32 } 
        }}
      />
      } label="Verify SSL Certificate" />
    </FormGroup>
    </ThemeProvider>
    {responseStatus > 0 &&
      <p>
      <ThemeProvider theme={theme}>
      <Button variant="contained" sx={{ width: 200, height: 44}} color="primary" onClick={() => {navigator.clipboard.writeText(response);}} endIcon={<ContentCopyIcon />}>
        Copy To Clipboard
      </Button>
      </ThemeProvider>
      <br></br>
      <br></br>
      <span style={{color:Style.prompt}}>></span> {response}
      </p>
    }
  </>;
}

export { Dialog, inputDialog, inputOpcua, inputHttpRequest };