import { ReactNode } from "react";

import styles from "./svg.module.scss";
function SVGWrapper({ children, ...props }: { children: ReactNode }) {
  return (
    <div {...props} className={`${styles.svg_wrapper} flex_row flex_center`}>
      {children}
    </div>
  );
}

export function ADD_TASK({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 11.25C6 8.35051 8.3505 6 11.25 6H36.75C39.6495 6 42 8.3505 42 11.25V24.0436C41.2196 23.544 40.3823 23.1255 39.5 22.7999V11.25C39.5 9.73122 38.2688 8.5 36.75 8.5H11.25C9.73122 8.5 8.5 9.73122 8.5 11.25V36.75C8.5 38.2688 9.73122 39.5 11.25 39.5H22.7999C23.1255 40.3823 23.544 41.2196 24.0436 42H11.25C8.35051 42 6 39.6495 6 36.75V11.25Z"
          fill="#000000"
        />
        <path
          d="M10 21.5C10 19.0147 12.0147 17 14.5 17C16.9853 17 19 19.0147 19 21.5C19 23.9853 16.9853 26 14.5 26C12.0147 26 10 23.9853 10 21.5ZM14.5 19.5C13.3954 19.5 12.5 20.3954 12.5 21.5C12.5 22.6046 13.3954 23.5 14.5 23.5C15.6046 23.5 16.5 22.6046 16.5 21.5C16.5 20.3954 15.6046 19.5 14.5 19.5Z"
          fill="#000000"
        />
        <path
          d="M14.5 29C12.0147 29 10 31.0147 10 33.5C10 35.9853 12.0147 38 14.5 38C16.9853 38 19 35.9853 19 33.5C19 31.0147 16.9853 29 14.5 29ZM12.5 33.5C12.5 32.3954 13.3954 31.5 14.5 31.5C15.6046 31.5 16.5 32.3954 16.5 33.5C16.5 34.6046 15.6046 35.5 14.5 35.5C13.3954 35.5 12.5 34.6046 12.5 33.5Z"
          fill="#000000"
        />
        <path
          d="M21.0012 20.25C21.0012 19.5596 21.5609 19 22.2512 19H36.75C37.4404 19 38 19.5596 38 20.25C38 20.9404 37.4404 21.5 36.75 21.5H22.2512C21.5609 21.5 21.0012 20.9404 21.0012 20.25Z"
          fill="#000000"
        />
        <path
          d="M11.2632 11.0952C10.5728 11.0952 10.0132 11.6549 10.0132 12.3452C10.0132 13.0356 10.5728 13.5952 11.2632 13.5952H36.7298C37.4202 13.5952 37.9798 13.0356 37.9798 12.3452C37.9798 11.6549 37.4202 11.0952 36.7298 11.0952H11.2632Z"
          fill="#000000"
        />
        <path
          d="M46 35C46 41.0751 41.0751 46 35 46C28.9249 46 24 41.0751 24 35C24 28.9249 28.9249 24 35 24C41.0751 24 46 28.9249 46 35ZM36 28C36 27.4477 35.5523 27 35 27C34.4477 27 34 27.4477 34 28V34H28C27.4477 34 27 34.4477 27 35C27 35.5523 27.4477 36 28 36H34V42C34 42.5523 34.4477 43 35 43C35.5523 43 36 42.5523 36 42V36H42C42.5523 36 43 35.5523 43 35C43 34.4477 42.5523 34 42 34H36V28Z"
          fill="#000000"
        />
      </svg>
    </SVGWrapper>
  );
}

