import React,{useState} from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

const Serie = (props) =>{

  return (
    <tr>
      <th scope="row">{props.serie.id}</th>
      <th>{props.serie.name}</th>
      <th>{props.serie.channel}</th>
      <th>{props.serie.description}</th>
    </tr>
  );

}
export default Serie;
  
