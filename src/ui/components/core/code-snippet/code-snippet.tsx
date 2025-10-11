import { Highlight, PrismTheme } from "prism-react-renderer";
import classes from "./code-snippet.module.scss";

interface Props {
  code: string;
  theme: PrismTheme;
}

export function CodeSnippet({ code, theme }: Props) {
  return (
    <div className={classes.codeSnippet}>
      <Highlight theme={theme} code={code} language="js">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className={classes.lineNumber}>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
