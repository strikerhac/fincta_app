import React, { useState, useEffect, useContext } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  StyledCard,
  StyledInfoContainer,
  StyledGraphContainer,
  StyledTitle,
  StyledSubHeading,
  StyledValue,
  StyledPercentage,
} from "./main.styles";

export const SecondaryGraph = ({
  data,
  dataKey,
  title,
  subHeading,
  value,
  percentage,
  // color,
  graphColor,
}) => {
  let defId = `url(#${graphColor})`;

  let currency = localStorage.getItem("fincta_currency");

  return (
    <StyledCard>
      <StyledInfoContainer>
        <StyledTitle>{title}</StyledTitle>
        <br />
        <StyledSubHeading>{subHeading}</StyledSubHeading>
        <br />
        <StyledValue>
          {value}&nbsp;<span style={{ fontSize: "14px" }}>{currency}</span>
        </StyledValue>
        <br />
        <StyledPercentage
          color={
            title === "Sales"
              ? percentage > 0
                ? "green"
                : "red"
              : percentage > 0
              ? "red"
              : "green"
          }
        >
          {percentage}%
        </StyledPercentage>
      </StyledInfoContainer>
      <StyledGraphContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            width={730}
            height={250}
            margin={{ top: 15, right: 0, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="0 "
              strokeOpacity={0}
              vertical={false}
            />
            <defs>
              <linearGradient id={graphColor} gradientTransform="rotate(90)">
                <stop offset="0%" stop-color={graphColor} stopOpacity={0.2} />
                <stop offset="90%" stop-color={graphColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={graphColor}
              strokeWidth={2}
              fill={defId}
            />
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </StyledGraphContainer>
    </StyledCard>
  );
};
