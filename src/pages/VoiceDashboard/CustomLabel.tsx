import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { GraphicColors } from "src/utils/const";


export interface customeLabels {
  data: any;
  labels: any;
  color: any;
  totalUsers?: number;
  showValue?: boolean;
  itemsCountPerPage?: number;
}

export const CustomeLabels =
  ({
    data,
    labels = [],
    color = GraphicColors,
    showValue = false,
    itemsCountPerPage = 10,
  }: customeLabels) => {
    const [page ] = useState(1);
  
    // const sum = data.reduce((a: any, b: any) => a + b, 0);

    return (
      <>
        {labels.map((label: string, key: number) => {
          return (
            <Box
              key={key}
              style={{
                display:
                  key >= itemsCountPerPage * (page - 1) &&
                  key < itemsCountPerPage * page
                    ? "block"
                    : "none",
              }}
            >
              <Box py={0.5} px={{ xs: 4, md: 0 }}>
                <Grid
                  container
                  style={{
                    padding: "0.5em 0",
                  }}
                  spacing={2}
                >
                  <Grid item xs={12} style={{ display:'flex', justifyContent:'inherit' }}>
                    <Box
                      style={{
                        width: 10,
                        height: 10,
                        marginTop: '4px',
                        backgroundColor: color[key],
                        borderRadius: "100%",
                      }}
                      mr={0.3}
                    ></Box>
                    <Box style={{ color: "#5A5A68", fontSize: '12px' }}>{label}</Box>
                  </Grid>
                  <Grid item xs={2}>
                    {showValue ? (
                      <Box textAlign="right">
                        <Box
                          style={{
                            color: "#5A5A68",
                            fontSize: "1em",
                            lineHeight: "1em",
                            marginTop: "0.15em",
                          }}
                        >
                          <b>{data[key]}</b>
                        </Box>
                      </Box>
                    ) : (
                        ''

                    //   <Box
                    //     textAlign="right"
                    //     style={{ color: "#5A5A68", fontWeight: 700 }}
                    //   >{data[key] > 0 ? `${Math.round((data[key] * 100) / sum)}%` : `0%`}</Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
              {/* {key < labels.length - 1 } */}
            </Box>
          );
        })}
      </>
    );
  }
