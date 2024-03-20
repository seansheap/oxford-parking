import styled from "styled-components";
import theme from "../../../styles/theme";

export const KeyExplainWrapper = styled.div`
    position: absolute;
    right: 0;
    padding: 0.5rem; // Adjusted padding
    border: 1px solid ${theme.light.backgroundGrey};
    h3{
        margin: 0;
    }
    .key-explain--item{
        display: flex;
        align-items: center;
        text-transform: capitalize;
    }
    .key-explain--colour{
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
    }
    .key-explain--grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.2rem;
    }

`