export function CALENDAR({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6666 2V4.66667M5.33329 2V4.66667M2.66663 7.33333H13.3333M2.66663 4.66667C2.66663 4.31304 2.8071 3.97391 3.05715 3.72386C3.3072 3.47381 3.64634 3.33333 3.99996 3.33333H12C12.3536 3.33333 12.6927 3.47381 12.9428 3.72386C13.1928 3.97391 13.3333 4.31304 13.3333 4.66667V12.6667C13.3333 13.0203 13.1928 13.3594 12.9428 13.6095C12.6927 13.8595 12.3536 14 12 14H3.99996C3.64634 14 3.3072 13.8595 3.05715 13.6095C2.8071 13.3594 2.66663 13.0203 2.66663 12.6667V4.66667ZM5.33329 10H6.66663V11.3333H5.33329V10Z"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function CLOSE({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#000"
          d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
        />
      </svg>
    </SVGWrapper>
  );
}

export function DELETE({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12V17"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12V17"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 7H20"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function DOTS({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12H12.01M12 6H12.01M12 18H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18ZM13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function EDIT({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function LINK({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 10L10 6"
          stroke="#3b3b3b"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.33331 4.00004L7.64198 3.64271C8.26718 3.01759 9.11511 2.66644 9.99922 2.6665C10.8833 2.66657 11.7312 3.01784 12.3563 3.64304C12.9814 4.26824 13.3326 5.11617 13.3325 6.00028C13.3325 6.88439 12.9812 7.73226 12.356 8.35737L12 8.66671"
          stroke="#3b3b3b"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.66666 12L8.40199 12.356C7.76949 12.9815 6.91585 13.3323 6.02633 13.3323C5.1368 13.3323 4.28316 12.9815 3.65066 12.356C3.3389 12.0478 3.09139 11.6807 2.92247 11.2761C2.75354 10.8716 2.66656 10.4375 2.66656 9.99904C2.66656 9.56061 2.75354 9.12653 2.92247 8.72195C3.09139 8.31736 3.3389 7.95031 3.65066 7.64204L3.99999 7.33337"
          stroke="#3b3b3b"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function PLUS({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12H20M12 4V20"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGWrapper>
  );
}

export function SAVE({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
          fill="#0F0F0F"
        />
      </svg>
    </SVGWrapper>
  );
}

export function DRAGANDDROP({ ...props }) {
  return (
    <SVGWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 6.5C9.38071 6.5 10.5 5.38071 10.5 4C10.5 2.61929 9.38071 1.5 8 1.5C6.61929 1.5 5.5 2.61929 5.5 4C5.5 5.38071 6.61929 6.5 8 6.5Z"
          fill="#000000"
        ></path>
        <path
          d="M15.5 6.5C16.8807 6.5 18 5.38071 18 4C18 2.61929 16.8807 1.5 15.5 1.5C14.1193 1.5 13 2.61929 13 4C13 5.38071 14.1193 6.5 15.5 6.5Z"
          fill="#000000"
        ></path>
        <path
          d="M10.5 12C10.5 13.3807 9.38071 14.5 8 14.5C6.61929 14.5 5.5 13.3807 5.5 12C5.5 10.6193 6.61929 9.5 8 9.5C9.38071 9.5 10.5 10.6193 10.5 12Z"
          fill="#000000"
        ></path>
        <path
          d="M15.5 14.5C16.8807 14.5 18 13.3807 18 12C18 10.6193 16.8807 9.5 15.5 9.5C14.1193 9.5 13 10.6193 13 12C13 13.3807 14.1193 14.5 15.5 14.5Z"
          fill="#000000"
        ></path>
        <path
          d="M10.5 20C10.5 21.3807 9.38071 22.5 8 22.5C6.61929 22.5 5.5 21.3807 5.5 20C5.5 18.6193 6.61929 17.5 8 17.5C9.38071 17.5 10.5 18.6193 10.5 20Z"
          fill="#000000"
        ></path>
        <path
          d="M15.5 22.5C16.8807 22.5 18 21.3807 18 20C18 18.6193 16.8807 17.5 15.5 17.5C14.1193 17.5 13 18.6193 13 20C13 21.3807 14.1193 22.5 15.5 22.5Z"
          fill="#000000"
        ></path>
      </svg>
    </SVGWrapper>
  );
}

export function CLOCK() {
  return (
    <SVGWrapper>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#828282"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </SVGWrapper>
  );
}
