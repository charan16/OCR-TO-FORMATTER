import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../Cards/style.scss";

export const rawTextCard = text => {
  return (
    <div className="container card flex flex-column">
      <div className="flex  line-header flex-row">
        <span>{"Raw Text"}</span>
        <div className="flex flex-end">
          <CopyToClipboard text={text}>
            <i class="ion-md-clipboard" title="Copy"></i>
          </CopyToClipboard>
        </div>
      </div>
      <div className="text-box font">
        <p>{text}</p>
      </div>
    </div>
  );
};

export const line_break_up = lines => {
  return (
    <div className="container line-card flex flex-column">
      <div className="flex line-header">
        <span>{"Line Break Up"}</span>
      </div>
      <div>
        {lines.map(l => {
          return (
            <div className="flex flex-row line-block">
              <div className="line-text font flex flex-row">
                <p>{l.text.replace(":>", "=>")}</p>
              </div>
              <div className="line-icon">
                <CopyToClipboard text={l.text.replace(":>", "=>")}>
                  <i class="ion-md-clipboard flex-center"></i>
                </CopyToClipboard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const paragraphFormatter = paras => {
  return (
    <div className="container line-card flex flex-column">
      <div className="flex line-header">
        <span>{"Paragraphs"}</span>
      </div>
      <div>
        {paras.map(l => {
          return (
            <div className="flex flex-row line-block">
              <div className="line-text font">
                <p>{l.text.replace(":>", "=>")}</p>
              </div>
              <CopyToClipboard text={l.text.replace(":>", "=>")}>
                <i class="ion-md-clipboard flex-end"></i>
              </CopyToClipboard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const rawHtmlCard = text => {
  return (
    <div className="container card flex flex-column">
      <div className="flex">
        <span>{"HTML Code"}</span>
        <div className="flex flex-end">
          <CopyToClipboard text={text}>
            <i class="ion-md-clipboard" title="Copy"></i>
          </CopyToClipboard>
        </div>
      </div>
      <div className="line-text font">
        <code>{text}</code>
      </div>
    </div>
  );
};
