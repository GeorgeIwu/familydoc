import React from 'react';
import styled from "styled-components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const StyledDiv = styled.div`
  .root: {
    flex-grow: 1
    background-color: white
  }
`

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabs = ({ children }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Tabz = React.Children.map(children, (child, index) => {
    return (
      <Tab label={child.props.tabName} {...a11yProps(index)} />
    );
  })

  const Panels = React.Children.map(children, (child, index) => {
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} >
        {value === index && child}
      </div>
    );
  })

  return (
    <StyledDiv className={'root'}>
      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        {Tabz}
      </Tabs>
      {Panels}
    </StyledDiv>
  );
}

export default CustomTabs
