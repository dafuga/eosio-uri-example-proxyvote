import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const buttonSizes = ['tiny','small','medium','large'];
const buttonColors = ['blue', 'green', 'yellow'];

class URIPreviewer extends Component {
  state = { buttonSize: 'medium', buttonColor: 'blue' };

  render() {
    const { donationAmount, eosioURI } = this.props;
    const { buttonSize: currentButtonSize, buttonColor: currentButtonColor } = this.state;

    let buttonStyle;
    return (
      <Segment basic style={{ margin: 10, padding: 20 }}>
        {buttonSizes.map(buttonSize => {
          if (currentButtonSize === buttonSize) {
            buttonStyle = { marginBottom: 10, border: '1px solid gray' }
          } else {
            buttonStyle = { marginBottom: 10 };
          }
          return(
            <Button
              basic
              content={buttonSize}
              onClick={() => this.setState({ buttonSize })}
              style={buttonStyle}
            />
          )
        })}
        <br />
        {buttonColors.map(buttonColor => {
          if (currentButtonColor === buttonColor) {
            buttonStyle = { marginBottom: 10, border: `1px solid ${buttonColor}` }
          } else {
            buttonStyle = { marginBottom: 10 };
          }
          return(
            <Button
              basic
              color={buttonColor}
              content={buttonColor}
              onClick={() => this.setState({ buttonColor })}
              style={buttonStyle}
            />
          )
        })}
        <h3 style={{ marginTop: 30 }}>
          Preview:
        </h3>
        <Button
          color={currentButtonColor}
          content={`Donate ${donationAmount} EOS now`}
          href={eosioURI}
          size={currentButtonSize}
          style={{ margin: 20 }}
        />
        <h3>
          Add the following line to your page header:
        </h3>
        {"<link style=\"cdn.semantic-ui.com/button.min.css\" />"}
        <h3>
          Add this HTML snippet in the part of your markdown where you wish the button to appear:
        </h3>
        <Editor
          value={`
            <a
              href="${eosioURI}"
              class=${`ui ${currentButtonColor} ${currentButtonSize} button`}
              role="button"
              style="margin: 20px;"
            >
              Donate ${donationAmount} EOS now
            </a>
          `}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          disabled
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: 500,
            marginLeft: 120
          }}
        />
      </Segment>
    );
  }
}

export default URIPreviewer;
