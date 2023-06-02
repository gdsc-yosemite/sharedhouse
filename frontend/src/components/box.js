import React from "react";
import details from "../assets/listingsdetails.png";

function Box({ listings,backgroundColor,
    border,
    borderRadius,
    color,
    overflow,
    fontFamily,
    fontSize,
    fontWeight,
    minHeight,
    margin,
    padding,
    width,
    textAlign,
    style, ...props }) {
    return <div
        {...props} 
        style={{
            border,
            backgroundColor,
            borderRadius,
            color,
            fontFamily,
            fontSize,
            fontWeight,
            overflow,
            minHeight,
            margin,
            padding,
            width,
            textAlign,
        ...style,}}>{listings}</div>
  }
  
  export default function box() {
    return (
        <Box
            backgroundColor="#FFF"
            borderRadius={40}
            color="#eee"
            minHeight={2000}
            padding={12}
            width={1400}
            margin={65}
            
        >
            <Box>
                <img id="details" alt="updated" src={details}/>
            </Box>
        </Box>
      )
  }