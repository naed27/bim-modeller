import React from "react";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "bim-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string
        loading?: boolean
        [key: string]: any
      }
      "bim-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        [key: string]: any
      }
      "bim-panel-section": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        [key: string]: any
      }
    }
  }
}
