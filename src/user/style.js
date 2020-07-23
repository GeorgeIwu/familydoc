
import styled from "styled-components";
import MuAppBar from "@material-ui/core/AppBar";

export const StyledAppBar = styled(MuAppBar)`
  .root {
    flex-grow: 1
  }
  .menu-button {
    margin-right: auto
  }
  .title {
    flex-grow: 1,
  }
  .link {
    color: white
  }
  .popover {
    pointer-events: 'none',
    padding: 10px,
  }
`

export const StyledSearchBar = styled.div`

`
