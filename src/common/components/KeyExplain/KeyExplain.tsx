import theme from "../../../styles/theme";
import { KeyExplainWrapper } from "./KeyExplain.styled";


const KeyExplain = () => {

  const keyExplainItems = Object.entries(theme.colourKey).map(([key, value]) => (
    <div key={key} className="key-explain--item">
      <div className="key-explain--colour" style={{ backgroundColor: value }} aria-hidden="true" />
      <span >{key}</span>
    </div>
  ));

  return (
    <KeyExplainWrapper>

      <h3>Key</h3>
      <div className="key-explain--grid">
        {keyExplainItems}
      </div>

    </KeyExplainWrapper>
  )
}

export default KeyExplain;